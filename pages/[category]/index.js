import React from 'react';
import { useState } from "react";
import { useContext } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../utils/Store';
import db from '../../utils/db';
import Product from '../../models/Product';
import Banner from '../../models/Banner';
import ProductItems from '../../components/ProductItem';
import axios from 'axios';
import Tabsbottom from '../../components/Tabsbottom';
import Loader from '../../components/Loader';
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import Image from 'next/image';
import Footer from '../../components/Footer';
import Headers from '../../components/HeadersContainer';
import CategoryBanner from '../../components/BannersHON';
import home from '../../styles/Home.module.css';

const Jewelry = (props) => {
 
  const {  products, banner } = props;
  const necklace = [...products.filter((product) => product.category.toLowerCase().indexOf('necklace') != -1).sort((a, b) => (a.createdAt - b.createdAt ? 1 : -1))];
  const anclets = [...products.filter((product) => product.category.toLowerCase().indexOf('anclet') != -1).sort((a, b) => (a.createdAt - b.createdAt ? 1 : -1))];
  const earrings = [...products.filter((product) => product.category.toLowerCase().indexOf('earring') != -1).sort((a, b) => (a.createdAt - b.createdAt ? 1 : -1))];
  
  const router = useRouter();
  const { category } = router.query;

  const { state, dispatch } = useContext(Store);
  const {userInfo, favourites } = state;

  const mylink = `http://localhost:3000/${category}`;
  const [Anclets, setAnclets] = useState('http://localhost:3000/Anclets');
  const [Earrings, setEarrings] = useState('http://localhost:3000/Earrings');
  const [Necklaces, setNeclaces] = useState('http://localhost:3000/Necklaces');
  const [categs, setCategs] = useState(true);
  console.log("this is" ,mylink);

 const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "infiniteCharacters",
    async ({ pageParam = 2 }) =>
      await fetch(
        `/api/products/earrings?page=${pageParam}`
      ).then((result) => result.json()),
    {
      getNextPageParam: (lastPage, pages) => {
        if ((pages.length + 16) < pages[0].maxPage) {
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
        title="Shop The Latest and Most Trendy on Jewelry and Fashion Accessories whith SHIGLAM at prices as low as KES 10...."
        desc="Get the latest trends in Wemen's Jewelry AND hot Fashon Accessories in kenya - nairobi at prices you'll just love."
      />
      <CategoryBanner
        banner={banner}
        mylink={mylink}
        categs={categs}
        Earrings={Earrings}
        Necklaces={Necklaces}
        Anclets={Anclets}
      />
      <div className="pt-10 grid justify-center">
        {Anclets == mylink && <div className='grid grid-cols-2 gap-col-4 gap-y-3 md:grid-cols-3 lg:grid-cols-4'>
          {anclets.map((product) => ( 
            <div className={home.you + " " + "newb"}>
              <ProductItems
                product={product}
                key={product}
                addToCartHandler = {addToCartHandler}
                addToFavsHandler = {addToFavsHandler}
                removeFavHandler = {removeFavHandler}
              />
            </div>
          ))}
        </div>}
        {Earrings == mylink && <div className='grid grid-cols-2 gap-col-4 gap-y-3 md:grid-cols-3 lg:grid-cols-4'>
          {earrings.slice(0, 24).map((product) => ( 
            <div className={home.you + " " + home.newb}>
              <ProductItems
                product={product}
                key={product}
                addToCartHandler = {addToCartHandler}
                addToFavsHandler = {addToFavsHandler}
                removeFavHandler = {removeFavHandler}
              />
            </div>
          ))}
        </div>}
        {Earrings == mylink && <div className="pt-2">
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
                    {page.earrings?.map((product) => (
                      <div className={home.you + " " + home.newb}>
                        <ProductItems
                          product={product}
                          key={product}
                          addToCartHandler = {addToCartHandler}
                          addToFavsHandler = {addToFavsHandler}
                          removeFavHandler = {removeFavHandler}
                        />
                      </div>
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
        </div>}
        {Necklaces == mylink && <div className='grid grid-cols-2 gap-col-4 gap-y-3 md:grid-cols-3 lg:grid-cols-4'>
          {necklace.map((product) => ( 
            <div className={home.you + " " + home.newb}>
              <ProductItems
                product={product}
                key={product}
                addToCartHandler = {addToCartHandler}
                addToFavsHandler = {addToFavsHandler}
                removeFavHandler = {removeFavHandler}
              />
            </div>
          ))}
        </div>}
      </div>
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
export default Jewelry 
