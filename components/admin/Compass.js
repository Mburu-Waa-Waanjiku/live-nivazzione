import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Compass({ userInfo, getError, enqueueSnackbar, setOrders, setBags, Navigation, FreeMode, Thumbs, Pagination, Autoplay, Swiper, SwiperSlide, admin, pages, setCurrent, current, products, orders, transactions, banners, bags, users }) {
  
  const fetcher = async ()=> {
    try {
      const { data } = await axios.get(`/api/admin/orders`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setOrders(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    };
    try {
      const { data } = await axios.get(`/api/admin/bags`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setBags(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      fetcher();
      }, 180000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={admin.compasstop + " " + " bannerwidth flex justify-center"} style={{ borderBottom: '1px solid rgb(209, 214, 224)', position: 'sticky', display: 'block'}}>
      <Swiper                    
        breakpoints={{
          100: {
            slidesPerView: 1.8,
          }, 
          300: {
            slidesPerView: 2.5
          },
          450: {
            slidesPerView: 3.1,
          },
          600: {
            slidesPerView: 4.1,
          },
          800: {
            slidesPerView: 6,
          },          
        }}
      
          modules={[FreeMode, Navigation, Pagination, Autoplay, Thumbs]}
          spaceBetween={10}           
          loop={false}
          navigation= {true}
          centeredSlides={false}
          style={{ marginTop: 11, marginBottom: 10, marginLeft: 10, marginRight: 10, maxWidth: 1400 }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
       >
        {pages.map((page) =>(
          <SwiperSlide onClick={() => {setCurrent(page)}} style={{backgroundColor: current == page ? 'rgb(52, 72, 197, 0.1)' : 'rgb(209, 214, 224, 0.4)', color: current == page ? 'rgb(52, 72, 197)' : 'rgb(0, 0, 0, 0.7)', borderRadius: 20, border: current == page ? '2px solid rgb(52, 72, 197)' : '0px'}} key={page}>
            <div style={{ paddingBottom: current == page ? 3 : 7, paddingTop: 5 }} className="px-6 grid justify-center">
              <div className="text-base"><b>{page}</b></div> 
              <div className="flex justify-center">
                <span className="h-5 w-5 relative">
                  <span className={ page == "Orders" && [...orders.filter((order) => !order.isDelivered)].length > 0 ? "text-center animate-ping bg-red-600 absolute w-full h-full" 
                                    : page == "Bags" && [...bags.filter((bag) => !bag.isChecked)].length > 0 ? "text-center animate-ping absolute bg-red-600 w-full h-full" 
                                    : page == "Transactions" && [...transactions.filter((transaction) => transaction.isNewtransac)].length > 0 ? "text-center bg-red-600 animate-ping absolute w-full h-full" 
                                    : "text-center"
                                  } style={{ borderRadius: 20, opacity: 0.75}}>
                  </span>
                  <span className={ page == "Orders" && [...orders.filter((order) => !order.isDelivered)].length > 0 ? "text-center text-xs flex justify-center content-center relative h-5 w-5 block bg-red-600 text-white"
                                    : page == "Bags" && [...bags.filter((bag) => !bag.isChecked)].length > 0 ? "text-center text-xs relative flex justify-center content-center h-5 w-5 block bg-red-600 text-white"
                                    : page == "Transactions" && [...transactions.filter((transaction) => transaction.isNewtransac)].length > 0 ? "text-center flex justify-center content-center text-xs text-white relative h-5 w-5 block bg-red-600"
                                    : "text-center relative h-5 w-5 block"
                                  } style={{ borderRadius: 20, flexWrap: 'wrap'}}><b>
                    {page == "Products" ? products.length
                      : page == "Orders" ? [...orders.filter((order) => !order.isDelivered)].length 
                      : page == "Bags" ? [...bags.filter((bag) => !bag.isChecked)].length
                      : page == "Transactions" ?  [...transactions.filter((transaction) => transaction.isNewtransac)].length
                      : page == "Banners" ? banners.length
                      : users.length
                    }</b>
                  </span>
                </span>
              </div>
            </div>                        
          </SwiperSlide>
         ))
        }
      </Swiper>
    </div>
  )
}

export default Compass