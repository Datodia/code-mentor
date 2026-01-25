import React from 'react'
import { getCourseById } from '../services'
import { notFound } from 'next/navigation'
import CoursePageClient from '@/components/pages/course'
import { Metadata } from 'next'

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { id } = await params;
    const course = await getCourseById(id);
    
    if (!course) {
      return {
        title: 'Course Not Found',
      };
    }
    
    const imageUrl = `${process.env.NEXT_PUBLIC_CLOUD_FRONT_URI}/${course.image}`;
    const courseUrl = `https://www.fullstackmentor.space/courses/${id}`;
    
    return {
      title: course.title,
      description: course.description.substring(0, 160),
      keywords: course.title,
      alternates: { canonical: courseUrl },
      openGraph: {
        title: course.title,
        description: course.description.substring(0, 160),
        url: courseUrl,
        type: 'article',
        siteName: 'Fullstack Mentor',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: course.title,
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: course.title,
        description: course.description,
        images: [imageUrl],
      }
    };
  }

export default async function CoursePage({ params }: { params: Params }) {
    const { id } = await params
    const course = await getCourseById(id)
    if (!course) return notFound()

    return (
        <CoursePageClient course={course} />
    )
}
