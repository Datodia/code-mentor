import React from 'react'
import { Skeleton } from './skeleton'

export default function CourseCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3 items-center justify-center p-2 rounded-xl border">
      <Skeleton className="h-[200px] w-full rounded-xl" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className='flex gap-2 w-full'>
        <Skeleton className='h-8 w-1/2' />
        <Skeleton className="h-8 w-1/2" />
      </div>
    </div>
  )
}
