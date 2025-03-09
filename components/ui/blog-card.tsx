import React from 'react'
import { Card, CardTitle } from './card'
import Image from 'next/image'
import { Badge } from './badge'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type PropType = {
    className?: string
    href: string
    readTime: number,
    image: string,
    title: string
}

export default function BlogCard({className, href, image, readTime, title}: PropType) {
    return (
        <Link href={`/blogs/${href}`} className={cn('w-3/4 md:w-1/4 block', className)}>
            <Card className='p-2 relative gap-4'>
                <div className='absolute top-4 left-4 flex gap-2'>
                    <Badge>{readTime} min</Badge>
                </div>
                <Image
                    className='rounded-sm'
                    src={image}
                    width={400}
                    height={400}
                    alt='express'
                />
                <CardTitle className='text-sm md:text-base'>{title}</CardTitle>
            </Card>
        </Link>
    )
}
