import React from 'react'
import ProgressBar from './ProgressBar';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineShoppingCart } from 'react-icons/ai';


function BestSeller({product, addToCartHandler}) {
  
  const round0 = (num) => Math.round(num * 1 + Number.EPSILON) / 1; // 123.456 => 123
  const sales = product.initialStock - product.countInStock;
  const percent = round0(sales/product.initialStock * 100);
  
	return (
		<div className="card">
      <div className="gallery" style={{borderRadius: 0}}>
        <Link href={`/product/${product.slug}`}>
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