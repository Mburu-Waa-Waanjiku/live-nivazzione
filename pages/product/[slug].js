import axios from 'axios'; 
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import Product from '../../models/Product';
import Tabsbottom from '../../components/Tabsbottom';
import db from '../../utils/db';
import { Store } from '../../utils/Store';
import ClearIcon from '@mui/icons-material/Clear';
import useStyles from '../../utils/styles';
import { getError } from '../../utils/error';
import Rating from '@material-ui/lab/Rating';
import ProductNocart from '../../components/ProductNocart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import { FaTruckMoving } from 'react-icons/fa';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIosRounded';

import { Typography, ListItem, List, TextField, Button, CircularProgress, Grid, } from '@material-ui/core';
import { Navigation, FreeMode, Thumbs, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSnackbar } from 'notistack';
 
import 'swiper/css'

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default function ProductScreen(props) {
  const [showOverlay, setShowOverlay] = useState(false);
   const classes = useStyles();

  const { product, similarProds, Reviews } = props;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { enqueueSnackbar } = useSnackbar();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);


  
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `/api/products/${product._id}/reviews`,
        {
          rating,
          comment,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      setLoading(false);
      enqueueSnackbar('Review submitted successfully', { variant: 'success' });
      setShowOverlay(false)
    } catch (err) {
      setLoading(false);
      enqueueSnackbar('Please fill both the comment & rating 🙂', { variant: 'error' });
    }
  };

  if (!product) {
    return <Layout title="Produt Not Found">Produt Not Found</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  return (
    <>
      <Layout title={product.name} description={product.description}
              content="Get {product.name} and more at from as low as {product.price}"
      >
      <div className="mt-9 grid grid-cols-1 md:grid-cols-12 md:gap-4">
        <div className="col-span-1 md:col-span-5 md:col-start-2">
           <div layout="responsive" style={{maxWidth:420}} >
           <>
             <Swiper
               style={{
               "--swiper-navigation-color": "#fff",
               "--swiper-pagination-color": "#fff",
             }}
                pagination={{
                  type: "fraction",
                }}
                modules={[Pagination, FreeMode, Navigation, Thumbs]}
                spaceBetween={2}
                slidesPerView={1.05}
                loop={true}
                navigation={true}
             onSwiper={(swiper) => console.log(swiper)}
             onSlideChange={() => console.log('slide change')}
            >
              {product.image?.map((item) => ( 
                <SwiperSlide key={item} >
                  <Image key={item} width={400} height={530} alt={product.name} className="bg-gray-100 g-images-child"
                    src={(item)}
                  />
                </SwiperSlide >
              ))}
             </Swiper>
             <Swiper
               spaceBetween={10}
               slidesPerView={5}
               className="hidden sm:block"
               freeMode={true}
               watchSlidesProgress={true}
               modules={[FreeMode, Navigation, Thumbs]}
        
             >
               {product.image?.map((item) => ( 
                <SwiperSlide key={item}>
                  <Image key={item} width={364} height={484} alt={product.name} className="bg-gray-100 g-images-child"
                    src={(item)}
                  />
                </SwiperSlide >
              ))}
             </Swiper>
           </>
           </div>
        </div>
        <div className="col-span-1 md:col-span-5 md:col-start-7">
        <div>
         <h3>{product.name}</h3>
         {product.isOnoffer && <div className="slug-gallery" style={{padding:"5px 0", fontSize:19, color:"orangered"}}><s>Ksh.{product.prevprice}</s></div>}
         <div className="slug-gallery" style={{padding:"5px 0"}}>Ksh.{product.price}</div>
         <div className={classes.textSml}>
           <b style={{flexGrow: "inherit"}}>Details</b>
           <div className="reviews">
              <Rating className={classes.textSmla} value={product.rating} readOnly></Rating>
              <Typography className={classes.textSml} >({product.numReviews} reviews)</Typography>
           </div>
         </div>
        <div className="pl-5">
          <div>  Brand: {product.brand}</div>
          </div> 
        </div>
        <div className="mt-5">
          <div className="card bs p-5">
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In stock' : 'Out of Stock'}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add To Cart
            </button>
          </div>
        </div>
        <div className="bg-slate-100">
          <div className=" mt-4 mx-6" style={{fontSize:"0.875rem", fontWeight:"1000", padding:"5px 0"}}>
            Shipping 
          </div>
          <div className="flex justify-between mx-6 py-1">
            <div className="flex">
              <FaTruckMoving style={{fontSize:20}}/>
              <div className="ml-3 self-center">Chek your shipping drop station</div>
            </div>
            <div className=" self-center"><ArrowForwardIosIcon style={{fontSize:12}}/></div>
          </div>
          <div className="mx-6 my-3">
            <Image width={500} height={83} alt="" className="bg-gray-100" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1667233530/ezgif.com-gif-maker_1_fx3ey6.gif"></Image>
          </div>
        </div> 
        <div className="bg-slate-100">
          <div className=" mt-2 mx-6" style={{fontSize:"0.875rem", fontWeight:"1000", padding:"5px 0"}}>
            Return 
          </div>
          <div className="flex justify-start mx-6 py-1">
            {product.isOnoffer ? (<div>This product cannot be returned due to promotional activities</div>) : (<div>This product can only be returned if it is defective on delivery</div>)}
          </div>
        </div> 
        </div>
      </div>
      {product.gallery.length > 0 && <div className="mt-5">
      <div className="slug-gallery">Style Gallery</div>
       <div className="g-images">
          {product.gallery?.map((item) => ( 
            <Image key={item} width={182} height={242} alt="Style Gallery" className="bg-gray-100 g-images-child"
                  onClick={() => setShowOverlay(true)}
                  
                  src={(item)}
                  />
                  ))}
          {showOverlay && <div className="cart-wrapper">
                             <div className="Overlay-wrapper">
                                 <div className="cancel-m p-2 absolute right-2 top-2">
                                    <ClearIcon  onClick={() => setShowOverlay(false)}/>
                                 </div>
                            
                             <div className="pt-16 pb-16 ">
                                
                                <Swiper
                                   style={{
                                   "--swiper-navigation-color": "#fff",
                                   "--swiper-pagination-color": "#fff",
                                    }}

      
                                   modules={[FreeMode, Navigation, Thumbs]}
                                   spaceBetween={2}
                                   slidesPerView={1}
                                   navigation={true}
                                   pagination={true}
                                   className="bg-gray-100"
                                   onSwiper={(swiper) => console.log(swiper)}
                                   onSlideChange={() => console.log('slide change')}
                                >
                                  {product.gallery?.map((item) => (
                                    <SwiperSlide key={item}><Image width={6} height={8} layout="responsive" alt="Style Gallery" src={(item)}/></SwiperSlide> 
                                  ))}
                                </Swiper>
                                
                             </div>
                          </div> 
                      </div>
                  }
       </div>
      </div>}
      <div className={classes.mideaSmallBannerResp} style={{marginTop: 15}}>
        <div className="border-t-gray-200 bg-white border-t-8 sm:border-t-white sm:border-t-0 sm:bg-slate-100">
        </div>
      </div>
      <div className="mt-5">
         <div className="slug-gallery">Customer Reviews({product.numReviews}) </div>
      </div>
      <div className={classes.reviewBody}>
      {Reviews.length === 0 && <ListItem>No reviews yet</ListItem>}
        {Reviews.slice(-2).map((review, index) => (
          <ListItem key={index}>
            <Grid container>
              <Grid item className={classes.reviewItem}>
                <Typography>
                  <strong>{review.name}</strong>
                </Typography>
                <Typography>{review.createdAt.substring(0, 10)}</Typography>
              </Grid>
              <Grid item>
                <Rating value={review.rating} readOnly></Rating>
                <Typography>{review.comment}</Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </div>
      {Reviews.length > 2 ? (<div className={classes.reviewSeeMore} onClick={() => setShowOverlay(true)}>See More</div>) : (<div className={classes.reviewSeeMore} onClick={() => setShowOverlay(true)}>Add a review</div>)}
      <div className={showOverlay ? classes.reviewAllBody : classes.ndicatenone}>
         <div className={classes.reviewTopTab}>
          <ArrowBackIosIcon onClick={() => setShowOverlay(false)} sx={{fontSize:10, float:"left",}} /> Reviews
         </div>
         {Reviews.map((review) => (
          <ListItem key={review._id}>
            <Grid container>
              <Grid item className={classes.reviewItem}>
                <Typography>
                  <strong>{review.name}</strong>
                </Typography>
                <Typography>{review.createdAt.substring(0, 10)}</Typography>
              </Grid>
              <Grid item>
                <Rating value={review.rating} readOnly></Rating>
                <Typography>{review.comment}</Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
        <ListItem className={classes.addRev}>
          {userInfo ? (
            <form onSubmit={submitHandler} className={classes.reviewForm}>
              <List>
                <ListItem>
                  <Typography variant="h2">Leave your review</Typography>
                </ListItem>
                <ListItem>
                 <div className="grow">
                  <TextField
                    multiline
                    variant="outlined"
                    className="w-full"
                    name="review"
                    label="Enter comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                 </div>
                 <div className="ml-5">
                  <Button
                    type="submit"
                    className="w-5 h-10"
                    variant="contained"
                    color="primary"
                  >
                    Post
                  </Button>

                  {loading && <CircularProgress></CircularProgress>}
                 </div>
                </ListItem>
                <ListItem>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </ListItem>
              </List>
            </form>
          ) : (
            <Typography variant="h2">
              Please{' '}
              <Link href={`/login?redirect=/product/${product.slug}`}>
                login
              </Link>{' '}
              to write a review
            </Typography>
          )}
        </ListItem>
      </div>
      <div className={classes.mideaSmallBannerResp} style={{marginTop: 30}}>
        <div className="border-t-gray-200 bg-white border-t-8 sm:border-t-white sm:border-t-0 sm:bg-slate-100">
        </div>
      </div>
      <div className="mt-4">
         <div className="slug-gallery">You May Also Like </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
         {similarProds.map((product) => (
                            <ProductNocart
                             product={product}
                             key={product.slug}
                             addToCartHandler={addToCartHandler}
                             ></ProductNocart>
                        ))}
      </div>
      <Tabsbottom/>
      </Layout>
    </> 

  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }, '-reviews').lean();
  const Reviews = await Product.find({ slug }).distinct('reviews');
  const similar = await Product.find({slug}).distinct('distinctCateg');
  const similarProds = await Product.find({slug: similar} , '-reviews').lean();

  await db.disconnect();


  return {
  props: { 
          product: product && db.convertDocToObj(product),
          Reviews: Reviews.map(db.convertRevDocToObj), 
          similarProds: similarProds.map(db.convertDocToObj),

  },
 };
}