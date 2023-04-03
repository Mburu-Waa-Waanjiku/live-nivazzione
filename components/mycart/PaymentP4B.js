import React, { useContext, useEffect, useState } from 'react';
import { useStateContext } from '../../utils/StateContext';
import ClearIcon from '@mui/icons-material/Clear';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import {
  Button,
  CircularProgress,
} from '@material-ui/core';
import axios from 'axios';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';
import { getError } from '../../utils/error';
import { useSnackbar } from 'notistack';
import Image from 'next/image';

function PaymentP4B() {
  
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    const { handleChangeBag, openLogin, handleCartclose, handleClosep4b, handleClosePayp4b } = useStateContext();
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();    
    const {
      handleSubmit,
      register,
      formState: { errors },
      setValue,
     } =  useForm();
     
    const {
      userInfo,
      cart: { cartItems },
      } = state;
    const round0 = (num) => Math.round(num * 1 + Number.EPSILON) / 1; // 123.456 => 123
    const ItemsPrice = round0(
      cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
    );
    
    const [confirming, setConfirming] = useState(false);
    const [completing, setCompleting] = useState(false);
    const [afterLocation, setAfterLocation] = useState(false);
    const [county, setCounty] = useState("Select your Area");
    const counties = ["Select your Area", "CBD", "SOUTH B", "IMARA DAIMA", "KITENGELA", "LANGATA", "KAREN", "LAVINGTON", "ROASTERS", "JKUAT MAIN STAGE", "JUJA", "KAHAWA SUKARI", "GUMBA ESTATE", "KAHAWA WENDANI", "RUIRU BYPASS", "RUIRU NDANI", "ZIMMERMAN", "TRM", "KAHAWA WEST", "KASARANI", "UMOJA", "BURUBURU", "EMBAKASI/NYAYO ESTATE", "UTAWALA", "NGONG ROAD", "NGONG RACECOURSE", "SYOKIMAU", "MLOLONGO", "THINDIGUA", "KIAMBU", "KIRIGITI", "RUAKA", "MADARAKA","NAIROBI WEST", "LANGATA", "RONGAI", "KISERIAN", "JERICHO", "KOMAROCK", "DONHOLM", "FEDHA", "CHOKA", "RUAI", "JAMUHURI ESTATE", "WESTLANDS", "LORESHO", "KANGEMI", "UTHIRU", "KINOO", "KIKUYU", "TWO RIVERS MALL", "TMALL(LANGATA RD)"];
    
    const handleCounty = (event) => {
      setCounty(event.target.value);
      setAfterLocation(true)
    };

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

    const updateStockHandler = async () => {
    try {
      await axios.post(
        '/api/products/updateStock',
        {
          orderItems: cartItems,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        } 
      );
      dispatch({ type: 'UPDATE_STOCK' });
      console.log('stock updated successfuly');
      } catch (err) {
          console.log('error updating  stock');
        }
    }

    const placeP4BHandler = async () => {
      closeSnackbar();
      try {
      await axios.post(
        '/api/P4Borders',
        {
          orderItems: cartItems,
          itemsPrice: ItemsPrice, 
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        } 
      );
      dispatch({ type: 'CART_CLEAR' });
      Cookies.remove('cartItems');
      fetchBags();
      enqueueSnackbar('Your Bag has been updated succesfully', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
    };

    const [cphone, setCphone] = useState();
    const [camount, setCamount] = useState();
    const p4bPaymentHandler = async ({amount, phone}) => {
      closeSnackbar();
      setCphone(phone);
      setCamount(amount);

       try {
        await axios.put(
        '/api/P4Borders/pay',
        {
          amount,
          phone
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        } 
      );
      setConfirming(true);
    } catch (err) {
      enqueueSnackbar('Could not Complete your payment');
    }
    };

    const [awaitingConfirm, setAwaitConfirm] = useState(false);
    const checkPayment = async () => {
      closeSnackbar();
      setAwaitConfirm(true);
       try {
        await axios.post(
        '/api/P4Borders/confirmpay',
        {
          phone: cphone,
          amount: camount,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        } 
      );
     setAwaitConfirm(false);
     setCompleting(true); 
     await new Promise(resolve => setTimeout(resolve, 2000));
     updateStockHandler();
     placeP4BHandler();
     Cookies.remove('cartItems');
     await new Promise(resolve => setTimeout(resolve, 3000));
     handleClosePayp4b();
     handleClosep4b();
     handleChangeBag();
    } catch (err) {
      setAwaitConfirm(false);
      enqueueSnackbar('Dear customer, Your Payment was not successful, Check your account balance and try again');
    }
    };


    useEffect(() => {
      if (!userInfo) {
        openLogin();
      }
      setValue('amount', ItemsPrice);
    }, []);

  return (
    <div>
      <div className="cart-wrapper">
        <div className="w-full h-full flex justify-center place-items-center">
          <div className="cancel-m p-2 absolute right-2 top-2">
            <ClearIcon  onClick={handleClosePayp4b}/>
          </div>
          <div style={{width:"280px", height:"fit-content", borderRadius:50, backgroundColor:"white"}}>
            {completing ? (
            <div>
              <div style={{color: "#7ac142"}} className="home-ft w-full justify-self-stretch mt-8">
                Payment Succesfull
              </div>
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
              <div className="mb-12">
              </div>
            </div>
            ) : (
            <div className="p-10">
              <div className="home-ft w-full justify-self-stretch">
                Payment
              </div>
              <div className="home-ft" >
                <Image width={120} height={40} alt="Mpesa" src="https://res.cloudinary.com/dddx5qpji/image/upload/q_100/v1667278803/lipanampesa-removebg-preview_ljrcyk.png">
                </Image>
              </div>
              <div className="flex justify-center">
                <button
                  className="primary-button w-full mr-4"
                  style={{backgroundColor: "#222", borderRadius: 50, margin: 0}}
                 >
                  <div className="flex justify-between ml-2 mr-2 md:justify-center">
                    <div style={{fontFamily: "monospace"}} >
                      Amount
                    </div>
                    <div style={{fontFamily: "monospace"}}>
                      KES{ItemsPrice}
                    </div>
                  </div>
                </button>
              </div>
              { afterLocation ? (
                <div className="w-full flex justify-center">
                  <div style={{maxWidth: 300}}>
                    <form
                      className="mx-auto max-w-screen-md mt-4"
                      onSubmit={handleSubmit(p4bPaymentHandler)}
                     >
                      <div style={{display:"block"}}>
                        <div className="flex justify-between gap-3">
                          <div className="w-5/12 mb-4 grow pt-3">
                            <input
                              className="block w-full"
                              placeholder="0709234165"
                              type="number"
                              id="phone"
                              autoFocus
                              {...register('phone', {
                                required: 'Please enter Phone Number',
                                length: { value: 10, message: 'Phone number is 10 chars' },              
                              })}
                            />
                            {errors.phone && (
                              <div className="text-red-500">{errors.phone.message}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between gap-3 hidden">
                          <div className="w-5/12 mb-4 grow">
                            <label htmlFor="amount">Amount</label>
                            <input
                              className="block w-full"
                              id="amount"
                              readOnly="readonly"
                              autoFocus
                              {...register('amount', {
                                required: 'Please enter Amount',
                              })}
                            />
                            {errors.amount && (
                              <div className="text-red-500">{errors.amount.message}</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center mt-3" >
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          style={{fontFamily: "monospace", borderRadius: '50px', backgroundColor: '#222', padding: "8px 35px"}}
                         >
                          {confirming ? (<div> RESEND </div>) : (<div> SEND </div>)}
                        </Button>
                      </div>
                    </form>
                    <div className="flex justify-center">
                      <Button
                        onClick={checkPayment}
                        variant="contained"
                        color="primary"
                        style={{fontFamily: "monospace", borderRadius: '50px', marginTop: 20, display: confirming ? "block" : "none", backgroundColor: '#222', padding: "8px 35px", marginBottom: "10px"}}
                       >
                        {!awaitingConfirm ? 'CONFIRM' : <CircularProgress className="loadinbutton"/>}
                      </Button>
                    </div>
                  </div>
                </div>) : (
                <div>
                  <div className="mb-4 pt-8">
                    <select
                        value={county}
                        className="block w-full"
                        onChange={handleCounty}
                    >
                      {counties.map((counties) => (
                        <option key={counties} value={counties}>
                          {counties}
                        </option>
                      ))}  
                      <option disabled style={{color: 'green', display:'block'}}>
                        <div>YOU&apos;RE OUTSIDE NAIROBI AND ITS ENVIRONS ?? </div> 
                        <div>VISIT us on Whatsapp 👇👇 for customized delivery🛍️ 😊</div>
                      </option>            
                    </select>
                    {errors.county && (
                      <div className="text-red-500 ">{errors.county.message}</div>
                    )}
                  </div>
                </div>)
              }
            </div>)}
          </div>
        </div> 
      </div>
    </div>
  )
}

export default PaymentP4B