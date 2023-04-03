import React from 'react';
import Image from 'next/image';

function OrderProducts({ product}) {
  return (
	<div className="card">
      <div className="gallery" style={{ borderRadius:20, padding: '8px 8px 16px 8px', overflow: 'visible'}}>
        <a>
          <Image
            width={364}
            height={484}
            src={product.image && product.image[0]}
            alt={product.name}
            className="shadow bg-gray-100 object-cover h-auto w-100"
            style={{borderRadius:20, backgroundColor: '#f3f4f6', overflow:"hidden"}}
          />
        </a>

        <div className="flex justify-between px-2 gap-3">
         <p className="desc price">Ksh{product.price}</p>
         <p style={{ fontWeight: 700, width: 85, transform: 'translate(10px, 6px)', fontSize: 14 }} className="flex"><div> O </div> <div className="adminInd"> rdered </div> <div> : {product.quantity}</div></p>
        </div>
      </div>
    </div>
  )
}

export default OrderProducts