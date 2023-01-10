import React, { useContext, useEffect, useState } from 'react';
import { useStateContext } from '../../utils/StateContext';
import ClearIcon from '@mui/icons-material/Clear';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { AiOutlineShopping } from 'react-icons/ai';
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
} from '@material-ui/core';
import PaySuccess from '../paysuccess';
import axios from 'axios';
import { Store } from '../../utils/Store';
import { useRouter } from 'next/router';
import { getError } from '../../utils/error';
import { useSnackbar } from 'notistack';
import LoaderPay from '../loaders/LoaderPay';

function PaymentP4B() {
  
    const router = useRouter();
    const { collectpay, setCollectpay, handleCloseCP, makeOrder, setMakeOrder, handleClosecollect, bag, setBag, handleCloseBag } = useStateContext();
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();    
    const {
      handleSubmit,
      register,
      formState: { errors },
      setValue,
      control,
     } =  useForm();
     
    const { state, dispatch } = useContext(Store);
    const { userInfo, bagitems, cart } = state;
    const { shippingAddress, paymentMethod } = cart;

    const round0 = (num) => Math.round(num * 1 + Number.EPSILON) / 1; // 123.456 => 123
    const itemsPrice = bagitems[0]?.itemsPrice;
    let shippingPrice;
    if (itemsPrice < 699) {
      shippingPrice = 100;
    } else if (itemsPrice < 999 ) {
        shippingPrice = 50
      } else {
          shippingPrice = 0
      };
    const taxPrice = round0(13 * itemsPrice / 100);
    const totalPrice = round0(itemsPrice + shippingPrice + taxPrice);
    const payout = round0( shippingPrice + taxPrice);

    const [confirming, setConfirming] = useState(false);
    const [completing, setCompleting] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const clearMybag = async () => {
      try {
      setLoading(true);
      const { data } = await axios.delete(
        '/api/P4Borders/delete',
        {
          data: { ID : bagitems[0]._id }
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      dispatch({ type: 'EMPTY_BAG' });
      Cookies.remove('bagitems');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    } 
    } ;

    const placeOrderHandler = async () => {
    closeSnackbar();
    try {
      setLoading(true);
      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: bagitems[0].orderItems,
          shippingAddress,
          paymentMethod,
          itemsPrice: bagitems[0].itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
          isPaid : true,
          paidAt : Date.now(),
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setLoading(false);
      enqueueSnackbar('Order created succesfully', { variant: 'success' });
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    } 
  };

    const [cphone, setCphone] = useState();
    const [camount, setCamount] = useState();
    const p4bPaymentHandler = async ({amount, phone}) => {
      setCphone(phone);
      setCamount(amount);

       try {
        setConfirming(true);
        const { data } = await axios.put(
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
    } catch (err) {
      enqueueSnackbar('Could not Complete your payment');
    }
    };
    const checkPayment = async () => {

       try {
        const { data } = await axios.post(
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
     setCompleting(true); 
     await new Promise(resolve => setTimeout(resolve, 2000));
     placeOrderHandler();
     clearMybag();
     await new Promise(resolve => setTimeout(resolve, 3000));
     handleCloseCP();
     handleClosecollect();
     handleCloseBag();
    } catch (err) {
      enqueueSnackbar('Dear customer, Your Payment was not successful, Check your account balance and try again');
    }
    };


    useEffect(() => {
      if (!userInfo) {
        router.push('/login?redirect=/');
      }
      setValue('amount', payout);
    }, []);

  return (
    <div>
      <div className="cart-wrapper">
        <div className="w-full h-full flex justify-center place-items-center">
          <div className="cancel-m p-2 absolute right-2 top-2">
            <ClearIcon  onClick={handleCloseCP}/>
          </div>
          <div style={{width:"80vw", height:"fit-content", borderRadius:10, backgroundColor:"white"}}>
            {completing ? (
            <div>
              <div style={{color: "#7ac142"}} className="home-ft w-full justify-self-stretch mt-8">
                Payment Succesfull
              </div>
              <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
              <div className="mb-12">
              </div>
            </div>
            ) : (
            <div className="p-10">
              <div className="home-ft w-full justify-self-stretch">
                Payment
              </div>
              <div className="w-full flex justify-center">
                <div style={{maxWidth: 300}}>
                  <form
                    className="mx-auto max-w-screen-md mt-4"
                    onSubmit={handleSubmit(p4bPaymentHandler)}
                   >
                    <div style={{display: confirming ? "none" : "block"}}>
                      <div className="flex justify-between gap-3">
                        <div className="w-5/12 mb-4 grow">
                          <label htmlFor="phone">Phone Number</label>
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
                      <div className="flex justify-between gap-3">
                        <div className="w-5/12 mb-4 grow">
                          <label htmlFor="amount">Amount</label>
                          <input
                            className="block w-full"
                            id="amount"
                            readonly="readonly"
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
                        style={{borderRadius: '50px', backgroundColor: 'green', padding: "8px 35px"}}
                       >
                        {confirming ? (<div> RESEND </div>) : (<div> SEND </div>)}
                      </Button>
                    </div>
                  </form>
                  <Button
                    onClick={checkPayment}
                    variant="contained"
                    color="primary"
                    style={{borderRadius: '50px', marginTop: 20, display: confirming ? "block" : "none", backgroundColor: 'green', padding: "8px 35px", marginBottom: "10px"}}
                   >
                    CONFIRM
                  </Button>
                </div>
              </div>
            </div>)}
          </div>
        </div> 
      </div>
    </div>
  )
}

export default PaymentP4B