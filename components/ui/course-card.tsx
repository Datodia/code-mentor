import React from 'react'
import { Card, CardDescription, CardTitle } from './card'
import Image from 'next/image'
import { Badge } from './badge'
import Rating from './rating'

export default function CourseCard() {
    return (
        <div className='w-1/2 md:w-1/4'>
            <Card className='p-2 relative gap-3'>
                <div className='absolute top-4 left-4 flex gap-2'>
                    <Badge>Beginner</Badge>
                    <Badge variant={'warning'}>20 Lecture</Badge>
                </div>
                <Image
                    className='rounded-sm'
                    src={'/assets/node-express.jpg'}
                    width={300}
                    height={300}
                    alt='express'
                />
                <CardTitle className='text-sm md:text-base'>Hello world</CardTitle>
                <CardDescription className='text-xs md:text-base'>Express Course</CardDescription>
                <Rating rating={4.5} />
            </Card>
        </div>
    )
}
