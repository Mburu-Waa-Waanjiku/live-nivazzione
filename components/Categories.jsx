import React from 'react';
import Image from 'next/image';

export default function Categories({ categ }) {
  return (
    <div  className='w-full max-w-sm pulse relative h-48 sm:h-full overflow-hidden  rounded-3xl  '>
      <div className='w-full h-full flex justify-center items-center'>
        <Image 
          className='w-full h-auto min-w-full'
          width={Number(categ.buttonText)} 
          height={Number(categ.desc)} 
          alt={categ.midText} 
          src={categ.image[0]}
        />
      </div>
      <div className='absolute flex justify-end items-start xsm:justify-center xsm:items-center h-fitdiv flex-col z-10 bottom-0 w-fitdiv categshade'>
        <div className='text-white p-4 title-font text-3xl'>
          <div className='text-left sm:text-center font-semibold'>{categ.midText.toUpperCase()}</div>
          <div className='text-left text-xl sm:text-center'>{categ.smallText[0]}</div>
        </div>
      </div>
    </div>
  )
}
