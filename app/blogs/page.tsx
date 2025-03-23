import React from 'react'
import { getAllBlogs } from './services'
import BlogsPage from '@/components/pages/blogs'

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
