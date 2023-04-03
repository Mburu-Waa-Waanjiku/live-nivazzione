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
import ProductItems from '../me/OrderProducts';
import { useSnackbar } from 'notistack';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function OrderId({ orders, classes, userInfo, user }) {

  const [openId, setOpenId] = useState(false);
  const  handeOpenId = () => {
    setOpenId(true);
  }
  
  const [orderTab, setOrderTabs]= useState("All Orders");

  const inPersonOrders = orders.filter( x => 
    x.user._id == user._id  
  );
  const totalSpent = inPersonOrders.reduce((accumulator, object) => {
    return accumulator + object.totalPrice;
  }, 0);

  return (
    <div>
      {inPersonOrders.length > 0 && <button
        onClick={handeOpenId}
        style={{color: 'white', padding: '4px 15px', borderRadius: 5, backgroundColor: '#222'}}
       >
        {inPersonOrders.length} View >> 
      </button>}
      <div style={{ display: openId ? 'block' : 'none', color: 'black' }}>
        <div className={classes.smseachbg}
          style={{position: "fixed", left: 0, zIndex: 1210, top: 0, background: 'white',  width: "100vw", height: "100vh"}}
         >
          <div style={{backgroundColor: "rgba(255, 255, 255, 0.9)", position: "sticky", top: 0, zIndex: "10"}} className={classes.reviewTopTab}>
            <ArrowBackIosIcon onClick={() => {setOpenId(false)}} sx={{ float:"left" }} /> 
            <div className="flex justify-center">
              {user.name + 's Orders'+ ' ' + (inPersonOrders.length)}
            </div>
          </div>
          <div style={{height: 'calc(100vh - 54px)', overflowY: 'scroll', width: '100vw', backgroundColor: 'white'}} className="OrderIdgrids">
            <div className="idswidth">
              <div className=" bordererIds">
                <div className="grid profileborder">
                  <div style={{ maxWidth: 250, justifySelf: 'center' }}>
                    <div className="w-full text-center text-lg p-4">
                      <b> Summary </b>
                    </div>
                    <List>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography><b>User</b></Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right">{user.name}</Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography><b className="pr-16">Orders</b></Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right">{inPersonOrders.length}</Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={6}>
                            <Typography>
                              <strong><b>Spent:</b></strong>
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography align="right">
                              <strong>Ksh.{totalSpent}</strong>
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </List>
                  </div>
                </div>
              </div>
              <div className=" bordererIds">
                <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.2)', borderBottom: '1px solid rgba(0, 0, 0, 0.2)', backgroundColor: orderTab == "All Orders" ? 'rgba(0, 0, 0, 0.09)' : 'white'}} onClick={()=> {setOrderTabs('All Orders')}} className="w-full text-center text-lg p-4">
                  <b> All Orders </b>
                </div>
                {orderTab == "All Orders" && <div className="Idgridhidden w-full">
                  <div style={{ paddingTop: 4 }} className="p-8 profileborder">
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
      
                     {inPersonOrders.map((order) =>(
                      <>
                        {order.orderItems.map((product) =>(
                          <SwiperSlide style={{ backgroundColor: 'white', borderRadius: 20}} key={product._id}>
                            <ProductItems
                              product={product}
                              key={product}
                            />                         
                          </SwiperSlide>
                          ))
                        }
                      </>
                      ))
                     }
                    </Swiper>
                  </div>
                </div>}
              </div>
              {inPersonOrders.map((order) => (
                <div className=" bordererIds">
                  <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.2)', borderBottom: '1px solid rgba(0, 0, 0, 0.2)', backgroundColor: orderTab == order._id.toString() ? 'rgba(0, 0, 0, 0.09)' : 'white'}} onClick={()=> {setOrderTabs(order._id.toString())}} className="w-full text-center text-lg p-4">
                    <b> Order {inPersonOrders.map((o) => o._id).indexOf(order._id) + 1} </b>
                  </div>
                  {orderTab == order._id.toString() && <div className="Idgridhidden w-full">
                    <div style={{ paddingTop: 4 }} className="p-8 profileborder">
                      <div className="w-full text-center text-base p-2">
                        <b> {order.orderItems.length} Items </b>
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
                  </div>}
                </div>
                ))
              }
            </div>
            <div className="Idgridshow" >
              <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.12)', margin: 15, height:"calc(100vh - 84px)", position: 'fixed', top: 52, overflowX: "hidden"}}>
                <div className="w-full bg-white">
                  <div style={{ border: '15px solid rgba(0, 0, 0, 0.12)'}} className=" text-center text-lg p-4">
                    <b> Ordered Products </b>
                  </div>
                </div>
                {orderTab == "All Orders" && <div className='p-4 grid grid-cols-1 gap-col-4 gap-y-3 md:grid-cols-2 lg:grid-cols-3'>
                  {inPersonOrders.map((order) =>(
                    <>
                      {order.orderItems.map((product) =>(
                        <ProductItems
                          key={product._id}
                          product={product}
                        />
                        ))
                      }
                    </>
                    ))
                  }
                </div>}
                {inPersonOrders.map((order) =>(
                  <>
                    {orderTab == order._id.toString() && <div className='p-4 grid grid-cols-1 gap-col-4 gap-y-3 md:grid-cols-2 lg:grid-cols-3'>
                      {order.orderItems.map((product) =>(
                        <ProductItems
                          key={product._id}
                          product={product}
                        />
                        ))
                      }
                    </div>}
                  </>
                ))
                }
                  </div>
            </div>
          </div>
        </div>  
      </div>  
    </div>  
  )
}

export default OrderId