import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import Location from '../models/Location';
import db from '../utils/db';
import useStyles from '../utils/styles';
 import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import { useSnackbar } from 'notistack';

export default function ShippingScreen(props) {
  const {locations} = props;
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [paymentMethod, setPaymentMethod] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const { shippingAddress } = cart;
  const router = useRouter();
  

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('price', shippingAddress.price);
    setValue('dropstation', shippingAddress.dropstation);
    setValue('postalCode', shippingAddress.postalCode);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, dropstation, price, postalCode}) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, dropstation, address, city, postalCode, price},
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          price,
          city,
          postalCode,
          dropstation,
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
  const [city, setCity] = useState("Nairobi");

  return (
    <Layout title="Shipping Address">
      <div className={classes.smseach}>
          
        </div>
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-center text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            className="w-full"
            id="fullName"
            placeholder="Payment transaction name e.g Mpesa name"
            autoFocus
            {...register('fullName', {
              required: 'Please enter full name',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            className="w-full"
            id="address"
            {...register('address', {
              required: 'Please enter address',
              minLength: { value: 3, message: 'Address is more than 2 chars' },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">City/Town</label>
          <select
              {...register('city')}
              placeholder="City"
              control={control}
              value={city}
              className={classes.fullWidth}
              onChange={(e) => setCity(e.target.value)}
          >
            {locations.map((location) => (
              <option key={location.town} value={location.town}>
                {location.town}
              </option>
            ))}  
          </select>
          {errors.city && (
            <div className="text-red-500 ">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">Drop Station< /label>
          
          <select
              {...register('dropstation')}
              placeholder="dropstation"
              control={control}
              defaultvalue=""
              value={city}
              className={classes.fullWidth}
              onChange={(e) => setCity(e.target.value)}
          >
            {locations.map((location) => (
              <option key={location.town} value={location.dropstation}>
                {location.dropstation}
              </option>
            ))}  
          </select>
          {errors.city && (
            <div className="text-red-500 ">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">Price</label>
          <select
              {...register('price')}
              placeholder="Price"
              control={control}
              value={city}
              className={classes.fullWidth}
              onChange={(e) => setCity(e.target.value)}
          >
            {locations.map((location) => (
              <option key={location.town} value={location.price}>
                {location.price}
              </option>
            ))}  
          </select>
          {errors.city && (
            <div className="text-red-500 ">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            className="w-full"
            id="postalCode"
            {...register('postalCode', {
              required: 'Please enter postal code',
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500 ">{errors.postalCode.message}</div>
          )}
        </div>
        
          <div className="mb-4 block text-center ">
           <b>The percel is delivered to the Town/City post office nearest to you.</b>
          </div>
        <Typography className="mb-4 text-center" component="h1" variant="h2">
          Payment Method
        </Typography>
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
                <FormControlLabel
                  label="Mpesa"
                  value="Mpesa"
                  control={<Radio />}
                ></FormControlLabel>
                <FormControlLabel
                  label="M-coop"
                  disabled
                  value="M-coop"
                  control={<Radio />}
                ></FormControlLabel>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <div className="mb-4 block text-center ">
           <b>Only M-pesa payment is supported for now.</b>
           </div>
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
export async function getServerSideProps() {
  await db.connect();
    const locations = await Location.find().lean();
  await db.disconnect();
  return{
    props: {
      locations: locations.map(db.convertDocToObj),
    },
  };
}
ShippingScreen.auth = true;

