import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useContext } from 'react';
import { HiShoppingCart, HiOutlineShoppingCart } from 'react-icons/hi';
import useStyles from '../utils/styles';
import HeadersContainer from './HeadersContainer';
import { Store } from '../utils/Store';

export default function ProductItem({ product, addToCartHandler }) {
  const classes = useStyles();
  const [fill, setFill] = useState(false);
  const { state, dispatch } = useContext(Store);
  const existItem = state.cart.cartItems.find((x) => x._id === product._id);

  const addToCartWithAnimation = async () => {
    await addToCartHandler(product);
    setFill(true);
  }
  const URL = `https://shiglam.com/newproducts`;
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

  return (
    <div className="card">
    <HeadersContainer data={addProductJsonLd()} />
    <div className="gallery">
      <div className={classes.newpostb}>
        NEW
      </div>
      <Link href={`${product.category}/${product.slug}`}>
        <a className="bg-gray-100 rounded-xl">
          <Image
            width={364}
            height={484}
            src={product.image && product.image[0].item}
            alt={product.name}
            className="rounded-3xl shadow object-cover bg-gray-100 h-auto w-100"
          />
        </a>
      </Link>
      <div style={{animation: fill ? 'scaler 1.5s' : 'none'}} className="heart-ck heart-anim"  onClick={addToCartWithAnimation}>
          {existItem ? <HiShoppingCart/> : <HiOutlineShoppingCart/> }
      </div>
      <p className="desc price">Ksh{product.price}</p>
      </div>

      
    </div>
  );
}