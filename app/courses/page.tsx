import React from 'react'
import { getAllCourses } from './services'
import CoursesPage from '@/components/pages/courses'

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "კურსები | Fullstack Mentor - Courses for Aspiring Developers",
  description: "აღმოაჩინე პროგრამირების კურსები ქართულად და ინგლისურად — ისწავლე JavaScript, React, Node.js და სხვა თანამედროვე ტექნოლოგიები Fullstack Mentor-ის დახმარებით.",
  keywords: [
    "Full Stack Development", "Programming Courses", "Learn to Code", "JavaScript", "React", "Node.js", 
    "Web Development Courses", "Front-End Development", "Backend Development", "Full Stack Mentor",
    "კურსები", "პროგრამირების კურსები", "ტექნოლოგიები", "პროგრამირება", "ტექ კარიერა",
    "ტექ კარიერა საქართველოში", "ფულსტეკ დეველოპერი", "ფულსტეკ დეველოპერი საქართველოში"
  ],
  openGraph: {
    title: "Fullstack Mentor | Courses for Aspiring Developers",
    description: "Explore expert-led full-stack development courses that help you master front-end and back-end development technologies.",
    url: "https://fullstackmentor.space/courses",
    siteName: "Fullstack Mentor",
    type: "website",
    images: [
      { url: "https://www.fullstackmentor.space/logo_light.png", width: 1200, height: 630, alt: "Courses for Developers" }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Fullstack Mentor | Courses for Aspiring Developers",
    description: "Explore expert-led full-stack development courses to help you master front-end and back-end technologies.",
    creator: "@Datodiasamidz10",
    images: ["https://www.fullstackmentor.space/logo_light.png"]
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
