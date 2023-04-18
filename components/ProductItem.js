import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useContext } from 'react';
import { HiShoppingCart, HiOutlineShoppingCart } from 'react-icons/hi';
import HeadersContainer from './HeadersContainer';
import home from '../styles/Home.module.css';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Store } from '../utils/Store';
import { CgBolt } from 'react-icons/cg';
import axios from 'axios';

export default function ProductItem({ product }) {
  const round0 = (num) => Math.round(num * 1 + Number.EPSILON) / 1; // 123.456 => 123
  const subtract = product.prevprice - product.price;
  const percent = round0(subtract/product.prevprice * 100);

  const { state, dispatch } = useContext(Store);
  const {userInfo, favourites } = state;
  const [fill, setFill] = useState(false);
  const [fillFav, setFillFav] = useState(false);
  const existItem = state.cart.cartItems.find((x) => x._id === product._id);
  const existFav = state.favourites.find((x) => x._id === product._id);

  const addToCartHandler = async (product) => {
    setFill(true);
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (existItem) {
      window.alert('Already added');
    } else if (data.countInStock < quantity ) {
      setFill(false);
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  const addToFavsHandler = async (product) => {
    setFillFav(true);
    const existFav = state.favourites.find((x) => x._id === product._id);
    if (existFav) {
      window.alert('Already a Favourite');
      return;
    }
    dispatch({ type: 'FAVOURITES_ADD_ITEM', payload: { ...product } });
    const { data } = await axios.post(`/api/products/${product._id}/${userInfo?._id}`);

  };
  
  const removeFavHandler = async (product) => {
    setFillFav(false);
    dispatch({ type: 'FAVOURITES_REMOVE_ITEM', payload: product });
    const { data } = await axios.delete(`/api/products/${product._id}/${userInfo?._id}`);
  };

  const URL = `https://shiglam.com/`;
  let revCount;
  if(product.numReviews < 1){
    revCount = 16
  } else{
    revCount = product.numReviews
  }
  const offerStock = Math.floor(Math.random() * 20) + 1;

  const jsdschema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product.name,
      image: [ 
                product.image[0].item,
                product.image[1]?.item 
              ],
      description: product.description,
      brand: {
        "@type": "Brand",
        name: product.brand
      },
      review: {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: 5,
          bestRating: 5
        },
        author: {
          "@type": "Person",
          name: "Diane"
        }
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: revCount
      },
      offers: {
        "@type": "Offer",
        url: URL,
        offerCount: offerStock,
        priceCurrency: "KES",
        price: product.price,
        priceValidUntil: "2023-2-14",
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/InStock"
      }
    };
    
    function addProductJsonLd() {
    return {
      __html: JSON.stringify(jsdschema),
      };
    }

  return (
    <div className="card">
    <HeadersContainer data={addProductJsonLd()} />
    <div className="gallery">
      { product.countInStock < 1 ? (
        <div style={{ marginTop: 30, width: 'fit-content', height: 'fit-content', backgroundColor: '#222', color: 'white' }} className="salesticker"> <div> Out of Stock</div></div>
        ) : product.isOnoffer ? (
        <div style={{ width: 'fit-content', height: 'fit-content' }} className="salesticker"><CgBolt style={{fontSize:16, margin: 4}} />{percent}%</div>
        ) : product.isNeww && (
          <div style={{height: 10}} className={home.newpostb}>
            NEW
          </div>
        )
      }
      <Link href={`${product.category}/${product.slug}`}>
        <a>
          <Image
            width={364}
            height={484}
            style={{borderRadius: 20}}
            src={product.image && product.image[0].item}
            alt={product.name}
            className="shadow bg-gray-100 object-cover h-auto w-100"
          />
        </a>
      </Link>
      <div style={{animation: fill ? 'scaler 1.5s' : 'none'}} className="heart-ck heart-anim"  onClick={() => addToCartHandler(product)}>
          {existItem ? <HiShoppingCart/> : <HiOutlineShoppingCart/> }
      </div>
      <div className="flex justify-between">
              <div  style={{display: 'flex', justifyContent: 'start'}}>
                <div className="block sm:flex" >
                  <div className="desc price">Ksh{product.price}</div>
                  {product.isOnoffer && <div className="pl-2 sm:pl-0" style={{fontSize: 12, lineHeight: 1.6, transform: 'translate(15px, 6.8px)', fontWeight: 600, color: 'orangered'}}><s>Ksh.{product.prevprice}</s></div>}
                </div>
              </div>
              <div style={{position: "relative", right: "-20px" }} className="flex justify-end">
                <div style={{animation: fillFav ? 'scaler 1.5s' : 'none', transform:'translate(8px, 40px)', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.4)'}} className="heart-ck heart-anim" >
                  {existFav ? <BsHeartFill onClick={() => removeFavHandler(product)} /> : <BsHeart onClick={() => addToFavsHandler(product)} /> }
                </div>
              </div>
            </div>
      </div>

      
    </div>
  );
}