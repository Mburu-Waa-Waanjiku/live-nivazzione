import React, { useState } from 'react';
import { VscOpenPreview } from 'react-icons/vsc';
import Rating from '@material-ui/lab/Rating';
import { FaTruckMoving } from 'react-icons/fa';
import Download from '../downloader';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { Navigation, FreeMode, Thumbs, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { PiCoatHangerFill } from 'react-icons/pi';
import Image from 'next/image';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { BiMessageRounded } from 'react-icons/bi';
import UpdateProds from './UpdateProds';
import Texter from './Texter';

import 'swiper/css'

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function ViewPending({ product, fetchPendingPs, fetchProducts }) {
  
  const [Editor, setEditor] = useState(false);
  const [gallery, setGallery] = useState(null);
  const [gallery1, setGallery1] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [isOnoffer, setIsOnoffer] = useState(false);
  const [isEditorsChoice, setIsEditorsChoice] = useState(false);
  const [isCollectn, setIsCollectn] = useState(false);
  const isProduct = false;
  const isAdmintxt = true;
 
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [openSizes, setOpensizes] = useState(false);
  const [openDescribe, setOpendescribe] = useState(false);
  const [openShopping, setOpenshopping] = useState(false);

  return (
		<div>{!Editor ?  
		  ( 
        <VscOpenPreview onClick={() => setEditor(true)} style={{ fontSize: 26 }}/>
      ) :
		  (
        <div className='overflow-y-scroll pb-2 overflow-x-hidden z-50 h-screen bg-white' style={{ flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', position: 'fixed', top: '0px', width: '100vw', backgroundColor: 'white', left: '0px'}}>
          <div className='flex color-slug justify-center px-0 md:px-8'>
            <div className='fixed bg-white rounded-full w-11 h-11 flex justify-center items-center z-10 left-3 p-3 text-6xl top-12 xsm:top-48 slg:top-40' onClick={() => setEditor(false)}><HiArrowNarrowLeft /></div>
            <div className='grid relative max-h-slug grid-cols-1 md:grid-cols-2 max-w-lg md:max-w-4xl prod-shadow overflow-hidden'>
              <div className='justify-self-center relative block md:flex items-center scale-102 sm:p-0 w-full max-w-lg sm:max-h-none'>
                <Swiper
                  style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                  }}
                  pagination={{
                    type: "fraction",
                  }}
                  breakpoints={{
                    100: {
                      slidesPerView: 1,
                    }
                  }}     
                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }} 
                  modules={[Pagination, FreeMode, Thumbs]}
                  spaceBetween={8}
                  loop={false}
                >
                  {product.image?.map((img) => ( 
                    <SwiperSlide key={img} >
                      <Image 
                        className="bg-gray-100" 
                        width={600} 
                        height={797} 
                        alt={product.name} 
                        src={img.item}
                      />
                      <Download
                        original = {img.item}
                        name = {product.name}
                      />
                    </SwiperSlide >
                  ))}
                </Swiper>
                <div className='z-10 bg-white md:max-h-full thumb-position h-32 md:h-2/3 flex justify-center border-box py-3 px-1.5 w-full md:w-16 relative md:absolute rounded-3xl'>
                  <Swiper
                    spaceBetween={8}
                    slidesPerView={product.image.length}
                    breakpoints={{
                      768: {
                        direction:"vertical"
                      }
                    }} 
                    freeMode={true}
                    onSwiper={setThumbsSwiper}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                  >
                    {product.image?.map((img) => ( 
                      <SwiperSlide className='flex items-start md:items-center' style={{ maxWidth: 73 }} key={img}>
                        <Image  
                          width={73} 
                          height={97} 
                          alt={product.name} 
                          className="rounded-2xl bg-gray-100 g-images-child"
                          src={img.item}
                        />
                      </SwiperSlide >
                    ))}
                  </Swiper>
                </div>
              </div>
              <div className=' max-h-slug bg-white  pl-4 md:pl-20 pr-4 md:pr-4 gap-4 justify-center items-center w-full h-full'>
                <div className='flex py-4 md:pr-4 w-full justify-between'>
                  <div className='flex cursor-pointer gap-2 items-center'>
                    <div className='w-11 h-11 rounded-full overflow-hidden'>
                      <Image width={50} height={50} alt="" src='/icon-256x256.png' />
                    </div>
                    <div className='flex-grow'>
                      <div className='font-medium  w-full overflow-hidden whitespace-nowrap text-ellipsis'> Shiglam </div>
                      <div className='w-full flex items-center gap-2 pt-1'>
                        <div className='w-3 transform-y-3 text-xl'>
                          <VscVerifiedFilled/>
                        </div>
                        <div className='font-medium  w-full overflow-hidden whitespace-nowrap text-ellipsis'>4.11k Sales</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ transform:'translate(-7px, 3px)'}} className=" cursor-pointer darklucent rounded-3xl px-4 py-2 text-xl" >
                    Follow
                  </div>
                </div>
                <div className='max-h-slugchild md:pr-4 h-slug overflow-y-hidden md:overflow-y-scroll'>
                  <div className='grid pt-4 grid-cols-2 grow justify-between'>
                    <div className='text-base font-bold'>
                      {product.brand}
                    </div>
                    <div className="text-lg md:text-2xl font-bold justify-self-end " >Ksh.{product.price}</div>
                  </div>
                  <div className='grid grid-cols-2 grow justify-between'>
                    <div className='text-2xl w-full overflow-hidden whitespace-nowrap text-ellipsis font-bold'>
                      {product.name}
                    </div>
                    <div className="text-sm font-bold justify-self-end self-end md:text-base">
                      {product.isOnoffer && <div  style={{color:"orangered"}}><s>Ksh.{product.prevprice}</s></div>}
                    </div>
                  </div>
                  <div className='grid pt-2 grid-cols-2 grow justify-between'>
                    <div className='flex items-center'>
                      <Rating style={{fontSize: 15}} className="grow-0 pr-2" value={product.rating} readOnly></Rating> 
                      <div className='text-xl font-bold'>{product.numReviews}</div>
                    </div>
                    <div className='flex xxsm:hidden justify-self-end mdb:flex xmd:hidden justify-center'>
                      <div className='flex text-xl font-bold w-fit border-4 border-black py-2 px-3 rounded-2xl items-center justify-between'>
                        <div style={{backgroundColor: 'gold'}} className='w-4 h-4 rounded-full'></div> 
                        <div className='pl-1'>Gold</div> 
                        {openSizes ? <IoIosArrowUp onClick={() => setOpensizes(false)} /> : <IoIosArrowDown onClick={() => setOpensizes(true)}/> }
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-between pt-10 grow items-center gap-3'>
                    <div className='flex border-4 text-3xl border-black rounded-full w-14 h-14 items-center justify-center'>
                      <PiCoatHangerFill /> 
                    </div>
                    <div className='xxsm:flex hidden mdb:hidden xmd:flex grow justify-center'>
                      <div className='flex  text-xl font-bold w-fit border-4 border-black py-2 px-3 rounded-2xl items-center justify-between'>
                        <div style={{backgroundColor: 'gold'}} className='w-4 h-4 rounded-full'></div>  
                        <div className='pl-2'>Gold</div> 
                        {openSizes ? <IoIosArrowUp onClick={() => setOpensizes(false)} /> : <IoIosArrowDown onClick={() => setOpensizes(true)}/> }
                      </div>
                    </div>
                    <div className='flex gap-3 text-xl font-bold w-28 border-4 border-black py-2 px-3 rounded-2xl items-center justify-between'>
                      Sizes {openSizes ? <IoIosArrowUp onClick={() => setOpensizes(false)} /> : <IoIosArrowDown onClick={() => setOpensizes(true)}/> }
                    </div>
                  </div>
                  <div  className={'w-full mt-6 pt-2.5 pb-3 rounded-2xl text-xl flex justify-center items-center bg-grayw font-bold'}>
                    Add to cart
                  </div>
                  <div className='mt-10 pt-8 text-base  font-bold flex justify-between items-center '>
                    <div>Desctiption</div>
                    {openDescribe ? <IoIosArrowUp onClick={() => setOpendescribe(false)} /> : <IoIosArrowDown onClick={() => setOpendescribe(true)}/> }
                  </div>
                  <div className='py-4 border-b-2 border-gray-300'>
                    {openDescribe && <p className='text-base'>{product.description}</p>}
                  </div>
                  <div className=' py-8 text-base border-b-2 border-gray-300 font-bold flex justify-between items-center '>
                    <div>Size & fit</div>
                    {openDescribe ? <IoIosArrowUp onClick={() => setOpendescribe(false)} /> : <IoIosArrowDown onClick={() => setOpendescribe(true)}/> }
                  </div>
                  <div className=' pt-8 text-base font-bold flex justify-between items-center '>
                    <div>Shipping</div>
                    {openShopping ? <IoIosArrowUp onClick={() => setOpenshopping(false)} /> : <IoIosArrowDown onClick={() => setOpenshopping(true)}/> }
                  </div>
                  <div className='py-4 border-b-2 border-gray-300'>
                    {openShopping && 
                      <div style={{backgroundColor: "#eeeeee", borderRadius: 25, paddingTop:10}} >
                        <div className="flex justify-between mx-6 py-1">
                          <div className="flex">
                            <FaTruckMoving style={{fontSize:20}}/>
                            <div className="ml-3 self-center">Our shipping is done by Pickup Mtaan & it takes from same day to 3 days max.</div>
                          </div>
                        </div>
                        <div className="mx-6 my-3 flex justify-center">
                          <Image width={500} height={83} alt="" className="bg-gray-100 rounded-2xl" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1667233530/ezgif.com-gif-maker_1_fx3ey6.gif"></Image>
                        </div>
                        <div className=" mt-4 mx-6" style={{fontSize:"0.875rem", fontWeight:"1000", padding:"5px 0"}}>
                          Return 
                        </div>
                        <div className="flex justify-start mx-6 py-1 pb-2">
                          {product.isOnoffer ? (<div>Products on promotion are not eligible to be returned.</div>) : (<div>This product can be returned if it is defective on delivery</div>)}
                        </div>
                      </div> 
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='flex pt-10 px-2 justify-between gap-3'>
            <UpdateProds
              fetchPendingPs={fetchPendingPs}
              fetchProducts={fetchProducts}
              product={product}
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
              isProduct={isProduct}
              isOnoffer={isOnoffer}
              setIsOnoffer={setIsOnoffer}
              isEditorsChoice={isEditorsChoice}
              setIsEditorsChoice={setIsEditorsChoice}
              isCollectn={isCollectn}
              setIsCollectn={setIsCollectn}
            />
            <Texter
              product={product}
              isAdmintxt={isAdmintxt}
            />
          </div>
		    </div>
      )}
		</div>
	)
}

export default ViewPending