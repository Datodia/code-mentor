import React from 'react'
import { getAllChallenges } from './services'
import ChallengesPage from '@/components/pages/chellanges'

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