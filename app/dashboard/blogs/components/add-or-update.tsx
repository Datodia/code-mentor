'use client'
import { getBlogById } from '@/app/blogs/services'
import { Button } from '@/components/ui/button'
import Dialog from '@/components/ui/dialog'
import MarkdownEditor from '@/components/ui/markdown-editor'
import { axiosInstance } from '@/lib/axios-instance'
import { BlogResponse } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCookie } from 'cookies-next'
import { Loader2, Upload } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type PropType = {
    setShouldFetch: React.Dispatch<React.SetStateAction<boolean>>
    setState: React.Dispatch<React.SetStateAction<{
        blogs: BlogResponse | null;
        showAddOrUpdate: boolean;
        showDeleteModal: boolean;
        blogId: string | null;
    }>>
    state: {
        blogs: BlogResponse | null;
        showAddOrUpdate: boolean;
        showDeleteModal: boolean;
        blogId: string | null;
    }
}

const schema = z.object({
    title: z.string().min(2, 'სახელი არასწორია'),
    description: z.string().min(6, "აღწერა აუცილებელია"),
});

type FormData = z.infer<typeof schema>;

export default function AddOrUpdate({ state, setState, setShouldFetch }: PropType) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue

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
    const storageKey = state.blogId 
        ? `blog-edit-${state.blogId}` 
        : 'blog-new'

    const onSubmit = async (data: FormData) => {
        const token = getCookie('accessToken')
        const formData = new FormData()

        formData.append('title', data.title)
        formData.append('description', data.description)

        if (!uploadedFile || (typeof uploadedFile === 'object' && !(uploadedFile instanceof FileList))) {
            setErrorUpload(true)
            return
        } else {
            setErrorUpload(false)
        }

        if (uploadedFile instanceof FileList) {
            formData.append('file', uploadedFile[0])
        }
        if (typeof uploadedFile === 'string') {
            formData.append('file', uploadedFile)
        }
        const headers = {
            'Authorization': `Bearer ${token}`,
        }
        try {
            setLoading(true)
            if (state.blogId) {
                const resp = await axiosInstance.patch(`/blogs/${state.blogId}`, formData, { headers })
                if (resp.status === 200) {
                    setShouldFetch(prev => !prev)
                    toast.success('ბლოგი განახლდა წარმატებით')
                    localStorage.removeItem(storageKey)
                }
            } else {
                const resp = await axiosInstance.post('/blogs', formData, { headers })
                if (resp.status === 201) {
                    setShouldFetch(prev => !prev)
                    toast.success('ბლოგი შეიქმნა წარმატებით')
                    localStorage.removeItem(storageKey)
                }
            }
        } catch (e: any) {
            toast.error(e.response.data.message)
            console.log(e)
        } finally {
            setState(prev => ({ ...prev, showAddOrUpdate: false }))
            setLoading(false)
        }
    }

    const getBlogByBlogId = useCallback(async (id: string) => {
        const blog = await getBlogById(id)
        reset({
            title: blog.title,
            description: blog.description,
        })
        setUploadedFile(blog.image)
    }, [reset])

    useEffect(() => {
        if (!state.blogId) return
        getBlogByBlogId(state.blogId)
    }, [state.blogId, getBlogByBlogId])

    useEffect(() => {
        if (!state.blogId) {
            reset({
                title: '',
                description: '',
            })
            setUploadedFile(null)
        }
    }, [state.blogId, reset])

    return (
        <div>
            <Dialog
                isOpen={state.showAddOrUpdate}
                onClose={() => setState(prev => ({ ...prev, showAddOrUpdate: false }))}
                className='w-10/12'
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col'>
                        <label htmlFor="blogTitle">სათაური *</label>
                        <input id="blogTitle" className="border-2 border-border rounded-sm my-2 p-2" {...register('title')} type="text" placeholder="ბლოგის სახელი" />
                        {errors.title ? <p className="text-destructive italic text-sm">{errors.title.message}</p> : null}

                        <label htmlFor="blogDesc">აღწერა *</label>
                        <MarkdownEditor
                            value={watch('description')}
                            onChange={(v) => setValue('description', v, { shouldValidate: true })}
                            storageKey={storageKey}
                        />
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
                                <Button>{state.blogId ? 'დააფდეითე' : 'შექმენი'} ბლოგი</Button>
                        }
                    </div>
                </form>
            </Dialog>
        </div>
    )
}