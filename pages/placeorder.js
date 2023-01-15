import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import Link from 'next/link';
import Image from 'next/image';
import {
  Grid,
  Typography,
  CircularProgress,
  Button,
  Card,
  List, 
  ListItem,
} from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import useStyles from '../utils/styles';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';
import Cookies from 'js-cookie';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, } from 'swiper';
import { useStateContext } from '../utils/StateContext';
import Pay from '../components/NormalOrderPay/Pay';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function PlaceOrder() {
  const classes = useStyles();
  const { normalorderP, setNormalorderP, handleOpenNormalOP } = useStateContext();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;

  const round0 = (num) => Math.round(num * 1 + Number.EPSILON) / 1; // 123.456 => 123
  const itemsPrice = round0(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const bundleRate = 15 * cartItems.length /1000;
  const ratePrice = itemsPrice * bundleRate
  const bundlePrice = round0(itemsPrice - ratePrice);
  let shippingPrice;
  if (itemsPrice < 699) {
      shippingPrice = 120;
    } else if (itemsPrice < 999 ) {
        shippingPrice = 60
      } else {
          shippingPrice = 0
      };
  const taxPrice = round0(itemsPrice * 7 /100);
  const oldTotalPrice = round0(itemsPrice + shippingPrice + taxPrice);
  const totalPrice = cartItems.length > 2 ? round0(bundlePrice + shippingPrice + taxPrice) : oldTotalPrice;

  useEffect(() => {
    if (!shippingAddress.dropstation) {
      router.push('/shipping');
    }
    if (!paymentMethod) {
      router.push('/shipping');
    }
    if (cartItems.length === 0) {
      router.push(`/cart`);
    }
  }, []);
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const updateStockHandler = async () => {
    try {
      const { data } = await axios.post(
        '/api/products/updateStock',
        {
          orderItems: cartItems,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        } 
      );
      dispatch({ type: 'UPDATE_STOCK' });
      console.log('stock updated successfuly');
    } catch (err) {
      console.log('error updating  stock');
    }
  };
  const placeOrderHandler = async () => {
    if (cartItems.length > 2) {
    closeSnackbar();
    try {
      setLoading(true);
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          bundlePrice,
          shippingPrice,
          taxPrice,
          oldTotalPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        } 
      );
      dispatch({ type: 'CART_CLEAR' });
      Cookies.remove('cartItems');
      setLoading(false);
      enqueueSnackbar('Your Order has been placed succesfully', { variant: 'success' });
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
   }else {
     closeSnackbar();
    try {
      setLoading(true);
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'CART_CLEAR' });
      Cookies.remove('cartItems');
      setLoading(false);
      enqueueSnackbar('Order created succesfully', { variant: 'success' });
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
   }; 
  };
  const [show, setShow] = useState(false);
  const [circular, setCircular] = useState(false);
  const handleShow = () => {
     setShow(true);
  };

  return (
    <Layout title="Place Order">
        <h1 className=" mt-3 sm:mt-5  home-ft margintopFix" style={{fontSize: 17}}>Confirm Order</h1>
      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <div style={{backgroundColor:"#f1f5f9",}}className={classes.section}>
            <List>
                <div className="home-ft ml-8" style={{fontFamily:"Arial Black", textAlign:"left", fontSize:15}}>
                   User details
                </div>
              <div className="block pl-8 text-xs">
                <div style={{display:"flex", color:"gray"}}><b>Name:</b><div className="ml-2">{shippingAddress.firstName} {shippingAddress.lastName}</div></div>
                <div style={{display:"flex", color:"gray"}}><b>Your Area:</b><div className="ml-2">{shippingAddress.county}</div></div> 
                <div style={{display:"flex", color:"gray"}}><b>Delivey location:</b><div className="ml-2">{shippingAddress.dropstation}</div></div>
                <div style={{display:"flex", color:"gray"}}><b>Phone Number:</b><div className="ml-2">{shippingAddress.phoneNumber}</div></div>
              </div>
            </List>
          </div>
          <div style={{backgroundColor:"#f1f5f9"}}className={classes.section}>
                <div className="home-ft ml-8" style={{fontFamily:"Arial Black", textAlign:"left", fontSize:15}}>
                  Payment Method
                </div>
              <div className="flex pl-8 pb-8 text-xs">
                <div className="hidden">{paymentMethod}</div><div style={{display:"flex", color:"gray"}}><Image width={120} height={40} alt="Mpesa" src="https://res.cloudinary.com/dddx5qpji/image/upload/q_100/v1667278803/lipanampesa-removebg-preview_ljrcyk.png"></Image></div>
              </div>   
          </div>
          <div className={classes.mideaSmallBannerResp} style={{marginTop: 15}}>
            <div className="border-t-gray-200 bg-white border-t-8 sm:border-t-white sm:border-t-0 sm:bg-slate-100">
            </div>
          </div>
          <div className="grid justify-center" >
              <div className="home-ft w-full justify-self-stretch">
                Order Items
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
                                  {item.name.length > 25 ? (<p>{item.name.slice(0, 25).concat(" ", "."," ","."," ",".")}</p>) : (<p>{item.name}</p>)}
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
        </Grid>

        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography variant="h2">Order Summary</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Items:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right" style={{display: !show ? "block" : "none"}}>KSh.{itemsPrice}</Typography>
                    <Typography align="right" style={{display: !show ? "none" : "block", fontWeight:"bold", color:"orangered"}}><s>KSh.{itemsPrice}</s></Typography>
                  </Grid>
                </Grid>
              </ListItem>
              {!show && cartItems.length > 4 && <ListItem>
                <Button
                  onClick={handleShow}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Get a bundle price 🎁
                </Button>
              </ListItem>}
              {show && <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography><strong>Bundle price:</strong></Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right"><strong>KSh.{bundlePrice}</strong></Typography>
                  </Grid>
                </Grid>
              </ListItem>}
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Vat :</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">KSh.{taxPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Shipping:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">KSh.{shippingPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Total:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      <strong style={{display: !show ? "block" : "none"}}>KSh.{oldTotalPrice}</strong>
                      <strong style={{display: !show ? "none" : "block", fontWeight:"bold", color:"orangered"}}><s>KSh.{oldTotalPrice}</s></strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              {show && 
              <div>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>Total:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        <strong>KSh.{totalPrice}</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {cartItems.length > 4 && <ListItem>
                  <Button
                    onClick={handleOpenNormalOP}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Place Order
                 </Button>
                </ListItem>}
              </div>}
              {cartItems.length < 5 && <ListItem>
                <Button
                  onClick={handleOpenNormalOP}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Place Order
                </Button>
              </ListItem>}
              {loading && (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
      {normalorderP && <Pay/>}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });