import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Notes({ notification }) {
  
  const [viewMessage, setViewMessage] = useState(false);

  return (
  <div className='px-4 py-4'>
    <div className='flex relative h-fit w-full px-3 text-lg'>
      <div className={'overflow-hidden pb-3 relative flex-grow font-medium '.concat(!viewMessage && 'whitespace-nowrap text-ellipsis')}>
        <div className={'absolute right-0 top-0 bottom-0 w-32 notesshade '.concat(viewMessage && 'hidden')}></div>
        {notification.message}
      </div>
      <div onClick={() => setViewMessage(true)} className={'font-medium '.concat(viewMessage && 'hidden')}>
        <div className='flex gap-1'><b>View </b><b>more</b></div>
      </div>
      <div onClick={() => setViewMessage(false)} className={'font-medium absolute bottom-0 right-0 '.concat(!viewMessage && 'hidden')}>
        <div className='flex gap-1'><b>View </b><b>less</b></div>
      </div>
    </div>
    <div  className='w-full max-w-sm pulse relative h-48 overflow-hidden  rounded-3xl  '>
      <div className='w-full h-full flex justify-center items-center'>
        {notification.isProduct ?
          <Link href={`https://www.shiglam.com/${notification.product[0].category}/${notification.product[0].slug}`}>
            <Image 
              className='w-full h-auto min-w-full'
              width={364}
              height={484}
              alt="" 
              src={notification.product[0]?.image[0].item}
            /> 
          </Link> :
          <Link href='https://www.shiglam.com/me'>
            <Image 
              className='w-full h-auto min-w-full'
              width={364}
              height={484}
              alt="" 
              src="https://res.cloudinary.com/dddx5qpji/image/upload/v1679409410/shopping-bags-removebg-preview_xckkh1.png"
            />
          </Link>
        }
      </div>
    </div>
	</div>
  )
}

export default Notes