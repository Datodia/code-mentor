import React from 'react'
import BlogCard from '../ui/blog-card'
import Link from 'next/link'
import { Button } from '../ui/button'
import CourseCard from '../ui/course-card'

export default function Courses() {
  return (
    <section className='max-w-[1240px] mx-auto px-4 flex flex-col gap-6 xl:px-0'>
        <h1 className='text-center font-semibold text-lg'>კურსები</h1>
        <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            <CourseCard  className='w-full md:w-full' />
            <CourseCard  className='w-full md:w-full' />
            <CourseCard  className='w-full md:w-full' />
            <CourseCard  className='w-full md:w-full' />
        </div>
        <Link className='px-3 py-2 rounded-md bg-foreground text-primary-foreground block w-auto mx-auto hover:bg-primary/90' href={'/courses'}>ყველა კურსი</Link>
    </section>
  )
}
