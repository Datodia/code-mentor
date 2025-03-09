import React from 'react'
import BlogCard from '@/components/ui/blog-card'
import PaginationDemo from '@/components/ui/pagination-demo'
import { getBlogs } from './services'

type SearchParams = Promise<{page: string}>

export default async function Blogs({searchParams}: {searchParams: SearchParams}) {
  const params = await searchParams
  const page =  params.page || 1
  const blogs = await getBlogs(`blogs?page=${page}`)

  return (
    <>
      {
        !blogs ? <h1>loading...</h1> :
          (<div className='max-w-[1240px] mx-auto px-4 lg:px-0'>
            <h1 className='text-center font-semibold text-lg my-5'>ბლოგები</h1>
            <section className='w-full grid mx-auto grid-cols-1 sm:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:gap-4'>
              {blogs.blogs.map(el => (
                <BlogCard
                  key={el._id}
                  href={el._id}
                  image={el.image}
                  readTime={el.readTime}
                  title={el.title}
                  className='w-full md:w-full'
                />
              ))}
            </section>

            <PaginationDemo perPage={30} currentPage={Number(page)} />
          </div>)
      }
    </>
  )
}
