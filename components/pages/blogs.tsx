'use client'
import React, { useState } from 'react'
import BlogCard from '../ui/blog-card'
import PaginationDemo from '../ui/pagination-demo'
import { BlogResponse } from '@/types'
import { CardHoverEffect } from '../ui/card-hover-effect'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { axiosInstance } from '@/lib/axios-instance'
import { getAllBlogs } from '@/app/blogs/services'

type PropType = {
    blogs: BlogResponse,
    page: string
}

export default function BlogsPage({ blogs, page }: PropType) {

    const [blogsResp, setBlogsResp] = useState<BlogResponse | null>(blogs)
    const [filters, setFilters] = useState<{ date?: 'asc' | 'desc'; views?: 'asc' | 'desc' }>({})

    const handleSelectChange = async (value: string) => {
        let updatedFilters = { ...filters }

        if (value === 'popular') {
            updatedFilters = { views: 'desc' }
        } else if (value === 'old') {
            updatedFilters = { date: 'asc' }
        } else {
            updatedFilters = {}
        }

        setFilters(updatedFilters)

        const queryString = Object.entries(updatedFilters)
            .map(([key, val]) => `${key}=${val}`)
            .join('&')

        const resp = await getAllBlogs(`/blogs?${queryString}`)
        setBlogsResp(resp)

    }

    return (
        <div className='max-w-[1240px] mx-auto px-4 lg:px-0'>
            <section className='my-2 md:my-4'>
                <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className='w-1/3  md:w-1/5'>
                        <SelectValue placeholder="ფილტრი" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all">ყველა</SelectItem>
                            <SelectItem value="popular">პოპულარული</SelectItem>
                            <SelectItem value="old">ძველი</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </section>
            <section className='w-full mx-auto '>
                <CardHoverEffect className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {blogsResp?.blogs.map(el => (
                        <BlogCard
                            key={el._id}
                            href={el._id}
                            image={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URI}/${el.image}`}
                            readTime={el.readTime}
                            title={el.title}
                            views={el.views}
                        />
                    ))}
                </CardHoverEffect>
            </section>

            <section className='mt-10'>

                <PaginationDemo perPage={30} currentPage={Number(page)} />
            </section>
        </div>
    )
}
