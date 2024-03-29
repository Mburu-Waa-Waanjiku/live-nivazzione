import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useContext } from 'react';
import { BsBagDashFill, BsBagPlus } from 'react-icons/bs';
import HeadersContainer from './HeadersContainer';
import { PiCoatHangerFill } from 'react-icons/pi';
import { GiHanger } from 'react-icons/gi';
import { Store } from '../utils/Store';
import axios from 'axios';

export default function ProductItem({ product, shop }) {

  const { state, dispatch } = useContext(Store);
  const {userInfo} = state;
  const [fill, setFill] = useState(false);
  const existItem = state.cart.cartItems.find((x) => x._id === product._id);
  const existFav = state.favourites.find((x) => x._id === product._id);
  const pshop = shop?.find((x) => x._id == product.shopId)

  const addToCartHandler = async (product) => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    const val = data.sizes.filter((s) => s.count > 0 );
    if (val.length < 1 ) {
      window.alert('Sorry,  All sizes are out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...data, quantity: 1, csize: val[0], productId: data._id } });
  };

  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const addToFavsHandler = async (product) => {
    setFill(true);
    dispatch({ type: 'FAVOURITES_ADD_ITEM', payload: { ...product } });
  };
  
  const removeFavHandler = async (product) => {
    setFill(false);
    dispatch({ type: 'FAVOURITES_REMOVE_ITEM', payload: product });
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
      <div className="gallery relative box-border">
        <div className='flex justify-end'>
          <div style={{animation: fill ? 'scaler 1.5s' : 'none'}} className="heart-ck text-lg heart-anim bg-grayb text-white m-2 z-30 float-right" >
            {existFav ? <GiHanger className='scale-125' onClick={() => removeFavHandler(product)} /> : <PiCoatHangerFill  onClick={() => addToFavsHandler(product)} /> }
          </div>
        </div>
          <Link
            href={`https://www.shiglam.com/${product.category}/${product.slug}`}
            >
            <div className='a'>
            <Image
              style={{borderRadius: 20, width:'100%  !important', height: '100% !important', position: 'relative'}}
              src={product.gallery?.length > 0 ? product.gallery[0].item : product.image[0].item}
              alt={product.name}
              layout='fill'
              className="shadow  object-contain h-fit w-full pulse"
              />
            </div>
          </Link>
        <div className='w-full p-1'>
          <div className='overflow-hidden font-medium whitespace-nowrap text-ellipsis'> {product.description} </div>
          <div className='flex pt-2 w-full justify-between'>
            <div className='flex items-center'>
              <div className='w-7 h-7 mr-2 rounded-full overflow-hidden'>
                <Image width={40} className='pulse' height={40} alt="" src={pshop?.logo} />
              </div>
              <div className='font-medium hidden xxsm:block'> {pshop?.shopName} </div>
            </div>
            <div style={{ transform:'translate(-7px, 3px)'}} className=" text-xl" >
              { existItem ? <BsBagDashFill onClick={() => removeItemHandler(product)} className='c-grayb'/> : <BsBagPlus onClick={() => addToCartHandler(product)}/> }
            </div>
          </div>
        </div>
      </div>      
    </div>
  );
}
