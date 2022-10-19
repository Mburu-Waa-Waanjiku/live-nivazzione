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
import NextLink from 'next/link';
import ProductItem from '../components/ProductItem';
import Newpost from '../components/Newpost';
import axios from 'axios';
import Tabsbottom from '../components/Tabsbottom';
import Layout from '../components/Layout';
import PhotoIcon from '@mui/icons-material/PhotoTwoTone';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardRounded';
import useStyles from '../utils/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Home = ({ banner, ofshoes , ofbags, ofankara, ofdresses, ofpants, ofsuits, oftrendy,  newdrops, offers, editorspicks }) => {
  const { state, dispatch } = useContext(Store);  
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
 
 const [value, setValue] = useState('1');
 const handleChange = (event, newValue) => {
        setValue(newValue)
  };
 const [categ, setCateg] = useState('Ankara');
 const handleCateg = (event, newCateg) => {
        setCateg(newCateg)
  };
 const handleBoth = (event, newCateg) => {
     setValue('2');
     setCateg(newCateg);
 };
 const handleBack = (event, newCateg) => {
     setValue('1');
     setCateg(newCateg);
 };
   

  return (
    <> 
      <Layout> 
        <div className={classes.smseach}>
          
        </div>
        <TabContext value={value}>
          <Tabs  value={value} classes={{root:classes.hmStyle, indicator:classes.ndicateThick }} sx={{"& .MuiTab-root.Mui-selected": {color:"black"}, position:"sticky" ,top: 45, zIndex: 15}} fullWidth onChange={handleChange} variant="scrollable"  scrollButtons="auto" >
            <Tab value="1" />
            <Tab value="2" />
            
          </Tabs>

            
            <TabPanel className={classes.padTab} value="1">
               <div>
                  <Image height={636} width={1560} alt="" src={banner[1].image[0]}></Image>
               </div>
              <div className="home-ft">Newly Dropped</div>
              <div> 
               <div className={classes.fullWidth}>
                 <Swiper                    
                    breakpoints={{
                      100: {
                         navigation: false,
                         slidesPerView: 2.8,
                       },
                      640: {
                         slidesPerView: 4.3,
                         navigation: true,
                      }, 
                      1000: {
                         slidesPerView: 6.3,
                         navigation: true,
                      },             
                    }}
      
                      modules={[FreeMode, Navigation, Pagination, Autoplay, Thumbs]}
                      spaceBetween={10}           
                      loop={false}
                      centeredSlides={false}
                
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log('slide change')}
        
                 >
    
                   {newdrops.map((product) =>(
                      <SwiperSlide key={product}>
                        <Newpost/>
                        <NextLink href={`/product/${product.slug}`} passHref >
                           <Image
                             width={364}
                             height={484}
                             src={product.image[0]}
                             alt={product.name}

                             className="shadow object-cover h-auto w-100"
                           />
                        </NextLink>
                       </SwiperSlide>
                     ))
                   }
                   <SwiperSlide>
                      
                      <div className={classes.header}>
                       <div>
                        <NextLink href="/newproducts/newproducts" passHref>                                                 
                          <div className={classes.next}>
                            <ArrowForwardIcon  className={classes.arrow}/>
                          </div>
                        </NextLink>                          
                        <div className={classes.text} >See More</div>
                       </div>
                      </div>
                   </SwiperSlide>
                 </Swiper>
               </div>
              </div>
              
              <div className="home-ft">Categories</div>
                <TabContext  value={categ} 
              >
                  <Tabs value={categ} classes={{ flexContainer: classes.categ, indicator:classes.ndicatenone, scroller: classes.categRut}} sx={{"& .MuiTab-root.Mui-selected": {color:"black", },"& .MuiButtonBase-root": {textTransform: "none", minInlineSize: "max-content" }, }} fullWidth onChange={handleBoth} variant="scrollable"  >
                    <Tab value="Ankara" classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic }} label="Ankara" iconPosition="start" icon={<div><Image width={20} height={20} alt="ankara" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1664230129/sc8thwrdmtqqgccgxeai.png"/></div>} />
                    <Tab value="Pants" classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic}} label="Pants" iconPosition="start" icon={<div><Image  width={20} height={20} alt="Pants" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1664230129/sc8thwrdmtqqgccgxeai.png"/></div>} />
                    <Tab value="Bags" label="Bags"/>
                    <Tab value="Shoes" label="Shoes"/>
                    <Tab value="Trendy" label="Trendy"/>
                    <Tab value="Dresses" label="Dresses"/>
                    <Tab value="Outfit" label="Outfit"/>
                    <Tab value="Suits" label="Suits"/>
                    <Tab value="Skirts" label="Skirts"/>
                    <Tab value="Shorts" label="shorts"/>
                    <Tab className={classes.ndicatenone} value="back" label="shorts"/>

                  </Tabs>
             </TabContext>
              <div className="home-ft">Flush sale </div>
              <div className={classes.fullWidth}>
                 <Swiper                    
                    breakpoints={{
                      100: {
                         navigation: false,
                         slidesPerView: 2.3,
                       },
                      640: {
                         slidesPerView: 4.3,
                         navigation: false,
                      }, 
                      1000: {
                         slidesPerView: 6.3,
                         navigation: true,
                      },  

                    }}
      
                      modules={[FreeMode, Navigation, Pagination, Autoplay, Thumbs]}
                      spaceBetween={10}           
                      loop={false}
                      centeredSlides={false}
                
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log('slide change')}
        
                 >
    
                   {offers.map((product) =>(
                      <SwiperSlide key={product}>
                        <NextLink href={`/product/${product.slug}`} passHref>
                           <Image
                             width={364}
                             height={484}
                             src={product.image[0]}
                             alt={product.name}

                             className="shadow object-cover h-auto w-100"
                           />
                        </NextLink> 
                        <div className="inline ">
                          {product.isBurgain && (<div className="loves"> B </div>)}
                          <div className="">
                            <div className={classes.prevprice}><s>Ksh.{product.prevprice}</s></div>
                            <div className={classes.price}>Ksh.{product.price}</div>
                          </div>
                        </div>
                        
                       </SwiperSlide>
                     ))
                   }
                   <SwiperSlide>
                      <div className={classes.header}>
                       <div>
                        <NextLink href="/offer/products&on&offer" passHref>                                                 
                          <div className={classes.next}>
                            <ArrowForwardIcon  className={classes.arrow}/>
                          </div>
                        </NextLink>                          
                        <div className={classes.text} >See More</div>
                       </div>
                      </div>
                   </SwiperSlide>
                 </Swiper>
              </div>
               <div className="home-ft">Editors Picks#</div>
                    <div className="grid grid-cols-2 gap-col-4 gap-y-3 md:grid-cols-3 lg:grid-cols-4">
                        {editorspicks.map((product) => (
                            <ProductItem
                             product={product}
                             key={product.slug}
                             addToCartHandler={addToCartHandler}
                             ></ProductItem>
                        ))}
                    </div>
            </TabPanel>

            <TabPanel className={classes.padTab} value="2">
               <TabContext  value={categ} >
                 <Tabs classes={{root:classes.categGall}} value={categ} sx={{"& .MuiTabs-flexContainer": {display: "inline-flex", margin:"4px", position:"fixed", top:"30px", zIndex:1200},}} onChange={handleBack}>
                   <Tab classes={{ root: classes.roundedTabShadow }} value="back"  iconPosition="start" icon={<ArrowBackIosIcon sx={{fontSize:10}} />}/>
                 </Tabs>
               </TabContext>
               <TabContext value={categ}>
                  <Tabs value={categ} classes={{root:classes.categGall, indicator:classes.ndicateArrow, scroller: classes.catehgallbty }}  sx={{"& .MuiTabs-flexContainer": {gap: 2, inlineSize: "min-content" }, "& .MuiButtonBase-root": {textTransform: "none", color: "white"},"& .MuiTab-root.Mui-selected": {color:"black", backgroundColor:"rgb(186, 202, 188)"},"& .MuiTabs-scrollButtons":{color: "black !important"}, position:"sticky" ,top: 45, zIndex: 15}} fullWidth onChange={handleCateg} variant="scrollable"  scrollButtons="auto" >
                    <Tab value="Ankara"  label="Ankara" classes={{ root: classes.roundedTab }} sx={{"&.MuiTab-root": {backgroundColor: "rgb(211, 196, 175)",},}}/>
                    <Tab value="Pants" label="Pants" classes={{ root: classes.roundedTab  }} sx={{"&.MuiTab-root": {backgroundColor: "rgb(55, 62, 88)",},}}/>
                    <Tab value="Bags" label="Bags" classes={{ root: classes.roundedTab  }} sx={{"&.MuiTab-root": {backgroundColor: "rgb(253, 134, 112)",},}}/>
                    <Tab value="Shoes" label="Shoes" classes={{ root: classes.roundedTab  }} sx={{"&.MuiTab-root": {backgroundColor: "rgb(237, 208, 180)",},}}/>
                    <Tab value="Trendy" label="Trendy" classes={{ root: classes.roundedTab  }} sx={{"&.MuiTab-root": {backgroundColor: "rgb(211, 196, 175)",},}}/>
                    <Tab value="Dresses" label="Dresses" classes={{ root: classes.roundedTab  }} sx={{"&.MuiTab-root": {backgroundColor: "rgb(136, 51, 80)",},}}/>
                    <Tab value="Outfit" label="Outfit" classes={{ root: classes.roundedTab }} sx={{"&.MuiTab-root": {backgroundColor: "rgb(195, 145, 113)",},}}/>
                    <Tab value="Suits" label="Suits" classes={{ root: classes.roundedTab}}  sx={{"&.MuiTab-root": {backgroundColor: "rgb(101, 124, 147)",},}} />
                    <Tab value="Skirts" label="Skirts" classes={{ root: classes.roundedTab }} sx={{"&.MuiTab-root": {backgroundColor: "rgb(151, 112, 56)",},}} />
                    <Tab value="Shorts" label="shorts" classes={{ root: classes.roundedTab }}  sx={{"&.MuiTab-root": {backgroundColor: "rgb(220, 181, 175)",},}}/>
                 
                  </Tabs>
                  <TabPanel className={classes.padTab} value="Suits" >
                     <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                       {ofsuits.map((product) => (
                         <ProductItem
                           product={product}
                           key={product}
                           addToCartHandler={addToCartHandler}
                          />
                       ))}
                     </div>
                  </TabPanel>
           
                  <TabPanel className={classes.padTab} value="Ankara" >
                     <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                       {ofankara.map((product) => (
                         <ProductItem
                           product={product}
                           key={product}
                           addToCartHandler={addToCartHandler}

                          />
                       ))}
                      </div>
                    </TabPanel>

                    <TabPanel className={classes.padTab} value="Dresses" >
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {ofdresses.map((product) => (
                         <ProductItem
                           product={product}
                           key={product}
                           addToCartHandler={addToCartHandler}
                          />
                        ))}
                      </div>
                    </TabPanel>
          
                    <TabPanel className={classes.padTab} value="Bags">
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {ofbags.map((product) => (
                         <ProductItem
                           product={product}
                           key={product}
                           addToCartHandler={addToCartHandler}
                          />
                        ))}
                      </div>
                    </TabPanel>
          
                    <TabPanel className={classes.padTab} value="Pants">
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {ofpants.map((product) => (
                         <ProductItem
                           product={product}
                           key={product}
                           addToCartHandler={addToCartHandler}
                          />
                        ))}
                      </div>
                    </TabPanel>
                    <TabPanel className={classes.padTab} value="Shoes">
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {ofshoes.map((product) => (
                         <ProductItem
                           product={product}
                           key={product}
                           addToCartHandler={addToCartHandler}
                          />
                        ))}
                      </div>
                    </TabPanel> 
                    <TabPanel className={classes.padTab} value="Trendy">
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                        {oftrendy.map((product) => (
                         <ProductItem
                           product={product}
                           key={product}
                           addToCartHandler={addToCartHandler}
                          />
                        ))}
                      </div>
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
  const newdrops = await Product.find(
    { isNeww: true },
    '-reviews'
    )
      .lean()
      .sort({
        rating: -1,
      })
      .limit(14);
  const offers = await Product.find(
    {  isOnoffer: true  },
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(14);
  const editorspicks = await Product.find(
    {  isEditorsChoice: true  },
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(14);
  const ofbags = await Product.find(
    { category: 'Bags'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(14);
  const ofpants = await Product.find(
    { category: 'Pants'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(14);
  const ofshoes = await Product.find(
    { category: 'Shoes'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(14);
  const oftrendy = await Product.find(
    { category: 'Trendy'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(14);
  const ofsuits = await Product.find(
    { category: 'Suits'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(14);
  const ofoutfits = await Product.find(
    { category: 'Outfit'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(14);
  const ofankara = await Product.find(
    { category: 'Ankara'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(14);
  const ofdresses = await Product.find(
    { category: 'Dresses'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(14);
  const banner = await Banner.find().lean();
  await db.disconnect();
  return {
    props: {
      ofankara: ofankara.map(db.convertDocToObj),
      ofbags: ofbags.map(db.convertDocToObj),
      ofpants: ofpants.map(db.convertDocToObj),
      ofsuits: ofsuits.map(db.convertDocToObj),
      ofshoes: ofshoes.map(db.convertDocToObj),      
      ofdresses: ofdresses.map(db.convertDocToObj),      
      oftrendy: oftrendy.map(db.convertDocToObj),      
      ofoutfits: ofoutfits.map(db.convertDocToObj),      
      editorspicks: editorspicks.map(db.convertDocToObj),
      newdrops: newdrops.map(db.convertDocToObj),
      offers: offers.map(db.convertDocToObj),
      banner: banner.map(db.convertDocToObj),
    },
  };
}
export default Home
