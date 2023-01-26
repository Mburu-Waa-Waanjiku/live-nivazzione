import React from 'react'
import ProgressBar from './ProgressBar';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import HeadersContainer from './HeadersContainer';

function BestSeller({product, addToCartHandler}) {
   
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
        <Link href={`${product.category}/${product.slug}`}>
          <a>
            <Image
              width={364}
              height={484}
              src={product.image && product.image[0]}
              alt={product.name}
              className="shadow object-cover bg-gray-100 h-auto w-100"
            />
          </a>
        </Link>
        <div className="heart-ck"  onClick={() => addToCartHandler(product)}>
          <AiOutlineShoppingCart/>
        </div>
        <div>
          <ProgressBar
            percent={percent}
            sales={sales}
          />
        </div>
      </div>

      
    </div>
	)
}

export default BestSeller