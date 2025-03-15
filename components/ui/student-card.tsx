import React from 'react'
import { Card, CardDescription, CardTitle } from './card'
import Image from 'next/image'
import { Badge } from './badge'
import Link from 'next/link'
import Rating from './rating'
import { cn } from '@/lib/utils'

type PropType = {
    className?: string
    firstName: string
    lastName: string
    feedback: string
    rating: number
    avatar?: string | null
}

export default function StudentCard({ className, lastName, firstName, avatar, feedback, rating }: PropType) {
    return (
        <div className={cn('w-1/2 md:w-1/4 block rounded-xl shadow-md hover:shadow-chart-4 ', className)}>
            <Card className='p-2 relative gap-3'>
                <div className='flex gap-2 items-center'>
                    <div className='size-10 rounded-full custom-border flex justify-center items-center relative overflow-hidden'>
                        {
                            avatar ?
                                <Image
                                    className='aspect-auto'
                                    fill
                                    alt='user'
                                    src={'/assets/john.jpg'}
                                />
                                :
                                <>
                                   <p className='text-base uppercase'>{`${firstName[0]} ${lastName[0]}`}</p>
                                </>
                        }

                    </div>
                    <CardTitle className='text-sm md:text-base'>{`${firstName} ${lastName}`}</CardTitle>
                </div> 
                <CardDescription>
                    {feedback}
                </CardDescription>
                <Rating rating={rating} />
            </Card>
        </div>
    )
}
