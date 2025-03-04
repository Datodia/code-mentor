import React from 'react'
import BlogCard from '../ui/blog-card'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function Blogs() {
  return (
    <section className='max-w-[1240px] mx-auto flex flex-col gap-6'>
        <h1 className='text-center font-semibold text-lg'>ბლოგები</h1>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
            <BlogCard className='w-full md:w-full' />
            <BlogCard className='w-full md:w-full'  />
            <BlogCard className='w-full md:w-full'  />
            <BlogCard className='w-full md:w-full'  />
        </div>
        <Link className='px-3 py-2 rounded-md bg-foreground text-primary-foreground block w-auto mx-auto hover:bg-primary/90' href={'/blogs'}>წაიკითხე მეტი</Link>
    </section>
  )
}
