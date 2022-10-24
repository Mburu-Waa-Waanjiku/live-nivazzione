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

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function PlaceOrder() {
  const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    }
    if (!paymentMethod) {
      router.push('/shipping');
    }
    if (cartItems.length === 0) {
      router.push('/cart');
    }
  }, [cartItems.length, paymentMethod, router, shippingAddress.address]);
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const placeOrderHandler = async () => {
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
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  return (
    <Layout title="Place Order">
      <div className={classes.smseach}>
          
        </div>
      <Typography className="text-center" component="h1" variant="h1">
        Place Order
      </Typography>

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
                {shippingAddress.price}, {shippingAddress.dropstation},{' '}
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
                         slidesPerView: 4,
                      }, 
                      1000: {
                         width: 640,
                         slidesPerView: 6,
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
              <ListItem>
                <Button
                  onClick={placeOrderHandler}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Place Order
                </Button>
              </ListItem>
              {loading && (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>

    </Layout>
  );
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
