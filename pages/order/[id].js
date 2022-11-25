import React, { useContext, useEffect, useReducer, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Store } from '../../utils/Store';
import Link from 'next/link';
import Image from 'next/image'; 
import db from '../../utils/db';
import Categorythumbnail from '../../models/Categorythumbnail';
import {
  Grid,
  IconButton,
  Typography,
  TextField,
  CircularProgress,
  Button,
  Card,
  List,
  InputBase,
  ListItem,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import useStyles from '../../utils/styles';
import { useSnackbar } from 'notistack';
import { getError } from '../../utils/error';
import ClearIcon from '@mui/icons-material/Clear';
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Pagination} from 'swiper';
import CopyAllIcon from '@mui/icons-material/CopyAllSharp';
import copy from "copy-to-clipboard";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    case 'PAY_REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY_SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY_FAIL':
      return { ...state, loadingPay: false, errorPay: action.payload };
    case 'PAY_RESET':
      return { ...state, loadingPay: false, successPay: false, errorPay: '' };
    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false, errorDeliver: action.payload };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
        errorDeliver: '',
      };
    default:
      state;
  }
}

function Order({ params }) {
  
  const orderId = params.id;
  const [{ isPending }] = usePayPalScriptReducer();
  const classes = useStyles();
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;
  
  

  const [
    { loading, error, order, successPay, loadingDeliver, successDeliver },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    bundlePrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    oldTotalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;
   
  useEffect(() => {
    if (!userInfo) {
      return router.push('/login');
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        setValue('totalPrice', data.totalPrice);
        setValue('oldTotalPrice', data.oldTotalPrice);
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY_RESET' });
      }
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }
    }

  }, [order, successPay, successDeliver, orderId, router, userInfo]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  async function deliverOrderHandler() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' });
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'DELIVER_SUCCESS', payload: data });
      enqueueSnackbar('Order is delivered', { variant: 'success' });
    } catch (err) {
      dispatch({ type: 'DELIVER_FAIL', payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  }
  async function payOrderHandler() {
    try {
      dispatch({ type: 'PAY_REQUEST' });
      const { data } = await axios.put(
        `/api/orders/${order._id}/pay`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'PAY_SUCCESS', payload: data });
      enqueueSnackbar('Payment is complete', { variant: 'success' });
    } catch (err) {
      dispatch({ type: 'PAY_FAIL', payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  }

  const [isClicked, setIsClicked] = useState(false);

  const mylink = window.location.href;
  const copyToClipboard = () => {
    copy(mylink);
    alert(`Link copied 🥳 `)
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const editConfirm = () => {
    if(!window.confirm('Are you sure?')){
      return;
    }
    setIsClicked(current => !current);
  }
  const submitHandler = async ({
          totalPrice,
          oldTotalPrice,
  }) => {
    closeSnackbar();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/orders/${order._id}/updateDiscounted`,
        {
          totalPrice,
          oldTotalPrice,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      enqueueSnackbar('Product updated successfully', { variant: 'success' });
      router.push('/admin/orders');
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  const [showOverlay, setShowOverlay] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handlePay = () =>{
    setIsChecked(current => !current);
  };
  return (
    <Layout title={`Order ${orderId}`}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography className={classes.error}>{error}</Typography>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <div style={{backgroundColor:"#f1f5f9", marginTop:20}}className={classes.section}>
              <List>
                <div className="home-ft ml-8" style={{fontFamily:"Arial Black", textAlign:"left", fontSize:15}}>
                   My Order
                </div>
                <div className="block pl-8 text-xs">
                  <div style={{display:"flex", color:"gray"}}>
                    <b>Address:</b>
                    <div className="ml-2">{shippingAddress.firstName} {shippingAddress.lastName}, {shippingAddress.county}, {shippingAddress.dropstation}, {shippingAddress.phoneNumber}</div></div>
                  <div style={{display:"flex", color:"gray"}}>
                    <b>Products:</b>
                    <div className="ml-2 block">
                      {orderItems.map((item) => (
                        <div className="flex" key={item}>
                          {item.name}, {item.quantity}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </List>
            </div>
            <div style={{backgroundColor:"#f1f5f9", marginTop:20}}className={classes.section}>
              <List>
                <div className="home-ft ml-8" style={{fontFamily:"Arial Black", textAlign:"left", fontSize:15}}>
                   Payment
                </div>
                <ListItem><div style={{display:"flex", color:"gray"}}><Image width={120} height={40} alt="Mpesa" src="https://res.cloudinary.com/dddx5qpji/image/upload/q_100/v1667278803/lipanampesa-removebg-preview_ljrcyk.png"></Image></div></ListItem>
                <ListItem className="text-xs" style={{color:"gray"}}>
                  <b className="pl-4">Status:</b>{' '} {isPaid ? (<div className="payStatus"><b className="text-base pr-1">Paid</b>✓</div>) 
                    : (<div className="flex pending">Pending Approval<div className="pending-btn"></div><div className="pending-btn"></div><div className="pending-btn"></div></div>)}
                </ListItem>
                <ListItem className="text-xs" style={{color:"gray"}}>
                  <b className="pl-4">Approved at:</b>{' '} {isPaid ? (<div className="pending">{paidAt}</div>)
                  :  (<div className="flex pending">Pending<div className="pending-btn"></div><div className="pending-btn"></div><div className="pending-btn"></div></div>)}
                </ListItem>
              </List>
            </div>
            <div style={{backgroundColor:"#f1f5f9", marginTop:20}}className={classes.section}>
              <List>
                <div className="home-ft ml-8" style={{fontFamily:"Arial Black", textAlign:"left", fontSize:15}}>
                   Delivery
                </div>
                <ListItem className="text-xs" style={{color:"gray"}}>
                  <b className="pl-4" >Out For Delivery:</b>{' '}
                  {isDelivered
                    ? (<div className="payStatus">✓</div>)
                    : (<div className="flex pending">Pending<div className="pending-btn"></div><div className="pending-btn"></div><div className="pending-btn"></div></div>)}
                </ListItem>
                <ListItem className="block pl-8 text-xs" style={{color:"gray"}}>
                  <b className="pl-4">Percel released at:</b>{' '}
                  {isDelivered
                    ? (<div className="pending">{`${deliveredAt}`}</div>)
                    : (<div className="flex pending">Pending<div className="pending-btn"></div><div className="pending-btn"></div><div className="pending-btn"></div></div>)}
                </ListItem>
              </List>
            </div>
            <div className={classes.mideaSmallBannerResp} style={{marginTop: 15}}>
              <div className="border-t-gray-200 bg-white border-t-8 sm:border-t-white sm:border-t-0 sm:bg-slate-100">
              </div>
            </div>            
            <Card className="hidden">
              <List>
                <ListItem>
                  <div style={{color:"#737373"}} className={classes.fullWidth}>
                    <div className="text-center leading-7 mt-2">
                       <b>Offer only for products with <div style={{float:"none"}} className="loves"> B </div> option.</b> 
                     </div>
                    
                      <ListItem>
                        <InputBase
                          value={mylink}
                          name="query"
                          style={{borderRadius:"50px 0 0 50px",width:"100%", boxShadow: "0 2px 5px 1px rgb(64 60 67 / 50%)"}}
                        />
                        <IconButton
                            onClick={copyToClipboard}
                            className={classes.iconButton}
                            style={{zIndex:10, paddingRight:"10px", borderRadius:"0px 50px 50px 0px",boxShadow: "0 2px 5px 1px rgb(64 60 67 / 50%)"}}
                          >
                            <CopyAllIcon/>
                          </IconButton>
                      </ListItem>
                  </div>
                </ListItem>
                <ListItem>
                  <Link href="">
                  <div className={classes.burgainButton}>
                    <div style={{backgroundColor:"black", color:"white"}} className="loves"> B<i style={{color:"white", padding:"8px", fontSize:"25px", borderRadius:"50px", margin:"4px", backgroundColor:"#30d04a"}} className="fa fa-whatsapp whatsapp-icon"></i>RGAIN</div> 
                  </div>
                  </Link>
                </ListItem>
              </List>
            </Card>

          </Grid>
          <Grid item md={3} className="bg-slate-100" xs={12}>
            <Card className={classes.section} style={{margin:15}}>
              <div className="home-ft w-full justify-self-stretch">
                Order Items
              </div> 
                  <Swiper    
                    breakpoints={{
                      100: {
                         slidesPerView: 1.3,
                       },
                      640: {
                         slidesPerView: 2.3,
                      }, 
                      960: {
                         slidesPerView: 1.3,
                      },  

                    }}
                    style={{
                      "--swiper-navigation-color": "#fff",
                      "--swiper-pagination-color": "#fff",
                    }}
                    pagination={{
                      type: "fraction",
                    }}
                      modules={[Pagination, FreeMode, Navigation]}
                      spaceBetween={10} 
                      loop={true}          
                      navigation={true}
                      className="mt-3 mySwiper"
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log('slide change')}
        
                  >
                    {orderItems.map((item) =>(
                      <SwiperSlide key={item._id}>
                        <Image
                          src={item.image[0]}
                          alt={item.name}
                          width={600}
                          height={888}
                        ></Image>
                       </SwiperSlide>
                     ))
                    }
                  </Swiper>
              <List>
                <div className="home-ft" style={{fontFamily:"Arial Black", textAlign:"center", fontSize:15}}>
                   Order Summary
                </div>
                {!bundlePrice && <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Items:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right" >Ksh.{itemsPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>}
                {bundlePrice && <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography><strong>Bundle price:</strong></Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right"><strong>Ksh.{bundlePrice}</strong></Typography>
                    </Grid>
                  </Grid>
                </ListItem>}
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Vat:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">Ksh.{taxPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Shipping:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">Ksh.{shippingPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {oldTotalPrice && <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>Total:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        <strong style={{fontWeight:"bold", color:"orangered"}}><s>Ksh.{oldTotalPrice}</s></strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>}
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>Total:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        <strong>Ksh.{totalPrice}</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {userInfo.isAdmin && !order.oldTotalPrice && (  
                <div>
                <ListItem style={{display:"none"}}>
                  <Button
                      className={isClicked ? classes.ndicatenone :classes.ndicatetrue}
                      style={{backgroundColor:"#222", color:"#30d04a"}}
                      fullWidth
                      variant="contained"
                      onClick={editConfirm}
                    >
                      Edit TotalPrice
                  </Button>
                </ListItem>
                <ListItem className={isClicked ? classes.ndicatetrue :classes.ndicatenone }>
                  <div>
                    <ClearIcon

                      style={{color:"black", float:"right"}}
                      onClick={editConfirm}
                    />
                  </div>
                  <div>
                     <form onSubmit={handleSubmit(submitHandler)} className={classes.reviewForm}>
                      <List>
                        <ListItem>
                          <Controller
                            name="totalPrice"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                              render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="totalPrice"
                                label="totalPrice"
                                error={Boolean(errors.distinct)}
                                helperText={
                                  errors.totalPrice ? 'TotalPrice is required' : ''
                                }
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="oldTotalPrice"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                              render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="oldTotalPrice"
                                label="oldTotalPrice"
                                error={Boolean(errors.distinct)}
                                helperText={
                                  errors.oldTotalPrice ? 'Old TotalPrice is required' : ''
                                }
                                {...field}
                              ></TextField>
                            )}
                            ></Controller>
                          </ListItem>
                        <ListItem>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                          >
                            update
                          </Button>
                         {loading && <CircularProgress></CircularProgress>}
                        </ListItem>
                      </List>
                    </form>
                  </div>
                </ListItem>
                </div>
                )}
                {!isPaid && (
                  <ListItem>
                    {isPending ? (
                      <CircularProgress />
                    ) : (
                    <div className={classes.fullWidth}>
                    <Button
                       fullWidth
                       variant="contained"
                       className={ classes.mpesa }
                       onClick={() => setShowOverlay(true)}
                      >
                        m<Image height={50} width={50} alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1663845421/enjigpi6eaag5naxfglf.png"></Image> pesa
                    </Button>
                    </div>
                    )} 
                  </ListItem>
                )}
                {showOverlay && 
                  <div className="cart-wrapper">
                    <div className="w-full h-full flex justify-center place-items-center">
                      <div style={{width:"80vw", height:"fit-content", borderRadius:10, backgroundColor:"#f1f5f9"}}>
                        <div className="p-10">
                          <div style={{padding:10, backgroundColor:"#f1f5f9"}}>We will redirect you to another webpage(tujenge.io) for payment</div>  
                          <div style={{padding:10, marginTop:10, backgroundColor:"#f1f5f9"}}>
                            <p>Payment Approval takes 1 to 2 hours to be verified on your Order History</p>
                            <p>However if confirmation is delayed, you can always call us on +254105705441 or whatsapp us by clicking the whatsapp button at the bottom of the screen 😊 </p> 
                            <p>Your order is delivered between same day to 2 business days</p>
                          </div>
                          <label htmlFor="">
                            <input
                              type="checkbox"
                              value={isChecked}
                              onChange={handlePay}
                            />
                            I Agree
                          </label>
                            <Link href="https://tujenge.io/collection-link/1291f110-5a02-11ed-a9d8-8dc55ea47dd3">
                          <Button
                            fullWidth
                            variant="contained"
                            disabled={!isChecked}
                            className={ classes.mpesa }
                          >
                              m<Image height={50} width={50} alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1663845421/enjigpi6eaag5naxfglf.png"></Image> pesa
                          </Button>
                            </Link>
                        </div>
                      </div>
                      <div className="absolute p-5" style={{bottom:0, right:0}}>
                        <Link href="https://wa.me/message/LLYAJG6L323CP1">
                          <i style={{color:"white", padding:"10px 11px", fontSize:"30px", borderRadius:"50px", margin:"4px", backgroundColor:"#30d04a"}} className="fa fa-whatsapp whatsapp-icon"></i>
                        </Link>
                      </div>
                    </div> 
                  </div>
                }
                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListItem>
                    {loadingDeliver && <CircularProgress />}
                    <Button 
                      style={{backgroundColor:"#222", color:"#30d04a"}}                    
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={deliverOrderHandler}
                    >
                      Deliver Order
                    </Button>
                  </ListItem>
                )}
                {userInfo.isAdmin && !order.isPaid&& (
                  <ListItem>
                    {loadingDeliver && <CircularProgress />}
                    <Button
                      style={{backgroundColor:"#222", color:"#30d04a"}}
                      fullWidth
                      variant="contained"
                      onClick={payOrderHandler}
                    >
                      Approve Pay
                    </Button>
                  </ListItem>
                )}
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  await db.connect();
  const categorythumbnails = await Categorythumbnail.find().lean();

  return { 
    props: { 
      params,
      categorythumbnails: categorythumbnails.map(db.convertDocToObj),

   } };
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
