import React from 'react';
import Image from 'next/image';
import { Navigation, FreeMode, Thumbs, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ViewPending from './ViwePending';

import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function AdminPendingps({ product, fetchPendingPs, fetchProducts }) {

  return (
	<div style={{ height: 'fit-content', width: '100%', border: '8px solid white', boxShadow: '0 1px 2px rgba(0,0,0,.2)' }}>
	  <div style={{display: 'grid', backgroundColor: 'white', gridTemplateRows: '1fr 80px'}}>
      <Swiper   
        breakpoints={{
          100: {
            slidesPerView: 1.3,
          }
        }}                  
          modules={[FreeMode, Navigation, Pagination, Thumbs]}
          spaceBetween={10}           
          loop={false}
          navigation= {true}
          centeredSlides={false}
          style={{ width: '100%', maxWidth: '220px' }}
      >
        {product.image.map((img) => (
          <SwiperSlide style={{borderRadius: 15, height: 'calc(100% - 5px)', overflow: 'hidden'}} key={img} >
            <Image
              src={img.item}
              width={180}
              height={240}
              alt={product.name}
            />
          </SwiperSlide>
          ))
        }
      </Swiper>
      <div className="grid rows-2 px-1">
        <div className="w-full text-center">
          {product.name}
        </div>
        <div className="flex justify-center pt-3">
          <ViewPending
            product={product}
            fetchProducts={fetchProducts}
            fetchPendingPs={fetchPendingPs}
          />
        </div>
      </div>
	  </div>
	</div>
  )
}

export default AdminPendingps