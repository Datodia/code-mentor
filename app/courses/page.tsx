import React from 'react'
import { getAllCourses } from './services'
import CoursesPage from '@/components/pages/courses'

export const metadata = {
  title: "Fullstack Mentor | Courses for Aspiring Developers",
  description: "Explore expert-led full-stack development courses that help you master front-end and back-end development technologies, such as JavaScript, React, Node.js, and more.",
  keywords: [
    "Full Stack Development", "Programming Courses", "Learn to Code", "JavaScript", "React", "Node.js", 
    "Web Development Courses", "Front-End Development", "Backend Development", "Full Stack Mentor"
  ],
  openGraph: {
    title: "Fullstack Mentor | Courses for Aspiring Developers",
    description: "Explore expert-led full-stack development courses that help you master front-end and back-end development technologies.",
    url: "https://fullstackmentor.space/courses",
    siteName: "Fullstack Mentor",
    type: "website",
    images: [
      { url: "https://fullstackmentor.space/courses-og-image.jpg", width: 1200, height: 630, alt: "Courses for Developers" }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Fullstack Mentor | Courses for Aspiring Developers",
    description: "Explore expert-led full-stack development courses to help you master front-end and back-end technologies.",
    creator: "@Datodiasamidz10",
    images: ["https://fullstackmentor.space/courses-og-image.jpg"]
  }
};


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
