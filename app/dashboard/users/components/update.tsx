import { Button } from '@/components/ui/button'
import Dialog from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { axiosInstance } from '@/lib/axios-instance'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCookie } from 'cookies-next'
import { Loader2 } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { getUserById } from '../services'

type PropType = {
    setShouldFetch: React.Dispatch<React.SetStateAction<boolean>>
    setShowUpdate: React.Dispatch<React.SetStateAction<boolean>>
    showUpdate: boolean
    userId: string
}
const georgianPhoneNumberRegex = /^5\d{8}$/;

const schema = z.object({
    firstName: z.string().min(1, 'არავალიდური სახელი'),
    lastName: z.string().min(1, "არავალიდური გვარი"),
    phoneNumber: z.string()
        .min(9, "ტელეფონის ნომერი უნდა შედგებოდეს 9 ციფრისგან")
        .max(9, "ტელეფონის ნომერი ძალიან გრძელია")
        .regex(georgianPhoneNumberRegex, 'ნომრის ფორმატი არასწორია')
        .optional(),
    email: z.string().email("არასწორი იმეილის ფორმატი"),
    role: z.enum(['student', 'admin'], { message: "როლი არასწორია" }),
    isActiveStudent: z.boolean(),
    hasFeedbackPermition: z.boolean(),
    isEmailNotificationEnable: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export default function Update({ userId, setShouldFetch, setShowUpdate, showUpdate }: PropType) {
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm({
        resolver: zodResolver(schema)
    })

    const onSubmit = async (data: FormData) => {
        const token = getCookie('accessToken')

        const headers = {
            'Authorization': `Bearer ${token}`,
        }

        try {
            setLoading(true)
            if (userId) {
                const resp = await axiosInstance.patch(`/users/${userId}`, data, { headers })
                if (resp.status === 200) {
                    toast.success('იუზერი განახლდა წარმატებით')
                    setShouldFetch(prev => !prev)
                    setShowUpdate(prev => !prev)
                }
            }
        } catch (e: any) {
            toast.error(e.response.data.message || 'შეცდომა')
        } finally {
            setLoading(false)
        }
    }

    const getSingleUserById = useCallback(async (id: string) => {
        const resp = await getUserById(id)
        setValue('firstName', resp.firstName)
        setValue('lastName', resp.lastName)
        setValue('email', resp.email)
        setValue('phoneNumber', resp.phoneNumber)
        setValue('role', resp.role as 'student' | 'admin')
        setValue('isActiveStudent', resp.isActiveStudent)
        setValue('hasFeedbackPermition', resp.hasFeedbackPermition)
        setValue('isEmailNotificationEnable', resp.isEmailNotificationEnable)
    }, [setValue])

    useEffect(() => {
        if (!userId) return
        getSingleUserById(userId)
    }, [userId, getSingleUserById])

    return (
        <div>
            <Dialog
                isOpen={showUpdate}
                onClose={() => setShowUpdate(prev => !prev)}
            >
                <form onSubmit={handleSubmit(onSubmit)} className='p-4 h-[600px] overflow-y-auto'>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="coursefirstName">სახელი*</label>
                            <input id="coursefirstName" className="border-2 border-border rounded-sm my-2 p-2" {...register('firstName')} type="text" placeholder="სახელი" />
                            {errors.firstName ? <p className="text-destructive italic text-sm">{errors.firstName.message}</p> : null}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="courseDesc">გვარი *</label>
                            <input id="courseDesc" className="border-2 border-border rounded-sm my-2 p-2" {...register('lastName')} placeholder="გვარი" />
                            {errors.lastName ? <p className="text-destructive italic text-sm">{errors.lastName.message}</p> : null}
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="courseDesc">იმეილი *</label>
                            <input id="courseDesc" className="border-2 border-border rounded-sm my-2 p-2" {...register('email')} placeholder="email" />
                            {errors.email ? <p className="text-destructive italic text-sm">{errors.email.message}</p> : null}
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="courseDesc">ტელეფონი *</label>
                            <input id="courseDesc" className="border-2 border-border rounded-sm my-2 p-2" {...register('phoneNumber')} placeholder="ნომერი" />
                            {errors.phoneNumber ? <p className="text-destructive italic text-sm">{errors.phoneNumber.message}</p> : null}
                        </div>

                        <div className='grid grid-cols-3 gap-2'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="role">როლი*</label>
                                <Controller
                                    name="role"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} {...field}>
                                            <SelectTrigger className={`w-full ${errors.role ? 'border-red-500' : 'border-gray-300'}`}>
                                                <SelectValue placeholder="დონე" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="student">Student</SelectItem>
                                                <SelectItem value="admin">Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.role && <p className="text-destructive italic text-sm">{errors.role.message}</p>}
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="isActiveStudent">სტატუსი*</label>
                                <Controller
                                    name="isActiveStudent"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={(value) => field.onChange(value === "true")}
                                            value={field.value ? "true" : "false"}
                                        >
                                            <SelectTrigger className={`w-full ${errors.isActiveStudent ? 'border-red-500' : 'border-gray-300'}`}>
                                                <SelectValue placeholder="სტატუსი" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">აქტიური</SelectItem>
                                                <SelectItem value="false">არა აქტიური</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.isActiveStudent && <p className="text-destructive italic text-sm">{errors.isActiveStudent.message}</p>}

                            </div>

                            <div className='flex flex-col gap-2'>
                                <label htmlFor="hasFeedbackPermition">ფიდბექი</label>
                                <Controller
                                    name="hasFeedbackPermition"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={(value) => field.onChange(value === "true")}
                                            value={field.value ? "true" : "false"}
                                        >
                                            <SelectTrigger className={`w-full ${errors.hasFeedbackPermition ? 'border-red-500' : 'border-gray-300'}`}>
                                                <SelectValue placeholder="ფიდბექი" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">აქვს უფლება</SelectItem>
                                                <SelectItem value="false">არ აქვს უფლება</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.hasFeedbackPermition && <p className="text-destructive italic text-sm">{errors.hasFeedbackPermition.message}</p>}

                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="isEmailNotificationEnable">Email Notify</label>
                            <Controller
                                name="isEmailNotificationEnable"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        onValueChange={(value) => field.onChange(value === "true")}
                                        value={field.value ? "true" : "false"}
                                    >
                                        <SelectTrigger className={`w-full ${errors.isEmailNotificationEnable ? 'border-red-500' : 'border-gray-300'}`}>
                                            <SelectValue placeholder="იმეილ ნოთიფიკაც." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="true">ჩართული</SelectItem>
                                            <SelectItem value="false">გამორთული</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            {errors.isEmailNotificationEnable && <p className="text-destructive italic text-sm">{errors.isEmailNotificationEnable.message}</p>}

                        </div>

                        {
                            loading ?
                                <Button disabled>
                                    <Loader2 className="animate-spin" />
                                    Loading..
                                </Button> :
                                <Button>დააფდეითე იუზერი</Button>
                        }
                    </div>
                </form>
            </Dialog>
        </div>
    )
}
