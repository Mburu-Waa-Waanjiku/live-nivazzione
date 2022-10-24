import axios from 'axios'; 
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import ProductItem from '../../components/ProductItem';

import { Typography, ListItem, List, TextField, Button, CircularProgress, Grid, } from '@material-ui/core';
import { Navigation, FreeMode, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSnackbar } from 'notistack';
 
import 'swiper/css'

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default function ProductScreen(props) {
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
   const classes = useStyles();

  const { product, similarProds } = props;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { enqueueSnackbar } = useSnackbar();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

const handleseeRev = () => {
    setIsClicked(current => !current);
  };

  
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
      fetchReviews();
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/products/${product._id}/reviews`);
      setReviews(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

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
    router.push('/cart');
  };

  return (
    <>
      <Layout title={product.name} description={product.description}>
      <div className={classes.smseach}>
          
        </div>
      <div className="pt-3 grid grid-cols-1 md:grid-cols-4 md:gap-3">
        <div className="col-span-1 md:col-span-2">
           <div layout="responsive" >
           <>
    <Swiper
            style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        
      modules={[FreeMode, Navigation, Thumbs]}
      spaceBetween={3}
      slidesPerView={1.05}
      loop={true}
      navigation={true}
      
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
    
       <SwiperSlide><Image width={364} height={484} layout="responsive" alt={product.name} src={product.image[0]}/></SwiperSlide>
      <SwiperSlide><Image width={364} height={484} layout="responsive" alt={product.name} src={product.image[1]}/></SwiperSlide>
      <SwiperSlide><Image width={364} height={484} layout="responsive" alt={product.name} src={product.image[2]}/></SwiperSlide>
      <SwiperSlide><Image width={364} height={484} layout="responsive" alt={product.name} src={product.image[3]}/></SwiperSlide>
    
    </Swiper>
    <Swiper
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        
      >
        <SwiperSlide > <Image width={364} height={484} layout="responsive" alt={product.name} src={product.image[0]}/></SwiperSlide>
        <SwiperSlide > <Image width={364} height={484} layout="responsive" alt={product.name} src={product.image[1]}/></SwiperSlide>
        <SwiperSlide > <Image width={364} height={484} layout="responsive" alt={product.name} src={product.image[2]}/></SwiperSlide>
        <SwiperSlide > <Image width={364} height={484} layout="responsive" alt={product.name} src={product.image[3]}/></SwiperSlide>
        
      </Swiper>
      </>
     
            </div>
            
        </div>
        <div>
         <h2 className="text-lg"><b>{product.name}</b></h2>
         <div className="reviews">
              <Rating value={product.rating} readOnly></Rating>
              <Link href="#reviews">
                <Typography>({product.numReviews} reviews)</Typography>
              </Link>
         </div>
         <div className="text-sm"><b>Details</b></div>
        <div className="details-size">
          <div>  Category: {product.category}</div>
          <div>  Brand: {product.brand}</div>
          <div className="flex"> <div className="pt-3">Sizes :</div>
                      <div> 
                        <div className="sizes">S</div>
                        <div className="sizes">M</div>
                        <div className="sizes">L</div>
                        <div className="sizes">XL</div>
                        <div className="sizes">2XL</div>
                        <div className="sizes">3XL</div>
                     </div>
          </div>
          <div className="text-sm"><b>Product Measurement</b></div>
            <div className="inline-block">{product.sizeS} </div>
            
       </div>

          
        </div>
        <div className="mt-5">
          <div className="card bs p-5">
            <div className="mb-2 font-bold font-sans flex justify-between">
              <div>Price</div>
              <div>Ksh{product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5">
      <div className="slug-gallery">Style Gallery</div>
      <div className="g-images">
          {product.gallery.length === 0 && <ListItem>No available styling gallery yet. </ListItem>}
          {product.gallery?.map((item) => ( 
            <Image key={item} width={182} height={242} alt="Style Gallery" className="g-images-child"
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
      </div>
      <div className="mt-5">
         <div className="slug-gallery">Customer Reviews </div>
      </div>
      <div className={isClicked ? classes.revBorderLess : classes.revBorder}>
      {reviews.length === 0 && <ListItem>New Product, No reviews yet.</ListItem>}
        {reviews.map((review) => (
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
      </div>
      <div className={classes.seemorewrapp}>
      <div onClick={handleseeRev} className={isClicked ? classes.ndicatenone :classes.seemore}> see more </div>
      <div onClick={handleseeRev} className={isClicked ? classes.seemore : classes.ndicatenone}> see less </div>
      </div>
      
        <ListItem>
          {userInfo ? (
            <form onSubmit={submitHandler} className={classes.reviewForm}>
              <List>
                <ListItem>
                  <Typography variant="h2">Leave your review</Typography>
                </ListItem>
                <ListItem>
                  <TextField
                    multiline
                    variant="outlined"
                    fullWidth
                    name="review"
                    label="Enter comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Add a review
                  </Button>

                  {loading && <CircularProgress></CircularProgress>}
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
      <div className="mt-4">
         <div className="slug-gallery">You May Also Like </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
         {similarProds.map((product) => (
                            <ProductItem
                             product={product}
                             key={product.slug}
                             addToCartHandler={addToCartHandler}
                             ></ProductItem>
                        ))}
      </div>
      <Tabsbottom/>
      </Layout>
    </> 

  );
}
export async function getStaticPaths() {
  await db.connect();
  const products = await Product.find({}, {slug: 1}).lean();
  await db.disconnect();
  
  const paths = products.map((product) => ({params : {slug: product.slug }}));
  return {
    paths,
    fallback: 'blocking',
  }  
}

export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }, '-reviews').lean();
  const similar = await Product.find({slug}).distinct('distinctCateg');
  const similarProds = await Product.find({distinctCateg: similar} , '-reviews').lean();

  await db.disconnect();


  return {
  props: { 
          product: product && db.convertDocToObj(product),
          similarProds: similarProds.map(db.convertDocToObj),

  },
 };
}

