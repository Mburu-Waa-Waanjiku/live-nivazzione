import React from 'react';
import Image from 'next/image';
import DeleteTwoTone from '@mui/icons-material/DeleteSweepTwoTone';
import { Navigation, FreeMode, Thumbs, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import UpdatePending from './UpdatePending';
import Texter from '../admin/Texter';

import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Pendingps({ key, product, fetchProducts, gallery, setGallery, gallery1, setGallery1, image1, setImage1, image2, setImage2, image3, setImage3 }) {

  return (
	<div key={key} style={{ height: 'fit-content', width: '100%', border: '8px solid white', boxShadow: '0 1px 2px rgba(0,0,0,.2)' }}>
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
        <div className="flex justify-between pt-3">
          <UpdatePending
            product={product}
            fetchProducts={fetchProducts}
            gallery={gallery}
            setGallery={setGallery}
            gallery1={gallery1}
            setGallery1={setGallery1}
            image1={image1}
            setImage1={setImage1}
            image2={image2}
            setImage2={setImage2}
            image3={image3}
            setImage3={setImage3}
          />
          <Texter
            product={product}
          />
          <DeleteTwoTone style={{ color: 'rgba(220, 38, 38)', fontSize: 26 }}/>
        </div>
      </div>
	  </div>
	</div>
  )
}

export default Pendingps