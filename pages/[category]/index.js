import React from 'react';
import { useState } from "react";
import { useRouter } from 'next/router';
import db from '../../utils/db';
import Product from '../../models/Product';
import Banner from '../../models/Banner';
import ProductItems from '../../components/ProductItem';
import Tabsbottom from '../../components/Tabsbottom';
import Image from 'next/image';
import Footer from '../../components/Footer';
import Headers from '../../components/HeadersContainer';
import Layout from '../../components/Layout'
import { Navigation, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Jewelry = (props) => {
 
  const {  products, banner } = props;
  const router = useRouter();
  const category = router.query.category;
  let prods
  if(category.includes("-")) {
    prods = category.toString().replace("-", " ");
  } else {
    prods = category
  }

  const [tabParam, setParam] = useState(banner[0].discount[0]);
  const handleParams = (categ) => {
    setParam(categ);
  }

  return (
    <>
      <Headers 
        title="Shop The Latest and Most Trendy on Jewelry and Fashion Accessories whith SHIGLAM at prices as low as KES 10...."
        desc="Get the latest trends in Wemen's Jewelry AND hot Fashon Accessories in kenya - nairobi at prices you'll just love."
      />
      <Layout> 
        {banner.map((categ) => (
          <div key={categ} className='max-w-sm pulse relative h-32 w-fit overflow-hidden  rounded-3xl  '>
            <div className='fit h-full flex justify-center items-center'>
              <Image 
                className='w-fullmax-w-sm  h-auto min-w-full'
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
        ))}
        <div className='py-3'>
          <Swiper                    
            breakpoints={{
              100: {
                slidesPerView: 1.6,
              },
              300: {                  
                slidesPerView: 2.3,
              },
              450: {
                slidesPerView: 2.8,
              }, 
              520: {
                slidesPerView: 3.2,
              }, 
              850: {
                slidesPerView: 4.1,
              },
              1600: {
                slidesPerView: 4.6,
              },             
            }}
            modules={[FreeMode, Navigation ]}
            spaceBetween={10}   
            loop={false}
            navigation= {true}
            centeredSlides={false  }
            >
            {banner[0].discount?.map((categs) =>(
              <SwiperSlide style={{maxWidth: '230px'}} key={categs}>
                <div onClick={() => handleParams(categs)} className={'rounded-full text-base font-bold text-center w-full px-4 py-3 '.concat(tabParam == categs ? 'bg-tabb text-white' : 'bg-grayw')}>
                  {categs}
                </div>                        
              </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
        <div className='flex px-4 justify-center'>
          <div className='columns-2 sm:columns-3 sm:max-w-xl md:columns-4 md:max-w-5xl '>
            {products.map((product) => (
              <div key={product} className='px-1 py-1'>
                <ProductItems
                  product={product}
                />
              </div>
              ))}
          </div>
        </div>
        <Tabsbottom/>
        <Footer/>
      </Layout>
    </>
)
 
};
export async function getStaticProps(context) {
  const { params } = context;
  const { category } = params;
  let prods
  if(category.includes("-")) {
    prods = category.toString().replace("-", " ");
  } else {
    prods = category
  }
  
  await db.connect();
  
  const banner = await Banner.find({ midText: prods }).lean();
  const products = await Product.find({ category: prods }, {name:1, slug:1, category:1, image:1, subcategs:1, isEditorsChoice: 1, isOnoffer: 1, sizes: 1 }).sort( {createdAt: -1} ).lean().limit(24);
  
  await db.disconnect();
  return {
    props: { 
      products: products.map(db.convertDocToObj),     
      banner: banner.map(db.convertDocToObj),
    },
  };
}

export async function getStaticPaths() {
  
  const changeCateg = (categ) => {
    if(categ.includes(" ")) {
      return categ.toString().replace(" ", "-");
    } else {
      return categ
    }
  }
  
  await db.connect();
    const categs = await Banner.find({ largeText1: "category" }).lean();
  await db.disconnect();
 
  // Get the paths we want to pre-render based on posts
  const paths = categs.map((categ) => ({
    params: { category: changeCateg(shop._id) },
  }))
 
  return { paths, fallback: 'blocking' }
}

export default Jewelry 
