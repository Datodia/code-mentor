'use client'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { UserResponse } from '@/types'
import React, { use, useEffect, useState } from 'react'
import { getAllUsers } from './services'
import { getCookie } from 'cookies-next'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { Check, CircleUser, X } from 'lucide-react'
import DeleteModal from './components/delete'

export default function Challenges() {
    const [usersResp, setUsersResp] = useState<UserResponse | null>(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [userId, setUserId] = useState<string | null>(null)
    const [shouldFetch, setShouldFetch] = useState(false)
    const token = getCookie('accessToken')

    const getChallenges = async (url = '/users') => {
        const headers = {
            Authorization: `Bearer ${token}`
        }
        const resp = await getAllUsers(url, headers)
        setUsersResp(resp)
    }

    const handleDelete = async (e: any, id: string) => {
        e.preventDefault()
        e.stopPropagation()
        setUserId(id)
        setShowDeleteModal(true)
    }


    useEffect(() => {
        getChallenges()
    }, [shouldFetch])

    return (
        <div className='px-4'>
            {
                showDeleteModal ?
                    <DeleteModal
                        userId={userId!}
                        setShouldFetch={setShouldFetch}
                        setShowDeleteModal={setShowDeleteModal}
                        showDeleteModal={showDeleteModal}
                    /> : null
            }
            <div>
                <h1 className='text-center'>Users</h1>
            </div>
            <div className='border-2 border-foreground mt-10'>
                <Table>
                    <TableCaption>{usersResp?.total} Users Found</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">ID</TableHead>
                            <TableHead>FullName</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>IsActive</TableHead>
                            <TableHead>CreatedAt</TableHead>
                            <TableHead>Avatar</TableHead>
                            <TableHead>Delete</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {!usersResp?.users?.length ?
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-muted-foreground">
                                    No Users found
                                </TableCell>
                            </TableRow>
                            :
                            usersResp.users.map((user) => (
                                <TableRow className='relative' key={user._id} >
                                    <TableCell className="font-medium">{user._id}</TableCell>
                                    <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                                    <TableCell className="font-medium">{user.email}</TableCell>
                                    <TableCell className="font-medium">{user.isActiveStudent ? <Check /> : <X />} </TableCell>
                                    <TableCell className="font-medium">{formatDate(user.createdAt)} </TableCell>
                                    <TableCell className="font-medium">
                                        {user.avatar ?
                                            <Image width={20} height={20} src={user.avatar} alt={user.avatar} />
                                            : <CircleUser />
                                        }
                                    </TableCell>
                                    <TableCell className='relative z-20'>
                                        <Button onClick={(e) => { handleDelete(e, user._id) }} variant={'destructive'} >Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
