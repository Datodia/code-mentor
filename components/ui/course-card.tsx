import React from 'react'
import { Card, CardDescription, CardTitle } from './card'
import Image from 'next/image'
import { Badge } from './badge'
import Rating from './rating'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { BookOpen, ShoppingCart } from 'lucide-react'

type PropType = {
    className?: string
}

export default function CourseCard({ className }: PropType) {
    return (
        <div className={cn('w-1/2 md:w-1/4', className)}>
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
                <div className='flex gap-2'>
                    <Rating rating={4.5} />
                    <span>(50)</span>
                </div>
                <div className='flex gap-2 xs:flex-col xl:flex-row'>
                    <Link
                        href={'/#'} 
                        className='p-2 text-xs md:text-sm rounded-sm bg-read-more flex items-center gap-1 text-primary-foreground'
                    >
                        დეტალურად 
                        <BookOpen size={15} /> 
                    </Link>
                    <Link
                        href={'/#'} 
                        className='p-2  text-xs md:text-sm rounded-sm bg-success flex items-center gap-1 text-primary-foreground'
                    >
                        რეგისტრაცია 
                        <ShoppingCart size={15} />
                    </Link>
                </div>
            </Card>
        </div>
    )
}
