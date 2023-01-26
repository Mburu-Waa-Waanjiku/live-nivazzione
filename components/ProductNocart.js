/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useStateContext } from '../utils/StateContext';
import HeadersContainer from './HeadersContainer';

export default function ProductNocart({ product }) {
   
  const { handleClickSearchf } = useStateContext();
  
  const URL = `https://shiglam.com/${product.category}/${product.slug}`;
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
                product.image[0],
                product.image[1] 
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
          name: product.reviews[0]?.name || "Diane"
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
      <Link href={`${product.category}/${product.slug}`}>
        <a>
          <Image
            width={364}
            height={484}
            onClick={handleClickSearchf}
            src={product.image && product.image[0]}
            alt={product.name}
            className="shadow bg-gray-100 object-cover h-auto w-100"
            style={{borderRadius:10, backgroundColor: '#f3f4f6', overflow:"hidden"}}
          />
        </a>
      </Link>
      <div className="heart-ck" style={{height:27, backgroundColor: 'transparent'}}>
      </div>
      <div className="flex ">
       {product.isBurgain && (<div className="loves"> B </div>)}
       <p className="desc price">Ksh{product.price}</p>
      </div>
      </div>

      
    </div>
  );
}