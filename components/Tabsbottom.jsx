import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useStateContext } from '../utils/StateContext';
import tabsStyles from '../styles/Tabs.module.css';
import { RiHome5Line } from 'react-icons/ri';
import { FiShoppingBag } from 'react-icons/fi';
import { BiCategoryAlt } from 'react-icons/bi';
import { GiHanger } from 'react-icons/gi';
import { debounce } from '../utils/helpers';
import { Store } from '../utils/Store';

export default function Tabsbottom() {
  const { route, setRoute, handleOpenBag , handleCartopen } = useStateContext();
  const { state } = useContext(Store);
  const { cart } = state;
  const router = useRouter();
      
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible((prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) || currentScrollPos < 10);

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);

  }, [prevScrollPos, visible, handleScroll]);


  return (
    <>
      <div className={tabsStyles.backgcoverticalcenter}>
        <div className={tabsStyles.bottomnav} style={{bottom: visible ? '10px' : '-60px',}} >
          {route == "home" ? 
            <div className='grid gap-0.5 justify-center items-center text-sm'>
              <div className='w-1.5 h-1.5 justify-self-center bg-amber-500 rounded-full'></div>
              <div> HOME </div>
            </div>
            : route == "categories" &&
            <div style={{minWidth:0, padding:"1px 10px"}} onClick={() => {router.push("/"); setRoute("home");}}>
              <RiHome5Line/>
            </div>
          }
          {route == "categories" ? 
            <div className='grid gap-0.5 justify-center items-center text-sm'>
              <div className='w-1.5 h-1.5 justify-self-center bg-amber-500 rounded-full'></div>
              <div> CATEGORIES </div>
            </div>
            : route == "home" &&
            <div style={{minWidth:0, padding:"1px 10px"}} onClick={() => {setRoute("categories"); router.push("/categories")}}>
              <BiCategoryAlt/>
            </div>
          }
          <div style={{minWidth:0, padding:"1px 10px"}} className='relative' onClick={handleOpenBag}>
            <GiHanger style={{left: '-1.5px'}} className='scale-x-125 absolute'/>
          </div>
          <div style={{minWidth:0, padding:"1px 10px"}} className='relative' onClick={handleCartopen}>
            <FiShoppingBag/>
            {cart.cartItems.length > 0 && <div style={{transform: 'translateY(-5px)'}} className='top-0.5 right-0.5 absolute text-xs border-2 text-amber-500 border-amber-500 bg-tabb w-5 h-5 flex justify-center items-center rounded-full'> {cart.cartItems.length} </div>}
          </div>
        </div>
      </div>
    </>
  );
}
