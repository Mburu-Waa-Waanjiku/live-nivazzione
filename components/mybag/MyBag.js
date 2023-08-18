import axios from 'axios'; 
import dynamic from 'next/dynamic';
import useStyles from '../../utils/styles';
import { GiHanger } from 'react-icons/gi';
import { useStateContext } from '../../utils/StateContext';
import React, { useContext } from 'react';
import { Store } from '../../utils/Store';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import ProductItems from '../PinsProds';

function MyBag() {
  const { state, dispatch } = useContext(Store);
  const classes = useStyles();
  const { userInfo, favourites } = state;
  const {  bag, handleCloseBag } = useStateContext();


  const addToCartHandler = async (product) => {

    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (existItem) {
      window.alert('Already added');
    } else if (data.countInStock < quantity ) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };

  const addToFavsHandler = async (product) => {
    const existFav = state.favourites.find((x) => x._id === product._id);
    if (existFav) {
      window.alert('Already a Favourite');
      return;
    }
    dispatch({ type: 'FAVOURITES_ADD_ITEM', payload: { ...product } });
    await axios.post(`/api/products/${product._id}/${userInfo._id}`);

  };
  
  const removeFavHandler = async (product) => {
    dispatch({ type: 'FAVOURITES_REMOVE_ITEM', payload: product });
    await axios.delete(`/api/products/${product._id}/${userInfo._id}`);
  };
 
  return (
    <div className={"transition-all duration-1000 "}
      style={{position: "fixed", zIndex: 1210, top: 0, left: bag ? '0' : '120vw', background: 'white',  width: "100vw", height: "100vh"}}
     >
      <div className={classes.reviewTopTab + " px-4 pt-4 pb-2"} style={{zIndex: 1}}>
        <ArrowBackIosIcon onClick={handleCloseBag} sx={{ float:"left",}} /> 
        <div style={{maxHeight: 27}} className="flex justify-center">
          <div className='title-font' >
            WARDROBE
          </div> 
        </div>
      </div>
      <div style={{top: 0, overflowY: "auto", marginLeft: "10px", marginRight: 10, paddingTop: 10, paddingLeft: 6, paddingRight: 6, paddingBottom: 20, height:"92%", overflowX: "hidden"}} className=" relative">
        {favourites.length === 0 ? 
          (
            <div className=" w-full h-full flex justify-center place-items-center">
              <div  style={{transform: 'translate(0, -10%)'}} className="empty-cart">
                <div className="cart-icn block">  
                  <GiHanger className="favsanimate" size={150} />
                </div>
                <h3 className="pt-10 title-font" >Your Wardrobe Is Empty</h3>
              </div>
            </div>
          ) :
          ( 
            <div className='grid grid-cols-2 gap-col-4 gap-y-3 md:grid-cols-3 lg:grid-cols-4'>
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
    </div>
  );
}

export default dynamic(() => Promise.resolve(MyBag), { ssr: false });
