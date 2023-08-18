import React from 'react'
import { BsHeartFill } from 'react-icons/bs';

function Wishlist({ favourites, ProductItems, addToCartHandler, addToFavsHandler, removeFavHandler }) {
	return (
	  <div style={{top: 0, overflowY: "auto", padding: '20px 16px 20px 16px', height:"90%", overflowX: "hidden"}} className=" relative">
      {favourites.length === 0 ? 
        (
          <div className=" w-full h-full flex justify-center place-items-center">
            <div  style={{transform: 'translate(0, -10%)'}} className="empty-cart">
              <div className="cart-icn block">  
                <BsHeartFill size={150} />
              </div>
              <h3 className="pt-10" >Your wishlilst is empty</h3>
            </div>
          </div>
        ) :
        ( 
          <div className=' mereactor grid grid-cols-2 gap-col-4 gap-y-3 md:grid-cols-3 lg:grid-cols-4'>
            {favourites.map((product) => (
              <ProductItems
                addToCartHandler = {addToCartHandler}
                addToFavsHandler = {addToFavsHandler}
                removeFavHandler = {removeFavHandler}
                product={product}
                key={product}
              /> 
              ))
            }
          </div>
        ) 
      }
    </div>
	)
}

export default Wishlist