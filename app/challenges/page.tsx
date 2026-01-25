import React from 'react'
import { Metadata } from 'next'
import { getAllChallenges } from './services'
import ChallengesPage from '@/components/pages/chellanges'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'პროგრამირების გამოწვევები | Frontend, Backend, Fullstack | Fullstack Mentor',
  description:
    'პრაქტიკული პროგრამირების გამოწვევები: Frontend, Backend და Fullstack დავალებები. კოდი Figma დიზაინიდან, გააუმჯობესე JavaScript/React/Node.js უნარები და ააწყე პორტფოლიო რეალური პროექტებით.',
  keywords: [
    // KA
    'პროგრამირების გამოწვევები',
    'კოდირების პრაქტიკა',
    'Figma to Code',
    'Figma დიზაინ კოდში',
    'კოდირების გამოწვევები',
    'ფრონტენდ გამოწვევები',
    'ბექენდ გამოწვევები',
    'ფულსტეკ გამოწვევები',
    'ტექნიკური დავალებები',
    'პროგრამისტის პორტფოლიო',
    'ფიგმადან კოდში',
    'JavaScript პრაქტიკა',
    'React დავალებები',
    'Node.js დავალებები',
    'HTML CSS გამოწვევები',
    'პორტფოლიო პროექტები',

    // EN
    'coding challenges',
    'coding practice',
    'figma to code',
    'design to code',
    'frontend challenges',
    'backend challenges',
    'fullstack challenges',
    'figma to code',
    'javascript practice',
    'react challenges',
    'node.js challenges',
    'coding exercises',
    'developer portfolio projects',
    'build portfolio projects',
  ],
  alternates: { canonical: 'https://www.fullstackmentor.space/challenges' },
  openGraph: {
    title: 'პროგრამირების გამოწვევები | Fullstack Mentor',
    description:
      'Frontend/Backend/Fullstack გამოწვევები რეალური დიზაინებით. გააუმჯობესე უნარები და ააწყე პორტფოლიო პრაქტიკული დავალებებით.',
    url: 'https://www.fullstackmentor.space/challenges',
    siteName: 'Fullstack Mentor',
    type: 'website',
    images: [
      {
        url: 'https://www.fullstackmentor.space/logo_light.png',
        width: 1200,
        height: 630,
        alt: 'Fullstack Mentor - Coding Challenges',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'პროგრამირების გამოწვევები | Fullstack Mentor',
    description:
      'Take practical coding challenges from real designs (Figma), improve skills, and build a strong portfolio.',
    creator: '@Datodiasamidze10',
    images: ['https://www.fullstackmentor.space/logo_light.png'],
  },
}

type SearchParams = Promise<{ page?: string }>

export default async function Challenges({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const page = params.page || '1'
  const challenges = await getAllChallenges(`challenges?page=${page}`)

  if (!challenges) return <h1>loading...</h1>

  return <ChallengesPage challenges={challenges} page={page} />
}
