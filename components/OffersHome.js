import React from 'react'
import useStyles from '../utils/styles';
import Link from 'next/link';
import Image from 'next/image';

function OffersHome({product}) {
	const classes = useStyles();
	const round0 = (num) => Math.round(num * 1 + Number.EPSILON) / 1; // 123.456 => 123
    const subtract = product.prevprice - product.price;
    const percent = round0(subtract/product.prevprice * 100);

	return (
		<div>
			<div>
                <div className="homesalesticker"><Image height={62.5} width={75} src="/png-clipart-christmas-information-label-sale-sticker-holidays-label-removebg-preview.png"/><div className="homesalestickerPercent">{percent}% off</div></div>
            </div>
            <Link href={`/product/${product.slug}`}>
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