import { Button } from '@/components/ui/button'
import Dialog from '@/components/ui/dialog'
import { axiosInstance } from '@/lib/axios-instance'
import { getCookie } from 'cookies-next'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

type PropType = {
    setShouldFetch: React.Dispatch<React.SetStateAction<boolean>>
    setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
    showDeleteModal: boolean
    challengeId: string
}

export default function DeleteModal({ challengeId, setShouldFetch, setShowDeleteModal, showDeleteModal }: PropType) {
    const [loading, setLoading] = useState(false)

    const handleDelete = async (courseId: string) => {
        const token = getCookie('accessToken')
        try {
            setLoading(true)
            const resp = await axiosInstance.delete(`/challenges/${courseId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            if (resp.status === 200) {
                toast.success('deleted successfully')
                setShouldFetch(prev => !prev)
            }
        } catch (e) {
            console.log(e)
        } finally {
            setShowDeleteModal(prev => !prev)
            setLoading(false)
        }
    }


    return (
        <div>
            <Dialog
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(prev => !prev)}
            >
                <h1>Are you sure to Delete?</h1>
                <div className='mt-10 flex gap-4'>
                    <Button onClick={() => setShowDeleteModal(prev => !prev)} variant={'outline'}>Cancel</Button>
                    {
                        loading ?
                            <Button disabled><Loader2 className='animate-spin' /> Loading...</Button> :
                            <Button onClick={() => handleDelete(challengeId!)} variant={'destructive'}>Delete</Button>
                    }

                </div>
            </Dialog>
        </div>
    )
}
