import axios from 'axios';
import dynamic from 'next/dynamic';
import useStyles from '../../utils/styles';
import Image from 'next/image';
import { AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../../utils/StateContext';
import { useRouter } from 'next/router';
import React, { useEffect, useContext, useReducer } from 'react';
import Loader from '../Loader';
import { Button } from '@material-ui/core';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Store';
import Layout from '../Layout';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import Cookies from 'js-cookie';
import Shipporder from './Shipporder';

function MyBag() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const classes = useStyles();
  const { userInfo, loading, error, bagitems } = state;
  const { makeOrder, setMakeOrder, handleCollect, bag, setBag, handleCloseBag } = useStateContext();

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    const fetchBags = async () => {
      try {
        dispatch({ type: 'FETCH_BAG' });
        const { data } = await axios.get(`/api/P4Borders/history`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_BAG_SUCCESS', payload: data });
        Cookies.set('bagitems', data);
      } catch (err) {
        dispatch({ type: 'FETCH_BAG_FAIL', payload: getError(err) });
      }
    };
    fetchBags();
  }, [router, userInfo]);
  return (
    <div className={classes.smseachbg}
      style={{position: "fixed", zIndex: 1210, top: 0, left: bag ? '0' : '120vw', background: 'white',  width: "100vw", height: "100vh"}}
     >
      <div className={classes.reviewTopTab} style={{zIndex: 1}}
       >
        <ArrowBackIosIcon onClick={handleCloseBag} sx={{fontSize:10, float:"left",}} /> 
        <div className="flex justify-center">
          MyBag
          <div style={{position: "relative", height: 30}}>
            <AiOutlineShopping style={{fontSize: 29, position: "relative", top: 0, marginLeft: 10}}/>                
          </div> 
        </div>
      </div>
      <div style={{top: 0, overflowY: "auto", marginLeft: "10px", marginRight: 10, paddingTop: 10, height:"83%", overflowX: "hidden"}} className=" relative">
          {bagitems.map((bag) => (
            <div className='grid grid-cols-2 gap-col-4 gap-y-3 md:grid-cols-3 lg:grid-cols-4'>
              {bag.orderItems?.map((images) => (
                <div>
                  <Image className="bg-gray-100" width={364} height={484} src={images.image[0]}/>
                </div>
              ))}
            </div>
          ))}
      </div>
      <div style={{borderTop: "2px solid #ececec", backgroundColor: "white", zIndex: 1, position: "fixed", bottom: 0}} className=" w-full p-2 flex justify-center">
        <button
          onClick={handleCollect}
          className="primary-button "
          style={{backgroundColor: "#222"}}
         >
          Collect      
        </button>
      </div>
      {makeOrder && <Shipporder/>}
    </div>
  );
}

export default dynamic(() => Promise.resolve(MyBag), { ssr: false });
