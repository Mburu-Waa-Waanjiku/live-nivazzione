import React from 'react';
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { useContext } from 'react';
import { Store } from '../../utils/Store';
import db from '../../utils/db';
import Product from '../../models/Product';
import Banner from '../../models/Banner';
import Image from 'next/image';
import DealsCards from '../../components/DealsCards';
import axios from 'axios';
import useStyles from '../../utils/styles';
import Layout from '../../components/Layout';
import Tabsbottom from '../../components/Tabsbottom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';




const Newproducts = (props) => {
const { categories, banner, ofearrings, ofglam, ofwaistbeads, offingerrings, ofanclets} = props;
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

 const [value, setValue] = useState("Earrings");
 const handleChange = (event, newValue) => {
        setValue(newValue)
  };
  
  return (
    <> 
       <Layout title="SHIGLAM DAILYDROPS, Get NEW and LATEST trends at SHIGLAM KENYA, Women's Fashon , Earrings, Noserings, Waist beads, Anclets and Glam."
               content="SHIGLAM DAILYDROPS Get NEW and LATEST trends at SHIGLAM KENYA - Women's Fashon , Earrings, Noserings, Waist beads, Anclets and Glam: Make-Up ACCESSORIES from as low as Ksh.2...."
       >
          <div className={classes.mideaSmallBannerResp}><Image width={2600} height={284} alt="" src={banner[4].image[0]}></Image> </div>
          <div className="home-ft">NEW PRODUCTS</div>
        <TabContext value={value}>          
          <Tabs centered value={value} classes={{indicator:classes.ndicateThick }}  sx={{"& .MuiTab-root.Mui-selected": {color:"black"}, position:"sticky" ,top: 0, zIndex: 15, marginBottom:"10px"}} fullWidth onChange={handleChange} variant="scrollable"  scrollButtons="auto" >
              {categories &&
                    categories.map((category) => (
                      <Tab label={category} key={category} value={category}>
                        
                      </Tab>
                    ))}
          </Tabs>
            <TabPanel className={classes.padTab} value="Earrings" >
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
               {ofearrings.map((product) => (
                         <DealsCards
                           product={product}
                           key={product}
                           addToCartHandler={addToCartHandler}
                          />
                    ))}
              </div>
            </TabPanel>
          
            <TabPanel className={classes.padTab} value="Anclets">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
               {ofanclets.map((product) => (
                         <DealsCards
                           product={product}
                           key={product}
                           addToCartHandler={addToCartHandler}
                          />
                    ))}
              </div>
            </TabPanel>
          
            <TabPanel className={classes.padTab} value="Finger rings">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
               {offingerrings.map((product) => (
                         <DealsCards
                           product={product}
                           key={product}
                           addToCartHandler={addToCartHandler}
                          />
                    ))}
              </div>
            </TabPanel>
            <TabPanel className={classes.padTab} value="Waist beads">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
               {ofwaistbeads.map((product) => (
                         <DealsCards
                           product={product}
                           key={product}
                           addToCartHandler={addToCartHandler}
                          />
                    ))}
              </div>
            </TabPanel> 
            <TabPanel className={classes.padTab} value="Glam">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
               {ofglam.map((product) => (
                         <DealsCards
                           product={product}
                           addToCartHandler={addToCartHandler}
                           key={product}
                          />
                    ))}
              </div>
            </TabPanel>
        </TabContext>
          
        <Tabsbottom/>

    </Layout>
         </>
  
)
 
};
export async function getServerSideProps() {
  await db.connect();
  
  const banner = await Banner.find().lean();
  const categories = await Product.find({isNeww: true}).distinct('category');
  
  const ofearrings = await Product.find(
    { isNeww: true, category: 'Earrings'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(20);
  const ofanclets = await Product.find(
    { isNeww: true, category: 'Anclets'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(20);
  const offingerrings = await Product.find(
    { isNeww: true, category: 'Finger rings'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(20);
  const ofwaistbeads = await Product.find(
    { isNeww: true, category: 'Waist Beads'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(20);
  const ofglam = await Product.find(
    { isNeww: true, category: 'Glam'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(20);
  
  await db.disconnect();
  return {
    props: {
      ofglam: ofglam.map(db.convertDocToObj),
      ofwaistbeads: ofwaistbeads.map(db.convertDocToObj),      
      offingerrings: offingerrings.map(db.convertDocToObj),      
      ofanclets: ofanclets.map(db.convertDocToObj),      
      ofearrings: ofearrings.map(db.convertDocToObj),      
      banner: banner.map(db.convertDocToObj),
      categories,
    },
  };
}
export default Newproducts 
