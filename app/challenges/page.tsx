import React from 'react'
import { getAllChallenges } from './services'
import ChallengesPage from '@/components/pages/chellanges'

export const metadata = {
  title: "Fullstack Mentor | Coding Challenges to Boost Your Skills",
  description:
    "Take on coding challenges of varying levels to improve your skills. Whether you're a beginner or an advanced developer, these challenges will help you grow. Get Figma design templates and detailed descriptions for each challenge.",
  keywords: [
    "Coding Challenges", "Programming Challenges", "Figma Design", "Frontend Challenges", "Backend Challenges",
    "Full Stack Challenges", "JavaScript Challenges", "React Challenges", "Node.js Challenges", "Tech Skill Building",
    "Beginner Coding Challenges", "Advanced Coding Challenges", "Learn to Code", "Fullstack Mentor"
  ],
  openGraph: {
    title: "Fullstack Mentor | Coding Challenges to Boost Your Skills",
    description:
      "Take on coding challenges of varying levels to improve your skills. Whether you're a beginner or an advanced developer, these challenges will help you grow. Get Figma design templates and detailed descriptions for each challenge.",
    url: "https://fullstackmentor.space/challenges",
    siteName: "Fullstack Mentor",
    type: "website",
    images: [
      { 
        url: "https://fullstackmentor.space/challenges-og-image.jpg", 
        width: 1200, 
        height: 630, 
        alt: "Coding Challenges" 
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Fullstack Mentor | Coding Challenges to Boost Your Skills",
    description:
      "Take on coding challenges of varying levels to improve your skills. Whether you're a beginner or an advanced developer, these challenges will help you grow. Get Figma design templates and detailed descriptions for each challenge.",
    creator: "@Datodiasamidz10",
    images: ["https://fullstackmentor.space/challenges-og-image.jpg"]
  }
};


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