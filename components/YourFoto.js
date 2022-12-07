import React from 'react';
import Image from 'next/image';
import useStyles from '../utils/styles';
import Link from 'next/link';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { CgBolt } from 'react-icons/cg';

function YourFoto({product, addToCartHandler}) {
	const classes = useStyles();
    const round0 = (num) => Math.round(num * 1 + Number.EPSILON) / 1; // 123.456 => 123
    const subtract = product.prevprice - product.price;
    const percent = round0(subtract/product.prevprice * 100);

	return (
		<div>
            <div>
                <div className="salesticker"><CgBolt style={{fontSize:16, marginBottom: 2}} />{percent}%</div>
            </div>
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
            <div style={{display: 'flex', gap: 10, paddingLeft: 10}}>
                    <div className={classes.price}>Ksh.{product.price}</div>
                    <div className={classes.prevprice}><s>Ksh.{product.prevprice}</s></div>
            </div>
		</div>
	)
}

export default YourFoto