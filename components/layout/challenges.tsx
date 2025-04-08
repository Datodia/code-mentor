'use client'
import React from 'react'
import Link from 'next/link'
import { ChallengeResponse } from '@/types'
import { CardHoverEffect } from '../ui/card-hover-effect'
import ChallengeCard from '../ui/challenge-card'
import ChallengeCardSkeleton from '../ui/challenge-card-skeleton'

type PropType = {
  challenges: ChallengeResponse
}

export default function Challenges({challenges}: PropType) {
  
  return (
    <section className='max-w-[1240px] mx-auto px-4 flex flex-col gap-2 lg:gap-4 xl:px-0 mt-2 lg:mt-4'>
      <h2 className='text-center font-semibold text-lg'>გამოწვევები</h2>
      <CardHoverEffect className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
          !challenges ? Array.from({length: 3}).map((_, index) => <ChallengeCardSkeleton key={index} />) :
            challenges?.challenges.map(challenge => (
              <ChallengeCard
                key={challenge._id}
                href={challenge._id}
                image={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URI}/${challenge.image}`}
                title={challenge.title}
                className='w-full md:w-full'
                description={challenge.description}
                price={challenge.price}
                type={challenge.type}
                level={challenge.level}
              />
            ))}
      </CardHoverEffect>
      <Link className='px-3 py-2 rounded-md bg-foreground text-primary-foreground block w-auto mx-auto hover:bg-primary/90' href={'/challenges'}>მეტის ნახვა</Link>
    </section>
  )
}
