import React from 'react'
import { Skeleton } from './skeleton'

export default function StudentCardSkeleton() {
  return (
    <div className="flex flex-col space-y-3 items-center justify-center p-2 rounded-xl border">
      <Skeleton className="h-[150px] w-full rounded-xl" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  )
}
