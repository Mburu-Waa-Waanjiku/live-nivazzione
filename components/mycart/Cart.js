import Image from 'next/image';
import { AiOutlineShoppingCart, AiOutlineShopping } from 'react-icons/ai';
import React, { useContext } from 'react';
import { Store } from '../../utils/Store';
import dynamic from 'next/dynamic';
import axios from 'axios';
import useStyles from '../../utils/styles';
import { useStateContext } from '../../utils/StateContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs, Pagination, Autoplay } from 'swiper';
import CartItems from '../galleryComponents/CartItems';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PaymentP4B from './PaymentP4B';
import Checkout from '../NormalOrderPay/Pay';

import { 
  IconButton,
} from '@material-ui/core';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Cart() {
  const classes = useStyles();
  const { normalorderP, handleOpenNormalOP, cartopen, handleCartclose, payp4b, handleOpenPayp4b } = useStateContext();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
    userInfo
  } = state;

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };

  
  return (
    <div className={classes.smseachbg} 
      style={{position: "fixed", zIndex: 1210, top: 0, left: cartopen ? '0' : '120vw', background: 'white',  width: "100vw", height: "100vh"}}
      >
        <div style={{top: 0, overflowY: "auto", height:"100%", overflowX: "hidden"}} className=" relative">
          <div className="grid md:grid-cols-5 h-full">
            <div style={{backgroundColor: "#faf9fe"}} className="overflow-x-auto md:col-span-3">
              <div style={{backgroundColor: "rgba(255, 255, 255, 0.9)", position: "sticky", top: 0, zIndex: "10"}} className={classes.reviewTopTab}>
                <ArrowBackIosIcon onClick={handleCartclose} sx={{ float:"left" }} /> 
                My Cart 
                <span className="cart-num-items">({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                  items)
                </span>
              </div>
              {cartItems.length === 0 ? (
                <div className=" w-full h-auto flex justify-center place-items-center">
                  <div className="empty-cart">
                    <div className="cart-icn block">  
                      <AiOutlineShoppingCart size={150} />
                    </div>
                    <h3>Your shopping cart is empty</h3>
                  </div>
                </div>
                ) : (
                <>
                  <Swiper                    
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                    modules={[FreeMode, Pagination, Autoplay, Thumbs]}
                    spaceBetween={10}           
                    loop={true}
                    pagination={true}
                    centeredSlides={false}
                    slidesPerView={1}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                    style={{padding: 10}}
                    >
                    <SwiperSlide >
                      <Image
                        height={500} width={1500}
                        src="https://res.cloudinary.com/dddx5qpji/image/upload/v1674117112/bagadd_2_i1elch.png"
                        alt="Banner"
                        style={{ borderRadius: 10}}
                        className="shadow object-cover h-auto w-100 bg-gray-100"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        height={500} width={1500}
                        style={{ borderRadius: 10}}
                        src="https://res.cloudinary.com/dddx5qpji/image/upload/v1674467486/retyui_oa4bmj.png"
                        alt="Banner"
                        className="shadow object-cover h-auto w-100 bg-gray-100"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <Image
                        height={500} width={1500}
                        style={{ borderRadius: 10}}
                        src="https://res.cloudinary.com/dddx5qpji/image/upload/v1674466881/ertylm_q1ibj9.png"
                        alt="Banner"
                        className="shadow object-cover h-auto w-100 bg-gray-100"
                      />
                    </SwiperSlide>
                  </Swiper>
                  {cartItems.map((item) => (
                    <CartItems
                      key={item._id}
                      item={item}
                      removeItemHandler={() => removeItemHandler(item)}
                      updateCartHandler={(e) => updateCartHandler(item, e.target.value)}
                    />
                  ))}
                </>  
                )
              }
            </div>
            <div style={{backgroundColor: "#eeeeee" }} className="borderRadiusCart card p-4 md:col-span-2">
              <div className="flex-wrap h-full flex justify-center content-center">
              <div className="top-6 text-center grow relative h-fit">
                <div className="hidden md:block " style={{position: "relative", bottom: 150}} >
                  <IconButton
                    type="submit"
                    sx={{"&.MuiIconButton-root": {padding:0},}}
                     aria-label="search"
                    >
                     {userInfo ? (<b style={{ width: 70, height:70, lineHeight: 1, fontSize: 35, borderRadius: 50, color: "white", backgroundColor: "#222"}} className="themecolor p-4 "><a style={{left: "-2px", position: "relative"}}>{userInfo.name.slice(0,1)}</a></b>) :
                       (<AccountCircle style={{fontSize: 80}} />) 
                     }
                  </IconButton> 
                </div>
                <div>
                  <div className="hidden md:block text-center pb-3 mb-2 font-sans flex justify-between text-xl">
                    <div> 
                      Cart Tototal  : KES{cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid gap-y-2">
                    <button
                      onClick={handleOpenNormalOP}
                      className="primary-button w-full mr-4"
                      style={{backgroundColor: "#222", borderRadius: 50}}
                    >
                      <div className="flex justify-between ml-2 mr-2 md:justify-center">
                        <div style={{fontFamily: "monospace"}} className="block md:hidden">
                          KES {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                        </div>
                        <div>
                          Check Out
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={handleOpenPayp4b}
                      style={{boxShadow: "0 2px 5px 1px rgb(64 60 67 / 50%)", backgroundColor: "#222", borderRadius: 50}}
                      className="primary-button w-full flex justify-center"
                    > 
                      <div className="flex w-full justify-between ml-2 mr-2 md:justify-center">
                        <div style={{fontFamily: "monospace"}} className="block md:hidden">
                          KES {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                        </div>
                        <div className="flex">
                          Add to 
                          <div style={{position: "relative", height: 30}}>
                            <AiOutlineShopping style={{fontSize: 25, position: "relative", top: 0, marginLeft: 10}}/>                
                            <div style={{height: 18, display:"inline-block", position: "relative", fontSize: 12, top: "-32px", left: "-3px", border: "3px solid #242526" }}>
                              +
                            </div>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>  
        </div>
      {payp4b && <PaymentP4B/>}
      {normalorderP && <Checkout/>}
    </div>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
        