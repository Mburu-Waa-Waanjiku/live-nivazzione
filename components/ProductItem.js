/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';

export default function ProductItem({ product, addToCartHandler }) {
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
            className="shadow object-cover h-auto w-100"
          />
        </a>
      </Link>
      <div className="heart-ck"  onClick={() => addToCartHandler(product)}>
          <AiOutlineShoppingCart/>
      </div>
      <div className="flex ">
       {product.isBurgain && (<div className="loves"> B </div>)}
       <p className="desc price">Ksh{product.price}</p>
      </div>
      </div>

      
    </div>
  );
}