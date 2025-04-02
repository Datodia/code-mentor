'use client'
import React from 'react'
import Image from 'next/image'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Banknote, Clock, GraduationCap, Hourglass, Laptop, Users } from 'lucide-react'
import { Course } from '@/types'
import { toast } from 'sonner'
import BackButton from '../ui/back-button'

type PropType = {
    course: Course
}

export default function CoursePageClient({course}: PropType) {
  return (
    <div className='max-w-[1240px] mx-auto px-4 py-8 lg:px-0'>
            <BackButton href='/courses' />
            <div className='md:flex gap-8'>
                <div className='mx-auto w-full h-[200px] relative md:h-[300px] lg:h-[400px]'>
                    <Image
                        className='rounded-md'
                        src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_URI}/${course.image}`}
                        alt={course.image}
                        fill
                    />
                </div>
                <div className='w-full flex flex-col'>
                    <div className='mb-2 md:mb-6'>
                        <h1 className='text-center text-base md:text-lg lg:text-xl '>{course.title}</h1>
                        <p className='text-sm md:text-base lg:text-lg text-muted-foreground'>{course.description}</p>
                    </div>
                    <div className='flex flex-col gap-2 md:gap-4'>
                        <h3 className='text-sm md:text-base lg:text-lg flex items-center gap-1'><Banknote className='w-4 md:w-6' />კურსის ღირებულება:  <span className='font-medium'>{course.price}₾</span></h3>
                        <h2 className='text-sm md:text-base lg:text-lg flex items-center gap-1'><Hourglass className='w-4 md:w-6' /> ლექციების რაოდენობა: <span className='font-medium'>{course.totalLessons}</span></h2>
                        <h2 className='text-sm md:text-base lg:text-lg flex items-center gap-1'><GraduationCap className='w-4 md:w-6' /> დონე: <span className='font-medium'>{course.level}</span></h2>
                        <h2 className='text-sm md:text-base lg:text-lg flex items-center gap-1'><Users className={'w-4 md:w-6'} /> სუდენტების რაოდენობა: <span className='font-medium'>{course.totalEnrollments}</span></h2>
                        <h2 className='text-sm md:text-base lg:text-lg flex items-center gap-1'><Laptop className={'w-4 md:w-6'} /> ფორმატი:  <span className='font-medium'>ონლაინ</span></h2>
                        <Button onClick={() => toast.info('მალე დაემატება')} className='md:text-base md:w-[240px]'>ყიდვა</Button>
                    </div>
                </div>
            </div>

            <div className='mt-6'>
                <h1 className='text-sm md:text-base lg:text-lg font-medium'>სილაბუსი</h1>
                <Accordion type='multiple'>
                    {
                        course.sylabus.map((el, i) => (
                            <AccordionItem value={el.title} key={i}>
                                <AccordionTrigger className='text-sm md:text-base lg:text-lg'>{el.title}</AccordionTrigger>
                                <AccordionContent className='text-xs md:text-sm'>{el.description}</AccordionContent>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
            </div>
        </div>
  )
}
