'use client'
import { getAllChallenges } from '@/app/challenges/services'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ChallengeResponse } from '@/types'
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import DeleteModal from './components/delete'
import AddOrUpdate from './components/add-or-update'

export default function Challenges() {
    const [challengesResp, setChallengesResp] = useState<ChallengeResponse | null>(null)
    const [challengeId, setChallengeId] = useState<string | null>(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showAddOrUpdate, setShowAddOrUpdate] = useState(false)
    const [shouldFetch, setShouldFetch] = useState(false)

    const getChallenges = async (url = '/challenges') => {
        const resp = await getAllChallenges()
        setChallengesResp(resp)
    }

    const handleDelete = async (e: any, id: string) => {
        e.preventDefault()
        e.stopPropagation()
        setShowDeleteModal(true)
        setChallengeId(id)
    }

    const handleRowClick = (id: string) => {
        setShowAddOrUpdate(true)
        setChallengeId(id)
    }

    const handleAddNewCourse = () => {
        setShowAddOrUpdate(true)
        setChallengeId(null)
    }


    useEffect(() => {
        getChallenges()
    }, [shouldFetch])

    return (
        <div className='px-4'>
            {
                showAddOrUpdate ?
                    <AddOrUpdate
                        challengeId={challengeId!}
                        showAddOrUpdate={showAddOrUpdate}
                        setShouldFetch={setShouldFetch}
                        setShowAddOrUpdate={setShowAddOrUpdate}
                    />
                    : null
            }
            {
                showDeleteModal ?
                    <DeleteModal
                        challengeId={challengeId!}
                        setShouldFetch={setShouldFetch}
                        setShowDeleteModal={setShowDeleteModal}
                        showDeleteModal={showDeleteModal}
                    /> : null
            }
            <div className='flex items-center justify-between'>
                <h1>Challenges</h1>
                <Button onClick={handleAddNewCourse}><Plus /> Add New Challenges</Button>
            </div>
            <div className='border-2 border-foreground mt-10'>
                <Table>
                    <TableCaption>{challengesResp?.challenges?.length} Challenge Found</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px] hidden md:block">ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Level</TableHead>
                            <TableHead>Delete</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {!challengesResp?.challenges?.length ?
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-muted-foreground">
                                    No blogs found
                                </TableCell>
                            </TableRow>
                            :
                            challengesResp.challenges.map((challenge) => (
                                <TableRow className='relative' key={challenge._id} onClick={() => handleRowClick(challenge._id)}>
                                    <TableCell className="font-medium hidden md:block">{challenge._id}</TableCell>
                                    <TableCell className="font-medium">{challenge.title}</TableCell>
                                    <TableCell className="font-medium">{challenge.price}</TableCell>
                                    <TableCell className="font-medium">{challenge.type} </TableCell>
                                    <TableCell className="font-medium">{challenge.level} </TableCell>
                                    <TableCell className='relative z-20'>
                                        <Button onClick={(e) => { handleDelete(e, challenge._id) }} variant={'destructive'} >Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
