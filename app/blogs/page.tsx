import React from 'react'
import { getAllBlogs } from './services'
import BlogsPage from '@/components/pages/blogs'

export const metadata = {
  title: "Fullstack Mentor | Tech Blogs and Resources",
  description: "Stay updated with the latest tech trends, tutorials, and resources on full-stack development, JavaScript, React, and more.",
  keywords: [
    "Tech Blogs", "Full Stack Development", "Programming Tutorials", "JavaScript", "React", "Web Development", 
    "Tech Trends", "Software Engineering Blogs", "Tech Mentorship", "Backend Development", "Frontend Development",
    "ბლოგები", "ტექ ბლოგები", "პროგრამირების ბლოგები", "ტექნოლოგიები", "პროგრამირება", "ტექ კარიერა",
    "ტექ კარიერა საქართველოში", "ფულსტეკ დეველოპერი", "ფულსტეკ დეველოპერი საქართველოში",
  ],
  openGraph: {
    title: "Fullstack Mentor | Tech Blogs and Resources",
    description: "Stay updated with the latest tech trends, tutorials, and resources on full-stack development, JavaScript, React, and more.",
    url: "https://fullstackmentor.space/blogs",
    siteName: "Fullstack Mentor",
    type: "website",
    images: [
      { url: "https://www.fullstackmentor.space/logo_light.png", width: 1200, height: 630, alt: "Tech Blogs" }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Fullstack Mentor | Tech Blogs and Resources",
    description: "Stay updated with the latest tech trends, tutorials, and resources on full-stack development, JavaScript, React, and more.",
    creator: "@Datodiasamidz10",
    images: ["https://www.fullstackmentor.space/logo_light.png"]
  }
};


type SearchParams = Promise<{page: string}>

export default async function Blogs({searchParams}: {searchParams: SearchParams}) {
  const params = await searchParams
  const page =  params.page || '1'
  const blogs = await getAllBlogs(`blogs?page=${page}`)

  return (
    <>
      {
        !blogs ? <h1>loading...</h1> :
          (<BlogsPage blogs={blogs} page={page} />)
      }
    </>
  )
}
