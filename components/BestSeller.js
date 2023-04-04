import React, { useState } from 'react'
import ProgressBar from './ProgressBar';
import Link from 'next/link';
import Image from 'next/image';
import HeadersContainer from './HeadersContainer';
import { HiShoppingCart, HiOutlineShoppingCart } from 'react-icons/hi';
import { BsHeart, BsHeartFill } from 'react-icons/bs';

function BestSeller({ state, addToFavsHandler, removeFavHandler, product, addToCartHandler}) {
   
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
  const existItem = state.cart.cartItems.find((x) => x._id === product._id);
  const existFav = state.favourites.find((x) => x._id === product._id);
  const addToCartWithAnimation = async () => {
    await addToCartHandler(product);
    setFill(true);
  }
  const addToFavWithAnimation = async () => {
    await addToFavsHandler(product);
    setFillFav(true);
  }
  const removeFavWithAnimation = async () => {
    setFillFav(false);
    await removeFavHandler(product);
  }

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
        <Link href={`${product.category}/${product.slug}`}>
          <a>
            <Image
              width={364}
              height={484}
              src={product.image && product.image[0].item}
              alt={product.name}
              className="shadow object-cover bg-gray-100 h-auto w-100"
            />
          </a>
        </Link>
        <div style={{animation: fill ? 'scaler 1.5s' : 'none'}} className="heart-ck heart-anim"  onClick={addToCartWithAnimation}>
          {existItem ? <HiShoppingCart/> : <HiOutlineShoppingCart/> }
        </div>
        <div className="flex justify-end">
          <div style={{position: "relative", right: "-20px" }} className="flex justify-end">
            <div style={{animation: fillFav ? 'scaler 1.5s' : 'none', transform:'translate(8px, 40px)', color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.4)'}} className="heart-ck heart-anim" >
              {existFav ? <BsHeartFill onClick={removeFavWithAnimation} /> : <BsHeart onClick={addToFavWithAnimation} /> }
            </div>
          </div>
        </div>
      </div>
    </div>
	)
}

export default BestSeller