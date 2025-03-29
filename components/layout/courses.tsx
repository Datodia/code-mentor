'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import CourseCard from '../ui/course-card'
import { Course } from '@/types'
import { getAllCourses } from '@/app/courses/services'
import { CardHoverEffect } from '../ui/card-hover-effect'
import CourseCardSkeleton from '../ui/course-card-skeleton'

export default function Courses() {
  const [courses, setCourses] = useState<Course[] | null>(null)

  const getCourses = async (url: string) => {
    const response = await getAllCourses(url)
    setCourses(response)
  }

  useEffect(() => {
    getCourses('/courses')
  }, [])

  return (
    <section className='max-w-[1240px] mx-auto px-4 flex flex-col gap-2 md:gap-4 mt-10 xl:px-0'>
      <h1 className='text-center font-semibold text-lg'>კურსები</h1>
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
