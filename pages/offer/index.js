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
import axios from 'axios';
import useStyles from '../../utils/styles';
import Layout from '../../components/Layout';
import Tabsbottom from '../../components/Tabsbottom';
import Offers from '../../components/tabsinfinityscrolls/Offers';


const Newproducts = (props) => {
const { categories, banner} = props;
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
               content="Get NEW and LATEST products at UNBELIEVABLE offers from SHIGLAM KENYA — Women's Fashon , Earrings, Noserings, Waist beads, Anclets and Glam: Make-Up ACCESSORIES from as low as Ksh.1......"
       >
          <div className="margintopFix home-ft">SHIGLAM DEALS </div>
          <div className={classes.mideaSmallBannerResp} style={{marginTop:0, display:"none"}}><Image className="bg-gray-100" width={2600} height={340} alt="" src={banner[5].image[0]}></Image> </div>
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

  await db.disconnect();
  return {
    props: {      
      banner: banner.map(db.convertDocToObj),
      categories,
    },
  };
}
export default Newproducts 
