import React from 'react'
import { getAllBlogs } from './services'
import BlogsPage from '@/components/pages/blogs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "ტექ ბლოგები | Tech Blogs for Developers | Fullstack Mentor",
  description:
    "წაიკითხე უახლესი ტექნოლოგიური სტატიები, პროგრამირების გზამკვლევები და რჩევები დეველოპერებისთვის. Stay updated with the latest tech trends, tutorials, and expert tips on full-stack development, JavaScript, React, Node.js, and more.",
  keywords: [
    "Tech Blogs", "Developer Blogs", "Full Stack Development Blogs", "Programming Tutorials", "JavaScript Blog",
    "React Articles", "Node.js Blog", "Frontend Blogs", "Backend Blogs", "Web Development Resources",
    "Tech News", "Software Engineering Articles", "Learn to Code", "Fullstack Mentor Blog",

    "ტექ ბლოგები", "პროგრამირების ბლოგები", "დეველოპერული სტატიები", "ტექნოლოგიების ბლოგი",
    "ფრონტენდ ბლოგები", "ბექენდ ბლოგები", "პროგრამისტის გზამკვლევი",
    "სწავლა კოდირებით", "JavaScript ბლოგი", "React სტატიები", "Node.js ბლოგი",
    "ტექ კარიერა", "პროგრამისტის ბლოგი", "Fullstack Mentor ბლოგი", "პროგრამირების სტატიები"
  ],
  openGraph: {
    title: "ტექ ბლოგები | Tech Blogs for Developers | Fullstack Mentor",
    description: "გაეცანი უახლეს ტექნოლოგიურ სტატიებს და ბლოგებს პროგრამირებაზე, JavaScript, React, Node.js და სხვა ტექნოლოგიებზე. Stay ahead with Fullstack Mentor.",
    url: "https://fullstackmentor.space/blogs",
    siteName: "Fullstack Mentor",
    type: "website",
    images: [
      {
        url: "https://www.fullstackmentor.space/logo_light.png",
        width: 1200,
        height: 630,
        alt: "Tech Blogs for Developers"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "ტექ ბლოგები | Tech Blogs for Developers | Fullstack Mentor",
    description: "Explore programming guides, coding tips, and the latest updates in full-stack development. Ideal for Georgian and international developers.",
    creator: "@Datodiasamidz10",
    images: ["https://www.fullstackmentor.space/logo_light.png"]
  }
}



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
