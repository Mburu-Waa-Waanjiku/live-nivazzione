'use client'

import React from 'react'
import  { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';

function HomeSlider() {

  const images = [
    '/e2d9649ed8c23c9583f82f3e8fb6e982.jpg',
    '/20231215_093730.jpg',
    '/20240313_151957.jpg'
  ]

  return (
    <Swiper
      slidesPerView={1}
      modules={[Autoplay]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false
      }}
      loop={true}
    >
      {images.map((img, i) => (
        <SwiperSlide>
          <div className="w-full h-screen flex justify-center ">
            <Image alt="RUIRU COLLEGE OF CATERING & MANAGEMENT STUDIES" style={{objectFit: 'cover'}}  fill={true} src={img} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default HomeSlider