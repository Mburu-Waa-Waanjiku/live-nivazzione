import React, { useState, useContext } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import HeadersContainer from './HeadersContainer';
import { HiShoppingCart, HiOutlineShoppingCart } from 'react-icons/hi';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import axios from 'axios';
import { Store } from '../utils/Store';

function BestSeller({ product }) {
   
  const URL = `https://shiglam.com/`;
  let revCount;
  if(product.numReviews < 1){
    revCount = 16
  } else{
    revCount = product.numReviews
  }
  const offerStock = Math.floor(Math.random() * 20) + 1;

  const [fill, setFill] = useState(false);
  const [fillFav, setFillFav] = useState(false);
  const { state, dispatch } = useContext(Store);
  const {userInfo } = state;
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
    await axios.post(`/api/products/${product._id}/${userInfo?._id}`);

  };
  
  const removeFavHandler = async (product) => {
    setFillFav(false);
    dispatch({ type: 'FAVOURITES_REMOVE_ITEM', payload: product });
    await axios.delete(`/api/products/${product._id}/${userInfo?._id}`);
  };

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
          name: product.reviews?.name || "Diane"
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

  const round0 = (num) => Math.round(num * 1 + Number.EPSILON) / 1; // 123.456 => 123
  const sales = product.initialStock - product.countInStock;
  const percent = round0(sales/product.initialStock * 100);

	return (
      <div className="card">
    <HeadersContainer data={addProductJsonLd()} />
    <div className="gallery" style={{borderRadius: 0}}>
      <div>
        <div style={{ margin: '8px 4px', padding: 6, width: 40,  backgroundColor: '#222', color: 'white', borderRadius: 50 }} className="salesticker"><div>{percent}%</div><div>SOLD</div></div>
      </div>
      <Link href={`${product.category}/${product.slug}`} legacyBehavior>
          <Image
            width={364}
            height={484}
            src={product.image && product.image[0].item}
            alt={product.name}
            className="shadow object-cover bg-gray-100 h-auto w-100"
          />
      </Link>
      <div style={{animation: fill ? 'scaler 1.5s' : 'none'}} className="heart-ck heart-anim"  onClick={() => addToCartHandler(product)}>
        {existItem ? <HiShoppingCart/> : <HiOutlineShoppingCart/> }
      </div>
      <div className="flex justify-end">
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

export default BestSeller