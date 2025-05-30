'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Navigation } from 'swiper/modules';
import StudentCard from '../ui/student-card';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import StudentCardSkeleton from '../ui/student-card-skeleton';
import { Feedback } from '@/types';

type PropType = {
  feedbacks: Feedback[]
}

export default function Students({ feedbacks }: PropType) {

  return (
    <section className='max-w-[1240px] mx-auto mt-10 px-4 xl:px-0'>
      <h2 className='text-center text-lg font-semibold my-4'>სტუდენტების ფიდბექი</h2>
      <div className='relative w-full'>
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
          autoplay={{
            delay: 3000
          }}
          loop
          spaceBetween={10}
          slidesPerView={1.2}
          breakpoints={{
            640: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          style={{ padding: '5px' }}
        >
          {
            feedbacks ?
              feedbacks?.map(feedback => (
                <SwiperSlide key={feedback._id}>
                  <StudentCard
                    className='w-full md:w-full'
                    firstName={feedback.author.firstName}
                    lastName={feedback.author.lastName}
                    feedback={feedback.feedback}
                    rating={feedback.rating}
                    avatar={feedback.author.avatar}
                  />
                </SwiperSlide>
              )) :
              Array.from({ length: 4 }).map((_, index) => (
                <SwiperSlide key={index} style={{ width: '23%', margin: '0 20px' }}>
                  <StudentCardSkeleton key={index} />
                </SwiperSlide>
              ))
          }
        </Swiper>
        <div className='absolute flex gap-3 my-4'>
          <button className="custom-prev cursor-pointer" aria-label='prev'>
            <CircleArrowLeft size={32} />
          </button>
          <button className="custom-next cursor-pointer" aria-label='next'>
            <CircleArrowRight size={32} />
          </button>
        </div>
      </div>

    </section>
  );
}
