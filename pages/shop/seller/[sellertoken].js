import React, { useState, useContext, useEffect } from 'react';
import { Store } from "../../../utils/Store";
import Loader from '../../../components/Loader';
import db from '../../../utils/db';
import Shop from '../../../models/Shop';
import Image from 'next/image';
import {GiReceiveMoney} from 'react-icons/gi';
import NewProds from '../../../components/shop/NewProds';
import ShopProduct from '../../../components/shop/ShopProduct';
import { FiShoppingBag } from 'react-icons/fi';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Pendingps from '../../../components/shop/Pendingps';
import CartItems from '../../../components/galleryComponents/CartItems';
import Head from 'next/head';

function Seller({ shops }) {
  
  const [gallery, setGallery] = useState(null);
  const [gallery1, setGallery1] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [Editor, setEditor] = useState(false);
  const [products, setProducts] = useState([]);
  const [LiveProducts, setLiveProducts] = useState([]);
  const [orders, setOrders] = useState(null);
  const [live, setLive] = useState(true);
  const [loading, setLoading] = useState(true);
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [shopTabs, setShoptabs] = useState("Sales");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const fetchProducts = async () => {
    closeSnackbar();
    try {
      const { data } = await axios.get(
        `/api/admin/shopproducts`,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      setProducts(data);
    } catch (err) {
      enqueueSnackbar('Could not connect', { variant: 'error' });
    }
  }
  const fetchLiveProducts = async () => {
    closeSnackbar();
    try {
      const { data } = await axios.post(
        `/api/admin/shopproducts`, {},
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      setLiveProducts(data);
    } catch (err) {
      enqueueSnackbar('Could not connect', { variant: 'error' });
    }
  }
  const fetchOrders = async () => {
    closeSnackbar();
    try {
      const { data } = await axios.get(
        `/api/admin/shopproducts/shoporders`,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      setOrders(data);
    } catch (err) {
      enqueueSnackbar('Could not connect', { variant: 'error' });
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchLiveProducts()
    fetchOrders();
    setLoading(false);
  }, []);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div className='bg-gray-100'>
        {userInfo && userInfo.isSeller &&
          ( 
            <div className='p-2'>
              {shops.map((shop) => (
                <div key={shop} className='w-full pulse relative h-40 sm:h-48 overflow-hidden  rounded-3xl  '>
                  <div className='w-full h-full flex justify-center items-center'>
                    <Image 
                      className='w-full h-auto min-w-full'
                      width={1200} 
                      height={667} 
                      alt={shop.shopName} 
                      src={shop.coverPhoto}
                    />
                  </div>
                  <div className='absolute px-2 py-4 flex justify-end items-start xsm:justify-center xsm:items-center h-fitdiv flex-col z-10 bottom-0 w-fitdiv categshade-full'>
                    <div className='flex bg-white-parent rounded-full px-6 py-2 md:px-16 gap-2 items-center'>
                      <div className='w-14 h-14 rounded-full overflow-hidden'>
                        <Image width={100} height={100} alt="" src={shop.logo} />
                      </div>
                      <div className='text-2xl font-medium title-font text-white'> {shop.shopName} </div>
                    </div>
                  </div>
                </div>
              ))
              }
              <div className='flex gap-3 p-4'>
                <div onClick={() => setShoptabs("Sales")} className={' font-medium text-center flex-grow text-base rounded-full px-8 pt-3 pb-3.5 '.concat(shopTabs == "Sales" ? 'bg-grayb text-white' : 'bg-gray-200 text-black')}>
                  Sales
                </div>
                <div onClick={() => setShoptabs("Products")} className={' font-medium text-center flex-grow text-base rounded-full px-8 pt-3 pb-3.5 '.concat(shopTabs == "Products" ? 'bg-grayb text-white' : 'bg-gray-200 text-black')}>
                  Products
                </div>
              </div>
              {shopTabs == "Sales" && 
                <div className='w-full h-fit'>
                  <div className='w-full text-xl rounded-3xl overflow-hidden flex gap-2 p-4 bshadow bg-white '>
                    <div className='flex flex-col items-center justify-center grow gap-5'>
                      <div className='flex items-center'> <GiReceiveMoney className='mr-2 text-2xl' />  Balance</div>
                      <div>KES {orders?.length > 0 ? Math.ceil(orders.reduce((a, c) => a + c.quantity * c.csize.price, 0) * 0.89) : '0'}</div>
                    </div>
                    <div className='flex flex-col grow items-center justify-center gap-5'>
                      <div className='flex items-center'> <FiShoppingBag className='mr-2 text-2xl' />  Orders</div>
                      <div className='w-5 h-5 relative flex justify-center items-center'>
                        <span className={"text-center rounded-full animate-ping bg-amber-500 absolute w-full h-full ".concat(orders?.length < 1 && 'hidden')}></span>
                        <span className={'text-xs flex rounded-full  justify-center content-center items-center relative h-5 w-5 block bg-amber-500 text-white text-center '}>{orders?.length}</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center items-center' style={{minHeight: 'calc(100vh - 365px)'}} >
                    {orders?.length > 0 ?
                      <div className={"grid place-items-center gap-3 pt-3  grid-cols-1 w-full xmd:grid-cols-2 "}>
                        {orders.map((order, index) => (
                          <CartItems
                            key={index}
                            item={order}
                          />
                        ))}
                      </div> :
                      <div className='flex flex-col gap-4 justify-center items-center'>
                        <FiShoppingBag className='text-8xl'/>
                        <div className='title-font text-2xl'> No Pending orders</div>
                      </div>
                    }
                  </div>
                </div>
              }
              {shopTabs == "Products" &&
                <div className='w-full'>
                  <NewProds
                    fetchProducts={fetchProducts}
                    setLive={setLive}
                    live={live}
                    Editor={Editor}
                    setEditor={setEditor}
                    gallery={gallery}
                    setGallery={setGallery}
                    gallery1={gallery1}
                    setGallery1={setGallery1}
                    image1={image1}
                    setImage1={setImage1}
                    image2={image2}
                    setImage2={setImage2}
                    image3={image3}
                    setImage3={setImage3}
                  />
                  {loading && 
                    <div style={{minHeight: 'calc(100vh - 312px)'}} className='w-full justify-center items-center flex bg-gray-100'>
                      <Loader/>
                    </div>
                  }
                  {!loading && 
                    <>
                      {live ?
                        <div style={{minHeight: 'calc(100vh - 312px)'}} className='w-full flex bg-gray-100'>
                          {LiveProducts.length < 1 ? 
                            <div className='text-3xl flex flex-col p-3 text-center w-full items-center justify-center title-font'>
                              You don't Have Live Products
                            </div> :
                            <div className={"grid place-items-center gap-3 grid-cols-1 w-full xmd:grid-cols-2 "}>
                              {LiveProducts.map((product) => (
                                <ShopProduct
                                  key={product}
                                  product={product}
                                />
                              ))}
                            </div>
                          }
                        </div> :
                        <div style={{minHeight: 'calc(100vh - 312px)'}} className='w-full flex bg-gray-100'>
                          <div className={"grid place-items-center grid-cols-1 gap-3 pt-4 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}>
                            {products.map((product) => (
                              <Pendingps
                                key={product}
                                product={product}
                                fetchProducts={fetchProducts}
                                gallery={gallery}
                                setGallery={setGallery}
                                gallery1={gallery1}
                                setGallery1={setGallery1}
                                image1={image1}
                                setImage1={setImage1}
                                image2={image2}
                                setImage2={setImage2}
                                image3={image3}
                                setImage3={setImage3}
                              />
                            ))}
                          </div>
                        </div>
                      }
                    </>
                  }
                </div>
              }
            </div>
          )
        }
        <>
          {!userInfo?.isSeller &&
            <div className='flex justify-center text-xl title-font items-center w-full h-screen'> This Page Cant be Found </div>
          }
          {!userInfo &&
            <div className='flex justify-center text-xl title-font items-center w-full h-screen'> This Page Cant be Found </div>
          }
        </>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {

  const { params } = context;
  const { sellertoken } = params;

  await db.connect();
  const shop = await Shop.find({ _id: sellertoken}).lean();
  await db.disconnect();
  
  return {
    props: {
      shops: shop.map(db.convertRevDocToObj),
    },
  };
}
export default Seller