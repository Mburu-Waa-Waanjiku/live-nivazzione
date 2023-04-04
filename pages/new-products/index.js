import React from 'react';
import { useState } from "react";
import { useContext } from 'react';
import { Store } from '../../utils/Store';
import db from '../../utils/db';
import Product from '../../models/Product';
import Banner from '../../models/Banner';
import DealsCards from '../../components/DealsCards';
import axios from 'axios';
import Tabsbottom from '../../components/Tabsbottom';
import Loader from '../../components/Loader';
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import Image from 'next/image';
import Footer from '../../components/Footer';
import Headers from '../../components/HeadersContainer';
import CategoryBanner from '../../components/BannersHON';

const Newproducts = (props) => {
 const {  newprods, banner } = props;
 const { state, dispatch } = useContext(Store);
 const mylink = "http://localhost:3000/new-products";

 const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "infiniteCharacters",
    async ({ pageParam = 2 }) =>
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
        title="SHIGLAM DAILYDROPS, NEW and LATEST trends at SHIGLAM KENYA, Women's Fashon , Earrings, Noserings, Waist beads, Anclets and Glam."
        desc="Get NEW and LATEST trends in Women's Fashon , Earrings, Noserings, Waist beads, Anclets and Glam: Make-Up ACCESSORIES from as low as Ksh.2...."
      />
      <CategoryBanner
        banner={banner}
        mylink={mylink}
      />
      <div>
        <div className='pt-10 grid grid-cols-2 gap-col-4 gap-y-3 md:grid-cols-3 lg:grid-cols-4'>
          {newprods.map((product) => (
            <DealsCards
              product={product}
              key={product}
              state={state}
              addToCartHandler = {addToCartHandler}
              addToFavsHandler = {addToFavsHandler}
              removeFavHandler = {removeFavHandler}
            />
          ))}
        </div>
        {status === "success" ? (
          <InfiniteScroll
            dataLength={data?.pages.length * 20}
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
                      state={state}
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
      <Tabsbottom/>
      <Footer/>
    </>
)
 
};
export async function getServerSideProps() {
  await db.connect();
  
  const banner = await Banner.find().lean();
  const newprods = await Product.find(
    { isNeww: true },
    )
      .lean()
      .sort({
        createdAt: -1,
        rating: -1,
      })
      .limit(24);    
  
  await db.disconnect();
  return {
    props: { 
      newprods: newprods.map(db.convertDocToObj),     
      banner: banner.map(db.convertDocToObj),
    },
  };
}
export default Newproducts 
