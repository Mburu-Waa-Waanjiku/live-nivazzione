import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Navigation, FreeMode, Thumbs, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  
  Badge, 
} from '@material-ui/core';
import Pending from './svgs/Pending';
import Order from './svgs/Order';
import axios from 'axios';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function MeBanner({ classes, pendingOrders, userInfo }) {
  
  const meLIst = ['Orders', 'Profile'];
  const collect = async(order) => {
    await axios.post('api/orders/history', 
      { _id: order._id }, 
      { headers: { authorization: `Bearer ${userInfo.token}` }, }
    )
  }

  return (
    <div className="w-full">
      <div className="meImg rounded-2xl" style={{ height: '30vh', overflow: 'hidden'}}>
        <Image className="bg-gray-100" width={1400} height={480} alt="New Products" src='https://res.cloudinary.com/dddx5qpji/image/upload/v1685896865/istockphoto-1394033413-1024x1024-fs8YtA0tN-transformed_2_juqgpd.jpg'></Image>     
      </div>
      <div style={{ position: 'absolute', width: '100%', transform: 'translate(0px, -60%)', zIndex: 10, display: 'flex', justifyContent: 'center'}}>
        <div style={{ boxShadow: 'rgb(64 60 67 / 20%) 0px 2px 5px 1px', width: '70%', height: '35vh', backgroundColor:'rgba(255, 255, 255, 0.9)', gap: 8, borderRadius: 30, padding: '5px 15px 2px 15px'}} className="block bannerimg">
          <div className="me-common-1">
            <div style={{transform: 'translate(0px, -50%)'}} className="flex justify-center">
              {userInfo ? (
                  <div style={{ width: 55, height:55, borderRadius: 50, backgroundColor: "#222", color: "white",}} className="flex text-2xl justify-center items-center themecolor p-4 font-black">
                    {userInfo.name.toUpperCase().slice(0,1)}
                  </div>
                  ) : 
                  (<AccountCircle sx={{ color: 'action.active'}} style={{fontSize: 40}}/>) 
              }
            </div>
            <div className="me-common-1 title-font text-xl sm:text-2xl font-black">
            {userInfo?.name > 10 ? 
              (
                <>
                  {userInfo?.name.toUpperCase().slice(0,10) + ".."}
                </>
              ) : (
                <>
                  {userInfo?.name.toUpperCase()}
                </>
              )
            }
            </div>
          </div>
          <div className='flex translate-y-16 gap-4'>
            {meLIst.map((tabs, index) => 
              (
                <div className='grow flex justify-center' key={index}>
                  <div className='mb-2 grow rounded-2xl' style={{ width: "fit-content", maxWidth: 300, height: "fit-content", padding: "5px 6px", background: 'linear-gradient(to left,#d4d4d8 50%, #333 50%)' }}>
                    <div style={{ padding: '6px 10px' }}  className="logger rounded-xl loggerborder flex justify-center">
                      <b className="pr-1">{tabs}</b>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div style={{marginTop: '18vh'}} >
        <div className="flex justify-center text-xl lg:text-2xl font-black p-3 text-base">
          <Badge
            badgeContent={pendingOrders.length}
            style={{color:'white'}}
            classes={{ badge: classes.badgeme }}
            >
            <Order className="h-4 mt-2"/>
          </Badge>
          <div className="text-green-700 title-font ml-2 pt-1 lg:pt-0">
            Pending Orders
          </div>
        </div>
        {pendingOrders?.map((order, index) =>(
          <div key={index} className="flex w-full justify-center">
            <div 
              className="rounded-3xl flex w-fitdiv py-4 px-8 bg-grayw"
              style={{ borderRadius: 20 }}
              >
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
                modules={[FreeMode, Navigation, Pagination, Autoplay, Thumbs]}
                spaceBetween={10}           
                loop={false}
                navigation= {true}
                centeredSlides={false}
                className='w-full'
          
              >
                {order.orderItems.map((item, index) =>(
                  <SwiperSlide key={index}>
                    <div className='flex flex-col'>
                      <Image
                        width={364}
                        height={484}
                        src={item.image[0].item}
                        alt=""
                        className="shadow rounded-2xl object-cover h-auto w-100 bg-gray-100"
                      />
                      <div className='flex pt-2 font-semibold justify-between px-1'>
                        <div>Ksh {item.csize.price}</div>
                        <div>Qty {item.quantity}</div>
                      </div>
                    </div>                     
                  </SwiperSlide>
                ))
                }
                <SwiperSlide>
                  <div className='w-full p-3 h-full bg-white rounded-2xl flex items-center'>
                    <div className='flex gap-3 grow flex-col'>
                      <div className='flex justify-between'><b>Total</b>Ksh {order.itemsPrice}</div>
                      <div className='flex justify-between'><b>Ride</b>Ksh {order.shippingPrice}</div>
                      <div className='flex justify-between'>
                        <b>Packed</b>
                        {!order.isDelivered ? 
                          <Pending/> :
                          <svg className="orderscheck" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="orderscheck__circle" cx="26" cy="26" r="25" fill="none"/>
                            <path className="orderscheck__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                          </svg>
                        }
                      </div>
                      <div className='flex justify-between'>
                        <b>Ready</b>
                        {!order.isDelivered ? 
                          <Pending/> :
                          <svg className="orderscheck" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle className="orderscheck__circle" cx="26" cy="26" r="25" fill="none"/>
                            <path className="orderscheck__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                          </svg>
                        }
                      </div>
                      {order.isDelivered &&
                        <>
                          {!order.isCollected ?
                            <div onClick={collect} className='px-3 py-2 text-white rounded-2xl bg-grayb'>
                              Collect
                            </div> :
                            <div className='flex justify-between'>
                              <b>Collected</b>
                              <svg className="orderscheck" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle className="orderscheck__circle" cx="26" cy="26" r="25" fill="none"/>
                                <path className="orderscheck__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                              </svg>
                            </div>
                          }
                        </>
                      }
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MeBanner