import React from 'react'
import { Card, CardTitle } from './card'
import Image from 'next/image'
import { Badge } from './badge'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Eye } from 'lucide-react'

type PropType = {
    className?: string
    href: string
    readTime: number,
    image: string,
    title: string
    views: number
}

export default function BlogCard({ className, href, image, readTime, title, views }: PropType) {
    return (
        <Link href={`/blogs/${href}`} className={cn('block', className)}>
            <Card className='p-2 relative gap-4 w-full h-full'>
                <div className='absolute top-4 left-4 flex gap-2'>
                    <Badge>{readTime} min</Badge>
                </div>
                <div className='absolute top-4 right-4 '>
                    <Badge>
                        <Eye />
                        <span>{views}</span>
                    </Badge>
                </div>
                <Image
                    className='rounded-sm w-full h-[200px] object-cover'
                    src={image}
                    width={400}
                    height={300}
                    alt='express'
                />
                <CardTitle className='text-sm md:text-base'>{title}</CardTitle>
            </Card>
        </Link>
    );
}
