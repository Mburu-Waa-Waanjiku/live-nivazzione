import React from 'react';
import Image from 'next/image';

export default function Categories({ categ }) {
  return (
    <div  className='w-full max-w-sm pulse relative h-48 sm:h-full overflow-hidden  rounded-3xl  '>
      <div className='w-full relative h-full flex justify-center items-center'>
        <Image
          style={{borderRadius: 20}}
          src={categ.image[0]}
          alt={categ.midText}
          layout='fill'
          className="shadow  object-cover h-fit w-full pulse"
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
