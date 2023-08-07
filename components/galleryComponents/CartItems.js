import React, { useState } from 'react';
import Image from 'next/image';
import { useStateContext } from '../../utils/StateContext';
import { useRouter } from 'next/router';
import { AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';

function CartItems({item, removeItemHandler, isCart, index, dispatch }) {

  const [color, setColor] = useState(true);
    const router = useRouter();
  const checkPayment = async () => {
     setColor(false);
     await new Promise(resolve => setTimeout(resolve, 800));
     removeItemHandler(item);
     setColor(true);
    };
  const { handleCartclose } = useStateContext();
  const slugPush = async () => {
    await router.push(`/${item.category}/${item.slug}`);
    handleCartclose();
  }
  
  const updateCartHandler = async (item, quantity) => {
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };
  const updateCartsize = async (item, csize) => {
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, csize } });
  };
  
  const handleLength = async (e) => {
    const val = item.sizes.filter((s) => s.psize == e.target.value );
    if(val[0].count > 0) {
      updateCartsize(item, val[0])
    } else if(val[0].count < 1) {
      window.alert('Sorry, This size is out of stock');
      return
    }
  };

  const handleAdd = async () => {
    if(item.csize.count > item.quantity) {
      const added = item.quantity + 1;
      updateCartHandler(item, added);
    } 
  }
  const handleDel = async () => {
    if(item.quantity > 1 ) {
      const deled = item.quantity - 1;
      updateCartHandler(item, deled);
    }
  }

  return (
    <div key={item.slug ? item.slug : index} style={{ height: "auto" }} className={"flex rounded-3xl grow w-full grow title-font py-1 mb-4 pl-2 pr-3 ".concat(!isCart ? 'bshadow bg-white' : ' max-w-xl')}>
      {isCart ? 
        <div style={{maxWidth: 60}} className="grid grow justify-self-center pr-1 items-center flex justify-center gap-4 self-center">
          <div style={{ width: 17, height: 17, border: "3px solid #222", borderRadius: 3}} onClick={checkPayment}>
            <div style={{ display: color ? "block" : "none", width: 16, height: 8, borderLeft: "3px solid #222", borderBottom: "3px solid #222", rotate: "-40deg", borderRadius: "0 0 0 3px", bottom: 3, left: 1.6, position: "relative"}} >
              <div className='bg-white' style={{position: "relative", height: 3, top: 2 }} >
              </div>
              <div className='bg-white' style={{bottom: -5, overflow: "visible", position: "relative", height: 3, width: 20 }}>
              </div>
            </div>
          </div>
        </div> :
        <div style={{maxWidth: 60}} className="grid grow justify-self-center pr-1 items-center flex justify-center gap-4 self-center">
          <div style={{ width: 17, height: 17, border: "3px solid #222", borderRadius: 3}}>
            <div style={{ display: item.collected ? "block" : "none", width: 16, height: 8, borderLeft: "3px solid #222", borderBottom: "3px solid #222", rotate: "-40deg", borderRadius: "0 0 0 3px", bottom: 3, left: 1.6, position: "relative"}} >
              <div className='bg-white' style={{position: "relative", height: 3, top: 2 }} >
              </div>
              <div className='bg-white' style={{bottom: -5, overflow: "visible", position: "relative", height: 3, width: 20 }}>
              </div>
            </div>
          </div>
        </div>
      }
      <div className="h-full w-auto">
        <div onClick={slugPush} style={{backgroundColor: "#f3f4f6", height: 120, width: 90, margin: 5, borderRadius: 20, overflow: "hidden"}}>
          <Image
            src={item.image[0].item}
            alt={item.name}
            width={90}
            height={120}
          />
        </div>
      </div>
      <div className="CartFont grow grid grid-cols-5 gap-3 justify-start place-content-center">
        <div className="ml-1 col-span-3 col-start-0 ">
          <div style={{minWidth: 40}} className='w-full font-semibold text-base pb-4 overflow-hidden whitespace-nowrap text-ellipsis'>
              {item.name.length > 20 ? (<div>{item.name.slice(0, 14).concat(" ", ". .")}</div>) : (<div>{item.name}</div>)}
          </div>
          {isCart ? 
            <select
              value={length?.size}
              onChange={handleLength}
              >
              {item.sizes?.map((size, index) => (
                <option key={index} value={size.psize}>
                    {size.psize}
                </option>
              ))}
            </select> : 
            <select
              value={item.csize.psize}
              >
              <option value={item.csize.psize}>
                {item.csize.psize}
              </option>
            </select>
          }
        </div>
        <div className=" col-span-2 col-end-6 self-center">
          <div className='pb-4 text-base font-semibold'>Ksh.{item.csize.price}</div>
          <div className='flex gap-2 items-center'>
            {isCart ? 
              <>
                <div onClick={handleDel} className='w-6 flex justify-center items-center h-6 rounded-full border-2'>
                  <AiOutlineMinus/>
                </div>
                <div>
                  {item.quantity}
                </div>
                <div onClick={handleAdd} className='w-6 h-6 flex justify-center items-center rounded-full border-2'>
                  <AiOutlinePlus/>
                </div>
              </> :
              <>
                <div className='flex text-base font-semibold justify-center items-center pr-2 '>
                  Qty
                </div>
                <div className=' font-semibold'>
                  {item.quantity}
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems