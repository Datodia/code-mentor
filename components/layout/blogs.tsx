'use client'
import React, { useEffect, useState } from 'react'
import BlogCard from '../ui/blog-card'
import Link from 'next/link'
import { BlogResponse } from '@/types'
import { getAllBlogs } from '@/app/blogs/services'
import BlogCardSkeleton from '../ui/blog-card-skeleton'
import { CardHoverEffect } from '../ui/card-hover-effect'

export default function Blogs() {
  const [blogs, setBlogs] = useState<BlogResponse | null>(null)
  const getBlogs = async (url: string, query: string) => {
    const response = await getAllBlogs(url, query)
    setBlogs(response)
  }


  useEffect(() => {
    getBlogs('/blogs', 'take=3')
  }, [])


  return (
    <section className='max-w-[1240px] mx-auto px-4 flex flex-col gap-6 mt-10 xl:px-0'>
      <h1 className='text-center font-semibold text-lg'>ბლოგები</h1>
      <CardHoverEffect className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
          !blogs ? Array.from({length: 3}).map((_, index) => <BlogCardSkeleton key={index} />) :
            blogs?.blogs.map(blog => (
              <BlogCard
                key={blog._id}
                href={blog._id}
                image={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URI}/${blog.image}`}
                readTime={blog.readTime}
                title={blog.title}
                className='w-full md:w-full'
              />
            ))}
      </CardHoverEffect>
      <Link className='px-3 py-2 rounded-md bg-foreground text-primary-foreground block w-auto mx-auto hover:bg-primary/90' href={'/blogs'}>წაიკითხე მეტი</Link>
    </section>
  )
}
