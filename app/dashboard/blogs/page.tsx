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
    const [blogs, setBlogs] = useState<BlogResponse | null>(null)
    const [showAddOrUpdate, setShowAddOrUpdate] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [blogId, setBlogId] = useState<string | null>(null)

    const getBlogs = async (url = '/blogs') => {
        const resp = await getAllBlogs()
        setBlogs(resp)
    }

    useEffect(() => {
        getBlogs()
    }, [showAddOrUpdate, showDeleteModal])


    const handleRowClick = (id: string) => {
        setBlogId(id)
        setShowAddOrUpdate(true)
    }

    const handleAddNewBlog = () => {
        setBlogId(null)
        setShowAddOrUpdate(true)
    }

    const handleDelete = async (e: any, id: string) => {
        e.stopPropagation()
        setBlogId(id)
        setShowDeleteModal(true)
    }

    return (
        <div className='px-4'>
            {
                showAddOrUpdate ?
                    <AddOrUpdate blogId={blogId} setShowAddOrUpdate={setShowAddOrUpdate} showAddOrUpdate={showAddOrUpdate} />
                    : null
            }
            {
                showDeleteModal ?
                    <DeleteModal blogId={blogId as string} setShowDeleteModal={setShowDeleteModal} showDeleteModal={showDeleteModal} />
                    : null
            }
            <div className='flex items-center justify-between'>
                <h1>Blogs</h1>
                <Button onClick={handleAddNewBlog}><Plus /> Add New Blog</Button>
            </div>
            <div className='border-2 border-black mt-10'>
                <Table>
                    <TableCaption>{blogs?.totalBlogs} Blogs Found</TableCaption>
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
                        {blogs?.blogs.map((blog) => (
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
                        {blogs?.blogs.length === 0 && (
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
