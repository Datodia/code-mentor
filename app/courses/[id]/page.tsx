import React from 'react'
import { getCourseById } from '../services'
import { notFound } from 'next/navigation'
import CoursePageClient from '@/components/pages/course'

type Params = Promise<{ id: string }>

export default async function CoursePage({ params }: { params: Params }) {
    const { id } = await params
    const course = await getCourseById(id)
    if (!course) return notFound()

    return (
        <CoursePageClient course={course} />
    )
}
