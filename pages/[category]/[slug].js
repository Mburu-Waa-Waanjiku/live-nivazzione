import axios from 'axios'; 
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import { VscVerifiedFilled } from 'react-icons/vsc';
import Product from '../../models/Product';
import Shop from '../../models/Shop';
import db from '../../utils/db';
import { GiHanger } from 'react-icons/gi';
import { Store } from '../../utils/Store';
import Rating from '@material-ui/lab/Rating';
import ProductItems from '../../components/ProductItem';
import { FaTruckMoving } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Download from '../../components/downloader';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import Layout from '../../components/Layout';
import Tabsbottom from '../../components/Tabsbottom'
import { Navigation, FreeMode, Thumbs, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSnackbar } from 'notistack';
import Headers from '../../components/HeadersContainer';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import { PiCoatHangerFill } from 'react-icons/pi';
import { useStateContext } from '../../utils/StateContext';
import Cart from '../../components/mycart/Cart';
import Notification from '../../components/notifications/view';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const DynamicLogger = dynamic(() => import('../../components/Logger'), {
  loading: () => " ",
})

import 'swiper/css'

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function ProductScreen(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [openSizes, setOpensizes] = useState(false);
  const [openDescribe, setOpendescribe] = useState(false);
  const [openShopping, setOpenshopping] = useState(false);
  const [controlSize, setControlsize] = useState(null);
  const [openColor, setOpenColor] = useState(false);
  const [openSizedesc, setOpenSizedesc] = useState(false);
  const router = useRouter();
  const { openLogin, login } = useStateContext();

  const { product, similarProds, Reviews, shop } = props;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { enqueueSnackbar } = useSnackbar();

  const existFav = state.favourites.find((x) => x._id === product._id);
  const existItem = state.cart.cartItems.find((x) => x._id === product._id);

  if (!product) {
    return  <div> 
              <Headers title="Produt Not Found"/>
              <div> Produt Not Found </div>
            </div>
  }

  const addToCartHandler = async (product) => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    const val = data.sizes.filter((s) => s.count > 0 );
    if (val.length < 1 ) {
      window.alert('Sorry,  All sizes are out of stock');
      return;
    } else {
      dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: 1, csize: val[0] } });
      enqueueSnackbar('Product added to Cart', { variant: 'success' });  
    }
  };
  
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const addToFavsHandler = async (product) => {
    const existFav = state.favourites.find((x) => x._id === product._id);
    if (existFav) {
      window.alert('Already a Favourite');
      return;
    }
    dispatch({ type: 'FAVOURITES_ADD_ITEM', payload: { ...product } });
    await axios.post(`/api/products/${product._id}/${userInfo?._id}`);

  };
  
  const followHandler = async (shop) => {
    if(userInfo) {
      dispatch({ type: 'FETCH_SHOP_SUCCESS', payload: { ...shop } });
      await axios.put(`/api/${shop._id}/${userInfo._id}`,{ user: userInfo._id});
    } else {
      openLogin();
    }
  }
  const removeFavHandler = async (product) => {
    dispatch({ type: 'FAVOURITES_REMOVE_ITEM', payload: product });
    await axios.delete(`/api/products/${product._id}/${userInfo?._id}`);
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
                product.image[0].item,
                product.image[1]?.item 
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

  return <>
    <Headers title={product.name.concat(" ", "and more from as low as", " ", "KES", product.price, " ", "IN KENYA | NAIROBI")}
      desc={product.description}
      socialtitle={product.name.concat(" ", "and more from as low as", " ", "KES", product.price, " ", "IN KENYA | NAIROBI")}
      socialdesc={product.description}
      socialimages={'https://www.shiglam.com' + product.image[0].item}
      scdinfo={addProductJsonLd()}
    />
    <div className='hidden xsm:block'>
      <Layout/>
    </div>
    <div className='flex color-slug justify-center px-0 md:px-8'>
      <div className='fixed bg-white rounded-full w-11 h-11 flex justify-center items-center z-10 left-3 p-3 text-6xl top-12 xsm:top-48 slg:top-40' onClick={() => router.back()}><HiArrowNarrowLeft /></div>
      <div className='grid relative max-h-slug grid-cols-1 md:grid-cols-2 max-w-lg md:max-w-4xl prod-shadow overflow-hidden'>
        <div className='justify-self-center relative block md:flex items-center scale-102 sm:p-0 w-full max-w-lg sm:max-h-none'>
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
                slidesPerView: 1,
              }
            }}     
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }} 
            modules={[Pagination, FreeMode, Thumbs]}
            spaceBetween={8}
            loop={false}
          >
            {product.image?.map((img) => ( 
              <SwiperSlide key={img} >
                <Image 
                  className="bg-gray-100" 
                  objectFit='cover'
                  width={600} 
                  height={797} 
                  alt={product.name} 
                  src={img.item}
                />
                <Download
                  original = {img.item}
                  name = {product.name}
                />
              </SwiperSlide >
            ))}
          </Swiper>
          <div className='z-10 bg-white md:max-h-full thumb-position h-32 md:h-2/3 flex justify-center border-box py-3 px-1.5 w-full md:w-16 relative md:absolute rounded-3xl'>
            <Swiper
              spaceBetween={8}
              slidesPerView={product.image.length}
              breakpoints={{
                768: {
                  direction:"vertical"
                }
              }} 
              freeMode={true}
              onSwiper={setThumbsSwiper}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
            >
              {product.image?.map((img) => ( 
                <SwiperSlide className='flex items-start md:items-center' style={{ maxWidth: 73 }} key={img}>
                  <Image  
                    width={73} 
                    height={97} 
                    alt={product.name} 
                    className="rounded-2xl bg-gray-100 g-images-child"
                    src={img.item}
                  />
                </SwiperSlide >
              ))}
            </Swiper>
          </div>
        </div>
        <div className=' max-h-slug bg-white  pl-4 md:pl-20 pr-4 md:pr-4 gap-4 justify-center items-center w-full h-full'>
          <div className='flex py-4 md:pr-4 w-full justify-between'>
            <Link href={`https://www.shiglam.com/shop/${shop[0]?._id}`} legacyBehavior>
              <div className='flex cursor-pointer gap-2 items-center'>
                <div className='w-11 h-11 rounded-full overflow-hidden'>
                  <Image width={50} height={50} alt="" src={shop[0]?.logo}/>
                </div>
                <div className='flex-grow'>
                  <div className='font-medium  w-full overflow-hidden whitespace-nowrap text-ellipsis'> {shop[0].shopName} </div>
                  <div className='w-full flex items-center gap-2 pt-1'>
                    <div className='w-3 transform-y-3 text-xl'>
                      <VscVerifiedFilled className={shop[0]?.sales.toString().length == 4 ? 'text-cyan-600' : shop[0].sales.toString().length == 5 ? 'text-amber-500' : 'text-slate-950' }/>
                    </div>
                    <div className='font-medium  w-full overflow-hidden whitespace-nowrap text-ellipsis'>{shop[0].sales.toString().length == 4 ? shop[0].sales.toString().slice(0, 1) + '.' + shop[0].sales.toString().slice(1, 3) : shop[0].sales.toString().length == 5 ? shop[0].sales.toString().slice(0, 2) + '.' + shop[0].sales.toString().slice(2,3) : shop[0].sales} Sales</div>
                  </div>
                </div>
              </div>
            </Link>
            {shop.map((shop, index) => (
              <div key={index} onClick={() => followHandler(shop)} style={{ transform:'translate(-7px, 3px)'}} className={" cursor-pointer rounded-3xl px-4 py-2 text-xl ".concat(state.followedShops.find((x) => x._id === shop._id) ?  "bg-grayb font-semibold text-white" : "darklucent ")} >
                Follow
              </div>
            ))}
          </div>
          <div className='max-h-slugchild md:pr-4 h-slug overflow-y-hidden md:overflow-y-scroll'>
            <div className='grid pt-4 grid-cols-2 grow justify-between'>
              <div className='text-base font-bold'>
                {product.brand}
              </div>
              <div className="text-lg md:text-2xl font-bold justify-self-end " >Ksh.{controlSize ? controlSize.price : product.sizes[0].price}</div>
            </div>
            <div className='grid grid-cols-2 grow justify-between'>
              <div className='text-2xl w-full overflow-hidden whitespace-nowrap text-ellipsis font-bold'>
                {product.name}
              </div>
              <div className="text-sm font-bold justify-self-end self-end md:text-base">
                {product.isOnoffer && <div  style={{color:"orangered"}}><s>{''}</s></div>}
              </div>
            </div>
            <div className='grid pt-2 grid-cols-2 grow justify-between'>
              <div className='flex items-center'>
                <Rating style={{fontSize: 15}} className="grow-0 pr-2" value={product.rating} readOnly></Rating> 
                <div className='text-xl font-bold'>{product.numReviews}</div>
              </div>
              <div className='flex xxsm:hidden justify-self-end mdb:flex xmd:hidden justify-center'>
                <div className='flex text-xl font-bold w-fit border-4 border-black py-2 px-3 rounded-2xl items-center justify-between'>
                  <div style={{backgroundColor: product.color[0].color[0]}} className='w-4 h-4 rounded-full'></div> 
                  {openSizes ? <IoIosArrowUp onClick={() => setOpensizes(false)} /> : <IoIosArrowDown onClick={() => setOpensizes(true)}/> }
                </div>
              </div>
            </div>
            <div className='flex justify-between pt-10 grow items-center gap-3'>
              <div className='flex border-4 text-3xl border-black rounded-full w-14 h-14 items-center justify-center'>
                {existFav ? <GiHanger className='scale-125' onClick={() => removeFavHandler(product)} /> : <PiCoatHangerFill  onClick={() => addToFavsHandler(product)} /> }
              </div>
              <div className='xxsm:flex hidden mdb:hidden xmd:flex grow justify-center'>
                <div className='flex relative text-xl font-bold w-fit border-4 border-black py-2 px-3 rounded-2xl items-center justify-between'>
                  <div style={{backgroundColor: product.color[0].color[0]}} className='w-4 h-4 rounded-full'></div> 
                  {openColor ? <IoIosArrowUp onClick={() => setOpenColor(false)} /> : <IoIosArrowDown onClick={() => setOpenColor(true)}/> }
                  <div className={'absolute bg-white top-0 translate-y-10 bshadow rounded-xl px-4 py-2 text-sm '.concat(!openColor && 'hidden' )}>
                    {product.color.map((color, index) => (
                      <div onClick={() => { color != product.color[0] ? router.push(`/${color.slug}`) : setOpenColor(false)}} key={index} style={{backgroundColor: product.color[0].color[0]}} className='w-4 py-1 flex flex-col h-4 rounded-full'></div> 
                    ))}
                  </div>
                </div>
              </div>
              <div className='flex relative gap-3 text-base font-bold w-28 border-4 border-black py-2 px-3 rounded-2xl items-center justify-between'>
                {controlSize ? controlSize.psize : product.sizes[0].psize}  {openSizes ? <IoIosArrowUp onClick={() => setOpensizes(false)} /> : <IoIosArrowDown onClick={() => setOpensizes(true)}/> }
                <div className={'absolute bg-white top-0 translate-y-10 bshadow rounded-xl px-4 py-2 text-sm '.concat(!openSizes && 'hidden' )}>
                  {product.sizes.map((size, index) => (
                    <div onClick={() => {setControlsize(size); setOpensizes(false)}} key={index} className='py-1 flex flex-col'> {size.psize} </div>
                  ))}
                </div>
              </div>
            </div>
            <div onClick={existItem ? ()=> removeItemHandler(product) : ()=> addToCartHandler(product) } className={'w-full mt-6 pt-2.5 pb-3 rounded-2xl text-xl flex justify-center items-center '.concat(existItem ? 'bg-tabb text-white ' : 'bg-grayw font-bold')}>
              Add to cart
            </div>
            <div className='mt-10 pt-8 text-base  font-bold flex justify-between items-center '>
              <div>Desctiption</div>
              {openDescribe ? <IoIosArrowUp onClick={() => setOpendescribe(false)} /> : <IoIosArrowDown onClick={() => setOpendescribe(true)}/> }
            </div>
            <div className='py-4 border-b-2 border-gray-300'>
              {openDescribe && <p className='text-base px-2'>{product.description}</p>}
            </div>
            <div className='pt-8 text-base  font-bold flex justify-between items-center '>
              <div>Size & fit</div>
              {openSizedesc ? <IoIosArrowUp onClick={() => setOpenSizedesc(false)} /> : <IoIosArrowDown onClick={() => setOpenSizedesc(true)}/> }
            </div>
            <div className='py-4 px-2 border-b-2 border-gray-300'>
              {product.sizes[0].psize != "NOSIZE" &&
                <>
                  {openSizedesc && 
                    <div className='text-base inline-block'>
                      {controlSize ? 
                        <>
                          {controlSize.bust && <div className='flex pr-4'><b className='pr-2 text-gray-700'>Bust:</b> {controlSize.bust} </div>}
                          {controlSize.shoulder && <div className='flex pr-4'><b className='pr-2 text-gray-700'>Shoulder:</b> {controlSize.shoulder} </div>}
                          {controlSize.sleave && <div className='flex pr-4'><b className='pr-2 text-gray-700'>Sleave:</b> {controlSize.sleave} </div>}
                          {controlSize.length && <div className='flex pr-4'><b className='pr-2 text-gray-700'>Length:</b> {controlSize.length} </div>}
                          {controlSize.cuff && <div className='flex pr-4'><b className='pr-2 text-gray-700'>Cuff:</b> {controlSize.cuff} </div>}
                          {controlSize.bicep && <div className='flex pr-4'><b className='pr-2 text-gray-700'>Shoulder:</b> {controlSize.bicep} </div>}
                          {controlSize.thigh && <div className='flex pr-4'><b className='pr-2 text-gray-700'>Thigh:</b> {controlSize.thigh} </div>}
                          {controlSize.inseam && <div className='flex pr-4'><b className='pr-2 text-gray-700'>Inseam:</b> {controlSize.inseam} </div>}
                        </> :
                        <>
                          {product.sizes[0].bust && <div className='flex pr-4'><b className='pr-2 text-gray-700'>Bust:</b> {product.sizes[0].bust} </div>}
                          {product.sizes[0].shoulder && <div className='flex pr-4'><b  className='pr-2 text-gray-700'>Shoulder:</b> {product.sizes[0].shoulder} </div>}
                          {product.sizes[0].sleave && <div className='flex pr-4'><b className='pr-2 text-gray-700'>Sleave:</b> {product.sizes[0].sleave} </div>}
                          {product.sizes[0].length && <div className='flex pr-4'><b className='pr-2 text-gray-700'>Length:</b> {product.sizes[0].length} </div>}
                          {product.sizes[0].cuff && <div className='flex pr-4'><b className='pr-2 text-gray-700'>Cuff:</b> {product.sizes[0].cuff} </div>}
                          {product.sizes[0].bicep && <div className='flex pr-4'><b className='pr-2 text-gray-700'>Shoulder:</b> {product.sizes[0].bicep} </div>}
                          {product.sizes[0].thigh && <div className='flex pr-4'><b className='pr-2 text-gray-700'>Thigh:</b> {product.sizes[0].thigh} </div>}
                          {product.sizes[0].inseam && <div className='flex pr-4'><b className='pr-2 text-gray-700'>Inseam:</b> {product.sizes[0].inseam} </div>}
                        </>
                      }
                    </div>
                  }
                </>
              }
            </div>
            <div className=' pt-8 text-base font-bold flex justify-between items-center '>
              <div>Shipping</div>
              {openShopping ? <IoIosArrowUp onClick={() => setOpenshopping(false)} /> : <IoIosArrowDown onClick={() => setOpenshopping(true)}/> }
            </div>
            <div className='py-4 border-b-2 border-gray-300'>
              {openShopping && 
                <div style={{backgroundColor: "#eeeeee", borderRadius: 25, paddingTop:10}} >
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
              }
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className='w-full flex text-xl justify-center pt-10 pb-4 font-bold title-font'>
      You may also like
    </div>
    <div className='flex px-4 justify-center'>
      <div className='columns-2 pb-4 sm:columns-3 sm:max-w-xl md:columns-4 md:max-w-4xl lg:columns-5 lg:max-w-7xl'>
        {similarProds.map((product) => (
          <div key={product} className='px-1 py-1'>
            <ProductItems
              product={product}
            />
          </div>
          ))}
      </div>
    </div>
    {login && <DynamicLogger/>}
    <Notification/>
    <Cart/>
    <Tabsbottom/>
  </>;
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }, '-reviews').lean();
  const Reviews = await Product.find({ slug }).distinct('reviews');
  const shop = await Shop.find({_id: product.shopId}).lean();
  const similarProds = await Product.find({slug: product.distinctCateg} , '-reviews').lean();
  
  await db.disconnect();

  return {
  props: { 
          product: product && db.convertDocToObj(product),
          shop: shop.map(db.convertRevDocToObj),
          Reviews: Reviews.map(db.convertRevDocToObj), 
          similarProds: similarProds.map(db.convertDocToObj),

  },
 };
}