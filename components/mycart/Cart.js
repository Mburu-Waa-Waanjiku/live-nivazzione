import Image from 'next/image';
import { AiOutlineShoppingCart, AiOutlineShopping } from 'react-icons/ai';
import Link from 'next/link';
import React, { useContext } from 'react';
import { Store } from '../../utils/Store';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import axios from 'axios';
import useStyles from '../../utils/styles';
import { useStateContext } from '../../utils/StateContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import Pay4Bag from './Pay4Bag';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs, Pagination, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Cart() {
  const router = useRouter();
  const classes = useStyles();
  const { openp4b, handleOpenp4b, cartopen, handleCartclose } = useStateContext();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
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
  const checkoutHandler = async () => {
    await router.push('/shipping');
    handleCartclose();
  };

  
  return (
    <div className={classes.smseachbg} 
      style={{position: "fixed", zIndex: 1210, top: 0, left: cartopen ? '0' : '120vw', background: 'white',  width: "100vw", height: "100vh"}}
      >
      <div className={classes.reviewTopTab}>
        <ArrowBackIosIcon onClick={handleCartclose} sx={{ float:"left" }} /> 
        My Cart 
        <span className="cart-num-items">({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items)
        </span>
      </div>
      {cartItems.length === 0 ? (
        <div className=" w-full h-full flex justify-center place-items-center">
          <div className="empty-cart">
            <div className="cart-icn block">  
              <AiOutlineShoppingCart size={150} />
            </div>
            <h3>Your shopping cart is empty</h3>
          </div>
        </div>
        ) : (
        <div style={{top: 0, overflowY: "auto", height:"90%", overflowX: "hidden"}} className=" relative">
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
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="overflow-x-auto md:col-span-3">
              <table className="min-w-full ">
                <thead className="border-b">
                  <tr>
                    <th className="p-5 text-left">Item</th>
                    <th className="p-5 text-center">Name</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.slug} className="border-b">
                      <td className="pl-2">
                        <Link href={`/${item.category}/${item.slug}`}>
                          <a className="flex items-center">
                            <Image
                              src={item.image[0]}
                              alt={item.name[0]}
                              width={94}
                              height={121}
                              className="bg-gray-100"
                            ></Image>
                          </a>
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.name.length > 25 ? (<b>{item.name.slice(0, 25).concat(" ", "."," ","."," ",".")}</b>) : (<b>{item.name}</b>) }</td>                    
                      <td className="p-5 text-right">
                        <select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-5 text-right">Ksh.{item.price}</td>
                      <td style={{color:"white"}} className="p-5 text-center ">
                        <button onClick={() => removeItemHandler(item)}>
                          <div style={{padding:"0px 8px", borderRadius:"5px", fontWeight:"bold", backgroundColor:"black", fontSize:"20px"}} >×</div>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card p-5">
              <ul>
                <li>
                  <div className="pb-3 mb-2 font-bold font-sans flex justify-between text-xl">
                    <div> Subtotal  :</div><div> Ksh
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}</div>
                  </div>
                </li>
                <li>
                  <div className="flex gap-x-9">
                    <button
                      onClick={checkoutHandler}
                      className="primary-button w-full mr-4"
                      style={{backgroundColor: "#222"}}
                    >
                      Check Out
                    </button>
                    <button
                      onClick={handleOpenp4b}
                      style={{backgroundColor: "#222"}}
                      className="primary-button w-full flex justify-center"
                    >
                      Add to 
                      <div style={{position: "relative", height: 30}}>
                      <AiOutlineShopping style={{fontSize: 25, position: "relative", top: 0, marginLeft: 10}}/>                
                      <div style={{height: 18, display:"inline-block", position: "relative", fontSize: 12, top: "-32px", left: "-3px", border: "3px solid #242526" }}>
                        +
                      </div>
                    </div>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      {openp4b && <Pay4Bag/>}
    </div>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
