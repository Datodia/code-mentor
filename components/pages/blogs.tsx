'use client'
import React from 'react'
import BlogCard from '../ui/blog-card'
import PaginationDemo from '../ui/pagination-demo'
import { BlogResponse } from '@/types'

type PropType = {
    blogs: BlogResponse,
    page: string
}

export default function BlogsPage({ blogs, page }: PropType) {
    return (
        <div className='max-w-[1240px] mx-auto px-4 lg:px-0'>
            <h1 className='text-center font-semibold text-lg my-5'>ბლოგები</h1>
            <section className='w-full grid mx-auto grid-cols-1 sm:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:gap-4'>
                {blogs.blogs.map(el => (
                    <BlogCard
                        key={el._id}
                        href={el._id}
                        image={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URI}/${el.image}`}
                        readTime={el.readTime}
                        title={el.title}
                    />
                ))}
            </section>

            <section className='mt-10'>

                <PaginationDemo perPage={30} currentPage={Number(page)} />
            </section>
        </div>
    )
}
