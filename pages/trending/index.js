import React from 'react';
import { useState, useContext } from "react";
import db from '../../utils/db';
import Product from '../../models/Product';
import Banner from '../../models/Banner';
import Image from 'next/image';
import Tabsbottom from '../../components/Tabsbottom';
import Offers from '../../components/tabsinfinityscrolls/Offers';
import BestSeller from '../../components/BestSeller';
import { Store } from '../../utils/Store';
import axios from 'axios';
import Footer from '../../components/Footer';
import Headers from '../../components/HeadersContainer';
import CategoryBanner from '../../components/BannersHON';

const Newproducts = (props) => {
  const { banner, products} = props;
  const { state, dispatch } = useContext(Store);
  const mylink = "http://localhost:3000/trending";

  const topselling = [...products.filter((product) => product.initialStock - product.countInStock > 5 ).sort((a, b) => ((a.initialStock - a.countInStock) < (b.initialStock - b.countInStock)) ? 1 : -1)];  

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
        title="SHIGLAM Trending in KENYA — Women's Fashon,  Jewelry , Earrings, Noserings, Waist beads, Anclets and Glam: Make-Up ACCESSORIES "
        desc="Know And Follow up on The Biggest Designs and Fashon Trends from Women's Fashon , Earrings, Noserings, Waist beads, Anclets and Make-Up ACCESSORIES from as low as Ksh.1......"
      />
      <CategoryBanner
        banner={banner}
        mylink={mylink}
      />
      <div className='pt-10 grid grid-cols-2 gap-col-4 gap-y-3 md:grid-cols-3 lg:grid-cols-4'>
        {topselling.map((product) => (
          <BestSeller
            product={product}
            key={product}
            addToCartHandler = {addToCartHandler}
            addToFavsHandler = {addToFavsHandler}
            removeFavHandler = {removeFavHandler}
          />
        ))}
      </div>
      <Offers />
      <Tabsbottom/>
      <Footer/>
    </>
  
)
 
};
export async function getServerSideProps() {
  await db.connect();
  
  const banner = await Banner.find().lean();
  const products = await Product.find({}, '-reviews').lean();

  await db.disconnect();

  return {
    props: { 
      products: products.map(db.convertDocToObj),     
      banner: banner.map(db.convertDocToObj),
    },
  };
}
export default Newproducts 
