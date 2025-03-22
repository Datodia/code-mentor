import { getChallengeById } from '@/app/challenges/services'
import { Button } from '@/components/ui/button'
import Dialog from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { axiosInstance } from '@/lib/axios-instance'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCookie } from 'cookies-next'
import { Loader2, Upload } from 'lucide-react'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type PropType = {
    setShouldFetch: React.Dispatch<React.SetStateAction<boolean>>
    setShowAddOrUpdate: React.Dispatch<React.SetStateAction<boolean>>
    showAddOrUpdate: boolean
    challengeId: string
}

const schema = z.object({
    title: z.string().min(2, 'სახელი არასწორია'),
    description: z.string().min(6, "აღწერა აუცილებელია"),
    figma: z.string().min(6, "ლინკი აუცილებელია"),
    level: z.enum(['1', '2', '3', '4', '5'], { message: "დონე არასწორია" }),
    type: z.enum(['frontend', 'backend',], { message: "ტიპი არასწორია" }),
    price: z.coerce
        .number()
        .min(0, 'ფასი არ შეიძლება უარყოფითი იყოს')
        .transform(value => Number(value))
        .refine(value => !isNaN(value), { message: "ფასი აუცილებელია" }),
});

type FormData = z.infer<typeof schema>;

export default function AddOrUpdate({ challengeId, setShouldFetch, setShowAddOrUpdate, showAddOrUpdate }: PropType) {
    const [loading, setLoading] = useState(false)
    const [uploadedFile, setUploadedFile] = useState<FileList | string | null>(null)
    const [errorUpload, setErrorUpload] = useState(false)
    const [sourceFile, setSourceFile] = useState<FileList | string | null>(null)

    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm({
        resolver: zodResolver(schema)
    })

    const onSubmit = async (data: FormData) => {
        const token = getCookie('accessToken')
        const formData = new FormData()

        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('figma', data.figma)
        formData.append('level', data.level)
        formData.append('type', data.type)
        formData.append('price', data.price.toString())

        if (!uploadedFile || (typeof uploadedFile === 'object' && !(uploadedFile instanceof FileList))) {
            setErrorUpload(true)
            return
        } else {
            setErrorUpload(false)
        }

        if (uploadedFile instanceof FileList) {
            formData.append('files', uploadedFile[0])
        }
        if (typeof uploadedFile === 'string') {
            formData.append('files', uploadedFile)
        }

        if (sourceFile instanceof FileList) {
            formData.append('files', sourceFile[0])
        }
        if (typeof sourceFile === 'string') {
            formData.append('files', sourceFile)
        }
        const headers = {
            'Authorization': `Bearer ${token}`,
        }

        try {
            setLoading(true)
            if (challengeId) {
                const resp = await axiosInstance.patch(`/challenges/${challengeId}`, formData, { headers })
                if (resp.status === 200) {
                    toast.success('კურსი განახლდა წარმატებით')
                    setShouldFetch(prev => !prev)
                    setShowAddOrUpdate(prev => !prev)
                }
            } else {
                const resp = await axiosInstance.post('/challenges', formData, { headers })
                if (resp.status === 201) {
                    toast.success('კურსი შეიქმნა წარმატებით')
                    setShouldFetch(prev => !prev)
                    setShowAddOrUpdate(prev => !prev)
                }
            }

        } catch (e: any) {
            toast.error(e.response.data.message || 'შეცდომა')
        } finally {
            setLoading(false)
        }
    }

    const getSingleChallengeById = useCallback(async (id: string) => {
        const resp = await getChallengeById(id)
        setValue('title', resp.title)
        setValue('description', resp.description)
        setValue('level', resp.level.toString() as '1' | '2' | '3' | '4' | '5')
        setValue('price', resp.price)
        setUploadedFile(resp.image)
        setSourceFile(resp.source)
        setValue('figma', resp.figma)
        setValue('type', resp.type as 'frontend' | 'backend')
    }, [setValue])

    useEffect(() => {
        if (!challengeId) return
        getSingleChallengeById(challengeId)
    }, [challengeId, getSingleChallengeById])

    return (
        <div>
            <Dialog
                isOpen={showAddOrUpdate}
                onClose={() => setShowAddOrUpdate(prev => !prev)}
            >
                <form onSubmit={handleSubmit(onSubmit)} className='p-4 h-[600px] overflow-y-auto'>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-col'>
                            <label htmlFor="courseTitle">სათაური*</label>
                            <input id="courseTitle" className="border-2 border-border rounded-sm my-2 p-2" {...register('title')} type="text" placeholder="ჩელენჯის სახელი" />
                            {errors.title ? <p className="text-destructive italic text-sm">{errors.title.message}</p> : null}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="courseDesc">აღწერა *</label>
                            <textarea id="courseDesc" className="border-2 border-border rounded-sm my-2 p-2 h-[100px]" {...register('description')} placeholder="ჩელენჯის აღწერა" />
                            {errors.description ? <p className="text-destructive italic text-sm">{errors.description.message}</p> : null}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="figmaUrl">ფიგმას ლინკი *</label>
                            <input id="figmaUrl" className="border-2 border-border rounded-sm my-2 p-2" {...register('figma')} placeholder="ფიგმას ლინკი" />
                            {errors.figma ? <p className="text-destructive italic text-sm">{errors.figma.message}</p> : null}
                        </div>
                        <div>
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
                        </div>

                        <div className='grid grid-cols-3 gap-2'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="level">დონე*</label>
                                <Controller
                                    name="level"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} {...field}>
                                            <SelectTrigger className={`w-full ${errors.level ? 'border-red-500' : 'border-gray-300'}`}>
                                                <SelectValue placeholder="დონე" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">1</SelectItem>
                                                <SelectItem value="2">2</SelectItem>
                                                <SelectItem value="3">3</SelectItem>
                                                <SelectItem value="4">4</SelectItem>
                                                <SelectItem value="5">5</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.level && <p className="text-destructive italic text-sm">{errors.level.message}</p>}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="coursePrice">ფასი*</label>
                                <input id="coursePrice" className="border-2 border-border rounded-sm my-2 p-2" {...register('price')} type="number" placeholder="ჩელენჯის ფასი" />
                                {errors.price ? <p className="text-destructive italic text-sm">{errors.price.message}</p> : null}
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="level">ტექ. სტეკი</label>
                                <Controller
                                    name="type"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} {...field}>
                                            <SelectTrigger className={`w-full ${errors.type ? 'border-red-500' : 'border-gray-300'}`}>
                                                <SelectValue placeholder="სტატუსი" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="frontend">FrontEnd</SelectItem>
                                                <SelectItem value="backend">BackEnd</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.type && <p className="text-destructive italic text-sm">{errors.type.message}</p>}
                            </div>
                            <div>
                                <label htmlFor="source" className='rounded-sm my-2 p-2 flex flex-col'>
                                    ფაილის ზიპი
                                    {
                                        typeof sourceFile === 'string' ? (
                                            <p>{sourceFile}</p>
                                        ) : sourceFile && sourceFile.length && typeof sourceFile === 'object' ? (
                                            <p>{sourceFile[0]?.name}</p>
                                        ) : (
                                            <Upload />
                                        )
                                    }
                                </label>
                                <input id="source" className="hidden" type='file' onChange={(e) => {
                                    setSourceFile(e.target.files)
                                }} />
                            </div>
                        </div>

                        {
                            loading ?
                                <Button disabled>
                                    <Loader2 className="animate-spin" />
                                    Loading..
                                </Button> :
                                <Button>{challengeId ? 'დააფდეითე' : 'შექმენი'} კურსი</Button>
                        }
                    </div>
                </form>
            </Dialog>
        </div>
    )
}
