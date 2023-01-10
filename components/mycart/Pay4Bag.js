import Image from 'next/image';
import { AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import Link from 'next/link';
import React, { useEffect, useContext } from 'react';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';
import useStyles from '../../utils/styles';
import { useStateContext } from '../../utils/StateContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import { Button } from '@material-ui/core';
import PaymentP4B from './PaymentP4B';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Pay4Bag() {
  const router = useRouter(); 
  const classes = useStyles();
  const { openp4b, setOpenp4b, handleOpenp4b, handleClosep4b, payp4b, setPayp4b, handleOpenPayp4b } = useStateContext();
  const { state, dispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const { cartItems } = cart;

  const round0 = (num) => Math.round(num * 1 + Number.EPSILON) / 1; // 123.456 => 123
  const bagItemsPrice = round0(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/');
    }
  }, []);
  
  return (
    <div className={classes.smseachbg} 
      style={{position: "fixed", zIndex: 1210, top: 0, left: openp4b ? '0' : '100vw', background: 'white',  width: "100vw", height: "100vh"}}
      >
      <div style={{position: 'sticky'}} className={classes.reviewTopTab}>
        <ArrowBackIosIcon onClick={handleClosep4b} sx={{fontSize:10, float:"left",}} /> 
        <div className="flex justify-center">
        Add To My
        <div style={{position: "relative", height: 30}}>
                    <AiOutlineShopping style={{fontSize: 24, position: "relative", top: 0, marginLeft: 10}}/>                
                    <div style={{height: 19, display:"inline-block", position: "relative", fontSize: 14, top: "-32px", left: "-4px", border: "3px solid #FFFFFF" }}>
                      +
                    </div>
                  </div> 
        </div>
      </div>
      <div style={{overflowX: 'auto', height: '90%'}}>
      <div className="grid justify-center" >
        <div className="home-ft w-full justify-self-stretch">
          Order Items
          <span className="cart-num-items">({cartItems.length})
          </span>
        </div>  
        <Swiper    
          breakpoints={{
            100: {
              slidesPerView: 1.7,
            },
            640: {
              slidesPerView: 2.3,
            }, 
            1000: {
              slidesPerView: 4,
            },  
          }}
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          modules={[FreeMode, Navigation]}
          spaceBetween={10}           
          navigation={true}
          className="mt-3 mySwiperP"
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
        
          >
            {cartItems.map((item) =>(
              <SwiperSlide key={item._id}>
                <div style={{borderRadius:"10px",margin:"0 3px 5px 3px" , boxShadow: "0 2px 5px 1px rgb(64 60 67 / 50%)"}}>
                  <div className="gallery">
                    <div>
                      <Link href={`/product/${item.slug}`}>
                        <Image
                          src={item.image[0]}
                          alt={item.name}
                          width={372}
                          height={484}
                        ></Image>
                      </Link>
                    </div>
                    <div className="btm-desc">
                      <div className="descO lovesO">
                        <div>
                          <b style={{fontSize: "15px"}}>Qty:</b>{item.quantity}
                        </div>
                          <div style={{display:"flex"}}>
                            {item.isBurgain && (<div className="loves"> B </div>)}
                          </div>
                        <div> 
                          <Link className="card-link" href={`/product/${item.slug}`}>
                            {item.name}
                          </Link>
                        </div>
                      </div>
                      <div className="descO price">
                        Ksh.{item.price}
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
      <div className="grid justify-center" >
        <div className="card p-5 mt-5">
            <ul>
              <li>
                <div className="pb-3 mb-2 font-bold font-sans flex justify-between text-xl">
                  <div> Total  :</div><div> Ksh{bagItemsPrice}
                  </div>
                </div>
              </li>
            </ul>
        </div>
        <Button
          onClick={handleOpenPayp4b}
          variant="contained"
          color="primary"
          style={{backgroundColor: "#222"}}
         >
            PAY
        </Button>
      </div>
      </div>   
      {payp4b && <PaymentP4B/>}   
    </div>
  );
}

