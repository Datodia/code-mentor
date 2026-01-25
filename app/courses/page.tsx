import React from 'react'
import type { Metadata } from 'next'
import { getAllCourses } from './services'
import CoursesPage from '@/components/pages/courses'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'პროგრამირების კურსები | Frontend, Backend, Fullstack | Fullstack Mentor',
  description:
    'პროგრამირების კურსები საქართველოში: ფრონტენდ, ბექენდ და ფულსტეკ კურსები. ისწავლე JavaScript, React, Node.js, NestJS, Express და მონაცემთა ბაზები (MongoDB/PostgreSQL) რეალური პროექტებით.',
  keywords: [
    // KA
    'პროგრამირების კურსები',
    'პროგრამირების კურსები საქართველოში',
    'ონლაინ კურსები',
    'კურსები',
    'ფრონტენდ კურსები',
    'Frontend კურსი',
    'React კურსი საქართველოში',
    'ბექენდ კურსები',
    'Backend კურსი',
    'Node.js კურსი საქართველოში',
    'ფულსტეკ კურსები',
    'Fullstack კურსი',
    'JavaScript კურსი',
    'React კურსი',
    'Node.js კურსი',
    'NestJS კურსი',
    'ExpressJS კურსი',
    'TypeScript კურსი',
    'მონაცემთა ბაზები',
    'MongoDB',
    'PostgreSQL',
    'ვებ დეველოპმენტი',
    'პროგრამისტის კარიერა',
    'კარიერა IT სექტორში',
    'დაბეგვრა დეველოპერი',

    // EN
    'programming courses georgia',
    'online programming courses',
    'learn to code',
    'frontend course',
    'backend course',
    'fullstack course',
    'javascript course',
    'react course',
    'node.js course',
    'nestjs course',
    'express.js course',
    'databases',
    'web development course',
    'programming tutorial',
  ],
  alternates: { canonical: 'https://www.fullstackmentor.space/courses' },
  openGraph: {
    title: 'პროგრამირების კურსები | Fullstack Mentor',
    description:
      'პროგრამირების კურსები Frontend/Backend/Fullstack. JavaScript, React, Node.js, NestJS, Express, MongoDB/PostgreSQL — პრაქტიკული სწავლება და რეალური პროექტები.',
    url: 'https://www.fullstackmentor.space/courses',
    siteName: 'Fullstack Mentor',
    type: 'website',
    images: [
      {
        url: 'https://www.fullstackmentor.space/logo_light.png',
        width: 1200,
        height: 630,
        alt: 'Fullstack Mentor - Courses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'პროგრამირების კურსები | Fullstack Mentor',
    description:
      'Learn Frontend/Backend/Fullstack with real projects: JavaScript, React, Node.js, NestJS, Express, MongoDB/PostgreSQL.',
    creator: '@Datodiasamidze10',
    images: ['https://www.fullstackmentor.space/logo_light.png'],
  },
}

export default async function Courses() {
  const courses = await getAllCourses('/courses')
  if (!courses) return <h1>Loading...</h1>
  return <CoursesPage courses={courses} />
}
