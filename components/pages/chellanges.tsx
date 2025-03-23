'use client'
import React from 'react'
import PaginationDemo from '../ui/pagination-demo'
import { ChallengeResponse } from '@/types'
import { CardHoverEffect } from '../ui/card-hover-effect'
import ChallengeCard from '../ui/challenge-card'

type PropType = {
    challenges: ChallengeResponse,
    page: string
}

export default function ChallengesPage({ challenges, page }: PropType) {
    return (
        <div className='max-w-[1240px] mx-auto px-4 lg:px-0'>
            <section className='w-full mx-auto '>
                <CardHoverEffect className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {challenges.challenges.map(el => (
                        <ChallengeCard 
                            key={el._id} 
                            href={el._id} 
                            image={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URI}/${el.image}`} 
                            title={el.title} 
                            description={el.description} 
                            price={el.price} 
                            type={el.type} 
                            level={el.level}
                        />
                    ))}
                </CardHoverEffect>
            </section>

            <section className='mt-10'>

                <PaginationDemo perPage={30} currentPage={Number(page)} />
            </section>
        </div>
    )
}
