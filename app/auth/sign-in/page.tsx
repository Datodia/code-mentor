
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios-instance";
import { toast } from "sonner";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useCustomSearchParams } from "@/hooks/useCustomSearchParams";

const schema = z.object({
  email: z.string().email("არასწორი იმეილის ფორმატი"),
  password: z.string().min(6, "პაროლი უნდა იყოს 6 სიმბოლოზე მეტი"),
  rememberMe: z.boolean().optional().default(false)
});

type FormData = z.infer<typeof schema>;

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useCustomSearchParams()

  useEffect(() => {
    if ('token' in searchParams && searchParams.token) {
      setCookie('accessToken', searchParams.token, { maxAge: 60 * 60 })
      router.push('/profile')
    }
    if('error' in searchParams){
      toast.error('მოხდა ავტორიზაციის შეცდომა')
    }
  }, [searchParams, router])


  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      rememberMe: false
    }
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true)
      const resp = await axiosInstance.post('/auth/sign-in', data)
      toast.success('წარმატებული ავტორიზაცია', {
        action: {
          label: <X strokeWidth={3} />,
          onClick: () => { }
        }
      })

      if (resp.status === 201) {
        setCookie('accessToken', resp.data.accessToken, { maxAge: 60 * 60 })
        router.push('/profile')
      }
    } catch (e: any) {
      toast.error(e.response.data.message, {
        action: {
          label: <X strokeWidth={3} />,
          onClick: () => { }
        }
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="p-4 w-11/12 md:w-1/2 mx-auto flex flex-col gap-4 rounded-2xl shadow-sm shadow-sidebar-border mt-10" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-base font-semibold">შესვლა</h1>
      <div className="flex flex-col">
        <label htmlFor="email">იმეილი</label>
        <input id="email" className="border-2 border-border rounded-sm my-2 p-2" {...register('email')} type="text" placeholder="შეიყვანეთ იმეილი" />
        {errors.email ? <p className="text-destructive italic text-sm">{errors.email.message}</p> : null}
        <label htmlFor="password">პაროლი</label>
        <input id="passwrod" className="border-2 border-border rounded-sm my-2 p-2"  {...register('password')} type="password" placeholder="შეიყვანეთ პაროლი" />
        {errors.password ? <p className="text-destructive italic text-sm">{errors.password.message}</p> : null}
      </div>
      <div className="flex items-center space-x-2">
        <Controller
          name="rememberMe"
          control={control}
          render={({ field }) => (
            <>
              <Checkbox
                id="rememberMe"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <label
                htmlFor="rememberMe"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                დაიმახსოვრე პაროლი
              </label>
            </>
          )}
        />
      </div>
      {loading ? <Button disabled>
        <Loader2 className="animate-spin" />
        გთხოვთ დაელოდოთ
      </Button> : <Button type="submit">შესვლა</Button>}
      <Link className="text-center font-medium flex mx-auto" href={'/auth/sign-up'}>რეგისტრაცია</Link>
      <Link className="flex gap-3 mx-auto bg-muted py-2 px-4 rounded-xl hover:bg-ring" href={`${process.env.NEXT_PUBLIC_BASE_API}/auth/google`}>
        <Image
          src={'/assets/google.svg'}
          alt="google"
          width={25}
          height={25}
        />
        გუგლით ავტორიზაცია
      </Link>
    </form>
  )
}
