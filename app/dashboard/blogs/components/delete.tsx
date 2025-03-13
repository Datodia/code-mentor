'use client'
import { Button } from '@/components/ui/button'
import Dialog from '@/components/ui/dialog'
import { axiosInstance } from '@/lib/axios-instance'
import { BlogResponse } from '@/types'
import { getCookie } from 'cookies-next'
import { Loader2 } from 'lucide-react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { toast } from 'sonner'

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


export default function DeleteModal({ setState, state, setShouldFetch}: PropType) {
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
            if (resp.status === 200) {
                toast.success('deleted successfully')
                setShouldFetch(prev => !prev)
            }
        } catch (e) {
            console.log(e)
        } finally {
            setState(prev => ({...prev, showDeleteModal: false}))
            setLoading(false)
        }
    }


    return (
        <div>
            <Dialog
                isOpen={state.showDeleteModal}
                onClose={() => setState(prev => ({...prev, showDeleteModal: false}))}
            >
                <h1>Are you sure to Delete?</h1>
                <div className='mt-10 flex gap-4'>
                    <Button onClick={() => setState(prev => ({...prev, showDeleteModal: false}))} variant={'outline'}>Cancel</Button>
                    {
                        loading ?
                            <Button disabled><Loader2 className='animate-spin' /> Loading...</Button> :
                            <Button onClick={() => handleDelete(state.blogId!)} variant={'destructive'}>Delete</Button>
                    }

                </div>
            </Dialog>
        </div>
    )
}
