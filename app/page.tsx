import type { Metadata } from 'next'
import Blogs from "@/components/layout/blogs";
import Courses from "@/components/layout/courses";
import Students from "@/components/layout/students";
import { getAllChallenges } from "@/app/challenges/services";
import { getAllBlogs } from "@/app/blogs/services";
import { getAllCourses } from "@/app/courses/services";
import { getAllFeedbacks } from "@/app/feedbacks/services";
import Challenges from "@/components/layout/challenges";

export const metadata: Metadata = {
  title: 'პროგრამირების კურსები | ფრონტენდ, ბექენდ, ფულსტეკ | Fullstack Mentor',
  description:
    'Fullstack Mentor - პროგრამირების აკადემია საქართველოში. ისწავლე JavaScript, React, Node.js, NestJS. კურსები, გამოწვევები, ბლოგები და მენტორობა დეველოპერებისთვის.',
  keywords: [
    'პროგრამირების კურსები',
    'ფრონტენდ კურსი',
    'ბექენდ კურსი',
    'ფულსტეკ კურსი',
    'JavaScript კურსი',
    'React კურსი',
    'Node.js კურსი',
    'NestJS კურსი',
    'კოდირების გამოწვევები',
    'ტექ ბლოგები',
    'პროგრამისტის მენტორობა',
    'ვებ დეველოპმენტი საქართველოში',
    'programming courses georgia',
    'learn fullstack development',
    'frontend backend courses',
  ],
  alternates: { canonical: 'https://www.fullstackmentor.space' },
  openGraph: {
    title: 'Fullstack Mentor - პროგრამირების კურსები',
    description: 'კურსები, გამოწვევები, ბლოგები და მენტორობა დეველოპერებისთვის. JavaScript, React, Node.js, NestJS',
    url: 'https://www.fullstackmentor.space',
    siteName: 'Fullstack Mentor',
    type: 'website',
    images: [
      {
        url: 'https://www.fullstackmentor.space/logo_light.png',
        width: 1200,
        height: 630,
        alt: 'Fullstack Mentor - Programming Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fullstack Mentor - პროგრამირების კურსები',
    description: 'Learn fullstack development: JavaScript, React, Node.js, NestJS with real projects.',
    creator: '@Datodiasamidze10',
    images: ['https://www.fullstackmentor.space/logo_light.png'],
  },
}

export const revalidate = 1800; 

export default async function Home() {
  const [challenges, blogs, courses, feedbacks] = await Promise.all([
    getAllChallenges('/challenges', 'take=6'),
    getAllBlogs('/blogs', 'take=3'),
    getAllCourses('/courses'),
    getAllFeedbacks('/feedbacks')
  ])

  return (
    <div className="max-w-[1240px] mx-auto">
      <Challenges challenges={challenges} />
      <Blogs blogs={blogs} />
      <Courses courses={courses} />
      <Students feedbacks={feedbacks} />
    </div>
  );
}
