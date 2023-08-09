import React, { useContext, useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';
import MyBag from './mybag/MyBag';
import {
  Badge,
  IconButton
} from '@material-ui/core';
import useStyles from '../utils/styles';
import { Store } from '../utils/Store';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useStateContext } from '../utils/StateContext';
import { useRouter } from 'next/router';
import { getError } from '../utils/error';
import axios from 'axios';
import Cart from './mycart/Cart';
import Notification from './notifications/view';
import { useEffect } from 'react';
import Search from './SearchComponent';
import dynamic from 'next/dynamic';
import { IoNotificationsSharp, IoNotificationsOutline } from 'react-icons/io5';
const DynamicLogger = dynamic(() => import('./Logger'), {
  loading: () => " ",
})
import { FiShoppingBag } from 'react-icons/fi';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import {GiReceiveMoney, GiHanger} from 'react-icons/gi';
import {BsShop} from 'react-icons/bs';
import Link from 'next/link';

export default function Layout({ children }) {
  const router = useRouter();
  const { divstick, login, openLogin, handleOpenBag, viewOpenHandler, handleCartopen, setRoute, route } = useStateContext();
  const { state, dispatch } = useContext(Store);
  const { userInfo, cart, notifications } = state;
  const notesLength = [...notifications.filter((notification) => !notification.isViewed )];
  
  const [homeLinks, setHomelinks] = useState(false);
  const [userLinks, setUserlinks] = useState(false);
  
  const logoutClickHandler = () => {
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('cartItems');
    router.push('/');
  };
  const classes = useStyles();
  
  const fetchNotes = async () => {
    try {
      dispatch({ type: 'FETCH_NOTIFICATIONS' });
      const { data } = await axios.post(`/api/users/${userInfo._id}`);
      dispatch({ type: 'FETCH_NOTIFICATIONS_SUCCESS', payload: data });
      Cookies.set('notifications', data, { expires: 365 })
    } catch (err) {
      dispatch({ type: 'FETCH_FAVOURITES_FAIL', payload: getError(err) });
    }
  };
  
  useEffect(() => {
    fetchNotes();
  }, []);
  
  const fetchPs = async() => {
    await axios.post('/api/products/categories', {})
  }

  return (
    <div className={divstick ? "fixed top-0 w-full" : ""}>
      <div className="flex items-center z-50 w-full px-4 pt-6 pb-2">
        <div className='hidden xsm:block pr-3'>
          <Image className='rounded-full' width={40} height={40} alt='logo' src='/icon-256x256.png'/>
        </div>
        <div onClick={fetchPs} className='text-left text-3xl block xsm:hidden sm:text-center font-semibold'>
          SHIGLAM
        </div>
        <div className=' mt-2' style={{zIndex: 120}}>
          <div className='hidden title-font xsm:flex items-center'>
            <div onClick={() => {setRoute(route == "home" ? "home" : "categories"); router.push(!route == "home" ? "/categories" : "/")}} className={'mlg:hidden block font-semibold text-center flex-grow text-lg rounded-full px-8 pt-2.5 pb-3 text-black bg-grayw'}>
              {route.charAt(0).toUpperCase() + route.slice(1)}
            </div>
            <div className='flex mlg:hidden pl-1 text-2xl items-center'>
              <MdKeyboardArrowDown onClick={() => setHomelinks(true)} className={!homeLinks ? 'block' : 'hidden'}/> 
              <MdKeyboardArrowUp onClick={() => setHomelinks(false)} className={homeLinks ? 'block' : 'hidden'}/>
            </div>
            <div onClick={() => {setRoute("home"); router.push("/")}} className={'hidden mlg:block font-semibold text-center flex-grow text-lg rounded-full px-8 pt-2.5 pb-3 text-black '.concat(route == "home" ? 'bg-grayw' : 'bg-white ')}>
              Home
            </div>
            <div onClick={() => {setRoute("categories"); router.push("/categories")}} className={'hidden mlg:block font-semibold text-center flex-grow text-lg rounded-full px-8 pt-2.5 pb-3 text-black '.concat(route == "categories" ? 'bg-grayw ' : 'bg-white')}>
              Categories
            </div>
          </div>
          <div className={'absolute top-0 z-30 left-0 right-0 bottom-0 '.concat(homeLinks ? 'block' : 'hidden')} onClick={() => setHomelinks(false)}>
          </div>
          <div className={'w-48 title-font translate-y-2 z-50 p-2 bg-white rounded-2xl h-32 bshadow absolute '.concat(homeLinks ? 'block' : 'hidden')} >
            <div onClick={() => {setRoute("home"); router.push("/"); setHomelinks(false)}} className={' font-semibold text-center flex-grow text-lg rounded-2xl px-8 pt-2.5 pb-3 text-black '.concat(route == "home" ? 'bg-grayw' : 'bg-white ')}>
              Home
            </div>
            <div onClick={() => {setRoute("categories"); router.push("/categories"); setHomelinks(false)}} className={' block font-semibold text-center flex-grow text-lg rounded-2xl px-8 pt-2.5 pb-3 text-black '.concat(route == "categories" ? 'bg-grayw ' : 'bg-white')}>
              Categories
            </div>
          </div>
        </div>
        <div className='flex-grow flex items-center justify-end'>
          <div className='flex-grow hidden slg:block'>
            <Search/>
          </div>
          <IconButton onClick={viewOpenHandler} className='justify-items-end'>
            {notesLength.length > 0 ? (
              <Badge
                classes={{ badge: classes.badgeLg }}
                badgeContent={notesLength.length}
              >
                <IoNotificationsSharp  style={{ fontSize: 28, color:' black' }}/>
              </Badge>
            ) : (
              <Badge
                classes={{ badge: classes.badgetab }}
                badgeContent={''}
              >
                <IoNotificationsOutline onClick={viewOpenHandler} style={{ fontSize: 28, color:' black' }}/>
              </Badge>
            )}
          </IconButton>
          <div className='hidden xsm:block'>
            <IconButton onClick={handleOpenBag} >
              <GiHanger className='text-black'/>
            </IconButton>
          </div>
          <div className='hidden xsm:block'>
            <IconButton >
              <div className='relative text-black' onClick={handleCartopen}>
                <FiShoppingBag/>
                {cart.cartItems.length > 0 && <div style={{transform: 'translate(9px, -5px)'}} className='top-0 right-0 absolute text-xs border-2 text-white border-white bg-tabb w-5 h-5 flex justify-center items-center rounded-full'> {cart.cartItems.length} </div>}
              </div>
            </IconButton>
          </div>
          {userInfo ? (
              <b className='w-12 h-12 text-xl ml-2 bg-grayb rounded-full text-white flex justify-center items-center' onClick={() => setUserlinks(true)}>{userInfo.name.slice(0,1)}</b>
            ) : (
              <IconButton>
                <FiUser onClick={openLogin} className='text-3xl ml-2' />
              </IconButton>
            )
          }
        </div>
      </div>
      <div className=' block slg:hidden'>
        <Search/>
      </div>
      {login && <DynamicLogger/>}
      <Notification/>
      <MyBag/>
      <Cart/>
      <div onClick={() => setUserlinks(false)} className={'absolute w-screen '.concat(userLinks ? 'h-screen top-0 z-10' : 'h-0')}></div>
      <div className={"absolute hidden justify-end top-20 z-50 right-2 w-full transition-all duration-1000 sm:flex ".concat(!userLinks && 'hidden-I')} >
        <div onClick={() => setUserlinks(false)} className='flex-grow' ></div>
        <div className="p-2 m-2 relative bg-white rounded-xl max-w-xs w-full" style={{ boxShadow: 'rgba(64, 60, 67, 0.2) 0px 2px 5px 1px'}}>
          <div className="absolute z-50"  style={{ right: '2%', top: '18px' }}>
            <IoIosArrowUp className='text-xl' onClick={() => setUserlinks(false)} />
          </div>
          <div className="flex items-center" onClick={() => {logoutClickHandler(); setUserlinks(false)}} >
            <div style={{ width: 35, height:35, borderRadius: 50, backgroundColor: "#222", color: "white",}} className="flex text-lg justify-center items-center themecolor p-4 font-black">
              {userInfo?.name.toUpperCase().slice(0,1)}
            </div>
            <div className="p-2 text-base font-black">
              Log Out
            </div>
          </div>
          {userInfo?.isAffiliate && 
            <div onClick={() => {setUserlinks(false)}} className="flex my-1 items-center"  >
              <div style={{ width: 35, height:35, borderRadius: 50, backgroundColor: "#222", color: "white",}} className="DrawerIcon flex text-lg justify-center items-center themecolor p-4 font-black">
                <GiReceiveMoney />
              </div>
              <div className="p-2 text-base font-black">
                Affiliate
              </div>
            </div>
          }
          {userInfo?.isSeller &&
            <Link href={typeof userInfo.shopId == 'string' ? `/shop/seller/${userInfo.shopId}`  : "/shop" } >
              <div onClick={() => {setUserlinks(false)}} className="flex my-1 items-center" >
                <div style={{ width: 35, height:35, borderRadius: 50, backgroundColor: "#222", color: "white",}} className="DrawerIcon flex text-lg justify-center items-center themecolor p-4 font-black">
                  <BsShop />
                </div>
                <div className="p-2 text-base font-black">
                  My Shop
                </div>
              </div>
            </Link>
          }
        </div>
      </div>
      <div style={{bottom: userLinks ? '0%' : '-40%'}} className='bg-white fixed py-6 px-3 btop overflow-hidden transition-all duration-1000 z-50  rounded-t-3xl w-full h-fit  sm:hidden'>
        <div className='relative z-10 box-border gap-2 flex-col justify-center items-center w-full h-full flex'>
          <div className="flex items-center" onClick={() => {logoutClickHandler(); setUserlinks(false)}} >
            <div style={{ width: 35, height:35, borderRadius: 50, backgroundColor: "#222", color: "white",}} className="flex text-lg justify-center items-center themecolor p-4 font-black">
              {userInfo?.name.toUpperCase().slice(0,1)}
            </div>
            <div className="p-2 text-base font-black">
              Log Out
            </div>
          </div>
          <div onClick={() => router.push('https://www.shiglam.com/me')} className="flex my-1 items-center"  >
            <div style={{ width: 35, height:35, borderRadius: 50, backgroundColor: "#222", color: "white",}} className="DrawerIcon flex text-lg justify-center items-center themecolor p-4 font-black">
              <FiUser className='text-2xl'/>
            </div>
            <div className="p-2 text-base font-black">
              Account
            </div>
          </div>
          <div onClick={() => setUserlinks(false)} className='absolute text-xl top-0 right-3'>
            <IoIosArrowDown/>
          </div>
          {userInfo?.isAffiliate && 
            <div onClick={() => {setUserlinks(false)}} className="flex my-1 items-center"  >
              <div style={{ width: 35, height:35, borderRadius: 50, backgroundColor: "#222", color: "white",}} className="DrawerIcon flex text-lg justify-center items-center themecolor p-4 font-black">
                <GiReceiveMoney />
              </div>
              <div className="p-2 text-base font-black">
                Affiliate
              </div>
            </div>
          }
          {userInfo?.isSeller &&
            <Link href={typeof userInfo.shopId == 'string' ? `/shop/seller/${userInfo.shopId}`  : "/shop" } >
              <div onClick={() => {setUserlinks(false)}} className="flex my-1 items-center" >
                <div style={{ width: 35, height:35, borderRadius: 50, backgroundColor: "#222", color: "white",}} className="DrawerIcon flex text-lg justify-center items-center themecolor p-4 font-black">
                  <BsShop />
                </div>
                <div className="p-2 text-base font-black">
                  My Shop
                </div>
              </div>
            </Link>
          }
        </div>
      </div>
      <div className='w-full p-2 xsm-4'>
        {children}
      </div>
    </div>
  );
}