'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Navigation } from 'swiper/modules';
import StudentCard from '../ui/student-card';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';

export default function Students() {
  return (
    <section className='max-w-[1240px] mx-auto mt-10 px-4'>
      <h1 className='text-center text-lg font-semibold my-4'>სტუდენტების ფიდბექი</h1>
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
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          style={{padding: '5px'}}
        >
          <SwiperSlide>
            <StudentCard className='w-full md:w-full' />
          </SwiperSlide>
          <SwiperSlide>
            <StudentCard className='w-full md:w-full' />
          </SwiperSlide>
          <SwiperSlide>
            <StudentCard className='w-full md:w-full' />
          </SwiperSlide>
          <SwiperSlide>
            <StudentCard className='w-full md:w-full' />
          </SwiperSlide>
          <SwiperSlide>
            <StudentCard className='w-full md:w-full' />
          </SwiperSlide>
          <SwiperSlide>
            <StudentCard className='w-full md:w-full' />
          </SwiperSlide>

        </Swiper>
        <div className='absolute flex gap-3 my-4'>
          <button className="custom-prev cursor-pointer">
            <CircleArrowLeft size={32} />
          </button>
          <button className="custom-next cursor-pointer">
            <CircleArrowRight size={32} />
          </button>
        </div>
      </div>

    </section>
  );
}
