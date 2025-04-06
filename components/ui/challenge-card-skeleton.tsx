import React from 'react'
import { Skeleton } from './skeleton'

export default function ChallengeCardSkeleton() {
    return (
        <div className="flex flex-col space-y-3 items-center justify-center p-2 rounded-xl border">
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <div className="w-full flex flex-col space-y-3">
                <div className='flex justify-between'>
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-5 w-1/4" />
                </div>
                <Skeleton className="h-5 w-full my-4" />
                <div className='flex flex-col space-y-2'>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        </div>
    )
}
