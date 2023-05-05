import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import {
  Grid,
  Typography,
  TextField,
  CircularProgress,
  Button,
  List,
  ListItem,
} from '@material-ui/core';
import { Navigation, FreeMode, Thumbs, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductItems from './OrderProducts';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { getError } from '../../utils/error';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function OrderId({ order, classes, userInfo }) {

  const [openId, setOpenId] = useState(false);
  const  handeOpenId = () => {
    console.log("about to open");
    setOpenId(true);
    console.log("opened");
  }
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [load, setLoad] = useState(false);
  
  async function deliverOrderHandler() {
    setLoad(true);
    try {
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      const { message } = await axios.put(
        `/api/orders/${order._id}/${userInfo._id}`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      setLoad(false);
      enqueueSnackbar('Order is delivered', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  }


  return (
    <div>
      <button
        onClick={handeOpenId}
        style={{color: 'white', padding: '4px 15px', borderRadius: 5, backgroundColor: '#222'}}
       >
        View 
      </button>
	    <div style={{ display: openId ? 'block' : 'none', color: 'black' }}>
	      <div className={classes.smseachbg}
          style={{position: "fixed", left: 0, zIndex: 1210, top: 0, background: 'white',  width: "100vw", height: "100vh"}}
         >
          <div style={{backgroundColor: "rgba(255, 255, 255, 0.9)", position: "sticky", top: 0, zIndex: "10"}} className={classes.reviewTopTab}>
            <ArrowBackIosIcon onClick={() => {setOpenId(false)}} sx={{ float:"left" }} /> 
            <div className="flex justify-center">
              My Order
            </div>
          </div>
          <div style={{height: 'calc(100vh - 54px)', overflowY: 'scroll', width: '100vw', backgroundColor: 'white'}} className="OrderIdgrids">
            <div className="idswidth">
              <div className=" bordererIds">
                <div className="grid profileborder">
                  <div style={{ maxWidth: 300, justifySelf: 'center' }}>
                    <div className="w-full text-center text-lg p-4">
                      <b> Address </b>
                    </div>
                    <List >
                      <ListItem style={{fontSize: 10}}>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography><b>Name:</b></Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right">{order.shippingAddress.firstName + ' ' + order.shippingAddress.lastName}</Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography><b className="pr-16">Contacts:</b></Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="center">{order.shippingAddress.phoneNumber}</Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography>
                              <strong><b className="pr-8">Pickup Station:</b></strong>
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="center" >
                              {order.shippingAddress.county + ', ' + order.shippingAddress.dropstation}
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </List>
                  </div>
                </div>
              </div>
              <div className="Idgridhidden bordererIds">
                <div style={{ paddingTop: 4 }} className="p-8 profileborder">
                  <div className="w-full text-center text-lg p-4">
                    <b> Ordered Items {order.orderItems.length} </b>
                  </div>
                  <Swiper                    
                    breakpoints={{
                      100: {                  
                         slidesPerView: 1.1,
                      },

                      450: {
                         slidesPerView: 1.4,
                      }            
                    }}
        
                      modules={[FreeMode, Navigation, Pagination, Autoplay, Thumbs]}
                      spaceBetween={10}           
                      loop={false}
                      navigation= {true}
                      centeredSlides={false}
                       style={{ maxWidth: 1100, borderRadius: 20 }}
                      className="swipereactor"
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log('slide change')}
          
                  >
      
                   {order.orderItems.map((product) =>(
                     <SwiperSlide style={{ backgroundColor: 'white', borderRadius: 20}} key={product}>
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
              <div className=" bordererIds">
                <div className="grid profileborder">
                  <div style={{ maxWidth: 250, justifySelf: 'center' }}>
                    <div className="w-full text-center text-lg p-4">
                      <b> Pricing </b>
                    </div>
                    <List>
                      {!order.bundlePrice && <ListItem>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography><b>Items:</b></Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right" >Ksh.{order.itemsPrice}</Typography>
                          </Grid>
                        </Grid>
                      </ListItem>}
                      {order.bundlePrice && <ListItem>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography><strong>Bundle price:</strong></Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right"><strong>Ksh.{order.bundlePrice}</strong></Typography>
                          </Grid>
                        </Grid>
                      </ListItem>}
                      <ListItem>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography><b>Vat:</b></Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right">Ksh.{order.taxPrice}</Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography><b className="pr-16">Shipping:</b></Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right">Ksh.{order.shippingPrice}</Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                      {order.oldTotalPrice && <ListItem>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography>
                              <strong><b>Total:</b></strong>
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right">
                              <strong style={{fontWeight:"bold", color:"orangered"}}><s>Ksh.{order.oldTotalPrice}</s></strong>
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItem>}
                      <ListItem>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography>
                              <strong><b>Total:</b></strong>
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right">
                              <strong>Ksh.{order.totalPrice}</strong>
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </List>
                  </div>
                </div>
              </div>
              {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
                <ListItem style={{marginBottom: 12}}>
                  {load && <CircularProgress />}
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
            </div>
            <div className="Idgridshow" >
              <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.12)', margin: 15, height:"calc(100vh - 84px)", position: 'fixed', top: 52, overflowX: "hidden"}}>
                <div className="w-full bg-white">
                  <div style={{ border: '15px solid rgba(0, 0, 0, 0.12)'}} className=" text-center text-lg p-4">
                    <b> Ordered Products </b>
                  </div>
                </div>
                <div className='p-4 grid grid-cols-1 gap-col-4 gap-y-3 md:grid-cols-2 lg:grid-cols-3'>
                  {order.orderItems.map((product) => (
                    <ProductItems
                      key={product._id}
                      product={product}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>  
	    </div>  
    </div>  
  )
}

export default OrderId