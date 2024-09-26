import Image from 'next/image'
import React from 'react'
import Footer from '@/components/Footer'

function page() {
  return (
    <div className='w-full h-full overflow-hidden'>
      <div className='w-full flex justify-center items-center h-64 news-bg'>
        <div className='absolute top-0 right-0 w-3/4 trapezoid z-10'></div>
        <div className=' flex bg-white items-center justify-center text-transparent text-5xl xsm:text-6xl mdc:text-7xl font-bold text-center '> 
          <span className='transparent-text pb-6 px-6 whitespace-nowrap'>News & Events</span>
        </div>
      </div>
      <div className='p-4 mx-4 mt-6 overflow-hidden'>
        <div className='relative w-full flex flex-col items-center justify-center'>
          <div className='flex relative w-full justify-center'>
            <Image src={'/IMG-20231124-WA0043.jpg'} alt='' width={400} height={600}/>
            <Image src={'/IMG-20231124-WA0059.jpg'} alt='' className='scale-110 shadow-2xl' width={400} height={600}/>
            <Image src={'/IMG-20231124-WA0056.jpg'} alt='' width={400} height={600}/>
            <div className='absolute mx-4 w-full text-center text-xl bottom-0 title-color translate-y-5 px-6 pb-3  text-white'>
              <div className='font-bold text-2xl'>Charity Day</div>
            </div>
          </div>
          <div className='mt-2 sm:mx-4 w-full text-center text-xl bottom-0 title-color translate-y-5 px-6 pb-3  text-white'>
            <p className='py-2'>Ruiru College students making a difference on Charity Day—spreading kindness, supporting those in need, and creating a brighter future for all. Compassion in action.At Ruiru Rehabilitaion Centre and Watu Wa Maana Childrens Home.</p>
          </div>
        </div>
      </div>
      <div className='p-4 mx-4 mt-6 overflow-hidden'>
        <div className='relative w-full flex flex-col items-center justify-center'>
          <div className='flex relative w-full justify-center'>
            <Image src={'/20240605_100908.jpg'} alt='' width={400} height={600}/>
            <Image src={'/20240605_100500.jpg'} alt='' className='scale-110 shadow-2xl' width={400} height={600}/>
            <Image src={'/20240605_100457.jpg'} alt='' width={400} height={600}/>
            <div className='absolute mx-4 w-full text-center text-xl bottom-0 title-color translate-y-5 px-6 pb-3  text-white'>
              <div className='font-bold text-2xl'>World Environmental day</div>
            </div>
          </div>
          <div className=' mt-2 sm:mx-4 w-full text-center text-xl bottom-0 title-color translate-y-5 px-6 pb-3  text-white'>
            <p className='py-2'>Ruiru College students leading the way on Environmental Day—planting trees, cleaning up, and making a positive impact in their community. Together, we’re shaping a cleaner, greener tomorrow!Towards a sustainable environment. Event held at Kiambu County through partnership with Kiambu County Government.</p>
          </div>
        </div>
      </div>
      <div className='p-4 mx-4 my-6 overflow-hidden'>
        <div className='relative w-full flex flex-col items-center justify-center'>
          <div className='flex relative w-full justify-center'>
            <Image src={'/IMG-20240605-WA0022.jpg'} alt='' width={400} height={600}/>
            <Image src={'/IMG-20240605-WA0029.jpg'} alt='' className='scale-110 shadow-2xl' width={400} height={600}/>
            <Image src={'/IMG-20240605-WA0025.jpg'} alt='' width={400} height={600}/>
            <div className='absolute mx-4 w-full text-center text-xl bottom-0 title-color translate-y-5 px-6 pb-3  text-white'>
              <div className='font-bold text-2xl'>World Environmental day</div>
            </div>
          </div>
          <div className='mt-2 sm:mx-4 w-full text-center text-xl bottom-0 title-color translate-y-5 px-6 pb-3  text-white'>
            <p className='py-2'>"Ruiru College students in action on Social Corporate Day—giving back to the community through service, support, and shared responsibility. Together, we're making a difference and driving positive change!"Event held at Ruiru Town.Partnership with Ruiru Municipality.</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default page