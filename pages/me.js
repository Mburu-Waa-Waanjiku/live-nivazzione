import React, { useState, useEffect } from 'react'
import { useContext } from 'react';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useStateContext } from '../utils/StateContext';
import ProductItems from '../components/ProductItem'
import Wishlist from '../components/me/Wishlist';
import Profile from '../components/me/Profile';
import axios from 'axios';
import Orders from '../components/me/Orders';
import Loader from '../components/Loader';
import MeBanner from '../components/MeBanner';
import Footer from '../components/Footer';
import { AiOutlinePoweroff } from 'react-icons/ai';

function Me() {
	const { state, dispatch } = useContext(Store);
    const {userInfo, favourites } = state;
    const classes = useStyles();
    const router = useRouter();
    const { page, setPage, handlePage, openLogin, handleCartopen, handleChangeBag } = useStateContext();

    const logoutClickHandler = () => {
      dispatch({ type: 'USER_LOGOUT' });
      Cookies.remove('userInfo');
      Cookies.remove('cartItems');
      Cookies.remove('shippinhAddress');
      Cookies.remove('paymentMethod');
      router.push('/');
    };
    
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
    await axios.post(`/api/products/${product._id}`);

  };
  
  const removeFavHandler = async (product) => {
    dispatch({ type: 'FAVOURITES_REMOVE_ITEM', payload: product });
    await axios.delete(`/api/products/${product._id}`);
  };
  
  const [orderslist, setOrderlist] = useState([]);
  const [pendingOrders, setpendingOrders] = useState([]);

  useEffect(() => {
    if (!userInfo) {
      router.push('/');
    }
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/history`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        setOrderlist(data) ;
        setpendingOrders([...data.filter((order) => !order.isDelivered)]); 
        console.log(orderslist);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, []);

	return (
    <div className="relative">
		  <div className="bannerwidth">
        <div className="margintopFix">
        <div className="me-container">
          <div className="name-profile">
            <MeBanner
              classes={classes}
              userInfo={userInfo}
              logoutClickHandler={logoutClickHandler}
              openLogin={openLogin}
              current = {handlePage}
              handleCartopen ={handleCartopen }
              handleChangeBag= {handleChangeBag}
              favourites={favourites}
              ProductItems={ProductItems}
              addToCartHandler={addToCartHandler}
              addToFavsHandler={addToFavsHandler}
              removeFavHandler={removeFavHandler}
              orderslist={orderslist}
              pendingOrders={pendingOrders}
            />
          </div>
        </div>
        </div>
		  </div>
      <Footer/>
    </div>
	)
}

export default Me