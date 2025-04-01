'use client'
import React, { useState } from 'react'
import PaginationDemo from '../ui/pagination-demo'
import { ChallengeResponse } from '@/types'
import { CardHoverEffect } from '../ui/card-hover-effect'
import ChallengeCard from '../ui/challenge-card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { axiosInstance } from '@/lib/axios-instance'

type PropType = {
    challenges: ChallengeResponse,
    page: string
}

export default function ChallengesPage({ challenges, page }: PropType) {
    const [challengesResp, setChallengesResp] = useState<ChallengeResponse | null>(challenges)
    const [filters, setFilters] = useState<{ type?: string; level?: string }>({})

    const handleSelectChange = async (key: 'type' | 'level', value: string) => {
        const updatedFilters = { ...filters, [key]: value !== 'all' ? value : undefined }
        setFilters(updatedFilters)

        const queryString = Object.entries(updatedFilters)
            .filter(([_, val]) => val !== undefined)
            .map(([key, val]) => `${key}=${val}`)
            .join('&')

        const resp = await axiosInstance.get(`/challenges${queryString ? `?${queryString}` : ''}`)
        setChallengesResp(resp.data)
    }

    return (
        <div className='max-w-[1240px] mx-auto px-4 lg:px-0'>
            <section className='relative flex justify-between my-2 md:my-4'>
                <Select onValueChange={(value) => handleSelectChange('type', value)}>
                    <SelectTrigger className='w-1/3 md:w-1/5'>
                        <SelectValue placeholder="სტეკი" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all">ყველა</SelectItem>
                            <SelectItem value="frontend">Frontend</SelectItem>
                            <SelectItem value="backend">Backend</SelectItem>
                            <SelectItem value="fullstack">Fullstack</SelectItem>
                            <SelectItem value="algorithm">Algorithms</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select onValueChange={(value) => handleSelectChange('level', value)}>
                    <SelectTrigger className='w-1/3  md:w-1/5'>
                        <SelectValue placeholder="დონე" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all">ყველა</SelectItem>
                            <SelectItem value="asc">მარტივი</SelectItem>
                            <SelectItem value="desc">რთული</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </section>
            <section className='w-full mx-auto '>
                {challengesResp?.challenges?.length ?
                    <CardHoverEffect className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                        {challengesResp?.challenges.map(el => (
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
                    :
                    <section>
                        <h2 className='text-center text-2xl font-semibold text-gray-600'>გამოწვევები ვერ მოიძებნა</h2>
                        <p className='text-center text-gray-500'>გთხოვთ, სცადოთ სხვა ფილტრები.</p>
                    </section>
                }
            </section>

            <section className='mt-10'>

                <PaginationDemo perPage={30} currentPage={Number(page)} />
            </section>
        </div>
    )
}
