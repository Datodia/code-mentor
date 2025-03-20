'use client'
import { Course } from '@/types'
import React from 'react'
import { CardHoverEffect } from '../ui/card-hover-effect'
import CourseCard from '../ui/course-card'

type PropType = {
    courses: Course[]
}

export default function CoursesPage({ courses }: PropType) {
    return (
        <div className='max-w-[1240px] mx-auto px-4 lg:px-0'>
            <h1 className='text-center font-semibold text-lg my-5'>კურსები</h1>
            <section className='w-full mx-auto '>
                <CardHoverEffect className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {courses.map(el => (
                        <CourseCard
                            href={el._id}
                            className='sm:w-full md:w-full w-full'
                            key={el._id}
                            description={el.description}
                            level={el.level}
                            image={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URI}/${el.image}`}
                            rating={el.rating}  
                            totalLessons={el.totalLessons}
                            totalReviews={el.totalEnrollments}
                            totalDuration={el.totalDuration}
                            title={el.title}
                        />
                    ))}
                </CardHoverEffect>
            </section>
        </div>
    )
}
