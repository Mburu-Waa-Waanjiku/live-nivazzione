import Image from 'next/image';
import { AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import Link from 'next/link';
import React, { useContext } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Tabsbottom from '../components/tabsbottom';
import useStyles from '../utils/styles';

function CartScreen() {
  const classes = useStyles();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };
  const checkoutHandler = () => {
    router.push('/shipping');
  };
  return (
    <Layout title="Shopping Cart">
      <div className={classes.smseach}>
          
      </div>
      <button
        onClick={() => router.back()}
        type="button"
        className="cart-heading"
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items)</span>
        </button>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="cart-icn">  
            <AiOutlineShopping size={150} />
          </div>
            <h3>Your shopping bag is empty</h3>
              <button
                type="button" className="btn" onClick={() => router.back()}
              >
                Continue Shopping
              </button>
          </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-center">Name</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5 text-right">Size</th>
                  <th className="p-5 text-right">Burgainable</th>
                  <th className="p-5">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/product/${item.slug}`}>
                        <a className="flex items-center">
                          <Image
                            src={item.image[0]}
                            alt={item.name[0]}
                            width={94}
                            height={121}
                          ></Image>
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right"><b>{item.name}</b></td>                    
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">Ksh.{item.price}</td>
                    <td align="center">S</td>
                    <td className="p-5 text-center">
                      {item.isBurgain ? (<div className="loves"> B </div>) : (<div><b>No offer</b></div>)}
                    </td>
                    <td style={{color:"#30d04a"}} className="p-5 text-center ">
                      <button onClick={() => removeItemHandler(item)}>
                        <div style={{padding:"0px 8px", borderRadius:"5px", fontWeight:"bold", backgroundColor:"black", fontSize:"20px"}} >×</div>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 mb-2 font-bold font-sans flex justify-between text-xl">
                  <div> Subtotal  :</div><div> Ksh
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}</div>
                </div>
              </li>
              <li>
                <button
                  style={{color:"#30d04a"}}
                  onClick={checkoutHandler}
                  className="primary-button w-full"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
      <Tabsbottom/>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });