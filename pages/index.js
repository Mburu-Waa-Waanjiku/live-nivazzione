import React from 'react';
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
import BestSeller from '../components/BestSeller';
import axios from 'axios';
import Tabsbottom from '../components/Tabsbottom';
import OffersHome from '../components/OffersHome';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useStateContext } from '../utils/StateContext';
import dynamic from 'next/dynamic';
const DynamicEditorsPics = dynamic(() => import('../components/EditorsPics'), {
  loading: () => '',
})
import Piercing from '../components/tabsinfinityscrolls/Piercings';
import Jewelry from '../components/tabsinfinityscrolls/Jewelry';
import Glam from '../components/tabsinfinityscrolls/Glam';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Home = ({topselling, banner, offers, newdrops }) => {
  const { state, dispatch } = useContext(Store);
  const {  value, handleChange, categ, handleCateg, handleBoth, handleBack } = useStateContext();
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
      <Layout title="SHIGLAM KENYA ,Get Valentine offers on Latest trends in  Women's Earrings, Waist beads, Rings, Makeup products, Anclets — Ancle Bracelets and more on jewelty in NAIROBI & its enirons."
          description="SHIGLAM Valentine offers Exclusive discounts and the latest trends at SHIGLAM KENYA — NAIROBI — Women's Earrings, Waist beads, Finger rings, Glam-Makeup products, Anclets and more. ✓ Free Shipping On Orders ..." 
          socialtitle="SHIGLAM KENYA ,Get Valentine offers on Latest trends in Fashon & Jewelry | Women's Earrings, Waist beads, Rings, Makeup products, Anclets — Ancle Bracelets and more on jewelty in NAIROBI & its enirons." 
          socialdesc="Get Exclusive Valentine discounts on the latest trends in Women's Jewelry — Earrings, Waist beads, Finger rings, Glam-Makeup products, Anclets and more Jewelries at SHIGLAM KENYA — NAIROBI — ✓ Free Shipping On Orders ... "
          socialimages="https://res.cloudinary.com/dddx5qpji/image/upload/v1674473371/offerbanner1_3_yo5p97.jpg"
      > 
        <TabContext value={value}>
          <Tabs className={classes.ndicatenone}  value={value} classes={{root:classes.hmStyle, indicator:classes.ndicateThick }} sx={{"& .MuiTab-root.Mui-selected": {color:"black"}, position:"sticky" ,top: 45, zIndex: 15}} fullWidth onChange={handleChange} variant="scrollable"  scrollButtons="auto" >
            <Tab value="1" />
            <Tab value="2" />
            
          </Tabs>

            
            <TabPanel style={{padding: 0}} value="1">
               <div className={classes.mideaSmallBannerResp}>
                 <Swiper                    
                      autoplay={{
                          delay: 3000,
                          disableOnInteraction: false,
                        }}
                      modules={[FreeMode, Pagination, Autoplay, Thumbs]}
                      spaceBetween={10}           
                      loop={true}
                      pagination={true}
                      centeredSlides={false}
                      slidesPerView={1}
                   onSwiper={(swiper) => console.log(swiper)}
                   onSlideChange={() => console.log('slide change')}
                  >
                      <SwiperSlide>
                           <Image
                             height={718} width={1560}
                             src={banner[1].image[0]}
                             alt="Banner"
       
                             className="shadow object-cover h-auto w-100 bg-gray-100"
                           />
                       </SwiperSlide>
                 </Swiper> 
               </div>
              <div className="home-ft">Newly Dropped</div>
                <div className={classes.mideaSmallBannerResp} style={{marginTop:0}}>
                  <Link href="/newproducts">  
                    <div>                                               
                      <Image height={800} width={1600} className="bg-gray-100" alt="" src={banner[2].image[0]}></Image>
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
                        <div className={classes.newpostb} style={{height: 9}}>
                          NEW
                        </div>
                        <Link href={`${product.category}/${product.slug}`} >
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
                    <Tab value="Piercings" classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic }} label="Piercings" iconPosition="start" icon={<div><Image width={50}  height={50} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/b_auto,c_pad,g_center,h_500,w_500/v1666792827/0e8156a292b6b2fc8b3dcce2ee243da1_ed3fmn.jpg"/></div>}/>} />
                    <Tab value="Jewelry" classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic}} label="Jewelry" iconPosition="start" icon={<div><Image  width={50} height={50} className="bg-gray-100 mb-2" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/c_thumb,w_200,g_face/v1673000081/offerbanner1_5_upiwk4.jpg"/></div>} />
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
                    <Image height={600} width={1600} className="bg-gray-100" alt="" src={banner[0].image[0]}></Image>
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

                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log('slide change')}
        
                 >
    
                   {offers.slice(1, 10).map((product) =>(
                      <SwiperSlide key={product}>
                        <OffersHome
                           product={product}
                           key={product}
                        />                         
                      </SwiperSlide>
                     ))
                   }
                   <SwiperSlide>
                     <Link href="/offer">
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
              <DynamicEditorsPics/>
            </TabPanel>

            <TabPanel style={{padding: 0}} value="2">
               <TabContext  value={categ} >
                 <Tabs classes={{root:classes.categGallAbs}} value={categ} sx={{"& .MuiTabs-flexContainer": {display: "inline-flex", margin:"4px", position:"fixed", top:"30px", zIndex:1200},}} onChange={handleBack}>
                   <Tab classes={{ root: classes.roundedTabShadow }} value="back"  iconPosition="start" icon={<ArrowBackIosIcon sx={{fontSize:10}} />}/>
                 </Tabs>
               </TabContext>
               <TabContext value={categ}>
                  <Tabs value={categ} classes={{root:classes.categGall, indicator:classes.ndicateArrow, scroller: classes.catehgallbty }}  sx={{"& .MuiTabs-flexContainer": {gap: "16px !important", inlineSize: "min-content" }, "& .MuiButtonBase-root": {textTransform: "none", color: "white"},"& .MuiTab-root.Mui-selected": {color:"black", backgroundColor:"rgb(186, 202, 188)"},"& .MuiTabs-scrollButtons":{color: "black !important"}, position:"fixed" ,top: 55, zIndex: 15}} fullWidth onChange={handleCateg} variant="scrollable"  scrollButtons="auto" >
                    <Tab value="Piercings"  label="Piercings" classes={{ root: classes.roundedTab }} sx={{"&.MuiTab-root": {backgroundColor: "rgb(211, 196, 175)",},}}/>
                    <Tab value="Jewelry" label="Jewelry" classes={{ root: classes.roundedTab  }} sx={{"&.MuiTab-root": {backgroundColor: "rgb(55, 62, 88)",},}}/>
                    <Tab value="Glam" label="Glam" classes={{ root: classes.roundedTab  }} sx={{"&.MuiTab-root": {backgroundColor: "rgb(211, 196, 175)",},}}/>
                  </Tabs>
                  <TabPanel  style={{padding: 0, marginTop: 85}} value="Piercings" >
                     <Piercing/>
                  </TabPanel>
                  <TabPanel  style={{padding: 0, marginTop: 85}} value="Jewelry" >
                     <Jewelry/>
                  </TabPanel>
                  <TabPanel  style={{padding: 0, marginTop: 85}} value="Glam">
                    <Glam/>
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
  const banner = await Banner.find().lean();
  await db.disconnect();
  
  const newdrops = [...products.filter((product) => product.isNeww)];
  const offers = [...products.filter((product) => product.isOnoffer)];
  const topselling = [...products.filter((product) => product.initialStock - product.countInStock > 5 ).sort((a, b) => ((a.initialStock - a.countInStock) < (b.initialStock - b.countInStock)) ? 1 : -1)];  

  return {
    props: {
      topselling: topselling.map(db.convertDocToObj),
      newdrops: newdrops.sort((a, b) => (a.rating < b.rating) ? 1 : -1).map(db.convertDocToObj),
      offers: offers.sort((a, b) => (a.rating < b.rating) ? 1 : -1).map(db.convertDocToObj),
      banner: banner.map(db.convertDocToObj),
    },
  };
}
export default Home
