import React, { useContext, useEffect, useReducer, useState } from 'react';
import dynamic from 'next/dynamic';
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
import { useRouter } from 'next/router';
import useStyles from '../../utils/styles';
import { useSnackbar } from 'notistack';
import { getError } from '../../utils/error';
import ClearIcon from '@mui/icons-material/Clear';
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, } from 'swiper';
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

  }, [order, successPay, successDeliver, orderId, router, userInfo, setValue]);
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
  return (
    <Layout title={`Order ${orderId}`}>
      <div className={classes.smseach}>
          
        </div>
      
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography className={classes.error}>{error}</Typography>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem> 
                  <Typography component="h2" variant="h2">
                    Shipping Address
                  </Typography>
                </ListItem>
                <ListItem>
                  {shippingAddress.fullName}, {shippingAddress.address},{' '}
                  {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                  {shippingAddress.country}
                  &nbsp;
                  {shippingAddress.location && (
                    <Link
                      variant="button"
                      target="_new"
                      href={`https://maps.google.com?q=${shippingAddress.location.lat},${shippingAddress.location.lng}`}
                    >
                      Show On Map
                    </Link>
                  )}
                </ListItem>
                <ListItem>
                  <b>Deliverey:</b>{' '}
                  {isDelivered
                    ? (<div className="payStatus">✓</div>)
                    : (<div className="flex pending">Pending<div className="pending-btn"></div><div className="pending-btn"></div><div className="pending-btn"></div></div>)}
                </ListItem>
                <ListItem>
                  <b>Percel released at:</b>{' '}
                  {isDelivered
                    ? (<div className="pending">{`${deliveredAt}`}</div>)
                    : (<div className="flex pending">Pending<div className="pending-btn"></div><div className="pending-btn"></div><div className="pending-btn"></div></div>)}
                </ListItem>
              </List>
            </Card>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component="h2" variant="h2">
                    Payment Method
                  </Typography>
                </ListItem>
                <ListItem>{paymentMethod}</ListItem>
                <ListItem>
                  <b className="mr-4">Status:</b>{' '} {isPaid ? (<div className="payStatus"><b className="text-base pr-1">Paid</b>✓</div>) 
                    : (<div className="flex pending">Pending<div className="pending-btn"></div><div className="pending-btn"></div><div className="pending-btn"></div></div>)}
                </ListItem>
                <ListItem>
                  <b>Approved at:</b>{' '} {isPaid ? (<div className="pending">{paidAt}</div>)
                  :  (<div className="flex pending">Pending<div className="pending-btn"></div><div className="pending-btn"></div><div className="pending-btn"></div></div>)}
                </ListItem>

              </List>
            </Card>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography component="h2" variant="h2">
                    Order Items
                  </Typography>
                </ListItem>
                <ListItem>
                
                  <Swiper    
                    breakpoints={{
                      100: {
                         width: 320,
                         slidesPerView: 1.7,
                       },
                      640: {
                         width: 640,
                         slidesPerView: 2.4,
                      }, 
                      1000: {
                         width: 640,
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
                 
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log('slide change')}
        
                  >
                    {orderItems.map((item) => (
                      <SwiperSlide key={item._id}>
                        <div style={{borderRadius:"10px",margin:"0 3px 5px 3px" , boxShadow: "0 2px 5px 1px rgb(64 60 67 / 50%)"}}>
                        <div className="gallery">
                          <div>
                              <Image
                                src={item.image[0]}
                                alt={item.name}
                                width={372}
                                height={484}
                              ></Image>
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
              </ListItem>
              </List>
            </Card>
            <Card>
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
                      <Typography align="right">Ksh.{itemsPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Tax:</Typography>
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
                {order.oldTotalPrice && (  
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography style={{color:"red"}}>
                        <strong>Undiscounted:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right" style={{color:"red"}}>
                        <strong><s>Ksh.{oldTotalPrice}</s></strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                )}
                {userInfo.isAdmin && !order.oldTotalPrice && (  
                <div>
                <ListItem>
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
                    <Link href="https://tujenge.io/collection-link/dc970740-461e-11ed-b7ad-edf3f1fc7b62">
                    <Button
                       fullWidth
                       variant="contained"
                       className={ classes.mpesa }
                      >
                        m<Image height={50} width={50} alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1663845421/enjigpi6eaag5naxfglf.png"></Image> pesa
                    </Button>
                    </Link>
                    </div>
                    )} 
                  </ListItem>
                )}
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
