import React, { useState } from 'react';
import Image from 'next/image';
import { useStateContext } from '../../utils/StateContext';
import { useRouter } from 'next/router';

function CartItems({item, removeItemHandler, updateCartHandler}) {

	const [color, setColor] = useState(true);
  const router = useRouter();
	const checkPayment = async () => {
		 setColor(false);
     await new Promise(resolve => setTimeout(resolve, 800));
     removeItemHandler(item);
     setColor(true);
    }
  const { handleCartclose } = useStateContext();
  const slugPush = async () => {
  	await router.push(`/${item.category}/${item.slug}`);
  	handleCartclose();
  }
	return (
		<div key={item.slug} style={{width: "fit-content", boxShadow: "0 2px 5px 1px rgb(64 60 67 / 8%)", borderRadius: "20px", backgroundColor:"white", height: "100px", margin: "8%"}} className="flex">
		  <div className="h-full w-auto">
        <div onClick={slugPush} style={{backgroundColor: "#f3f4f6", height: 90, width: 70.5, margin: 5, borderRadius: 20, overflow: "hidden"}}>
          <Image
            src={item.image[0]}
            alt={item.name}
            width={74.5}
            height={99}
          />
        </div>
		  </div>
		  <div className="CartFont grid grid-cols-3 gap-2 justify-center place-content-center">
		    <div className="ml-1 justify-self-center self-center">
		      {item.name.length > 20 ? (<div>{item.name.slice(0, 14).concat(" ", ". .")}</div>) : (<div>{item.name}</div>)}
		    </div>
		    <div className=" justify-self-center self-center">
		      Ksh.{item.price}
		    </div>
		    <div className=" justify-self-center self-center">
	  	      <div className="cartCheckmkTransform" style={{ width: 17, height: 17, border: "3px solid #222", borderRadius: 3}} onClick={checkPayment}>
	  	        <div style={{ display: color ? "block" : "none", width: 19, height: 8, borderLeft: "3px solid #222", borderBottom: "3px solid #222", rotate: "-40deg", borderRadius: "0 0 0 3px", bottom: 4, left: 1.8, position: "relative"}} >
	  	          <div style={{position: "relative", height: 3, top: 2, backgroundColor: "white"}} >
	  	          </div>
	  	          <div style={{bottom: -5, overflow: "visible", position: "relative", height: 3, width: 20, backgroundColor: "white"}}>
	  	          </div>
	  	        </div>
            </div>
	  	      <select
              value={item.quantity}
              onChange={updateCartHandler}
             >
              {[...Array(item.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
	  	    </div>
		  </div>
		</div>
	)
}

export default CartItems