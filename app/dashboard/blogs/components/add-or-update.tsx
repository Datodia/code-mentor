'use client'
import { Button } from '@/components/ui/button'
import Dialog from '@/components/ui/dialog'
import { axiosInstance } from '@/lib/axios-instance'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCookie } from 'cookies-next'
import { Loader2 } from 'lucide-react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type PropType = {
    setShowAddOrUpdate: Dispatch<SetStateAction<boolean>>,
    showAddOrUpdate: boolean,
    blogId: string | null
}

const schema = z.object({
    title: z.string().min(2, 'სახელი არასწორია'),
    description: z.string().min(6, "აღწერა აუცილებელია"),
    image: z.string().optional()
});

type FormData = z.infer<typeof schema>;

export default function AddOrUpdate({ setShowAddOrUpdate, showAddOrUpdate, blogId }: PropType) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data: FormData) => {
        const token = getCookie('accessToken')
        try {
            setLoading(true)
            const resp = await axiosInstance.post('/blogs', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(resp.data)
        } catch (e) {
            console.log(e)
        } finally {
            setShowAddOrUpdate(false)
            setLoading(false)
        }
    }


    return (
        <div>
            <Dialog
                isOpen={showAddOrUpdate}
                onClose={() => setShowAddOrUpdate(false)}
            >
                <form onSubmit={handleSubmit(onSubmit)}>

                    {
                        blogId ?
                            <h1>update</h1> :
                            <div className='flex flex-col'>
                                <label htmlFor="blogTitle">სათაური *</label>
                                <input id="blogTitle" className="border-2 border-border rounded-sm my-2 p-2" {...register('title')} type="text" placeholder="ბლოგის სახელი" />
                                {errors.title ? <p className="text-destructive italic text-sm">{errors.title.message}</p> : null}

                                <label htmlFor="blogDesc">აღწერა *</label>
                                <textarea id="blogDesc" className="border-2 border-border rounded-sm my-2 p-2" {...register('description')} placeholder="ბლოგის აღწერა" />
                                {errors.description ? <p className="text-destructive italic text-sm">{errors.description.message}</p> : null}

                                <label htmlFor="images">ფოტო *</label>
                                <input id="images" className="border-2 border-border rounded-sm my-2 p-2" type='text' {...register('image')} placeholder="ტოფოს ლინკი" />
                                {errors.image ? <p className="text-destructive italic text-sm">{errors.image.message}</p> : null}
                                {
                                    loading ?
                                        <Button disabled>
                                            <Loader2 className="animate-spin" />
                                            Loading..
                                        </Button> :
                                        <Button>შექმენი ბლოგი</Button>
                                }
                            </div>
                    }
                </form>
            </Dialog>
        </div>
    )
}
