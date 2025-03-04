import React from 'react'
import { Card, CardDescription, CardTitle } from './card'
import Image from 'next/image'
import { Badge } from './badge'
import Link from 'next/link'
import Rating from './rating'
import { cn } from '@/lib/utils'

type PropType = {
    className?: string
}

export default function StudentCard({className}:PropType) {
    return (
        <div className={cn('w-1/2 md:w-1/4 block rounded-xl shadow-md hover:shadow-chart-4 ', className)}>
            <Card className='p-2 relative gap-3'>
                <div className='flex gap-2 items-center'>
                    <div className='size-10 rounded-full relative overflow-hidden'>
                        <Image
                        className='aspect-auto'
                            fill
                            alt='user'
                            src={'/assets/john.jpg'}
                        />
                    </div>
                    <CardTitle className='text-sm md:text-base'>კახი კალაძე</CardTitle>
                </div>
                <CardDescription>
                    ბტნ დავითი უძლიერესი პიროვნება, თავის საქმის პროფესიონალი, მონდომებული და შრომისმოყვარე.
                </CardDescription>
                <Rating rating={5} />
            </Card>
        </div>
    )
}
