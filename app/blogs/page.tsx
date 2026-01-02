import React from 'react'
import type { Metadata } from 'next'
import { getAllBlogs } from './services'
import BlogsPage from '@/components/pages/blogs'

export const metadata: Metadata = {
  title: 'ტექ ბლოგები | პროგრამირების სტატიები | Fullstack Mentor',
  description:
    'ტექ ბლოგები და პროგრამირების სტატიები ქართულად: JavaScript, React, Node.js, NestJS, მონაცემთა ბაზები, კარიერა და პრაქტიკული გზამკვლევები დეველოპერებისთვის.',
  keywords: [
    // KA
    'ტექ ბლოგები',
    'პროგრამირების ბლოგები',
    'პროგრამირების სტატიები',
    'დეველოპერული სტატიები',
    'პროგრამისტის გზამკვლევი',
    'ფრონტენდ სტატიები',
    'ბექენდ სტატიები',
    'JavaScript სტატიები',
    'React სტატიები',
    'Node.js სტატიები',
    'NestJS სტატიები',
    'მონაცემთა ბაზები',
    'პროგრამისტის კარიერა',
    'სწავლა კოდირებით',

    // EN
    'tech blogs',
    'programming tutorials',
    'developer blog',
    'javascript blog',
    'react articles',
    'node.js blog',
    'nestjs articles',
    'web development resources',
    'software engineering articles',
  ],
  alternates: { canonical: 'https://fullstackmentor.space/blogs' },
  openGraph: {
    title: 'ტექ ბლოგები | Fullstack Mentor',
    description:
      'ტექ ბლოგები და პროგრამირების სტატიები ქართულად: JavaScript, React, Node.js და სხვა ტექნოლოგიები.',
    url: 'https://fullstackmentor.space/blogs',
    siteName: 'Fullstack Mentor',
    type: 'website',
    images: [
      {
        url: 'https://www.fullstackmentor.space/logo_light.png',
        width: 1200,
        height: 630,
        alt: 'Fullstack Mentor - Tech Blogs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ტექ ბლოგები | Fullstack Mentor',
    description:
      'Read Georgian tech blogs: JavaScript, React, Node.js, databases, and career guides for developers.',
    creator: '@Datodiasamidze10',
    images: ['https://www.fullstackmentor.space/logo_light.png'],
  },
}

type SearchParams = Promise<{ page?: string }>

export default async function Blogs({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const page = params.page || '1'
  const blogs = await getAllBlogs(`blogs?page=${page}`)

  if (!blogs) return <h1>loading...</h1>

  return <BlogsPage blogs={blogs} page={page} />
}
