'use client'
import { Button } from '@/components/ui/button'
import Dialog from '@/components/ui/dialog'
import { axiosInstance } from '@/lib/axios-instance'
import { getCookie } from 'cookies-next'
import { Loader2 } from 'lucide-react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'sonner'

type PropType = {
    setShowDeleteModal: Dispatch<SetStateAction<boolean>>,
    showDeleteModal: boolean,
    blogId: string
}


export default function DeleteModal({ setShowDeleteModal, showDeleteModal, blogId }: PropType) {
    const [loading, setLoading] = useState(false)

    const handleDelete = async (blogId: string) => {
        const token = getCookie('accessToken')
        try {
            setLoading(true)
            const resp = await axiosInstance.delete(`/blogs/${blogId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if(resp.status === 200){
                toast.success('deleted successfully')
            }
            console.log(resp.data)
        } catch (e) {
            console.log(e)
        } finally {
            setShowDeleteModal(false)
            setLoading(false)
        }
    }


    return (
        <div>
            <Dialog
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
            >
                <h1>Are you sure to Delete?</h1>
                <div className='mt-10 flex gap-4'>
                    <Button onClick={() => setShowDeleteModal(false)} variant={'outline'}>Canel</Button>
                    {
                        loading ?
                            <Button disabled><Loader2 className='animate-spin' /> Loading...</Button> :
                            <Button onClick={() => handleDelete(blogId)} variant={'destructive'}>Delete</Button>
                    }

                </div>
            </Dialog>
        </div>
    )
}
