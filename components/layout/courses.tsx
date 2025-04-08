'use client'
import React from 'react'
import Link from 'next/link'
import CourseCard from '../ui/course-card'
import { Course } from '@/types'
import { CardHoverEffect } from '../ui/card-hover-effect'
import CourseCardSkeleton from '../ui/course-card-skeleton'

type PropType = {
  courses: Course[]
}

export default function Courses({courses}:PropType) {
  return (
    <section className='max-w-[1240px] mx-auto px-4 flex flex-col gap-2 md:gap-4 mt-10 xl:px-0'>
      <h2 className='text-center font-semibold text-lg'>კურსები</h2>
      <CardHoverEffect className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
          !courses ? Array.from({length: 3}).map((_, i) => (<CourseCardSkeleton key={i} />))
            :
            courses.map(course => (
              <CourseCard
                description={course.description}
                href={course._id}
                image={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URI}/${course.image}`}
                key={course._id}
                level={course.level}
                rating={course.rating}
                title={course.title}
                totalDuration={course.totalDuration}
                totalLessons={course.totalLessons}
                totalReviews={course.totalEnrollments}
              />
            ))
        }
      </CardHoverEffect>
      <Link className='px-3 py-2 rounded-md bg-foreground text-primary-foreground block w-auto mx-auto hover:bg-primary/90' href={'/courses'}>ყველა კურსი</Link>
    </section>
  )
}
