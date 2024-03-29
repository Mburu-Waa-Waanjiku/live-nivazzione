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
import Loader from './Loader';

export default function Layout({ children }) {
  const router = useRouter();
  const { divstick, login, openLogin, handleOpenBag, viewOpenHandler, handleCartopen, setRoute, route } = useStateContext();
  const { state, dispatch } = useContext(Store);
  const [view, setView] = useState(false);
  const { userInfo, cart, notifications } = state;
  const notesLength = [...notifications.filter((notification) => !notification.isViewed )];
  
  const [homeLinks, setHomelinks] = useState(false);
  const [userLinks, setUserlinks] = useState(false);
  const [allshops, setAllshops] = useState(false);
  const [shops, setShops] = useState(null);
  
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

  const fetchShops = async () => {
    setAllshops(true);
    const { data } = await axios.post(
      'api/admin/shopproducts/shoporders', 
      { shops: userInfo.shopId}, 
      { headers: { authorization: `Bearer ${userInfo.token}` } }
    );
    await setShops(data)
  }
  
  useEffect(() => {
    setView(true)
    fetchNotes();
  }, []);
  
  const fetchPs = async() => {
    await axios.post(`/api/users/${userInfo._id}/createShop`, 
      {
        shopName: "Sandals & Slides",
        logo: "https://res.cloudinary.com/dddx5qpji/image/upload/v1692687488/S74d410ed28d0413a8e36af9d30ac6834x.jpg_720x720q80_an2b2e.jpg",
        coverPhoto: "https://res.cloudinary.com/dddx5qpji/image/upload/v1692687488/S74d410ed28d0413a8e36af9d30ac6834x.jpg_720x720q80_an2b2e.jpg"
      },
      { headers: { authorization: `Bearer ${userInfo.token}` } }
    )
  } 

  return (
    <div className={divstick ? "fixed top-0 w-full" : ""}>
      <div className="flex items-center z-50 w-full px-4 pt-6 pb-2">
        <div className='hidden xsm:block pr-3'>
          <Image className='rounded-full' width={40} height={40} alt='logo' src='/icon-256x256.png'/>
        </div>
        <div className='text-left text-3xl block xsm:hidden sm:text-center font-semibold'>
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
          <IconButton onClick={notesLength.length > 0 ? viewOpenHandler : viewOpenHandler} className='justify-items-end'>
            {notesLength.length > 0 ? (
              <Badge
                overlap="rectangular"
                classes={{ badge: classes.badgeLg }}
                badgeContent={notesLength.length}
              >
                <IoNotificationsSharp  style={{ fontSize: 28, color:' black' }}/>
              </Badge>
            ) : (
              <Badge
                overlap="rectangular"
                classes={{ badge: classes.badgetab }}
                badgeContent={''}
              >
                <IoNotificationsOutline  style={{ fontSize: 28, color:' black' }}/>
              </Badge>
            )}
          </IconButton>
          <div className='hidden xsm:block'>
            <IconButton onClick={handleOpenBag} >
              <GiHanger className='text-black'/>
            </IconButton>
          </div>
          <div className='hidden relative xsm:block'>
            {view &&
              <>
                {cart.cartItems.length > 0 && 
                  <div 
                    style={{transform: 'translate(-4px, 5px)'}} 
                    className='top-0 right-0 absolute text-xs z-10 border-2 text-white border-white bg-tabb w-5 h-5 flex justify-center items-center rounded-full'> 
                    {cart.cartItems.length} 
                  </div>
                }
              </>
            }
            <IconButton onClick={handleCartopen} >
                <FiShoppingBag/>
            </IconButton>
          </div>
          {view &&
            <>
              {userInfo ? (
                  <b className='w-12 h-12 text-xl ml-2 bg-grayb rounded-full text-white flex justify-center items-center' onClick={() => setUserlinks(true)}>{userInfo.name.slice(0,1)}</b>
                ) : (
                  <IconButton onClick={openLogin}>
                    <FiUser  className='text-3xl ml-2' />
                  </IconButton>
                )
              }
            </>
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
            {view &&
              <>{userInfo?.name.toUpperCase().slice(0,1)}</>
            }
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
          {view &&
            <>
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
                <div onClick={async () => {typeof userInfo.shopId == 'array' && userInfo.shopId.length < 2  ? router.push(`/shop/seller/${userInfo.shopId[0]}`) : typeof userInfo.shopId == 'array' && userInfo.shopId?.length > 1 ? fetchShops()  : router.push("/shop") ; setUserlinks(false)}} className="flex my-1 items-center" >
                  <div style={{ width: 35, height:35, borderRadius: 50, backgroundColor: "#222", color: "white",}} className="DrawerIcon flex text-lg justify-center items-center themecolor p-4 font-black">
                    <BsShop />
                  </div>
                  <div className="p-2 text-base font-black">
                    My Shop
                  </div>
                </div>
              }
            </>
          }
        </div>
      </div>
      <div style={{bottom: userLinks ? '0%' : '-60%'}} className='bg-white fixed py-6 px-3 pb-20 btop overflow-hidden transition-all duration-1000 z-50  rounded-t-3xl w-full h-fit  sm:hidden'>
        <div className='relative z-10 box-border gap-2 flex-col justify-center items-center w-full h-full flex'>
          <div className="flex items-center" onClick={() => {logoutClickHandler(); setUserlinks(false)}} >
            <div style={{ width: 35, height:35, borderRadius: 50, backgroundColor: "#222", color: "white",}} className="flex text-lg justify-center items-center themecolor p-4 font-black">
              {view &&
                <>{userInfo?.name.toUpperCase().slice(0,1)}</>
              }
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
          {view &&
            <>
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
                <div onClick={async () => {Array.isArray(userInfo.shopId) && userInfo.shopId.length < 2  ? router.push(`/shop/seller/${userInfo.shopId[0]}`) : Array.isArray(userInfo.shopId) && userInfo.shopId?.length > 1 ? fetchShops()  : router.push("/shop") ; setUserlinks(false)}} className="flex my-1 items-center" >
                  <div style={{ width: 35, height:35, borderRadius: 50, backgroundColor: "#222", color: "white",}} className="DrawerIcon flex text-lg justify-center items-center themecolor p-4 font-black">
                    <BsShop />
                  </div>
                  <div className="p-2 text-base font-black">
                    My Shop
                  </div>
                </div>
              }
            </>
          }
        </div>
      </div>
      {allshops && view &&
        <div style={{zIndex: 1280}} className='w-screen  overflow-hidden absolute top-0 bg-white rounded-3xl flex flex-col justify-center p-4 items-center h-screen'>
          <div onClick={() => setAllshops(false)} className='absolute text-xl top-3 right-3'>
            <IoIosArrowDown/>
          </div>
          {shops ? 
            <>
              {shops.map((shop, index) => (
                <div key={index} onClick={async () => { await router.push(`/shop/seller/${shop._id}`)  ; setAllshops(false)}} className="flex my-1 justify-center rounded-full bg-grayw py-3  w-52 items-center" >
                  <div style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: "#222", color: "white",}} className="DrawerIcon overflow-hidden flex text-lg relative justify-center items-center themecolor p-4 font-black">
                    <Image layout='fill' objectFit='cover' alt="" src={shop.logo} />
                  </div>
                  <div className="p-2 text-base font-black">
                    {shop.shopName}
                  </div>
                </div>
              ))}
            </> :
            <Loader/>
          }
        </div>
      }
      <div className='w-full p-2 xsm-4'>
        {children}
      </div>
    </div>
  );
}