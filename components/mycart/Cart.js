import Image from 'next/image';
import { AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import Link from 'next/link';
import React, { useContext } from 'react';
import { Store } from '../../utils/Store';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import axios from 'axios';
import useStyles from '../../utils/styles';
import { useStateContext } from '../../utils/StateContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import Pay4Bag from './Pay4Bag';

function Cart() {
  const router = useRouter();
  const classes = useStyles();
  const { openp4b, setOpenp4b, handleOpenp4b, handleClosep4b, cartopen, setCartopen, handleCartopen, handleCartclose } = useStateContext();
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
    handleCartclose();
  };

  
  return (
    <div className={classes.smseachbg} 
      style={{position: "fixed", zIndex: 1210, top: 0, left: cartopen ? '0' : '120vw', background: 'white',  width: "100vw", height: "100vh"}}
      >
      <div className={classes.reviewTopTab}>
        <ArrowBackIosIcon onClick={handleCartclose} sx={{fontSize:10, float:"left",}} /> 
        My Cart 
        <span className="cart-num-items">({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items)
        </span>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="cart-icn">  
            <AiOutlineShopping size={150} />
          </div>
            <h3>Your shopping bag is empty</h3>
              <button
                type="button" className="btn" onClick={() => router.push('/')}
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
                  <th className="p-5">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td className="pl-2">
                      <Link href={`/product/${item.slug}`}>
                        <a className="flex items-center">
                          <Image
                            src={item.image[0]}
                            alt={item.name[0]}
                            width={94}
                            height={121}
                            className="bg-gray-100"
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
                <div className="flex gap-x-9">
                  <button
                    onClick={checkoutHandler}
                    className="primary-button w-full"
                    style={{backgroundColor: "#222"}}
                  >
                    Check Out
                  </button>
                  <button
                    onClick={handleOpenp4b}
                    style={{backgroundColor: "#222"}}
                    className="primary-button w-full flex justify-center"
                  >
                    Add to 
                    <div style={{position: "relative", height: 30}}>
                    <AiOutlineShopping style={{fontSize: 25, position: "relative", top: 0, marginLeft: 10}}/>                
                    <div style={{height: 18, display:"inline-block", position: "relative", fontSize: 12, top: "-32px", left: "-3px", border: "3px solid #242526" }}>
                      +
                    </div>
                  </div>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}
      {openp4b && <Pay4Bag/>}
    </div>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
