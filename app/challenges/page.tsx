import React from 'react'
import { getAllChallenges } from './services'
import ChallengesPage from '@/components/pages/chellanges'
import { Metadata } from 'next'

export const metadata:Metadata = {
  title: "პროგრამირების გამოწვევები | Coding Challenges to Boost Your Skills | Fullstack Mentor",
  description:
    "ისწავლე პროგრამირება რეალური პროექტებით. აღმოაჩინე პროგრამირების გამოწვევები Frontend, Backend და Fullstack მიმართულებით. კოდი ფიგმა დიზაინიდან და გაიუმჯობვე უნარები დამწყებთათვის და პროფესიონალებისთვის. Take on real-world coding challenges and grow your developer portfolio.",
  keywords: [
    "Coding Challenges", "Programming Challenges", "Frontend Coding Challenges", "Backend Coding Challenges",
    "Full Stack Challenges", "JavaScript Practice", "React Challenges", "Node.js Challenges", 
    "Developer Practice Projects", "Figma to Code", "Real World Projects", "Beginner Challenges",
    "Advanced Programming Tasks", "Improve Coding Skills", "Developer Portfolio Projects", 
    "Fullstack Mentor Challenges", "Learn to Code", "Practice Coding Online",

    "პროგრამირების გამოწვევები", "კოდირების გამოწვევები", "ფრონტენდ გამოწვევები", "ბექენდ გამოწვევები",
    "ფულსტეკ გამოწვევები", "JavaScript გამოწვევები", "React გამოწვევები", "Node.js დავალებები",
    "რეალური პროექტები", "ფიგმა დიზაინიდან კოდში", "დავალებები დამწყებთათვის", 
    "დავალებები პროფესიონალებისთვის", "პროგრამისტის პორტფოლიო", "ტექნიკური დავალებები",
    "ტექ უნარების განვითარება", "ტექ კარიერა", "სწავლა კოდირებით", "პროექტზე დაფუძნებული სწავლება",
    "Fullstack Mentor გამოწვევები"
  ],
  openGraph: {
    title: "პროგრამირების გამოწვევები | Fullstack Mentor",
    description: "გაიუმჯობესე პროგრამირების უნარები პრაქტიკული დავალებებით. სცადე ფრონტენდ, ბექენდ და ფულსტეკ გამოწვევები რეალური დიზაინებიდან და პროექტებიდან.",
    url: "https://fullstackmentor.space/challenges",
    siteName: "Fullstack Mentor",
    type: "website",
    images: [
      {
        url: "https://www.fullstackmentor.space/logo_light.png",
        width: 1200,
        height: 630,
        alt: "Coding Challenges | Fullstack Mentor"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Coding Challenges | Fullstack Mentor",
    description: "Take on coding challenges with real Figma designs and build your developer portfolio with real-world practice tasks.",
    creator: "@Datodiasamidz10",
    images: ["https://www.fullstackmentor.space/logo_light.png"]
  }
}



type SearchParams = Promise<{page: string}>

export default async function Blogs({searchParams}: {searchParams: SearchParams}) {
  const params = await searchParams
  const page =  params.page || '1'
  const challenges = await getAllChallenges(`challenges?page=${page}`)

  return (
    <>
      {
        !challenges ? <h1>loading...</h1> :
          (<ChallengesPage challenges={challenges} page={page} />)
      }
    </>
  )
}