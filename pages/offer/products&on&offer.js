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

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';




const Newproducts = (props) => {
const { banner, ofshoes , ofbags, ofankara, ofdresses, ofpants, ofsuits, oftrendy, categories} = props;
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

 const [value, setValue] = useState("Ankara");
 const handleChange = (event, newValue) => {
        setValue(newValue)
  };
  
  return (
    <> 
       <Layout>
         <div className={classes.smseach}>
          
         </div>
          <div className={classes.fullWidth}><Image width={2600} height={340} alt="" src={banner[5].image[0]}></Image> </div>
          <div className="home-ft">NiVAZZi DEAlS AND OFFERS </div>
        <TabContext value={value}>          
          <Tabs value={value}  sx={{"& .MuiTab-root.Mui-selected": {color:"black"}, position:"sticky" ,top: 0, zIndex: 15}} fullWidth onChange={handleChange} variant="scrollable"  scrollButtons="auto" >
              {categories &&
                    categories.map((category) => (
                      <Tab label={category} key={category} value={category}>
                        
                      </Tab>
                    ))}
          </Tabs>

          
            <TabPanel className={classes.padTab} value="Suits" >
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
               {ofsuits.map((product) => (
                         <DealsCards
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
                         <DealsCards
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
                         <DealsCards
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
                         <DealsCards
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
                         <DealsCards
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
                         <DealsCards
                           product={product}
                           addToCartHandler={addToCartHandler}
                           key={product}
                          />
                    ))}
              </div>
            </TabPanel> 
            <TabPanel className={classes.padTab} value="Trendy">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
               {oftrendy.map((product) => (
                         <DealsCards
                           product={product}
                           addToCartHandler={addToCartHandler}
                           key={product}
                          />
                    ))}
              </div>
            </TabPanel>
        </TabContext>
          
       
    </Layout>
         </>
  
)
 
};
export async function getServerSideProps() {
  await db.connect();
  
  const banner = await Banner.find().lean();
  const categories = await Product.find({isOnoffer: true}).distinct('category');
  
  const ofbags = await Product.find(

    { isOnoffer: true, category: 'Bags'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(14);
  const ofpants = await Product.find(
    { isOnoffer: true, category: 'Pants'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(14);
  const ofshoes = await Product.find(
    { isOnoffer: true, category: 'Shoes'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(14);
  const oftrendy = await Product.find(
    { isOnoffer: true, category: 'Trendy'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(14);
  const ofsuits = await Product.find(
    { isOnoffer: true, category: 'Suits'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(14);
  const ofoutfits = await Product.find(
    { isOnoffer: true, category: 'Outfit'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(14);
  const ofankara = await Product.find(
    { isOnoffer: true, category: 'Ankara'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(14);
  const ofdresses = await Product.find(
    { isOnoffer: true, category: 'Dresses'},
    '-reviews'
    )
      .lean()
      .sort({
         rating: -1,
      })
      .limit(14);
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
      banner: banner.map(db.convertDocToObj),
      categories,
    },
  };
}
export default Newproducts 
