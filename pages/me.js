import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Tabsbottom from '../components/Tabsbottom';
import Layout from '../components/Layout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useStateContext } from '../utils/StateContext';
import ProductItems from '../components/ProductItem'
import Tabs from "@mui/material/Tabs"; 
import Tab from "@mui/material/Tab";
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Memenu from '../components/me/memenu';
import Wishlist from '../components/me/Wishlist';
import Profile from '../components/me/Profile';
import axios from 'axios';
import Orders from '../components/me/Orders';
import Loader from '../components/Loader';

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
    const { data } = await axios.post(`/api/products/${product._id}`);

  };
  
  const removeFavHandler = async (product) => {
    dispatch({ type: 'FAVOURITES_REMOVE_ITEM', payload: product });
    const { data } = await axios.delete(`/api/products/${product._id}`);
  };
  
  const [orderslist, setOrderlist] = useState(null);

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
        console.log(orderslist);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, []);

	return (
    <>
		  <div className="bannerwidth">
        <div className="margintopFix">
        <div className="me-container">
            <div className="name-profile">
              <div className="me-common-1">
                {userInfo ? (
                  <div style={{ width: 50, height:50, borderRadius: 50, backgroundColor: "black"}} className="flex justify-center">
                    <b style={{ width: 46, height:46, fontSize: 20, lineHeight: 0.7, borderRadius: 50, color: "white", marginTop: 2}} className="themecolor p-4 ">{userInfo.name.slice(0,1)}</b>
                  </div>
                  ) : 
                  (<AccountCircle sx={{ color: 'action.active'}} style={{fontSize: 40}}/>) 
                  }
              </div>
              {userInfo ? (
                  <div className="mt-2 mb-1.5">
                    <div onClick={logoutClickHandler} className="pending inline prof">
                      Log Out
                    </div>
                  </div>) : (
                  <div className="mt-2 mb-1.5">
                  <div className="pending inline prof">
                    <a onClick={openLogin} style={{cursor: "pointer"}} > 
                      Log In 
                    </a>
                  </div>
                </div>
                )
            }
          </div>
        </div>
        </div>
        <Memenu
          Tabs ={Tabs}
          Tab ={Tab}
          classes={classes}
          page = {page}
          current = {handlePage}
          handleCartopen ={handleCartopen }
          handleChangeBag= {handleChangeBag}
        />
        <TabContext value={page}>
          <Tabsbottom/>
          <div className="p-3  me-wishlist" style={{paddingBottom: 12 }}>
            <a id="#edit">
              <b>{page}</b>
            </a>
          </div>
          <TabPanel value="Wishlist" style={{padding: 0, backgroundColor: 'rgba(0, 0, 0, 0.12)'}}>
            <Wishlist
              favourites = {favourites}
              ProductItems = {ProductItems}
              addToCartHandler = {addToCartHandler}
              addToFavsHandler = {addToFavsHandler}
              removeFavHandler = {removeFavHandler}
            />
          </TabPanel>
          <TabPanel value="Profile" style={{padding: 0}}>
            <Profile
              userInfo={userInfo}
              classes = {classes}
              dispatch={dispatch}
            />
          </TabPanel>
          <TabPanel value="My Orders" className="ordersscroll" style={{ overflowX: 'scroll', padding: 0, display: 'grid'}}>
            {orderslist == null ? (
              <div style={{width: '99vw'}} className="flex justify-center">
                <Loader/>
              </div>
              ) : ( 
                <Orders
                  userInfo={userInfo}
                  orderslist={orderslist}
                  classes={classes}
                />
              )
            }
          </TabPanel>
        </TabContext>
		  </div>
    </>
	)
}

export default Me