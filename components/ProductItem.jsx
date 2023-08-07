import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useContext } from 'react';
import HeadersContainer from './HeadersContainer';
import { BsBagX, BsBagDashFill, BsBagPlus } from 'react-icons/bs';
import { Store } from '../utils/Store';
import { CgBolt } from 'react-icons/cg';
import axios from 'axios';
import { PiCoatHangerFill } from 'react-icons/pi';
import { GiHanger } from 'react-icons/gi';

export default function ProductItem({ product }) {
  const round0 = (num) => Math.round(num * 1 + Number.EPSILON) / 1; // 123.456 => 123
  const subtract = product.prevprice - product.price;
  const percent = round0(subtract/product.prevprice * 100);

  const { state, dispatch } = useContext(Store);
  const {userInfo } = state;
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
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const addToFavsHandler = async (product) => {
    setFillFav(true);
    const existFav = state.favourites.find((x) => x._id === product._id);
    if (existFav) {
      window.alert('Already a Favourite');
      return;
    }
    dispatch({ type: 'FAVOURITES_ADD_ITEM', payload: { ...product } });
    await axios.post(`/api/products/${product._id}/${userInfo?._id}`);

  };
  
  const removeFavHandler = async (product) => {
    setFillFav(false);
    dispatch({ type: 'FAVOURITES_REMOVE_ITEM', payload: product });
    await axios.delete(`/api/products/${product._id}/${userInfo?._id}`);
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
        <div className='flex absolute w-fitdiv'>
          { product.countInStock < 1 ? (
            <div className="bg-grayb rounded-2xl z-10 h-fit w-fit text-white mt-7 px-2"> <div> Out of Stock</div></div>
            ) : product.isOnoffer ? (
            <div className="flex bg-amber-500 z-10 py-2 px-1 flex-col rounded-2xl"><CgBolt className='text-base m-1 ' /><div>{percent}%</div></div>
            ) : product.isNeww && (
              <div className='px-2 rounded-2xl py-1 bg-lime-500'>
                NEW
              </div>
            )
          }
        </div>
        <div className='flex justify-end w-fitdiv'>
          <div style={{animation: fill ? 'scaler 1.5s' : 'none'}} className="heart-ck text-lg heart-anim bg-grayb text-white mt-4 mx-2 z-30 float-right" >
            {existFav ? <GiHanger className='scale-125' onClick={() => removeFavHandler(product)} /> : <PiCoatHangerFill  onClick={() => addToFavsHandler(product)} /> }
          </div>
        </div>
        <Link href={`https://www.shiglam.com/${product.category}/${product.slug}`}>
          <Image
            width={364}
            height={484}
            style={{borderRadius: 20}}
            src={product.image && product.image[0].item}
            alt={product.name}
            className="shadow  object-cover h-auto w-100 pulse"
          />
        </Link>
        <div className='flex px-2 pb-2 w-full justify-between'>
          <div className="flex flex-col" >
            <div className=" text-base font-bold ">Ksh{product.sizes[0].price}</div>
            {product.isOnoffer && <div className="text-sm hidden font-semibold " style={{ color: 'orangered'}}><s>Ksh.{product.prevprice}</s></div>}
          </div>
          <div style={{ transform:'translate(-7px, 3px)'}} className=" text-xl" >
            { product.countInStock < 1 ? <BsBagX/> : existItem ? <BsBagDashFill onClick={() => removeItemHandler(product)} className='c-grayb'/> : <BsBagPlus onClick={() => addToCartHandler(product)}/> }
          </div>
        </div>
      </div>
    </div>
  );
}