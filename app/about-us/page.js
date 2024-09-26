import Image from 'next/image'
import React from 'react'
import Footer from '@/components/Footer'

function page() {
  return (
    <div className='w-full overflow-hidden'>
      <div className='w-full flex justify-center items-center h-64 news-bg'>
        <div className='absolute top-0 right-0 w-3/4 trapezoid z-10'></div>
        <div className=' flex bg-white items-center justify-center text-transparent text-5xl xsm:text-6xl mdc:text-7xl font-bold text-center '> 
          <span className='transparent-text pb-6 px-6 whitespace-nowrap'>ABOUT US</span>
        </div>
      </div>
      <div className='font-medium text-lg  text-white border-t-2 border-white p-4'>
        <div className='p-4 title-color mt-4'>
          <p className='border-2 p-3 border-white '>Ruiru College(RCCMS): A Legacy of Excellence in Technical Education</p>
        </div><br/>
        <Image src={'/IMG-20240314-WA0007.jpg'} className='py-4' width={1200} height={500} alt='ruiru-college(rccms)'/>
        <div className='p-4 title-color'>
          <p className='border-2 p-3 border-white'>For over 20 years, Ruiru College has been at the forefront of technical training, empowering more than 3,000 students to succeed in their chosen careers. Our comprehensive programs—ranging from Hospitality, Business, and Cosmetology to Information Communication Technology (ICT) and Tourism—are meticulously designed to provide the hands-on, practical skills employers are actively seeking.</p>
        </div><br/>
        <div className='p-4 title-color'>
          <p className='border-2 p-3 border-white'>With three conveniently located campuses—Wakulima House (2nd floor, opposite Ruiru Bus Terminals), Finance House (next to Equity Bank), and Kiambu Road Campus (next to Ruiru Prisons Staff College)—Ruiru College offers accessible, high-quality education.</p>
        </div><br/>
        <div className='p-4 title-color'>
          <p className='border-2 p-3 border-white'>We take pride in our diverse student community, flexible fee payment plans, and our team of qualified, industry-experienced tutors. Our partnerships with leading examination bodies such as NITA, ICM, KNEC, and KASNEB ensure that our graduates leave with qualifications recognized both locally and globally—giving you the edge in today’s competitive job market.</p>
        </div><br/>
        <div className='p-4 title-color'>
          <p className='border-2 p-3 border-white'>Your future begins now. At Ruiru College, we are committed to transforming your ambitions into achievements. Don’t wait—enroll today and take the decisive step toward the career you deserve. Ruiru College is where your path to success starts.</p>
        </div><br/>
        <div className='p-4 title-gradien'>
          <p className='border-2 p-3 border-white'>Designed for a Purpose</p>
        </div><br/>
      </div>
      <Footer/>
    </div>
  )
}

export default page