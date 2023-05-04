import React from 'react';
import { useContext } from 'react';
import { Store } from '../utils/Store'; 
import db from '../utils/db'; 
import Product from '../models/Product';
import Banner from '../models/Banner';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import Tabsbottom from '../components/Tabsbottom';
import useStyles from '../utils/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useStateContext } from '../utils/StateContext';
import { Navigation, FreeMode, Thumbs, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Footer from '../components/Footer';
import home from '../styles/Home.module.css';
import ProductItems from '../components/ProductItem';
import Headers from '../components/HeadersContainer';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Home = ({ products, banner, categories }) => {
  const { state, dispatch } = useContext(Store);
  const classes = useStyles();
  const {userInfo, favourites } = state;

  const { setHappyHour } = useStateContext();

  const newdrops = [...products.filter((product) => product.isNeww)];
  const offers = [...products.filter((product) => product.isOnoffer)];
  const topselling = [...products.filter((product) => product.initialStock - product.countInStock > 5 ).sort((a, b) => ((a.initialStock - a.countInStock) < (b.initialStock - b.countInStock)) ? 1 : -1)];  
  const editorspics = [...products.filter((product) => product.isEditorsChoice).sort((a, b) => (a.createdAt - b.createdAt ? 1 : -1))];
  const anclets = [...products.filter((product) => product.category.toLowerCase().indexOf('anclet') != -1)];
  const earrings = [...products.filter((product) => product.category.toLowerCase().indexOf('earring') != -1)];
  const necklace = [...products.filter((product) => product.category.toLowerCase().indexOf('necklace') != -1)];
  const collections = [...products.filter((product) => product.isCollectn)];
  
  const ancletsmap = [...products.filter((product) => product.isEditorsChoice && product.category.toLowerCase().indexOf('anclet') != -1).sort((a, b) => ((a.initialStock - a.countInStock) < (b.initialStock - b.countInStock)) ? 1 : -1) ];
  const earringsmap = [...products.filter((product) => product.isEditorsChoice && product.category.toLowerCase().indexOf('earring') != -1).sort((a, b) => ((a.initialStock - a.countInStock) < (b.initialStock - b.countInStock)) ? 1 : -1)];
  const necklacemap = [...products.filter((product) => product.isEditorsChoice && product.category.toLowerCase().indexOf('necklace') != -1).sort((a, b) => ((a.initialStock - a.countInStock) < (b.initialStock - b.countInStock)) ? 1 : -1)];
  
  const addToCartHandler = async (product) => {

    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (existItem) {
      window.alert('Already added');
    } else if (data.countInStock < quantity ) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  const addToFavsHandler = async (product) => {
    const existFav = state.favourites.find((x) => x._id === product._id);
    if (existFav) {
      window.alert('Already a Favourite');
      return;
    }
    dispatch({ type: 'FAVOURITES_ADD_ITEM', payload: { ...product } });
    const { data } = await axios.post(`/api/products/${product._id}/${userInfo._id}`);

  };
  
  const removeFavHandler = async (product) => {
    dispatch({ type: 'FAVOURITES_REMOVE_ITEM', payload: product });
    const { data } = await axios.delete(`/api/products/${product._id}/${userInfo._id}`);
  };
 
  return (
      <>
        <Headers 
          title="SHIGLAM KENYA ,Get Valentine offers on Latest trends in  Women's Earrings, Waist beads, Rings, Makeup products, Anclets — Ancle Bracelets and more on jewelty in NAIROBI & its enirons."
          desc="SHIGLAM Valentine offers Exclusive discounts and the latest trends at SHIGLAM KENYA — NAIROBI — Women's Earrings, Waist beads, Finger rings, Glam-Makeup products, Anclets and more. ✓ Free Shipping On Orders ..." 
          socialtitle="SHIGLAM KENYA ,Get Valentine offers on Latest trends in Fashon & Jewelry | Women's Earrings, Waist beads, Rings, Makeup products, Anclets — Ancle Bracelets and more on jewelty in NAIROBI & its enirons." 
          socialdesc="Get Exclusive Valentine discounts on the latest trends in Women's Jewelry — Earrings, Waist beads, Finger rings, Glam-Makeup products, Anclets and more Jewelries at SHIGLAM KENYA — NAIROBI — ✓ Free Shipping On Orders ... "
          socialimages="https://res.cloudinary.com/dddx5qpji/image/upload/v1674473371/offerbanner1_3_yo5p97.jpg"
        />
        <div className="bannerwidth" style={{ overflowX: 'hidden' }}>
          <div style={{ padding: '10px 10px 5px 10px', backgroundColor: '#222', color: 'white', borderBottom: '1px solid white' }}>
            <marquee style={{fontSize: 16,  fontFamily: "monospace", letterSpacing: 1 }}> <b style={{color: 'red', marginRight: 8 }}>ITs FREEE !!</b> Get your <b style={{color: 'red' }}>NEXT DAY</b> delivery in Our CBD pickup station na ni <b style={{color: 'red' }}>freeee!!!</b> </marquee>
          </div>
          <video className="block  md:hidden" width="1919" height="748" loop autoPlay muted>
            <source src={banner[13].image[0]}></source>
            <source src="movie.ogg" type="video/ogg"></source>
            Your browser does not support the video tag.
          </video> 
          <Swiper                    
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[FreeMode, Pagination, Autoplay, Thumbs]}
            spaceBetween={10} 
            className="hidden md:block"          
            loop={true}
            pagination={true}
            centeredSlides={false}
            slidesPerView={1}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
           >
            <SwiperSlide >
                <Image height={799} width={1919} src={banner[1].image[0]} alt="Banner" className="shadow object-cover h-auto w-100 bg-gray-100" />
            </SwiperSlide>
            <SwiperSlide>
                <Image height={799} width={1919} src={banner[3].image[0]} />
            </SwiperSlide>
            <SwiperSlide>
                <Image height={799} width={1919} src={banner[12].image[0]} />
            </SwiperSlide>
          </Swiper> 
        </div>
        <div className="bannerwidth pt-4 pb-1">
          <div className="hidden md:block">
            <Image
              width={1600}
              height={70}
              src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678551221/categories_qkbf71.png"
            />
          </div>
          <div className="block md:hidden">
            <Image
              width={1000}
              height={70}
              src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678551854/categories_2_ns5grl.png"
            />
          </div>
        </div>        
        <div className="bannerwidth">
          <div className="grid gap-x-0 md:gap-x-1 px-4 md:px-0 grid-cols-3">
              <Link href="/trending">
                <div className={home.categoriescards}>
                  <div className="block md:hidden">
                    <Image width={309}  height={309} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1673000081/offerbanner1_5_upiwk4.jpg"/>
                  </div>
                  <div className="hidden md:block">
                    <Image width={829}  height={570} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1674473371/offerbanner1_3_yo5p97.jpg"/>
                  </div>
                  <div className={home.gradient}>
                    <div>
                      <b className="ml-2 flex justify-center">
                        <div>
                          Hot
                        </div>
                        <div className="ml-1">
                          <Image 
                            src="https://res.cloudinary.com/dddx5qpji/image/upload/v1676717289/ezgif.com-webp-to-jpg__2_-removebg-preview_v6pfrg.png"
                            width={20}
                            height={20}
                            alt=""
                          />
                        </div>
                      </b>
                    </div>
                    <div className={home.itemslength} style={{fontSize: '12px', color: 'lightgray'}}>
                      <div> {topselling.length}+ </div> <div className="pl-1"> items </div>
                    </div>
                    <div className={home.animate}>
                   Shop Now >
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/offers">
                <div className={home.categoriescards}>
                  <div className="block md:hidden">
                    <Image width={309}  height={309} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678549482/salemin_oczx1c.png"/>
                  </div>
                  <div className="hidden md:block">
                    <Image width={829}  height={570} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678547572/sale-concept-with-shopping-cart_23-2148313066_qkggk6.jpg"/>
                  </div>
                  <div className={home.gradient}>
                    <div>
                      <b style={{marginLeft: 3}} className=" flex justify-center">
                        <div className="flex">
                          <div> On </div> 
                          <div className="ml-1"> Sale </div>
                        </div>
                        <div className="ml-1">
                          <Image 
                            src="https://res.cloudinary.com/dddx5qpji/image/upload/v1676720500/removal.ai__tmp-63f0b93b4b8f3_bj5ao2.png"
                            width={20}
                            height={20}
                            alt=""
                          />
                        </div>
                      </b>
                    </div>
                    <div className={home.itemslength} style={{fontSize: '12px', color: 'lightgray'}}>
                      <div> {offers.length}+ </div> <div className="pl-1"> items </div>
                    </div>
                    <div className={home.animate}>
                     Shop Now >
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/new-products">
                <div className={home.categoriescards}>
                  <div className="block md:hidden">
                    <Image width={309}  height={309} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678548104/newarrivals2_2_xtemuk.jpg"/>
                  </div>
                  <div className="hidden md:block">
                    <Image width={829}  height={570} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678548606/newarrivals2_i7nevv.jpg"/>
                  </div>
                  <div className={home.gradient}>
                    <div>
                      <div className="ml-2 flex justify-center">
                        <b >New </b>
                        <div className="ml-1"> 
                          <Image 
                            src="https://res.cloudinary.com/dddx5qpji/image/upload/v1676718586/png-transparent-three-yellow-stars-art-illustration-emojipedia-sticker-iphone-sms-sparkles-emoji-leaf-orange-symmetry-removebg-preview_gp7yl8.png"
                            width={20}
                            height={20}
                            alt=""
                          />
                        </div>
                      </div>
                      <b className={home.newhider1}>Arrivals</b>
                    </div>
                    <div className={home.itemslength} style={{fontSize: '12px', color: 'lightgray'}}>
                      <div> {newdrops.length}+ </div> <div className="pl-1"> items </div>
                    </div>
                    <div className={home.animate}>
                     Shop Now >
                    </div>
                  </div>
                </div>
              </Link>
          </div>
          <Swiper                    
            modules={[FreeMode, Pagination, Autoplay, Thumbs]}
            spaceBetween={10} 
            className="block md:hidden roundswipes"          
            loop={false}
            style={{ paddingLeft: '1rem'}}
            pagination={true}
            centeredSlides={false}
            slidesPerView={3.3}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
           >
            <SwiperSlide >
              <Link href="/collections">
                <div style={{ position: 'relative', lineHeight: 'calc(100% - 5px)', borderRadius: 1000, overflow: 'hidden'}} className={home.categoriescards}>
                  <div className="block md:hidden">
                    <Image style={{ borderRadius: 100 }} width={309}  height={309} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1682536105/My-Favorite-Jewelry-Pieces_sdaxfr.jpg"/>
                  </div>
                  <div style={{ transform: 'translate(0%, -100%)', lineHeight: 'normal', background: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3))'}} className={home.gradient + ' ' + home.gradientWidth}>
                    <div>
                      <div className=" flex justify-center">
                        <b > Collections </b>
                      </div>
                    </div>
                    <div className={home.itemslength} style={{fontSize: '12px', color: 'lightgray'}}>
                      <div> {newdrops.length}+ </div> <div className="pl-1"> items </div>
                    </div>
                    <div className={home.animate}>
                     Shop Now >
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide >
            {categories.map((category) => (
              <SwiperSlide >
                <Link href={`/${category}`}>
                  <div style={{ position: 'relative', lineHeight: 'calc(100% - 5px)', borderRadius: 1000, overflow: 'hidden'}} className={home.categoriescards}>
                    {category == "Necklaces" &&
                      <>
                        <div className="block md:hidden">
                          <Image style={{ borderRadius: 100 }} width={309}  height={309} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678542559/neclacesmin_2_pzh7tr.jpg"/>
                        </div>
                        <div className="hidden md:block">
                          <Image width={829}  height={570} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678542560/neclacemax_2_ufbobg.jpg"/>
                        </div>
                      </>
                    }
                    {category == "Earrings" && 
                      <>
                        <div className="block md:hidden">
                          <Image style={{ borderRadius: 100 }} width={309}  height={309} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678549970/il_570xN.3254524046_9p24_2_ghkimd.jpg"/>
                        </div>
                        <div className="hidden md:block">
                          <Image width={829}  height={570} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678539566/il_570xN.3254524046_9p24_ibhqfg.jpg"/>
                        </div>
                      </>
                    }
                    {category == "Anclets" && 
                      <>
                        <div className="block md:hidden">
                          <Image style={{ borderRadius: 100 }} width={309}  height={309} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678549575/ancletsmin_pk4p2f.jpg"/>
                        </div>
                        <div className="hidden md:block">
                          <Image width={829}  height={570} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678543017/ancletsmin_2_u3fcqb.jpg"/>
                        </div>
                      </>
                    }
                    <div style={{ transform: 'translate(0%, -100%)', lineHeight: 'normal', background: 'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3))'}} className={home.gradient + ' ' + home.gradientWidth}>
                      <div>
                        <b>{category}</b>
                      </div>
                      <div className={home.itemslength} style={{fontSize: '12px', color: 'lightgray'}}>
                        {category == "Necklaces" && <> <div> {necklace.length}+ </div> <div className="pl-1"> items </div></>}
                        {category == "Earrings" && <> <div> {earrings.length}+ </div> <div className="pl-1"> items </div></>}
                        {category == "Anclets" && <> <div> {anclets.length}+ </div> <div className="pl-1"> items </div></>}
                      </div>
                      <div className={home.animate}>
                       Shop Now >
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide >
            ))}
          </Swiper> 
          <div className=" hidden md:grid gap-x-0 md:gap-x-1 px-4 md:px-0 grid-cols-4">
              <Link href="/collections">
                <div className={home.categoriescards}>
                  <div className="block md:hidden">
                    <Image width={309}  height={309} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678548104/newarrivals2_2_xtemuk.jpg"/>
                  </div>
                  <div className="hidden md:block">
                    <Image width={829}  height={570} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1682536105/My-Favorite-Jewelry-Pieces_sdaxfr.jpg"/>
                  </div>
                  <div style={{width: 'calc((100% - 8px) / 4)'}} className={home.gradient}>
                    <div>
                      <div className="ml-2 flex justify-center">
                        <b > Collections </b>
                      </div>
                    </div>
                    <div className={home.itemslength} style={{fontSize: '12px', color: 'lightgray'}}>
                      <div> {newdrops.length}+ </div> <div className="pl-1"> items </div>
                    </div>
                    <div className={home.animate}>
                     Shop Now >
                    </div>
                  </div>
                </div>
              </Link>
              {categories.map((category) => (
                <Link href={`/${category}`}>
                  <div className={home.categoriescards}>
                    {category == "Necklaces" &&
                      <>
                        <div className="block md:hidden">
                          <Image width={309}  height={309} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678542559/neclacesmin_2_pzh7tr.jpg"/>
                        </div>
                        <div className="hidden md:block">
                          <Image width={829}  height={570} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678542560/neclacemax_2_ufbobg.jpg"/>
                        </div>
                      </>
                    }
                    {category == "Earrings" && 
                      <>
                        <div className="block md:hidden">
                          <Image width={309}  height={309} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678549970/il_570xN.3254524046_9p24_2_ghkimd.jpg"/>
                        </div>
                        <div className="hidden md:block">
                          <Image width={829}  height={570} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678539566/il_570xN.3254524046_9p24_ibhqfg.jpg"/>
                        </div>
                      </>
                    }
                    {category == "Anclets" && 
                      <>
                        <div className="block md:hidden">
                          <Image width={309}  height={309} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678549575/ancletsmin_pk4p2f.jpg"/>
                        </div>
                        <div className="hidden md:block">
                          <Image width={829}  height={570} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678543017/ancletsmin_2_u3fcqb.jpg"/>
                        </div>
                      </>
                    }
                    <div style={{width: 'calc((100% - 8px) / 4)'}} className={home.gradient}>
                      <div>
                        <b>{category}</b>
                      </div>
                      <div className={home.itemslength} style={{fontSize: '12px', color: 'lightgray'}}>
                        {category == "Necklaces" && <> <div> {necklace.length}+ </div> <div className="pl-1"> items </div></>}
                        {category == "Earrings" && <> <div> {earrings.length}+ </div> <div className="pl-1"> items </div></>}
                        {category == "Anclets" && <> <div> {anclets.length}+ </div> <div className="pl-1"> items </div></>}
                      </div>
                      <div className={home.animate}>
                       Shop Now >
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <div className="bannerwidth pt-4 pb-1">
          <div className="hidden md:block">
            <Image
              width={1600}
              height={70}
              src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678624435/ancletsiconmax_q508q9.png"
            />
          </div>
          <div className="block md:hidden">
            <Image
              width={1000}
              height={70}
              src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678624410/ancletsiconmin_zqbaxh.png"
            />
          </div>
        </div>
        <div className="bannerwidth">
          <div 
            className="swipereactor"
            style={{borderRadius: 20, marginLeft: 16, marginRight: 16 }}
            >
            <Swiper                    
               breakpoints={{
                 100: {
                    slidesPerView: 1.6,
                  },
                 300: {                  
                    slidesPerView: 2.3,
                 },
                 450: {
                    slidesPerView: 2.8,
                 }, 
                 520: {
                    slidesPerView: 3.2,
                 }, 
                 850: {
                    slidesPerView: 4.1,
                 },
                 1600: {
                    slidesPerView: 4.6,
                 },             
               }}
      
                 modules={[FreeMode, Navigation, Pagination, Autoplay, Thumbs]}
                 spaceBetween={10}           
                 loop={false}
                 navigation= {true}
                 centeredSlides={false}
                 style={{ maxWidth: 1100 }}

             onSwiper={(swiper) => console.log(swiper)}
             onSlideChange={() => console.log('slide change')}
        
             >
    
              {ancletsmap.slice(0, 5).map((product) =>(
                <SwiperSlide key={product}>
                  <ProductItems
                    addToCartHandler = {addToCartHandler}
                    addToFavsHandler = {addToFavsHandler}
                    removeFavHandler = {removeFavHandler}
                    product={product}
                    key={product}
                  />                         
                </SwiperSlide>
               ))
              }
              <SwiperSlide>
                <Link href="/Anclets">
                  <Image
                     width={364}
                     height={484}
                     src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678623563/seemarorelg_a8x5rx.png"
                     alt=""
                     className="shadow object-cover h-auto w-100 bg-gray-100"
                  />
                </Link> 
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="bannerwidth pt-4 pb-1">
          <div className="hidden md:block">
            <Image
              width={1600}
              height={70}
              src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678555813/Earrings_lv18ss.png"
            />
          </div>
          <div className="block md:hidden">
            <Image
              width={1000}
              height={70}
              src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678555813/Earrings2_siol2e.png"
            />
          </div>
        </div>  
        <div className="bannerwidth">
          <div 
            className="swipereactor"
            style={{borderRadius: 20, marginLeft: 16, marginRight: 16 }}
            >
            <Swiper                    
               breakpoints={{
                 100: {
                    slidesPerView: 1.6,
                  },
                 300: {                  
                    slidesPerView: 2.3,
                 },
                 450: {
                    slidesPerView: 2.8,
                 }, 
                 520: {
                    slidesPerView: 3.2,
                 }, 
                 850: {
                    slidesPerView: 4.1,
                 },
                 1600: {
                    slidesPerView: 4.6,
                 },             
               }}
      
                 modules={[FreeMode, Navigation, Pagination, Autoplay, Thumbs]}
                 spaceBetween={10}           
                 loop={false}
                 navigation= {true}
                 centeredSlides={false  }
                 style={{ maxWidth: 1100 }}

           onSwiper={(swiper) => console.log(swiper)}
             onSlideChange={() => console.log('slide change')}
          
           >
      
            {earringsmap.slice(0, 5).map((product) =>(
              <SwiperSlide key={product}>
                <ProductItems
                  addToCartHandler = {addToCartHandler}
                  addToFavsHandler = {addToFavsHandler}
                  removeFavHandler = {removeFavHandler}
                  product={product}
                  key={product}
                />                          
              </SwiperSlide>
             ))
            }
            <SwiperSlide>
              <Link href="/Earrings">
                <Image
                   width={364}
                   height={484}
                   src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678623563/seemarorelg_a8x5rx.png"
                   alt=""
                   className="shadow object-cover h-auto w-100 bg-gray-100"
                />
              </Link> 
            </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="bannerwidth pt-4 pb-1">
          <div className="hidden md:block">
            <Image
              width={1600}
              height={70}
              src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678624620/nacklacesiconmax_bgrc1o.png"
            />
          </div>
          <div className="block md:hidden">
            <Image
              width={1000}
              height={70}
              src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678624333/necklacesicinmin_j8pwam.png"
            />
          </div>
        </div>
        <div className="bannerwidth">
          <div 
            className="swipereactor"
            style={{borderRadius: 20, marginLeft: 16, marginRight: 16 }}
            >
            <Swiper                    
               breakpoints={{
                 100: {
                    slidesPerView: 1.6,
                  },
                 300: {                  
                    slidesPerView: 2.3,
                 },
                 450: {
                    slidesPerView: 2.8,
                 }, 
                 520: {
                    slidesPerView: 3.2,
                 }, 
                 850: {
                    slidesPerView: 4.1,
                 },
                 1600: {
                    slidesPerView: 4.6,
                 },             
               }}
      
                 modules={[FreeMode, Navigation, Pagination, Autoplay, Thumbs]}
                 spaceBetween={10}           
                 loop={false}
                 navigation= {true  }
                 centeredSlides={false}
                 style={{ maxWidth: 1100 }}

             onSwiper={(swiper) => console.log(swiper)}
             onSlideChange={() => console.log('slide change')}
          
             >
      
              {necklacemap.slice(0, 5).map((product) =>(
                <SwiperSlide key={product}>
                  <ProductItems
                    addToCartHandler = {addToCartHandler}
                    addToFavsHandler = {addToFavsHandler}
                    removeFavHandler = {removeFavHandler}
                    product={product}
                    key={product}
                  />                         
                </SwiperSlide>
                ))
              }
              <SwiperSlide>
                <Link href="/Necklaces">
                  <Image
                    width={364}
                    height={484}
                    src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678623563/seemarorelg_a8x5rx.png"
                    alt=""
                    className="shadow object-cover h-auto w-100 bg-gray-100"
                  />
                </Link> 
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="py-5">
          <Link href="/collections">
            <Image height={709} width={1919} src={banner[0].image[0]} alt="Banner" className="shadow object-cover h-auto w-100 bg-gray-100" />
          </Link>
        </div>
        <Tabsbottom/>
        <Footer/>
      </> 
)
 
};
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}, '-reviews').lean();
  const banner = await Banner.find().lean();
  const categories = await Product.find().distinct('category');
  await db.disconnect();
  
  return {
    props: {
      products: products.map(db.convertDocToObj),
      banner: banner.map(db.convertDocToObj),
      categories,
    },
  };
}
export default Home
