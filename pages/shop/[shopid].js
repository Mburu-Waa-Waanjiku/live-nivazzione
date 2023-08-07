import React, { useState } from 'react';
import Image from 'next/image';
import db from '../../utils/db';
import Shop from '../../models/Shop';
import Product from '../../models/Product';
import Tabsbottom from '../../components/Tabsbottom';
import Layout from '../../components/Layout';
import { Navigation, FreeMode, Thumbs, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PinsProds from '../../components/PinsProds';

function Shopid({ shops, products, distinctCategs }) {

  const [shopTab, setShoptab] = useState(distinctCategs[0]);

  return (
    <Layout>
      {shops.map((shop) => (
        <div key={shop} className='w-full pulse relative h-40 sm:h-48 overflow-hidden  rounded-3xl  '>
          <div className='w-full h-full flex justify-center items-center'>
            <Image 
              className='w-full h-auto min-w-full'
              width={1200} 
              objectFit='cover'
              height={667} 
              alt={shop.shopName} 
              src={shop.coverPhoto}
            />
          </div>
          <div className='absolute px-2 py-4 flex justify-end items-start xsm:justify-center xsm:items-center h-fitdiv flex-col z-10 bottom-0 w-fitdiv categshade-full'>
            <div className='flex bg-white-parent rounded-full px-6 py-2 md:px-16 gap-2 items-center'>
              <div className='w-14 h-14 rounded-full overflow-hidden'>
                <Image width={100} height={100} alt="" src={shop.logo} />
              </div>
              <div className='text-2xl font-medium title-font text-white'> {shop.shopName} </div>
            </div>
          </div>
        </div>
      ))}
      <Swiper                    
        breakpoints={{
          250: {
            slidesPerView: 1.3,
          }, 
          350: {
            slidesPerView: 1.9
          },
          450: {
            slidesPerView: 2.1,
          },
          550: {
            slidesPerView: 2.6,
          },
          650: {
            slidesPerView: 3.1,
          },
          750: {
            slidesPerView: 3.6,
          },
          850: {
            slidesPerView: 4.1,
          }, 
          950: {
            slidesPerView: 4.6,
          },  
          1050: {
            slidesPerView: 5.1,
          }, 
          1150: {
            slidesPerView: 5.6,
          },         
        }}
      
        modules={[FreeMode, Navigation, Pagination, Autoplay, Thumbs]}
        spaceBetween={10}           
        loop={false}
        navigation= {true}
        centeredSlides={false}
        style={{ marginTop: 11, marginBottom: 10, marginLeft: 10, marginRight: 10, maxWidth: 1400 }}
       >
        {distinctCategs.map((categ, index) => (
          <SwiperSlide style={{maxWidth:450}} key={index}>
            <div onClick={() => setShoptab(categ)} className={'w-full whitespace-nowrap font-medium text-center flex justify-center text-base rounded-full pt-3 pb-3.5 '.concat(shopTab == categ ? 'bg-grayb text-white' : 'bg-grayw text-black')}>{categ}</div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={"columns-2 gap-2 pb-4 sm:columns-3 sm:max-w-3xl md:columns-4 md:max-w-5xl xlg:grid-cols-5 xlg:max-w-7xl"}>
        {products?.filter((p) => p.subcategs.includes(shopTab)).map((product) => (
          <div key={product._id} className='px-1 py-1'>
            <PinsProds
              key={product}
              product={product}
            />
          </div>
          ))}
      </div>
      <Tabsbottom/>
    </Layout>
  )
}

export async function getServerSideProps(context) {

  const { params } = context;
  const { shopid } = params;

  await db.connect();
  const shop = await Shop.find({ _id: shopid}).lean();
  const products = await Product.find({shopId: shopid}, { reviews: 0, color: 0, distinctCateg: 0, gallery: 0, favourites: 0, carts: 0, views: 0, pageViews: 0, ordered: 0, description: 0 }).lean();
  const distinctCategs = await Product.find({shopId: shopid}).distinct('subcategs');
  await db.disconnect();
  
  return {
    props: {
      products: products.map(db.convertDocToObj),
      shops: shop.map(db.convertRevDocToObj),
      distinctCategs,
    },
  };
}
export default Shopid