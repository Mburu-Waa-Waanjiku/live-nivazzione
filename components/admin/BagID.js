import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import {
  CircularProgress,
} from '@material-ui/core';
import { Navigation, FreeMode, Thumbs, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSnackbar } from 'notistack';
import ProductItems from '../me/OrderProducts';
import { getError } from '../../utils/error';
import axios from 'axios'; 

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function OrderId({ bag, classes, userInfo }) {

  const [openId, setOpenId] = useState(false);
  const  handeOpenId = () => {
    setOpenId(true);
  }
  const { enqueueSnackbar } = useSnackbar();
  const [load, setLoad] = useState(false);
  
  async function checkBadHandler() {
    setLoad(true);
    try {
      await axios.put(
        `/api/P4Borders/${bag._id}`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      setLoad(false);
      enqueueSnackbar('Bag is Checked', { variant: 'success' });
    } catch (err) {
      setLoad(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  }


  return (
    <div>
      {bag && <button
        onClick={handeOpenId}
        style={{color: 'white', padding: '4px 15px', borderRadius: 5, backgroundColor: '#222'}}
       >
        View {'>>'}
      </button>}
	    <div style={{ display: openId ? 'block' : 'none', color: 'black' }}>
	      <div className={classes.smseachbg}
          style={{position: "fixed", left: 0, zIndex: 1210, top: 0, background: 'white',  width: "100vw", height: "100vh"}}
         >
          <div style={{backgroundColor: "rgba(255, 255, 255, 0.9)", position: "sticky", top: 0, zIndex: "10"}} className={classes.reviewTopTab}>
            <ArrowBackIosIcon onClick={() => {setOpenId(false)}} sx={{ float:"left" }} /> 
            <div className="flex justify-center">
              Update Bag 
            </div>
          </div>
          <div style={{height: 'calc(100vh - 50px)', overflowY: 'scroll', width: '100%', backgroundColor: 'white', gridTemplateColumns: '1fr' }} className="OrderIdgrids justify-center overflow-x-hidden">
            <div style={{ justifyContent: 'center', display: 'grid', gridTemplateRows: '1fr 1fr', gridTemplateColumns: 'calc(100vw - 17px)'}}>
              <div style={{ margin: '0 8px', backgroundColor: 'rgba(209, 214, 224, 0.4)'}}>
                <div className="m-2 font-bold text-base p-3 bg-white text-center">
                  All Bag Items ({bag?.orderItems.length})
                </div>
                <div className="p-2">
                  <div 
                    className="swipereactor"
                    style={{borderRadius: 20, marginLeft: 16, marginRight: 16 }}
                    >
                    <Swiper                    
                       breakpoints={{
                         100: {
                            slidesPerView: 1.1,
                          },
                         300: {                  
                            slidesPerView: 1.,
                         },
                         390: {
                            slidesPerView: 2.8,
                         }, 
                         450: {
                            slidesPerView: 3.6,
                         }, 
                         850: {
                            slidesPerView: 4.6,
                         },
                         1600: {
                            slidesPerView: 5.6,
                         },             
                       }}
      
                         modules={[FreeMode, Navigation, Pagination, Autoplay, Thumbs]}
                         spaceBetween={10}           
                         loop={false}
                         navigation= {true}
                         centeredSlides={false}
                         style={{ maxWidth: 1100, height: '29vh', overflow: 'hidden' }}

                     onSwiper={(swiper) => console.log(swiper)}
                     onSlideChange={() => console.log('slide change')}
        
                     >
    
                      {bag?.orderItems.map((product) =>(
                        <SwiperSlide className="nopad" style={{ minWidth: 124, maxWidth: 122 }} key={product}>
                          <ProductItems
                            product={product}
                            key={product}
                          />                         
                        </SwiperSlide>
                       ))
                      }
                    </Swiper>
                  </div>
                </div>
              </div>
              <div style={{ margin: '0 8px', backgroundColor: 'rgba(209, 214, 224, 0.4)'}}>
                <div className="m-2 font-bold text-base p-3 bg-white text-center">
                  Recently added ({bag?.updated.length})
                </div>
                <div className="p-2">
                  <div 
                    className="swipereactor"
                    style={{borderRadius: 20, marginLeft: 16, marginRight: 16 }}
                    >
                    <Swiper                    
                       breakpoints={{
                         100: {
                            slidesPerView: 1.1,
                          },
                         300: {                  
                            slidesPerView: 1.,
                         },
                         390: {
                            slidesPerView: 2.8,
                         }, 
                         450: {
                            slidesPerView: 3.6,
                         }, 
                         850: {
                            slidesPerView: 4.6,
                         },
                         1600: {
                            slidesPerView: 5.6,
                         },             
                       }}
      
                         modules={[FreeMode, Navigation, Pagination, Autoplay, Thumbs]}
                         spaceBetween={10}           
                         loop={false}
                         navigation= {true}
                         centeredSlides={false}
                         style={{ maxWidth: 1100, height: '29vh', overflow: 'hidden' }}

                     onSwiper={(swiper) => console.log(swiper)}
                     onSlideChange={() => console.log('slide change')}
        
                     >
    
                      {bag?.updated.map((product) =>(
                        <SwiperSlide className="nopad" style={{ minWidth: 124, maxWidth: 122 }} key={product}>
                          <ProductItems
                            product={product}
                            key={product}
                          />                         
                        </SwiperSlide>
                       ))
                      }
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {!bag?.isChecked && <button
            onClick={checkBadHandler}
            className="primary-button "
            style={{ fontWeight: 500, textAlign: 'center', backgroundColor: "#222", color:"#30d04a", position: 'absolute', zIndex:3, borderRadius: 50, padding: '10px 20px', bottom: 30, right: 20}}
           >
            {!load ? <span className="font-normal text-base text-right"> Check </span>  : <CircularProgress className="loadinbutton"/>}
          </button>}
        </div>  
	    </div>  
    </div>  
  )
}

export default OrderId