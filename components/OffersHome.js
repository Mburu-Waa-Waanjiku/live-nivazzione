import React from 'react'
import useStyles from '../utils/styles';
import Link from 'next/link';
import Image from 'next/image';
import { CgBolt } from 'react-icons/cg';
import HeadersContainer from './HeadersContainer';

function OffersHome({product}) {
	const classes = useStyles();
	const round0 = (num) => Math.round(num * 1 + Number.EPSILON) / 1; // 123.456 => 123
    const subtract = product.prevprice - product.price;
    const percent = round0(subtract/product.prevprice * 100);
    
      const URL = `https://shiglam.com/offer`;
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
        lowPrice: product.price,
        highPrice: product.prevprice,
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
		<div>
          <HeadersContainer data={addProductJsonLd()} />
            <div className={classes.newpost} style={{backgroundColor: '#ffdf00'}}>{percent}%<CgBolt style={{fontSize:16}} /></div>
            <Link href={`${product.category}/${product.slug}`}>
                <Image
                    width={364}
                    height={484}
                    src={product.image[0]}
                    alt={product.name}
                    className="shadow object-cover h-auto w-100 bg-gray-100"
                />
            </Link> 
            <div style={{display: 'flex', gap: 10}}>
                    <div className={classes.price}>Ksh.{product.price}</div>
                    <div className={classes.prevprice}><s>Ksh.{product.prevprice}</s></div>
            </div>
		</div>
	)
}

export default OffersHome