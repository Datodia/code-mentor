import React from 'react'
import { mockBlog } from '../mock-blog'
import BlogCard from '@/components/ui/blog-card'
import PaginationDemo from '@/components/ui/pagination-demo'


export default function Blogs() {

  return (
    <div className='max-w-[1240px] mx-auto px-4 lg:px-0'>
      <h1 className='text-center font-semibold text-lg my-5'>ბლოგები</h1>
      <section className='w-full grid mx-auto grid-cols-1 sm:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:gap-4'>
        {mockBlog.map(el => (
          <BlogCard
            key={el.id}
            href={el.id}
            image={el.image}
            readTime={el.readTime}
            title={el.title}
            className='w-full md:w-full'
          />
        ))}
      </section>

      <PaginationDemo perPage={30} />
    </div>
  )
}
