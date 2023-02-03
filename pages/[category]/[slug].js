import axios from 'axios'; 
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import Layout from '../../components/Layout';
import Product from '../../models/Product';
import db from '../../utils/db';
import { Store } from '../../utils/Store';
import ClearIcon from '@mui/icons-material/Clear';
import useStyles from '../../utils/styles';
import Rating from '@material-ui/lab/Rating';
import ProductNocart from '../../components/ProductNocart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import { FaTruckMoving } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { IconButton } from '@material-ui/core';

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
  const router = useRouter();
 
  const { product, similarProds, Reviews } = props;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { enqueueSnackbar } = useSnackbar();

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


  const URL = `https://shiglam.com/${product.category}/${product.slug}`;
  let revCount;
  if(product.numReviews < 1){
    revCount = Math.floor(Math.random() * 20) + 1;
  } else{
    revCount = product.numReviews
  }
  const jsdschema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product.name,
      image: [ 
                product.image[0],
                product.image[1] 
              ],
      description: product.description,
      brand: {
        "@type": "Brand",
        name: product.brand
      },
      review: {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5
        },
        author: {
          "@type": "Person",
          name: Reviews[0]?.name || "Diane"
        }
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: revCount
      },
      offers: {
        "@type": "Offer",
        url: URL,
        priceCurrency: "KES",
        price: product.price,
        priceValidUntil: "2023-2-14",
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/InStock"
      }
    };


  function addProductJsonLd() {
    return {
      __html: JSON.stringify(jsdschema),
    };
  }

  return (
    <>
      <Layout title={product.name.concat(" ", "and more from as low as", " ", "KES", product.price, " ", "IN KENYA | NAIROBI")}
        desc={product.description}
        socialtitle={product.name.concat(" ", "and more from as low as", " ", "KES", product.price, " ", "IN KENYA | NAIROBI")}
        socialdesc={product.description}
        socialimages={product.image[0]}
        scdinfo={addProductJsonLd()}
      >
      <div className="margintopFix pt-9 grid grid-cols-1 sm:grid-cols-2 sm:gap-4">
        <div className="col-span-1 ">
          <div layout="responsive" className={classes.mideaSmallBannerResp} style={{maxWidth:600, marginTop: 0}} >
            <div onClick={() => router.back()} style={{backgroundColor: "white", position: "fixed", boxShadow: "0 2px 5px 1px rgb(64 60 67 / 50%)", top: 30, padding: 7 , borderRadius: 50, zIndex: 1200, left: 25 }}> <ArrowBackIosIcon sx={{fontSize:10}} /></div>
            <>
             <Swiper
               style={{
               "--swiper-navigation-color": "#fff",
               "--swiper-pagination-color": "#fff",
                }}
                pagination={{
                  type: "fraction",
                }}
                breakpoints={{
                  100: {
                    slidesPerView: 1.25,
                  },
                  641: {
                    slidesPerView: 1,
                  }
                }}      
                modules={[Pagination, FreeMode, Navigation, Thumbs]}
                spaceBetween={8}
                loop={false}
                navigation={true}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
             >
              {product.image?.map((item) => ( 
                <SwiperSlide  className="pl-2 sm:pl-0" key={item} style={{maxWidth: 420}} >
                  <Image style={{ borderRadius: 20 }} key={item} width={420} height={556.5} alt={product.name} className="bg-gray-100 g-images-child"
                    src={(item)}
                  />
                </SwiperSlide >
              ))}
             </Swiper>
             <Swiper
               spaceBetween={0}
               slidesPerView={5}
               className="hidden sm:block"
               freeMode={true}
               watchSlidesProgress={true}
               modules={[FreeMode, Navigation, Thumbs]}
        
             >
               {product.image?.map((item) => ( 
                <SwiperSlide style={{ paddingLeft: 8, maxWidth: 73 }} key={item}>
                  <Image style={{ borderRadius: 20 }} key={item} width={364} height={484} alt={product.name} className="bg-gray-100 g-images-child"
                    src={(item)}
                  />
                </SwiperSlide >
              ))}
             </Swiper>
           </>
           </div>
        </div>
        <div className="col-span-1">
        <div>
          <div className="flex justify-between mb-3">
            {product.name.length > 20 ? (<h3 style={{fontSize: 17, fontWeight: 600, marginTop: 20}}>{product.name.slice(0, 17).concat(" ", ". .")}</h3>) : (<h3 style={{fontSize: 16, fontWeight: 500, marginTop: 20}}>{product.name}</h3>)}
            <div className="grid">
              <div className="text-lg md:text-2xl" style={{padding:"19px 0 0", fontWeight: 600,}}>Ksh.{product.price}</div>
              {product.isOnoffer && <div className="text-sm md:text-lg justify-self-end" style={{padding:"0 0 10px 0 ", fontWeight: 600, color:"orangered"}}><s>Ksh.{product.prevprice}</s></div>}
            </div>
          </div>
         <div className={classes.textSml}>
           <b style={{flexGrow: "inherit", fontSize: 15}}>Details</b>
           <div className="reviews">
              <Rating className={classes.textSmla} value={product.rating} readOnly></Rating>
              <Typography className={classes.textSml} >({product.numReviews} reviews)</Typography>
           </div>
         </div>
        <div className="pl-5">
          <div className="mt-2 mb-2">  <b className="mr-1">Brand:</b> {product.brand}</div>
          <div className="mb-2 flex"> <b className="mr-1">Description:</b> <p>{product.description}</p></div>
          </div> 
        </div>
        <div style={{ backgroundColor: "rgba(255, 255, 255, 0.7", boxShadow: "none"}} className="hidden sm:block bs p-5">
          <button
            className="primary-button w-full"
            onClick={addToCartHandler}
            style={{borderRadius: 50, backgroundColor: "black", height: 55}}
           >
            <div className="flex justify-between ml-2 mr-2">
              <div style={{fontFamily: "monospace"}} >
                <div style={{lineHeight: "38px"}}>
                  {product.countInStock > 0 ? 'In stock' : 'Out of Stock'}
                </div>
              </div>
              <div>
                <IconButton style={{border: "3px solid white", top: -6, padding: 10}}>
                  <AiOutlineShoppingCart style={{color: "white"}}/>
                </IconButton>
              </div>
            </div>
          </button>
        </div>
        <div style={{backgroundColor: "#eeeeee", borderRadius: 25, paddingTop:10}} >
          <div className=" mt-4 mx-6" style={{fontSize:"0.875rem", fontWeight:"1000", padding:"5px 0"}}>
            Shipping 
          </div>
          <div className="flex justify-between mx-6 py-1">
            <div className="flex">
              <FaTruckMoving style={{fontSize:20}}/>
              <div className="ml-3 self-center">Our shipping is done by Pickup Mtaan & it takes from same day to 3 days max.</div>
            </div>
          </div>
          <div className="mx-6 my-3 flex justify-center">
            <Image width={500} height={83} alt="" className="bg-gray-100 rounded-2xl" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1667233530/ezgif.com-gif-maker_1_fx3ey6.gif"></Image>
          </div>
          <div className=" mt-4 mx-6" style={{fontSize:"0.875rem", fontWeight:"1000", padding:"5px 0"}}>
            Return 
          </div>
          <div className="flex justify-start mx-6 py-1 pb-2">
            {product.isOnoffer ? (<div>Products on promotion are not eligible to be returned.</div>) : (<div>This product can be returned if it is defective on delivery</div>)}
          </div>
        </div>  
        </div>
      </div>
      {product.gallery.length > 0 && <div>
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
      <div>
         <div className="slug-gallery">Customer Reviews({product.numReviews}) </div>
      </div>
      <div className={classes.reviewBody}>
      {Reviews.length === 0 && <ListItem>No reviews yet</ListItem>}
        {Reviews.slice(-2).map((review, index) => (
          <ListItem key={index}>
            <Grid container>
              <Grid item className={classes.reviewItem}>
                <div className="flex justify-between">
                  <Typography>
                    <strong>{review.name}</strong>
                  </Typography>
                  <div>
                    <Rating value={review.rating} readOnly></Rating>
                  </div>
                </div>
                <div className="pb-1"> <b>{review.createdAt.substring(0, 10)}</b> </div>
              </Grid>
              <Grid item>
                {review.comment.length > 80 ? (<Typography>{review.comment.slice(0, 60).concat(" ", ".", " ", ".", " ", ".", " ", ".")}</Typography>) : (<Typography>{review.comment}</Typography>)}
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
      <div>
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
      <div style={{ zIndex: 1, bottom: 0, position: "fixed", width: "100%", left: 0, backgroundColor: "rgba(255, 255, 255, 0.7"}} className="block sm:hidden card bs p-5">
        <button
          className="primary-button w-full"
          onClick={addToCartHandler}
          style={{borderRadius: 50, backgroundColor: "black", height: 55}}
        >
          <div className="flex justify-between ml-2 mr-2 md:justify-center">
            <div style={{fontFamily: "monospace"}} >
              <div style={{lineHeight: "38px"}}>
                {product.countInStock > 0 ? 'In stock' : 'Out of Stock'}
              </div>
            </div>
            <div>
              <IconButton style={{border: "3px solid white", top: -35, backgroundColor: "black"}}>
                <AiOutlineShoppingCart style={{color: "white"}}/>
              </IconButton>
            </div>
          </div>
        </button>
      </div>
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