import { Button } from '@/components/ui/button'
import Dialog from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { axiosInstance } from '@/lib/axios-instance'
import { zodResolver } from '@hookform/resolvers/zod'
import { getCookie } from 'cookies-next'
import { Loader2, Upload } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type PropType = {
    setShouldFetch: React.Dispatch<React.SetStateAction<boolean>>
    setShowAddOrUpdate: React.Dispatch<React.SetStateAction<boolean>>
    showAddOrUpdate: boolean
    courseId: string
}

const schema = z.object({
    title: z.string().min(2, 'სახელი არასწორია'),
    description: z.string().min(6, "აღწერა აუცილებელია"),
    level: z.enum(['Beginer', 'Middle', 'Advenced'], { message: "დონე არასწორია" }),
    price: z.string().min(1, 'ფასი არასწორია'),
    totalEnrollments: z.string().min(1, 'ჯამური შესყვანებები არასწორია'),
    totalLessons: z.string().min(1, 'ჯამური ლექციები არასწორია'),
    totalDuration: z.string().min(1, 'ჯამური დრო არასწორია'),
    isActive: z.enum(["true", "false"], { message: "სტატუსი არასწორია" }),
    sylabus: z.array(z.object({
        title: z.string().min(2, 'სათაური არასწორია'),
        description: z.string().min(6, 'აღწერა არასწორია')
    }))
});

type FormData = z.infer<typeof schema>;

