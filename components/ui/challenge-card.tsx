import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './card'
import Image from 'next/image'
import { Badge } from './badge'
import Link from 'next/link'
import { cn, levelMapper, textTruncate } from '@/lib/utils'

type PropType = {
    className?: string
    href: string
    description: string,
    image: string,
    title: string,
    price: number,
    type: 'frontend' | 'backend' | 'fullstack',
    level: 1 | 2 | 3 | 4 | 5

}

export default function ChallengeCard({ className, href, image, title, description, price, type, level }: PropType) {
    return (
        <Link href={`/challenges/${href}`} className={cn('block', className)}>
            <Card className='p-2 relative gap-4 w-full h-full'>
                <div className='absolute top-4 right-4 flex gap-2'>
                    <Badge className='font-medium' variant={'secondary'}> {price === 0 ? 'უფასო' : '5ლ'}</Badge>
                </div>
                <Image
                    className='rounded-sm w-full h-[200px] object-cover'
                    src={image}
                    width={400}
                    height={300}
                    alt={title}
                />
                <CardHeader className='flex flex-row justify-between items-center px-0'>
                    <span className='font-medium uppercase text-sm md:text-base'>
                        {type}
                    </span>
                    <div className='flex rounded-md border-2 overflow-hidden'>
                        <span className='text-sm md:text-base bg-chart-4 px-2 font-medium'>
                            {level}
                        </span>
                        <div className='px-2 text-sm md:text-base'>
                            {levelMapper(level)}
                        </div>
                    </div>
                </CardHeader>
                <CardTitle className='text-sm md:text-base'>{title}</CardTitle>
                <CardDescription>{textTruncate(description, 130)}</CardDescription>
            </Card>
        </Link>
    );
}
