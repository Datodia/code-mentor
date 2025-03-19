'use client'
import { getAllBlogs } from '@/app/blogs/services'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BlogResponse } from '@/types'
import { Eye, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import AddOrUpdate from './components/add-or-update'
import DeleteModal from './components/delete'

export default function Blogs() {
    const [state, setState] = useState<{
        blogs: BlogResponse | null,
        showAddOrUpdate: boolean,
        showDeleteModal: boolean,
        blogId: string | null
    }>({
        blogs: null,
        showAddOrUpdate: false,
        showDeleteModal: false,
        blogId: null
    })
    const [shouldFetch, setShouldFetch] = useState(false)

    const getBlogs = async (url = '/blogs') => {
        const resp = await getAllBlogs()
        setState(prev => ({ ...prev, blogs: resp}))
    }

    useEffect(() => {
        getBlogs()
    }, [shouldFetch])


    const handleRowClick = (id: string) => {
        setState(prev => ({
            ...prev, 
            blogId: id,
            showAddOrUpdate: true
        }))
    }

    const handleAddNewBlog = () => {
        setState(prev => ({...prev, blogId: null, showAddOrUpdate: true}))
    }

    const handleDelete = async (e: any, id: string) => {
        e.preventDefault()
        e.stopPropagation()
        setState(prev => ({...prev, blogId: id, showDeleteModal: true}))
    }

    return (
        <div className='px-4'>
            {
                state.showAddOrUpdate ?
                    <AddOrUpdate state={state} setState={setState} setShouldFetch={setShouldFetch} />
                    : null
            }
            {
                state.showDeleteModal ?
                    <DeleteModal state={state} setState={setState} setShouldFetch={setShouldFetch} />
                    : null
            }
            <div className='flex items-center justify-between'>
                <h1>Blogs</h1>
                <Button onClick={handleAddNewBlog}><Plus /> Add New Blog</Button>
            </div>
            <div className='border-2 border-foreground mt-10'>
                <Table>
                    <TableCaption>{state.blogs?.totalBlogs} Blogs Found</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Read Time</TableHead>
                            <TableHead>Views</TableHead>
                            <TableHead>Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {state.blogs?.blogs.map((blog) => (
                            <TableRow className='relative' key={blog._id} onClick={() => handleRowClick(blog._id)}>
                                <TableCell className="font-medium">{blog._id}</TableCell>
                                <TableCell className="font-medium">{blog.title}</TableCell>
                                <TableCell className="font-medium">
                                    {blog?.createdAt.toString()}
                                </TableCell>
                                <TableCell>{blog.readTime} min</TableCell>
                                <TableCell className="flex gap-1 items-center h-[52.33px]">
                                    <Eye className="w-4" /> {blog.views}
                                </TableCell>
                                <TableCell className='relative z-20'>
                                    <Button onClick={(e) => handleDelete(e, blog._id)} className='' variant={'destructive'} >Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {state.blogs?.blogs.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-muted-foreground">
                                    No blogs found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
