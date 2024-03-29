import React from 'react';
import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();
const initialState = {
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems'))
      : [],
    shippingAddress: Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress'))
      : { location: {} },
    paymentMethod: Cookies.get('paymentMethod')
      ? Cookies.get('paymentMethod')
      : '',
  },
  userInfo: Cookies.get('userInfo')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,
  followedShops: Cookies.get('followedShops')
    ? JSON.parse(Cookies.get('followedShops'))
    : [],
  favourites: Cookies.get('favourites')
    ? JSON.parse(Cookies.get('favourites'))
    : [],
  notifications: Cookies.get('notifications')
    ? JSON.parse(Cookies.get('notifications'))
    : [],
  loading: true,
  error: '',

};
function reducer(state, action) {
  switch (action.type) {
    case 'DARK_MODE_ON':
      return { ...state, darkMode: true };
    case 'DARK_MODE_OFF':
      return { ...state, darkMode: false };
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 365 });
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };
    case 'SAVE_SHIPPING_ADDRESS_MAP_LOCATION':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            location: action.payload,
          },
        },
      };
    case 'SAVE_PAYMENT_METHOD':
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    case 'USER_LOGIN':
      return { ...state, userInfo: action.payload };
    case 'USER_LOGOUT':
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: '',
        },
      };
    case 'FETCH_SHOP':
      return { ...state, loading: true, error: ''};
    case 'FETCH_SHOP_SUCCESS':
      return { ...state, followedShops: [ ...state.followedShops , action.payload], loading: false, error: '' };
    case 'EMPTY_SHOP':
      return { ...state, followedShops: [] };
    case 'FETCH_SHOP_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'FETCH_NOTIFICATIONS':
      return { ...state, loading: true, error: ''};
    case 'FETCH_NOTIFICATIONS_SUCCESS':
      return { ...state, notifications: action.payload, loading: false, error: '' };
    case 'EMPTY_NOTIFICATIONS':
      return { ...state, notifications: [] };
    case 'FETCH_NOTIFICATIONS_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'FETCH_FAVOURITES':
      return { ...state, loading: true, error: ''};
    case 'FETCH_FAVOURITES_SUCCESS':
      return { ...state, favourites: action.payload, loading: false, error: '' };
    case 'FETCH_FAVOURITES_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'FAVOURITES_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.favourites.find(
        (item) => item._id === newItem._id
      );
      const favourites = existItem
        ? state.favourites.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.favourites, newItem];
      Cookies.set('favourites', JSON.stringify(favourites), { expires: 365 });
      return { ...state, favourites };
    }
    case 'FAVOURITES_REMOVE_ITEM': {
      const favourites = state.favourites.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set('favourites', JSON.stringify(favourites));
      return { ...state, favourites };
    }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
