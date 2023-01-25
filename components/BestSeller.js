import React from 'react'
import ProgressBar from './ProgressBar';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import Head from 'next/head';

function BestSeller({product, addToCartHandler}) {
  
  function addProductJsonLd() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "image": product.image,
      "description": product.description,
      "brand": {
        "@type": "Brand",
        "name": product.brand
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": product.reviews[0]?.name
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating,
        "reviewCount": product.reviews[0]?.length
      },
      "offers": {
        "@type": "Offer",
        "url": URL,
        "priceCurrency": "KES",
        "price": product.price,
        "priceValidUntil": "2023-2-14",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock"
      }
      "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": "KES"
          },
          "shippingDestination": {
            "@type": "DefinedRegion",
            "addressCountry": "KE"
          },
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": "0",
              "maxValue": "1"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": "1",
              "maxValue": "3"
            }
          }
    }
  `,
    };
  }

  const round0 = (num) => Math.round(num * 1 + Number.EPSILON) / 1; // 123.456 => 123
  const sales = product.initialStock - product.countInStock;
  const percent = round0(sales/product.initialStock * 100);
  const URL = `https://shiglam.com/${product.category}/${product.slug}`;

	return (
		<div className="card">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={addProductJsonLd()}
          key="product-jsonld"
        />
      </Head>
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