'use client'
import { getBlogById } from '@/app/blogs/services'
import { Button } from '@/components/ui/button'
import Dialog from '@/components/ui/dialog'
import { axiosInstance } from '@/lib/axios-instance'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCookie } from 'cookies-next'
import { Loader2, Upload } from 'lucide-react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type PropType = {
    setShowAddOrUpdate: Dispatch<SetStateAction<boolean>>,
    showAddOrUpdate: boolean,
    blogId: string | null,
}

const schema = z.object({
    title: z.string().min(2, 'სახელი არასწორია'),
    description: z.string().min(6, "აღწერა აუცილებელია"),
});

type FormData = z.infer<typeof schema>;

export default function AddOrUpdate({ setShowAddOrUpdate, showAddOrUpdate, blogId }: PropType) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            description: '',
        }
    });
    const [loading, setLoading] = useState(false)
    const [uploadedFile, setUploadedFile] = useState<FileList | string | null>(null)
    const [errorUpload, setErrorUpload] = useState(false)

    const onSubmit = async (data: FormData) => {
        const token = getCookie('accessToken')
        const formData = new FormData()

        formData.append('title', data.title)
        formData.append('description', data.description)

        if (!uploadedFile || (typeof uploadedFile === 'object' && !('0' in uploadedFile)) ) {
            setErrorUpload(true)
            return
        } else {
            setErrorUpload(false)
        }

        if (uploadedFile instanceof FileList){
            formData.append('file', uploadedFile[0])
        }
        if(typeof uploadedFile === 'string'){
            formData.append('file', uploadedFile)
        }
        try {
            setLoading(true)
            if (blogId) {
                const resp = await axiosInstance.patch(`/blogs/${blogId}`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (resp.status === 200) {
                    toast.success('ბლოგი განახლდა წარმატებით')
                }
            } else {
                const resp = await axiosInstance.post('/blogs', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (resp.status === 201) {
                    toast.success('ბლოგი შეიქმნა წარმატებით')
                }
            }
        } catch (e: any) {
            toast.error(e.response.data.message)
            console.log(e)
        } finally {
            setShowAddOrUpdate(false)
            setLoading(false)
        }
    }

    const getBlogByBlogId = async (id: string) => {
        const blog = await getBlogById(id)
        reset({
            title: blog.title,
            description: blog.description,
        })
        setUploadedFile(blog.image)
    }

    useEffect(() => {
        if (blogId) {
            getBlogByBlogId(blogId)
        }
    }, [blogId])

    return (
        <div>
            <Dialog
                isOpen={showAddOrUpdate}
                onClose={() => setShowAddOrUpdate(false)}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col'>
                        <label htmlFor="blogTitle">სათაური *</label>
                        <input id="blogTitle" className="border-2 border-border rounded-sm my-2 p-2" {...register('title')} type="text" placeholder="ბლოგის სახელი" />
                        {errors.title ? <p className="text-destructive italic text-sm">{errors.title.message}</p> : null}

                        <label htmlFor="blogDesc">აღწერა *</label>
                        <textarea id="blogDesc" className="border-2 border-border rounded-sm my-2 p-2 h-[300px]" {...register('description')} placeholder="ბლოგის აღწერა" />
                        {errors.description ? <p className="text-destructive italic text-sm">{errors.description.message}</p> : null}

                        <label htmlFor="images" className='rounded-sm my-2 p-2 flex flex-col'>
                            ფოტო *
                            {
                                typeof uploadedFile === 'string' ? (
                                    <p>{uploadedFile}</p>
                                ) : uploadedFile !== null && '0' in uploadedFile && typeof uploadedFile === 'object' ? (
                                    <p>{uploadedFile[0]?.name}</p>
                                ) : (
                                    <Upload />
                                )
                            }
                        </label>
                        <input id="images" className="hidden" type='file' onChange={(e) => {
                            setUploadedFile(e.target.files)
                            setErrorUpload(false)
                        }} />
                        {errorUpload ? <p className="text-destructive italic text-sm">ატვირთე ფაილი</p> : null}
                        {
                            loading ?
                                <Button disabled>
                                    <Loader2 className="animate-spin" />
                                    Loading..
                                </Button> :
                                <Button>{blogId ? 'დააფდეითე' : 'შექმენი'} ბლოგი</Button>
                        }
                    </div>
                </form>
            </Dialog>
        </div>
    )
}
