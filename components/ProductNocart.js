/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export default function ProductNocart({ product, addToCartHandler }) {
  return (
    <div className="card">
    <div className="gallery">
      <Link href={`/product/${product.slug}`}>
        <a>
          <Image
            width={364}
            height={484}
            src={product.image && product.image[0]}
            alt={product.name}
            className="shadow bg-gray-100 object-cover h-auto w-100"
            style={{borderRadius:10, overflow:"hidden"}}
          />
        </a>
      </Link>
      <div className="heart-ck" style={{height:27, backgroundColor:"tensparent"}}>
      </div>
      <div className="flex ">
       {product.isBurgain && (<div className="loves"> B </div>)}
       <p className="desc price">Ksh{product.price}</p>
      </div>
      </div>

      
    </div>
  );
}