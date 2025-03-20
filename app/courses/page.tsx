import React from 'react'
import { getAllCourses } from './services'
import CoursesPage from '@/components/pages/courses'

export default async function Courses() {
    const courses = await getAllCourses('/courses')
  return (
    <>
        {
            !courses ? <h1>Loading...</h1>
            : <CoursesPage courses={courses} />
        }
    </>
  )
}
