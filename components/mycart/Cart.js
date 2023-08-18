import { FiShoppingBag } from 'react-icons/fi';
import React, { useContext } from 'react';
import { Store } from '../../utils/Store';
import dynamic from 'next/dynamic';
import useStyles from '../../utils/styles';
import { useStateContext } from '../../utils/StateContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import CartItems from '../galleryComponents/CartItems';
import AccountCircle from '@mui/icons-material/AccountCircle';
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
  const { normalorderP, handleOpenNormalOP, cartopen, handleCartclose } = useStateContext();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
    userInfo,
  } = state;
  const isCart = true;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  return (
    <div className={"transition-all duration-1000 "} 
      style={{position: "fixed", zIndex: 1210, top: 0, left: cartopen ? '0' : '120vw', background: 'white',  width: "100vw", height: "100vh"}}
      >
        <div style={{top: 0, overflowY: "auto", height:"100%", overflowX: "hidden"}} className=" relative">
          <div className="grid md:grid-cols-5 h-full">
            <div className="overflow-x-auto md:col-span-3">
              <div style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", position: "sticky", top: 0, zIndex: "10", height: '52px'}} className={classes.reviewTopTab + " flex items-center"}>
                <ArrowBackIosIcon className='translate-x-2' onClick={handleCartclose} sx={{ float:"left" }} /> 
                <div className='title-font flex w-full justify-center items-center font-semibold text-2xl'>
                  <div style={{transform:'translateX(-15px)'}} >Cart</div> 
                </div>
              </div>
              {cartItems.length === 0 ? (
                <div className=" w-full h-full flex justify-center place-items-center">
                  <div  style={{transform: 'translate(0, -10%)'}} className="empty-cart">
                    <div className="cart-icn block">  
                      <FiShoppingBag className="favsanimate" size={120} />
                    </div>
                    <h3 className="pt-10 title-font" >Your ShoppingBag Is Empty</h3>
                  </div>
                </div>
                ) : (
                <>
                  <div className='flex flex-col gap-3 items-center justify-center'>
                    {cartItems.map((item) => (
                      <CartItems
                        key={item._id}
                        item={item}
                        isCart={isCart}
                        removeItemHandler={() => removeItemHandler(item)}
                        dispatch={dispatch}
                      />
                    ))}
                  </div>
                  <div className='p-4 w-full md:hidden fixed bottom-2'>
                    <div
                      onClick={handleOpenNormalOP}
                      className="bg-tabb rounded-full text-xl w-full p-5 text-white"
                    >
                      <div className="flex justify-between px-2 md:justify-center">
                        <div  style={{fontFamily: "monospace"}} className="block md:hidden">
                          KES {cartItems.reduce((a, c) => a + c.quantity * c.csize.price, 0)}
                        </div>
                        <div className='font-bold'>
                          Check Out
                        </div>
                      </div>
                    </div>
                  </div>
                </>  
                )
              }
            </div>
            <div className="hidden bg-grayw md:block borderRadiusCart card p-4 md:col-span-2">
              <div className="flex-wrap h-full flex justify-center content-center">
              <div className="top-6 text-center grow relative h-fit">
                <div className="hidden md:block " style={{position: "relative", bottom: 150}} >
                  {userInfo ? (
                    <a style={{display: 'flex', justifyContent: 'center', position: "relative"}}><b style={{ display: 'block', width: 70, height:70, lineHeight: 1, fontSize: 35, borderRadius: 50, color: "white", backgroundColor: "#222"}} className="themecolor p-4 ">{userInfo.name.slice(0,1)}</b></a>
                    ) : (
                      <IconButton
                        type="submit"
                        sx={{"&.MuiIconButton-root": {padding:0},}}
                        aria-label="search"
                        >
                        <AccountCircle style={{fontSize: 80}} />
                      </IconButton> 
                    ) 
                  }
                </div>
                <div>
                  <div className="hidden md:block text-center pb-3 mb-2 font-sans flex justify-between text-xl">
                    <div> 
                      Cart Tototal  : KES {cartItems.reduce((a, c) => a + c.quantity * c.csize.price, 0)}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="grid gap-y-2">
                    <div
                      onClick={handleOpenNormalOP}
                      className="bg-tabb rounded-full text-xl w-full p-5 text-white"
                     >
                      <div className="flex justify-between px-2 md:justify-center">
                        <div  style={{fontFamily: "monospace"}} className="block md:hidden">
                          KES {cartItems.reduce((a, c) => a + c.quantity * c.csize.price, 0)}
                        </div>
                        <div className='font-bold'>
                          Check Out
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      {normalorderP && <Checkout/>}
    </div>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
        