import React from 'react';
import Image from 'next/image';
import ShopOrdersView from './ShopOrdersView';

export default function Shopdiv({shop, orders}) {
  
  const shopOs = orders?.filter((o) => o.shopId == shop._id);

  return (
    <div className='rounded-3xl max-w-xl outline-bshadow w-full title-font p-2 mt-3 bg-white'>
      <div className=' h-40 grid gap-1 grid-cols-3'>
        <div className='relative h-full'>
          <Image className='bg-gray-200 w-fitdiv max-w-48 rounded-3xl'  layout="fill" objectFit="cover" alt='' src={shop.logo}/>
        </div>
        <div className='col-start-2 col-span-2 flex-col flex'>
          <div className='w-full p-3 text-xl font-semibold text-center'>{shop.shopName}</div>
          <div className='grid grid-cols-3'>
            <div className='flex flex-col gap-2 justify-center  items-center'>
              <b className=' hidden xxsm:block'>Orders</b>
              <div className='w-full h-full flex gap-2 items-center justify-center h-auto'>
                {shopOs.length}
              </div>
            </div>
            <div className='flex flex-col gap-2 justify-center  items-center'>
              <b className=' hidden xxsm:block'>Payout</b>
              <div className='w-full font-Bold flex gap-2 items-center justify-center h-auto'>
                KES {Math.ceil(shopOs?.reduce((a, c) => a + c.csize.price * c.quantity, 0) * 0.89)}
              </div>
            </div>
            <div className='flex flex-col gap-2 justify-center  items-center'>
              <div className='w-full flex gap-2 items-center justify-center h-auto'>
                <ShopOrdersView
                  shop={shop}
                  orders={shopOs}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
