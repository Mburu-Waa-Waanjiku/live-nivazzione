import React from 'react';
import Image from 'next/image';
import useStyles from '../utils/styles';
import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';


function YourFoto({product, addToCartHandler}) {
	const classes = useStyles();

	return (
		<div>
			<Link href={`/product/${product.slug}`}>
                <Image
                    width={364}
                    height={484}
                    src={product.image[0]}
                    alt={product.name}
                    className="shadow object-cover bg-gray-100 h-auto w-100"
                />
            </Link> 
            <div className="heart-ck"  onClick={() => addToCartHandler(product)}>
                <AiOutlineShoppingCart/>
            </div>
            <div className="inline ">
                {product.isBurgain && (<div className="loves"> B </div>)}
                <div className="">
                    <div className={classes.prevprice}><s>Ksh.{product.prevprice}</s></div>
                    <div className={classes.price}>Ksh.{product.price}</div>
                </div>
            </div>
		</div>
	)
}

export default YourFoto