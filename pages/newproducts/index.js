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
import Loader from '../../components/Loader';
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";

const Newproducts = (props) => {
const { categories, banner } = props;
 const { state, dispatch } = useContext(Store);
 const classes = useStyles();

 const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "infiniteCharacters",
    async ({ pageParam = 1 }) =>
      await fetch(
        `/api/products/newprods?page=${pageParam}`
      ).then((result) => result.json()),
    {
      getNextPageParam: (lastPage, pages) => {
        if (pages.length < pages[0].maxPage) {
          return pages.length + 1;
        } else {
          return undefined
        }
      },
    }
  );
  

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
       <Layout title="SHIGLAM DAILYDROPS, Get NEW and LATEST trends at SHIGLAM KENYA, Women's Fashon , Earrings, Noserings, Waist beads, Anclets and Glam."
               content="SHIGLAM DAILYDROPS Get NEW and LATEST trends at SHIGLAM KENYA - Women's Fashon , Earrings, Noserings, Waist beads, Anclets and Glam: Make-Up ACCESSORIES from as low as Ksh.2...."
       >
        <div className=" margintopFix home-ft">NEW PRODUCTS</div>
        <TabContext value={value}>          
          <Tabs style={{display: "none"}} centered value={value} classes={{indicator:classes.ndicateThick }}  sx={{"& .MuiTab-root.Mui-selected": {color:"black"}, position:"sticky" ,top: 0, zIndex: 15, marginBottom:"10px"}} fullWidth onChange={handleChange} variant="scrollable"  scrollButtons="auto" >
              {categories &&
                    categories.map((category) => (
                      <Tab label={category} key={category} value={category}>
                        
                      </Tab>
                    ))}
              <Tab label="all" value="All">
              </Tab>
          </Tabs>
            <TabPanel style={{padding: 0}} value="All" >
              <div>
                {status === "success" ? (
                  <InfiniteScroll
                    dataLength={data?.pages.length * 16}
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={<Loader/>}
                    >
                      <div className='grid grid-cols-2 gap-col-4 gap-y-3 md:grid-cols-3 lg:grid-cols-4'>
                      {data?.pages.map((page) => (
                        <>
                          {page.newprods?.map((product) => (
                            <DealsCards
                              product={product}
                              key={product}
                              addToCartHandler={addToCartHandler}
                            />
                          ))}
                        </>
                      ))}
                    </div>
                  </InfiniteScroll>
                ) : (
                <div>
                  <Loader/>
                </div>
                )}
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
  
  
  
  await db.disconnect();
  return {
    props: {      
      banner: banner.map(db.convertDocToObj),
      categories,
    },
  };
}
export default Newproducts 
