import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import Image from 'next/image';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

export default function ShippingScreen() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [paymentMethod, setPaymentMethod] = useState('');
  const counties = ["Select your County", "Nairobi", "Kiambu", "Machakos", "Kajiado"];
  const [county, setCounty] = useState("Select your County");
  const [view, setView] = useState(false);

  const handleCounty = (event) => {
    setCounty(event.target.value);
    setView(true);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { userInfo, cart } = state;
  const { cartItems, shippingAddress } = cart;
  const router = useRouter();
  

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
    setValue('firstName', shippingAddress.firstName);
    setValue('lastName', shippingAddress.lastName);
    setValue('county', shippingAddress.county);
    setValue('dropstation', shippingAddress.dropstation);
    setValue('phoneNumber', shippingAddress.phoneNumber);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ firstName, county, dropstation, phoneNumber, lastName }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { firstName, county, dropstation, phoneNumber, lastName },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          firstName,
          lastName,
          county,
          dropstation,
          phoneNumber,
        },
      })
    );
    closeSnackbar();
    if (!paymentMethod) {
      enqueueSnackbar('Payment method is required', { variant: 'error' });
    } else {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod });
      Cookies.set('paymentMethod', paymentMethod);
      router.push('/placeorder');
    }
  };
  

  return (
    <Layout title="Shipping Address">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 mt-3 sm:mt-5  home-ft" style={{textAlign:"left"}}>Shipping Address</h1>
        <div className="flex justify-between gap-3">
        <div className="w-5/12 mb-4 grow">
          <label htmlFor="fullName">First Name</label>
          <input
            className="block w-full"
            id="firstName"
            autoFocus
            {...register('firstName', {
              required: 'Please enter first name',
            })}
          />
          {errors.firstName && (
            <div className="text-red-500">{errors.firstName.message}</div>
          )}
        </div>
        <div className="w-5/12 mb-4 grow">
          <label htmlFor="fullName">Last Name</label>
          <input
            className="block w-full"
            id="lastName"
            autoFocus
            {...register('lastName', {
              required: 'Please enter last name',
            })}
          />
          {errors.lastName && (
            <div className="text-red-500">{errors.lastName.message}</div>
          )}
        </div>
        </div>
        <div className="mb-4">
          <label htmlFor="county">County</label>
          <select
              {...register('county')}
              control={control}
              value={county}
              className="block w-full"
              onChange={handleCounty}
          >
            {counties.map((counties) => (
              <option key={counties} value={counties}>
                {counties}
              </option>
            ))}  
          </select>
          {errors.city && (
            <div className="text-red-500 ">{errors.city.message}</div>
          )}
        </div>
        <div className="flex justify-between gap-3">
        <div className="w-5/12 mb-4 grow" style={{display: view ? "block" : "none"}}>
          <label htmlFor="dropstation">Delivery Location</label>
          <input
            className="w-full block"
            id="dropstation"
            {...register('dropstation', {
              required: 'Please enter Delivery Location',
            })}
          />
          {errors.dropstation && (
            <div className="text-red-500 ">{errors.dropstation.message}</div>
          )}
        </div>
        <div className="w-5/12 mb-4 grow" style={{display: view ? "block" : "none"}}>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            className="w-full block"
            id="phoneNumber"
            type="number"
            {...register('phoneNumber', {
              required: 'Please enter postal code',
              length: { value: 10, message: 'Phone number is 10 chars' },              
            })}
          />
          {errors.phoneNumber && (
            <div className="text-red-500 ">{errors.phoneNumber.message}</div>
          )}
        </div>
        </div>
        <h1 className="mb-4 mt-3 sm:mt-5  home-ft" style={{textAlign:"left"}}>Payment method</h1>
        <List>
          <ListItem>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="Payment Method"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel
                  disabled
                  label="Equitel"
                  value="Equitel"
                  control={<Radio />}
                ></FormControlLabel>
                <div className="flex">
                  <FormControlLabel
                    value="Mpesa"
                    control={<Radio />}
                  ></FormControlLabel>
                  <div style={{display:"flex", color:"gray"}}><Image width={120} height={40} alt="Mpesa" src="https://res.cloudinary.com/dddx5qpji/image/upload/q_100/v1667278803/lipanampesa-removebg-preview_ljrcyk.png"></Image></div>
                </div>
                <FormControlLabel
                  label="M-coop"
                  disabled
                  value="M-coop"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <Button fullWidth type="submit" variant="contained" color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}

ShippingScreen.auth = true;

