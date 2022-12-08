import React from 'react';
import { useState } from "react";
import Tabs from "@mui/material/Tabs"; 
import Tab from "@mui/material/Tab";
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import db from '../utils/db'; 
import Product from '../models/Product';
import Banner from '../models/Banner';
import { Navigation, FreeMode, Thumbs, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import Link from 'next/link';
import ProductItem from '../components/ProductItem';
import BestSeller from '../components/BestSeller';
import Newpost from '../components/Newpost';
import axios from 'axios';
import { CgBolt } from 'react-icons/cg';
import NewBanner from '../components/NewBanner';
import Tabsbottom from '../components/Tabsbottom';
import OffersHome from '../components/OffersHome';
import Layout from '../components/Layout';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded';
import useStyles from '../utils/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useStateContext } from '../utils/StateContext';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Home = ({topselling, banner, ofearrings, editorspicks, offers, newdrops, ofglam, ofwaistbeads, offingerrings, ofanclets }) => {
  const { state, dispatch } = useContext(Store);
  const { value, setValue, handleChange, categ, setCateg, handleCateg, handleBoth, handleBack } = useStateContext();
  const classes = useStyles();

  const addToCartHandler = async (product) => {
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
      <Layout title="SHIGLAMblackfriday, SHIGLAM KENYA ,Latest trends SHIGLAM KENYA, Women's Earrings, Waist beads, Finger rings, Glam-Makeup products, Anclets and more."
              content="SHIGLAMblackfriday Exclusive discounts and the latest trends at SHIGLAM KENYA — Women's Earrings, Waist beads, Finger rings, Glam-Makeup products, Anclets and more. ✓ Free Shipping On Orders ..."
      > 
        <TabContext value={value}>
          <Tabs className={classes.ndicatenone}  value={value} classes={{root:classes.hmStyle, indicator:classes.ndicateThick }} sx={{"& .MuiTab-root.Mui-selected": {color:"black"}, position:"sticky" ,top: 45, zIndex: 15}} fullWidth onChange={handleChange} variant="scrollable"  scrollButtons="auto" >
            <Tab value="1" />
            <Tab value="2" />
            
          </Tabs>

            
            <TabPanel className={classes.padTab} value="1">
               <div className={classes.mideaSmallBannerResp}>
                 <Link href="/offer">
                   <Image height={718} width={1560} className="bg-gray-100" alt="" src={banner[1].image[0]}></Image>
                 </Link>
               </div>
              <div className="home-ft">Newly Dropped</div>
                <div className={classes.mideaSmallBannerResp} style={{marginTop:0}}>
                  <Link href="/newproducts/newproducts">  
                    <div>                                               
                      <Image height={457} width={1480} className="bg-gray-100" alt="" src={banner[2].image[0]}></Image>
                      <NewBanner
                       newdrops={newdrops}
                      />
                    </div>
                  </Link>
                </div>
              <div className={classes.mideaSmallDivResp}> 
               <div className={classes.fullWidth}>
                 <Swiper                    
                    breakpoints={{
                      100: {
                         slidesPerView: 2.8,
                       },
                      640: {
                         slidesPerView: 4.3,
                      }, 
                      1000: {
                         slidesPerView: 6.3,
                      },             
                    }}
      
                      modules={[FreeMode, Navigation, Pagination, Autoplay, Thumbs]}
                      spaceBetween={10}           
                      loop={false}
                      navigation= {true}
                      centeredSlides={false}
                
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log('slide change')}
        
                 >
    
                   {newdrops.map((product) =>(
                      <SwiperSlide key={product}>
                        <div className={classes.newpost} style={{backgroundColor: '#ffdf00'}}>NEW<CgBolt style={{fontSize:16}} /></div>
                        <Link href={`/product/${product.slug}`} >
                           <Image
                             width={364}
                             height={484}
                             src={product.image[0]}
                             alt={product.name}
       
                             className="shadow object-cover h-auto w-100 bg-gray-100"
                           />
                        </Link>
                       </SwiperSlide>
                     ))
                   }
                 </Swiper>
               </div>
              </div>
              
              <div className="home-ft">Categories</div> 
                <TabContext  value={categ} 
              >
                  <Tabs value={categ} classes={{ flexContainer: classes.categ, indicator:classes.ndicatenone, scroller: classes.categRut}} sx={{"& .MuiTab-root.Mui-selected": {color:"black", },"& .MuiButtonBase-root": {textTransform: "none", minInlineSize: "max-content" }, }} fullWidth onChange={handleBoth} variant="scrollable"  >
                    <Tab value="Earrings" classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic }} label="Nose & Earrings" iconPosition="start" icon={<div><Image width={50}  height={50} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/b_auto,c_pad,g_center,h_500,w_500/v1666792827/0e8156a292b6b2fc8b3dcce2ee243da1_ed3fmn.jpg"/></div>}/>} />
                    <Tab value="Anclets" classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic}} label="Anclets" iconPosition="start" icon={<div><Image  width={50} height={50} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/b_auto,c_pad,g_north,h_500,q_100,w_500/v1666790299/1602473757eaefd843bc60307bfcdbfde68a678269_thumbnail_600x_ba2xc4.webp"/></div>} />
                    <Tab value="Finger rings" classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic }} label="Finger rings" iconPosition="start" icon={<div><Image width={50} className="bg-gray-100" alt=""  height={50} src="https://res.cloudinary.com/dddx5qpji/image/upload/v1666787251/a0265d90-0416-40a6-9f3d-d0f2086da42b1632576872688ShiningDivaSetof9GoldPlatedStylishRings7_n1ngnt.webp"/></div>}/>} />
                    <Tab value="Waist beads" classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic }} label="Waist beads" iconPosition="start" icon={<div><Image width={50} className="bg-gray-100" alt="" height={50} src="https://res.cloudinary.com/dddx5qpji/image/upload/c_crop,g_center,h_900,q_200,w_1300/v1666793858/1637744539a70818f7474c4c88e068910c1d310fc0_xrkmyx.webp"/></div>}/>} />
                    <Tab value="Glam" classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic }} label="Glam" iconPosition="start" icon={<div><Image width={50}  height={50} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/b_auto,c_pad,h_50,q_100,w_50/v1666796089/images_ovntvt.jpg"/></div>}/>} />
                  </Tabs>
             </TabContext>
              <div className="home-ft">Best Sellers </div>
                <div className={classes.mideaSmallDivResp} style={{marginTop:0}}>
                  <Swiper                    
                    breakpoints={{
                      100: {
                         slidesPerView: 2.8,
                       },
                      640: {
                         slidesPerView: 4.3,
                      }, 
                      1000: {
                         slidesPerView: 6.3,
                      },             
                    }}
      
                      modules={[FreeMode, Navigation, Pagination, Autoplay, Thumbs]}
                      spaceBetween={10}           
                      loop={false}
                      navigation= {true}
                      centeredSlides={false}
                      style={{padding: 10}}
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log('slide change')}
        
                 >
    
                   {topselling.map((product) =>(
                      <SwiperSlide key={product}>
                        <BestSeller
                          product={product}
                          key={product}
                          addToCartHandler={addToCartHandler}
                        />                         
                      </SwiperSlide>
                     ))
                   }
                 </Swiper>
                </div>
              <div className="home-ft">Flash sale </div>
                <div className={classes.mideaSmallBannerResp} style={{marginTop:0}}>
                  <Link href="/offer"> 
                    <div>                                                
                      <Image height={457} width={1480} className="bg-gray-100" style={{top: 50}} alt="" src={banner[0].image[0]}></Image>
                      <div className="swing">
                        <div  className="bannerOfferRtt">
                          <Image height={500} width={650} alt="" src="/TDCTUVUY-removebg-preview.png">
                          </Image>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              <div className={classes.mideaSmallDivResp}>
                 <Swiper                    
                    breakpoints={{
                      100: {
                         slidesPerView: 2.8,
                       },
                      640: {
                         slidesPerView: 4.3,
                      }, 
                      1000: {
                         slidesPerView: 6.3,
                      },             
                    }}
      
                      modules={[FreeMode, Navigation, Pagination, Autoplay, Thumbs]}
                      spaceBetween={10}           
                      loop={false}
                      navigation= {true}
                      centeredSlides={false}
                       style={{padding: 10}}

                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log('slide change')}
        
                 >
    
                   {offers.map((product) =>(
                      <SwiperSlide key={product}>
                        <OffersHome
                           product={product}
                           key={product}
                        />                         
                      </SwiperSlide>
                     ))
                   }
                   <SwiperSlide>
                     <Link href="/offer/products&on&offer">
                       <Image
                          width={364}
                          height={484}
                          src="https://res.cloudinary.com/dddx5qpji/image/upload/v1668954945/Untitled0_tbldbw.png"
                          alt=""
                          className="shadow object-cover h-auto w-100 bg-gray-100"
                       />
                     </Link> 
                   </SwiperSlide>
                 </Swiper>
              </div>
              <div className="home-ft">Editors Picks#</div>
                <div className={classes.mideaSmallDivResp}>
                  <Swiper 
                    className={classes.cartnlg}
                    breakpoints={{
                      100: {
                         slidesPerView: 2.3,
                       },
                      640: {
                         slidesPerView: 3.6,
                      }, 
                      1000: {
                         slidesPerView: 5.6,
                      },  

                    }}
      
                      modules={[FreeMode, Navigation, Pagination, Autoplay, Thumbs]}
                      spaceBetween={10}           
                      loop={false}
                      centeredSlides={false}
                      navigation={true}

                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
        
                   >
                        {editorspicks.map((product) => (
                          <SwiperSlide key={product}>
                            <Link href={`/product/${product.slug}`}>
                              <Image
                                width={364}
                                height={484}
                                src={product.image[0]}
                                alt={product.name}

                                className="shadow object-cover h-auto w-100 bg-gray-100"
                              />
                            </Link> 
                          </SwiperSlide>
                        ))}
                  </Swiper>
                </div>
                <div className={classes.smbrandh}>
                  <div className="grid grid-cols-2 gap-col-4 gap-y-3 md:grid-cols-3 lg:grid-cols-4">
                    {editorspicks.map((product) => (
                      <ProductItem
                        product={product}
                        key={product.slug}
                        addToCartHandler={addToCartHandler}
                        ></ProductItem>
                    ))}
                  </div>
                </div>
            </TabPanel>

            <TabPanel className={classes.padTab} value="2">
               <TabContext  value={categ} >
                 <Tabs classes={{root:classes.categGallAbs}} value={categ} sx={{"& .MuiTabs-flexContainer": {display: "inline-flex", margin:"4px", position:"fixed", top:"30px", zIndex:1200},}} onChange={handleBack}>
                   <Tab classes={{ root: classes.roundedTabShadow }} value="back"  iconPosition="start" icon={<ArrowBackIosIcon sx={{fontSize:10}} />}/>
                 </Tabs>
               </TabContext>
               <TabContext value={categ}>
                  <Tabs value={categ} classes={{root:classes.categGall, indicator:classes.ndicateArrow, scroller: classes.catehgallbty }}  sx={{"& .MuiTabs-flexContainer": {gap: "16px !important", inlineSize: "min-content" }, "& .MuiButtonBase-root": {textTransform: "none", color: "white"},"& .MuiTab-root.Mui-selected": {color:"black", backgroundColor:"rgb(186, 202, 188)"},"& .MuiTabs-scrollButtons":{color: "black !important"}, position:"sticky" ,top: 55, zIndex: 15}} fullWidth onChange={handleCateg} variant="scrollable"  scrollButtons="auto" >
                    <Tab value="Earrings"  label="Nose & Earrings" classes={{ root: classes.roundedTab }} sx={{"&.MuiTab-root": {backgroundColor: "rgb(211, 196, 175)",},}}/>
                    <Tab value="Anclets" label="Anclets" classes={{ root: classes.roundedTab  }} sx={{"&.MuiTab-root": {backgroundColor: "rgb(55, 62, 88)",},}}/>
                    <Tab value="Finger rings" label="Finger rings" classes={{ root: classes.roundedTab  }} sx={{"&.MuiTab-root": {backgroundColor: "rgb(253, 134, 112)",},}}/>
                    <Tab value="Waist beads" label="Waist beads" classes={{ root: classes.roundedTab  }} sx={{"&.MuiTab-root": {backgroundColor: "rgb(237, 208, 180)",},}}/>
                    <Tab value="Glam" label="Glam" classes={{ root: classes.roundedTab  }} sx={{"&.MuiTab-root": {backgroundColor: "rgb(211, 196, 175)",},}}/>
                  </Tabs>
                  <TabPanel className={classes.padTab} value="Earrings" >
                     <div className="grid mt-3 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                       {ofearrings.map((product) => (
                         <ProductItem
                           product={product}
                           key={product}
                           addToCartHandler={addToCartHandler}
                          />
                       ))}
                     </div>
                  </TabPanel>
           
                  <TabPanel className={classes.padTab} value="Anclets" >
                     <div className="grid mt-3 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                       {ofanclets.map((product) => (
                         <ProductItem
                           product={product}
                           key={product}
                           addToCartHandler={addToCartHandler}

                          />
                       ))}
                      </div>
                    </TabPanel>

                    <TabPanel className={classes.padTab} value="Finger rings" >
                      <div className="grid mt-3 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {offingerrings.map((product) => (
                         <ProductItem
                           product={product}
                           key={product}
                           addToCartHandler={addToCartHandler}
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-12 justify-center h-screen align-center"><div className="pt-6 col-span-4 col-start-5 grow"><div className="block"><Image width={300} height={450} alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1667216863/219-2195024_mannequin-fashion-design-icon-hd-png-download-removebg_im8a6n.png"></Image><div className="flex justify-center"><div>NO UPDATES YET</div></div></div></div></div>
                    </TabPanel>
                    <TabPanel className={classes.padTab} value="Waist beads">
                      <div className="grid mt-3 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {ofwaistbeads.map((product) => (
                         <ProductItem
                           product={product}
                           key={product}
                           addToCartHandler={addToCartHandler}
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-12 justify-center h-screen align-center"><div className="pt-6 col-span-4 col-start-5 grow"><div className="block"><Image width={300} height={450} alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1667216863/219-2195024_mannequin-fashion-design-icon-hd-png-download-removebg_im8a6n.png"></Image><div className="flex justify-center"><div>NO UPDATES YET</div></div></div></div></div>
                    </TabPanel>
                    <TabPanel className={classes.padTab} value="Glam">
                      <div className="grid mt-3 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {ofglam.map((product) => (
                         <ProductItem
                           product={product}
                           key={product}
                           addToCartHandler={addToCartHandler}
                          />
                        ))}
                      </div>
                      <div className="grid grid-cols-12 justify-center h-screen align-center"><div className="pt-6 col-span-4 col-start-5 grow"><div className="block"><Image width={300} height={450} alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1667216863/219-2195024_mannequin-fashion-design-icon-hd-png-download-removebg_im8a6n.png"></Image><div className="flex justify-center"><div>NO UPDATES YET</div></div></div></div></div>
                    </TabPanel>
               </TabContext >             
            </TabPanel>
        </TabContext >             
        
        <Tabsbottom/>
    </Layout>
         </>
  
)
 
};
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}, '-reviews').lean();
  const ofearrings = await Product.find(
    { category: 'Earrings', isEditorsChoice: true },
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(20);
  const ofanclets = await Product.find(
    { category: 'Anclets'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(20);
  const offingerrings = await Product.find(
    { category: 'Finger rings'},
    '-reviews'
    )
      .lean() 
      .sort({
         rating: -1,
      })
      .limit(20);
  const ofwaistbeads = await Product.find(
    { category: 'Waist Beads'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(20);
  const ofglam = await Product.find(
    { category: 'Glam'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(20);
  
  const banner = await Banner.find().lean();
  await db.disconnect();

  const newdrops = [...products.filter((product) => product.isNeww)];
  const offers = [...products.filter((product) => product.isOnoffer)];
  const editorspicks = [...products.filter((product) => product.isEditorsChoice)];
  const topselling = [...products.filter((product) => product.initialStock - product.countInStock > 5 ).sort((a, b) => ((a.initialStock - a.countInStock) < (b.initialStock - b.countInStock)) ? 1 : -1)];  

  return {
    props: {
      topselling: topselling.map(db.convertDocToObj),
      ofglam: ofglam.map(db.convertDocToObj),
      ofwaistbeads: ofwaistbeads.map(db.convertDocToObj),      
      offingerrings: offingerrings.map(db.convertDocToObj),      
      ofanclets: ofanclets.map(db.convertDocToObj),      
      ofearrings: ofearrings.map(db.convertDocToObj),      
      editorspicks: editorspicks.sort((a, b) => (a.rating < b.rating) ? 1 : -1).map(db.convertDocToObj),
      newdrops: newdrops.sort((a, b) => (a.rating < b.rating) ? 1 : -1).map(db.convertDocToObj),
      offers: offers.sort((a, b) => (a.rating < b.rating) ? 1 : -1).map(db.convertDocToObj),
      banner: banner.map(db.convertDocToObj),
    },
  };
}
export default Home
