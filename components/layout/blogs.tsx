'use client'
import React from 'react'
import BlogCard from '../ui/blog-card'
import Link from 'next/link'
import { BlogResponse } from '@/types'
import BlogCardSkeleton from '../ui/blog-card-skeleton'
import { CardHoverEffect } from '../ui/card-hover-effect'

type PropType = {
  blogs: BlogResponse
}

export default function Blogs({blogs}: PropType) {
  return (
    <section className='max-w-[1240px] mx-auto px-4 flex flex-col gap-2 md:gap-4 mt-10 xl:px-0'>
      <h2 className='text-center font-semibold text-lg'>ბლოგები</h2>
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
                views={blog.views}
                className='w-full md:w-full'
              />
            ))}
      </CardHoverEffect>
      <Link className='px-3 py-2 rounded-md bg-foreground text-primary-foreground block w-auto mx-auto hover:bg-primary/90' href={'/blogs'}>წაიკითხე მეტი</Link>
    </section>
  )
}
