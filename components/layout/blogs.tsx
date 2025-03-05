import React from 'react'
import BlogCard from '../ui/blog-card'
import Link from 'next/link'
import { Button } from '../ui/button'
import { mockBlog } from '@/app/mock-blog'

export default function Blogs() {
  return (
    <section className='max-w-[1240px] mx-auto px-4 flex flex-col gap-6 mt-10 xl:px-0'>
        <h1 className='text-center font-semibold text-lg'>ბლოგები</h1>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
          {mockBlog.map(blog => (
            <BlogCard 
              key={blog.id} 
              href={blog.id}
              image={blog.image}
              readTime={blog.readTime}
              title={blog.title}
              className='w-full md:w-full'
              
            />
          ))}
        </div>
        <Link className='px-3 py-2 rounded-md bg-foreground text-primary-foreground block w-auto mx-auto hover:bg-primary/90' href={'/blogs'}>წაიკითხე მეტი</Link>
    </section>
  )
}
