/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useStateContext } from '../utils/StateContext';
import HeadersContainer from './HeadersContainer';
import { useRouter } from 'next/router';

export default function ProductNocart({ product }) {

  return (
    <>
      <Link href={`https://www.shiglam.com/${product.category}/${product.slug}`}>
        <div className="flex items-center gap-1">
          <div style={{ minWidth: '40px', maxWidth: '40px'}}>
            <Image
              width={40}
              height={40}
              src={product.image && product.image[0].item}
              alt={product.name}
              className="shadow bg-gray-100 object-cover h-auto w-100"
              style={{borderRadius:10, backgroundColor: '#f3f4f6', overflow:"hidden"}}
            />
          </div>
          <div className='overflow-hidden font-medium whitespace-nowrap text-ellipsis'>
            {product.description}
          </div>
        </div>
      </Link>
    </>
  );
}