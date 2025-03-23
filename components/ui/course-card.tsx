import React from 'react'
import { Card, CardDescription, CardTitle } from './card'
import Image from 'next/image'
import { Badge } from './badge'
import Rating from './rating'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { BookOpen, ShoppingCart } from 'lucide-react'
import { Button } from './button'

type PropType = {
    className?: string
    level: string,
    totalLessons: number,
    title: string,
    description: string,
    image: string,
    rating: number,
    totalReviews: number,
    totalDuration?: number,
    href: string
}

export default function CourseCard({ className, href, description, image, level, rating, title, totalLessons, totalReviews, totalDuration }: PropType) {
    return (
        <Link href={`/courses/${href}`} className={cn('w-1/2 md:w-1/4', className)}>
            <Card className='p-2 relative gap-3'>
                <div className='absolute top-4 left-4 flex gap-2'>
                    <Badge>{level}</Badge>
                    <Badge variant={'warning'}>{totalLessons} Lecture</Badge>
                </div>
                <Image
                    className='rounded-sm'
                    src={image}
                    width={380}
                    height={300}
                    alt={title}
                />
                <CardTitle className='text-sm md:text-base'>{title}</CardTitle>
                <CardDescription className='text-xs md:text-base'>{description}</CardDescription>
                <div className='flex gap-2'>
                    <Rating rating={rating} />
                    <span>({totalReviews})</span>
                </div>
                <div className='flex gap-2 xs:flex-col xl:flex-row'>
                    <Button
                        className='p-2 text-xs md:text-sm rounded-sm bg-read-more flex items-center gap-1 text-primary-foreground'
                    >
                        დეტალურად 
                        <BookOpen size={15} /> 
                    </Button>
                    <Button
                        className='p-2  text-xs md:text-sm rounded-sm bg-success flex items-center gap-1 text-primary-foreground'
                    >
                        რეგისტრაცია 
                        <ShoppingCart size={15} />
                    </Button>
                </div>
            </Card>
        </Link>
    )
}
