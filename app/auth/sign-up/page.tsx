
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const georgianPhoneNumberRegex = /^5\d{8}$/;

const schema = z.object({
  firstName: z.string().min(2, 'არავალიდური სახელი'),
  lastName: z.string().min(4, "არავალიდური გვარი"),
  phoneNumber: z.string()
    .min(9, "ტელეფონის ნომერი უნდა შედგებოდეს 9 ციფრისგან")
    .max(9, "ტელეფონის ნომერი ძალიან გრძელია")
    .regex(georgianPhoneNumberRegex, 'ნომრის ფორმატი არასწორია'),
  email: z.string().email("არასწორი იმეილის ფორმატი"),
  password: z.string().min(6, "პაროლი უნდა იყოს 6 სიმბოლოზე მეტი"),
});

type FormData = z.infer<typeof schema>;

export default function SignUp() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data, "data")
  }

  return (
    <form className="p-4 w-11/12 md:w-1/2 mx-auto flex flex-col gap-4 rounded-2xl shadow-sm shadow-sidebar-border mt-10" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-base font-semibold">რეგისტრაცია</h1>
      <div className="flex flex-col">
        <label htmlFor="firstName">სახელი</label>
        <input id="firstName" className="border-2 border-border rounded-sm my-2 p-2" {...register('firstName')} type="text" placeholder="შეიყვანეთ სახელი" />
        {errors.firstName ? <p className="text-destructive italic text-sm">{errors.firstName.message}</p> : null}
        <label htmlFor="lastName">გვარი</label>
        <input id="lastName" className="border-2 border-border rounded-sm my-2 p-2" {...register('lastName')} type="text" placeholder="შეიყვანეთ გვარი" />
        {errors.lastName ? <p className="text-destructive italic text-sm">{errors.lastName.message}</p> : null}
        <label htmlFor="phoneNumber">ტელეფონის ნომერი</label>
        <input id="phoneNumber" className="border-2 border-border rounded-sm my-2 p-2" {...register('phoneNumber')} type="text" placeholder="შეიყვანეთ ნომერი 555123456" />
        {errors.phoneNumber ? <p className="text-destructive italic text-sm">{errors.phoneNumber.message}</p> : null}
        <label htmlFor="email">იმეილი</label>
        <input id="email" className="border-2 border-border rounded-sm my-2 p-2" {...register('email')} type="text" placeholder="შეიყვანეთ იმეილი" />
        {errors.email ? <p className="text-destructive italic text-sm">{errors.email.message}</p> : null}
        <label htmlFor="password">პაროლი</label>
        <input id="passwrod" className="border-2 border-border rounded-sm my-2 p-2"  {...register('password')} type="password" placeholder="შეიყვანეთ პაროლი" />
        {errors.password ? <p className="text-destructive italic text-sm">{errors.password.message}</p> : null}
      </div>
      <Button type="submit">რეგისტრაცია</Button>
      <Link className="text-center font-medium flex mx-auto" href={'/auth/sign-in'}>ავტორიზაცია</Link>
      <Link className="flex gap-3 mx-auto bg-muted py-2 px-4 rounded-xl" href={`${process.env.NEXT_PUBLIC_BASE_API}/auth/google`}>
        <Image
          src={'/assets/google.svg'}
          alt="google"
          width={25}
          height={25}
        />
        გუგლით რეგისტრაცია
      </Link>
    </form>
  )
}
