import React from 'react';
import { useState, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import db from '../../utils/db';
import Product from '../../models/Product';
import Banner from '../../models/Banner';
import Image from 'next/image';
import useStyles from '../../utils/styles';
import Layout from '../../components/Layout';
import Tabsbottom from '../../components/Tabsbottom';
import Offers from '../../components/tabsinfinityscrolls/Offers';
import YourFoto from '../../components/YourFoto';
import { Store } from '../../utils/Store';
import axios from 'axios';

const Newproducts = (props) => {
const { categories, banner, offers} = props;
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

 const [value, setValue] = useState("All");
 const handleChange = (event, newValue) => {
        setValue(newValue)
  };
  
  return (
    <> 
       <Layout title="SHIGLAM OFFERS KENYA — Women's Fashon,  Jewelry , Earrings, Noserings, Waist beads, Anclets and Glam: Make-Up ACCESSORIES "
               desc="Get The Biggest Deals & Offers from SHIGLAM in Women's Fashon , Earrings, Noserings, Waist beads, Anclets and Make-Up ACCESSORIES from as low as Ksh.1......"
       >
        <div className={classes.mideaSmallBannerResp} style={{marginTop:"0.75rem", marginBottom: "0.5rem"}}>
          <Image className="bg-gray-100" width={1600} height={500} alt="Offers" src={banner[4].image[0]}></Image> 
        </div>
        <TabContext value={value}>          
          <Tabs style={{display: 'none'}} centered value={value} classes={{indicator:classes.ndicateThick }}  sx={{"& .MuiTab-root.Mui-selected": {color:"black"}, position:"sticky" ,top: 0, zIndex: 15, marginBottom:"10px"}} fullWidth onChange={handleChange} variant="scrollable"  scrollButtons="auto" >
              {categories &&
                categories.map((category) => (
                <Tab label={category} key={category} value={category}>
                </Tab>
              ))}
              <Tab label='All' value='All'>
              </Tab>
          </Tabs>
          <TabPanel style={{padding: 0}} value="All" >
            <div className='grid grid-cols-2 gap-col-4 gap-y-3 md:grid-cols-3 lg:grid-cols-4'>
              {offers.map((product) => (
                <YourFoto
                  key={product._id}
                  product={product}
                  addToCartHandler={addToCartHandler}
                />
              ))}
            </div>
            <Offers />
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
  const offers = await Product.find(
    { isOnoffer: true },
    )
      .lean()
      .sort({
        rating: -1,
        createdAt: -1,
      })
      .limit(20);
  await db.disconnect();
  return {
    props: { 
      offers: offers.map(db.convertDocToObj),     
      banner: banner.map(db.convertDocToObj),
      categories,
    },
  };
}
export default Newproducts 
