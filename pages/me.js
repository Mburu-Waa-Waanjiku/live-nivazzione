import React, { useState, useEffect } from 'react'
import { useContext } from 'react';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';
import { useRouter } from 'next/router';
import { useStateContext } from '../utils/StateContext';
import ProductItems from '../components/ProductItem'
import axios from 'axios';
import MeBanner from '../components/MeBanner';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Tabsbottom from '../components/Tabsbottom';

function Me() {
	const { state, dispatch } = useContext(Store);
    const {userInfo, favourites } = state;
    const classes = useStyles();
    const router = useRouter();
    const { handlePage, openLogin, handleCartopen, handleChangeBag } = useStateContext();

  
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
    <Layout>
      <div className="relative">
        <div>
          <div className="margintopFix">
          <div className="me-container">
            <div className="name-profile">
              <MeBanner
                classes={classes}
                userInfo={userInfo}
                openLogin={openLogin}
                current = {handlePage}
                handleCartopen ={handleCartopen }
                handleChangeBag= {handleChangeBag}
                favourites={favourites}
                ProductItems={ProductItems}
                orderslist={orderslist}
                pendingOrders={pendingOrders}
              />
            </div>
          </div>
          </div>
        </div>
        <Footer/>
        <Tabsbottom/>
      </div>
    </Layout>
	)
}

export default Me