export default function AddOrUpdate({ courseId, showAddOrUpdate, setShouldFetch, setShowAddOrUpdate }: PropType) {

    const [loading, setLoading] = useState(false)
    const [uploadedFile, setUploadedFile] = useState<FileList | string | null>(null)
    const [errorUpload, setErrorUpload] = useState(false)

    const { handleSubmit, register, formState: { errors }, setValue, control } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            sylabus: [{ title: '', description: '' }],
        }
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: "sylabus"
    });

    const onSubmit = async (data: FormData) => {
        const token = getCookie('accessToken')
        const formData = new FormData()

        formData.append('title', data.title)
        formData.append('description', data.description)
        formData.append('level', data.level)
        formData.append('price', data.price)
        formData.append('totalEnrollments', data.totalEnrollments)
        formData.append('totalLessons', data.totalLessons)
        formData.append('totalDuration', data.totalDuration)
        formData.append('isActive', data.isActive)

        data.sylabus.forEach((item, index) => {
            formData.append(`sylabus[${index}][title]`, item.title);
            formData.append(`sylabus[${index}][description]`, item.description);
        });

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

        try{
            setLoading(true)
            if(courseId){
                const resp = await axiosInstance.patch(`/courses/${courseId}`, formData, { headers })
                if(resp.status === 200){
                    toast.success('კურსი განახლდა წარმატებით')
                    setShouldFetch(prev => !prev)
                    setShowAddOrUpdate(prev => !prev)
                }
            }else{
                const resp = await axiosInstance.post('/courses', formData, { headers })
                if(resp.status === 201){
                    toast.success('კურსი შეიქმნა წარმატებით')
                    setShouldFetch(prev => !prev)
                    setShowAddOrUpdate(prev => !prev)
                }
            }

        }catch(e: any){
            toast.error(e.response.data.message || 'შეცდომა')
        }finally{
            setLoading(false)
        }
    }

    const getCourseByCourseId = async (id: string) => {
        const resp = await axiosInstance.get(`/courses/${id}`)
        setValue('title', resp.data.title)
        setValue('description', resp.data.description)
        setValue('level', resp.data.level)
        setValue('price', resp.data.price.toString())
        setValue('totalEnrollments', resp.data.totalEnrollments.toString())
        setValue('totalLessons', resp.data.totalLessons.toString())
        setValue('totalDuration', resp.data.totalDuration.toString())
        setValue('isActive', resp.data.isActive)
        setUploadedFile(resp.data.image)
        setValue('sylabus', resp.data.sylabus.map((item: any) => ({
            title: item.title,
            description: item.description
        })))
    }

    useEffect(() => {
        if(!courseId) return
        getCourseByCourseId(courseId)
    }, [courseId])

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
                            <input id="courseTitle" className="border-2 border-border rounded-sm my-2 p-2" {...register('title')} type="text" placeholder="კურსის სახელი" />
                            {errors.title ? <p className="text-destructive italic text-sm">{errors.title.message}</p> : null}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="courseDesc">აღწერა *</label>
                            <textarea id="courseDesc" className="border-2 border-border rounded-sm my-2 p-2 h-[100px]" {...register('description')} placeholder="კურსის აღწერა" />
                            {errors.description ? <p className="text-destructive italic text-sm">{errors.description.message}</p> : null}
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
                                                <SelectItem value="Beginer">Beginer</SelectItem>
                                                <SelectItem value="Middle">Middle</SelectItem>
                                                <SelectItem value="Advenced">Advenced</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.level && <p className="text-destructive italic text-sm">{errors.level.message}</p>}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="coursePrice">ფასი*</label>
                                <input id="coursePrice" className="border-2 border-border rounded-sm my-2 p-2" {...register('price')} type="number" placeholder="კურსის ფასი" />
                                {errors.price ? <p className="text-destructive italic text-sm">{errors.price.message}</p> : null}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="courseEnrolment">სტდნტ. რაოდენობა*</label>
                                <input id="courseEnrolment" className="border-2 border-border rounded-sm my-2 p-2" {...register('totalEnrollments')} type="number" placeholder="სტდნტ. რაოდენობა" />
                                {errors.totalEnrollments ? <p className="text-destructive italic text-sm">{errors.totalEnrollments.message}</p> : null}
                            </div>
                        </div>
                        <div className='grid grid-cols-3 gap-2'>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor="level">აქტიური სტატუსი*</label>
                                <Controller
                                    name="isActive"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} {...field}>
                                            <SelectTrigger className={`w-full ${errors.isActive ? 'border-red-500' : 'border-gray-300'}`}>
                                                <SelectValue placeholder="სტატუსი" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="true">აქტიური</SelectItem>
                                                <SelectItem value="false">არა აქტიური</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                {errors.isActive && <p className="text-destructive italic text-sm">{errors.isActive.message}</p>}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="courseLect">ლექც. რაოდენობა*</label>
                                <input id="courseLect" className="border-2 border-border rounded-sm my-2 p-2" {...register('totalLessons')} type="number" placeholder="ლექციების რაოდენობა" />
                                {errors.totalLessons ? <p className="text-destructive italic text-sm">{errors.totalLessons.message}</p> : null}
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="courseHours">სრული საათები*</label>
                                <input id="courseHours" className="border-2 border-border rounded-sm my-2 p-2" {...register('totalDuration')} type="number" placeholder="მთლიანი დრო" />
                                {errors.totalDuration ? <p className="text-destructive italic text-sm">{errors.totalDuration.message}</p> : null}
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">სილაბუსი</label>
                            {fields.map((field, index) => (
                                <div key={field.id} className="mb-4 p-4 border rounded-md">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-medium">სილაბუსის პუნქტი {index + 1}</h4>
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            წაშლა
                                        </button>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor={`sylabus.${index}.title`} className="block mb-1">სათაური *</label>
                                        <input
                                            id={`sylabus.${index}.title`}
                                            className={`border-2 rounded-sm p-2 w-full`}
                                            {...register(`sylabus.${index}.title` as const)}
                                            placeholder="სილაბუსის სათაური"
                                        />
                                        {errors.sylabus?.[index]?.title && (
                                            <p className="text-destructive italic text-sm">{errors.sylabus[index]?.title?.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor={`sylabus.${index}.description`} className="block mb-1">აღწერა *</label>
                                        <textarea
                                            id={`sylabus.${index}.description`}
                                            className={`border-2 rounded-sm p-2 w-full h-[80px]`}
                                            {...register(`sylabus.${index}.description` as const)}
                                            placeholder="სილაბუსის აღწერა"
                                        />
                                        {errors.sylabus?.[index]?.description && (
                                            <p className="text-destructive italic text-sm">{errors.sylabus[index]?.description?.message}</p>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={() => append({ title: '', description: '' })}
                                className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-800"
                            >
                                + დაამატე სილაბუსის პუნქტი
                            </button>
                        </div>
                        {
                            loading ?
                                <Button disabled>
                                    <Loader2 className="animate-spin" />
                                    Loading..
                                </Button> :
                                <Button>{courseId ? 'დააფდეითე' : 'შექმენი'} კურსი</Button>
                        }
                    </div>
                </form>
            </Dialog>
        </div>
    )
}
