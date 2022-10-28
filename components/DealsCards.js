import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import useStyles from '../utils/styles';


export default function ProductItem({ product, addToCartHandler }) {
  const classes = useStyles();

  return (
    <div className="card">
    <div className="gallery">
      <div className={classes.newpostb}>
        NEW
      </div>
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
      <p className="desc price">Ksh{product.price}</p>
      </div>

      
    </div>
  );
}