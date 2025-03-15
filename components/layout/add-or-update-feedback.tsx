import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { axiosInstance } from '@/lib/axios-instance';
import { getCookie } from 'cookies-next';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const schema = z.object({
    feedback: z.string().min(1, "ფიდბექი აუცილებელია"),
    rating: z.number().min(1, "მინიმალური რეიტინგი უნდა იყოს 1").max(5, "მაქსიმალური რეიტინგი უნდა იყოს 5")
});
type FormData = z.infer<typeof schema>;

export default function AddOrUpdateFeedback({ feedbackId }: { feedbackId: string | null }) {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        setValue
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const getFeedback = async (feedbackId: string) => {
        const resp = await axiosInstance.get(`/feedbacks/${feedbackId}`)
        if (resp.status === 200) {
            setValue('rating', resp.data.rating)
            setValue('feedback', resp.data.feedback)
        }
    }

    useEffect(() => {
        if (!feedbackId) return
        getFeedback(feedbackId);
    }, [feedbackId]);

    const onSubmit = async (data: FormData) => {
        const token = getCookie('accessToken')
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        try {
            setLoading(true)
            let resp;
            if (!feedbackId) {
                resp = await axiosInstance.post('/feedbacks', data, { headers})
            }else{
                resp = await axiosInstance.patch(`/feedbacks/${feedbackId}`, data, { headers })
            }
            if (resp.status === 201 || resp.status === 200) {
                toast.success(`ფიდბექი ${resp.status === 201 ? 'დაემატა' : 'განახლდა'} წარმატებით`)
            }
        } catch (e) {
            toast.error('რაღაც შეცდომა მოხდა')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col'>
                <label htmlFor="blogDesc">აღწერა *</label>
                <textarea
                    id="blogDesc"
                    className="border-2 border-ring rounded-sm my-2 p-2 h-[300px]"
                    {...register('feedback')}
                    placeholder="დაწერე ფიდბექი"
                />
                {errors.feedback ? <p className="text-destructive italic text-sm">{errors.feedback.message}</p> : null}
            </div>

            <div className='flex flex-col my-4'>
                <label>რეიტინგი *</label>
                <Controller
                    name="rating"
                    control={control}
                    render={({ field }) => (
                        <div className="flex items-center gap-2 mt-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <div
                                    key={value}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-2 transition-all 
                                        ${field.value >= value
                                            ? 'bg-primary text-primary-foreground border-primary'
                                            : 'bg-background border-muted-foreground hover:border-primary'}`}
                                    onClick={() => field.onChange(value)}
                                >
                                    {value}
                                </div>
                            ))}
                        </div>
                    )}
                />
                {errors.rating ? <p className="text-destructive italic text-sm mt-1">{errors.rating.message}</p> : null}
            </div>

            <Button disabled={loading} type="submit">{loading ? <><Loader2 className="animate-spin" /> 'დაელოდე...' </> : 'გამოაქვეყნე'}</Button>
        </form>
    )
}