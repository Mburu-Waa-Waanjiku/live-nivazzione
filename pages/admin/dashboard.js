import axios from 'axios';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useState, useEffect, useContext, useReducer } from 'react';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Store';
import useStyles from '../../utils/styles';
import ProgressLoad from '../../components/admin/LoadingProgress';
import { useSnackbar } from 'notistack';
import Compass from '../../components/admin/Compass';
import admin from '../../styles/admin.module.css';
import Tabs from "@mui/material/Tabs"; 
import Tab from "@mui/material/Tab";
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Products from '../../components/admin/Products';
import { Navigation, FreeMode, Thumbs, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Orders from '../../components/admin/Orders';
import Bags from '../../components/admin/Bags';
import Transactions from '../../components/admin/Transactions';
import Banners from '../../components/admin/Banners';
import Users from '../../components/admin/Users';

export default function AdminDashboard() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const classes = useStyles();
  const { userInfo } = state;
  const { enqueueSnackbar } = useSnackbar();
  
  const [FetchProgres, setFetchProgres] = useState(0);
  const [show, setShow] = useState(false);

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [banners, setBanners] = useState([]);
  const [bags, setBags] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`/api/admin/products`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setProducts(data);
    } catch (err) {
      enqueueSnackbar(getError(err));
    }
  };

  const createHandler = async () => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      const { data } = await axios.post(
        `/api/admin/products`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      fetchProducts();
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const fetchBanner = async () => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      const { data } = await axios.get(`/api/admin/banners`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setBanners(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`/api/admin/users`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setUsers(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get(`/api/admin/transactions`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setTransactions(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const fetchBags = async () => {
    try {
      const { data } = await axios.get(`/api/admin/bags`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setBags(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`/api/admin/orders`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setOrders(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState({
    products: [],
    isSearch: false,
    resultFound: false,
  });

  const debounce = (func, wait) => {
    let timerId;
    return (...args) => {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, wait);
    };
  };

  const filterData = () => {
    let fData = [];
    let resultFound = false;
    console.log(fData);
    if (search) {
      fData = [...products.filter((product) => product.description.toLowerCase().indexOf(search.toLowerCase()) != -1)];
      console.log('new fdata is' + ' ' + fData);
      if (fData.length > 0) {
        resultFound = true;
      }
    }
    setFilteredData({
      ...fData,
      products: [...fData],
      isSearch: search.trim().length > 0,
      resultFound: resultFound,
    });
  };


  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }
    const fetcherfc = async () => {
        await fetchProducts();
        setShow(true);
        await setFetchProgres(30);
        await fetchBanner();
        await setFetchProgres(38);
        await fetchUsers();
        await setFetchProgres(52);
        await fetchTransactions();
        await setFetchProgres(59);
        await fetchBags();
        await setFetchProgres(65);
        await fetchOrders();
        await new Promise(resolve => setTimeout(resolve, 1500));        
        await setFetchProgres(79);
        await new Promise(resolve => setTimeout(resolve, 800));        
        await setFetchProgres(100);
        await new Promise(resolve => setTimeout(resolve, 200));        
        setShow(false);
      };
    fetcherfc();
  }, []);

  const pages = ["Products", "Orders", "Bags", "Transactions", "Banners", "Users"];
  const [current, setCurrent] = useState("Products");
 
  return (
    <>
      <div className={classes.liaderadmin} style={{ left: 0, width: '100%', position: 'absolute', display: show ? 'block' : 'none', zIndex: 3}}>
        <ProgressLoad
          percent={FetchProgres}
        />
      </div>
      <Compass
        admin={admin}
        pages={pages}
        current={current}
        products={products}
        orders={orders}
        transactions={transactions}
        banners={banners}
        Navigation={Navigation}
        FreeMode={FreeMode}
        Thumbs={Thumbs}
        Pagination={Pagination}
        Autoplay={Autoplay}
        Swiper={Swiper}
        SwiperSlide={SwiperSlide}
        bags={bags}
        users={users}
        setCurrent={setCurrent}
        setOrders={setOrders}
        setBags={setBags}
        enqueueSnackbar={enqueueSnackbar}
        getError={getError}
        userInfo={userInfo}
      />
      <Products
        Tabs={Tabs}
        Tab={Tab}
        TabPanel={TabPanel}
        TabContext={TabContext}
        current={current}
        products={products}
        admin={admin}
        classes={classes}
        Navigation={Navigation}
        FreeMode={FreeMode}
        Thumbs={Thumbs}
        Pagination={Pagination}
        Autoplay={Autoplay}
        createHandler={createHandler}
        Swiper={Swiper}
        SwiperSlide={SwiperSlide}
        setFetchProgres={setFetchProgres}
        setShow={setShow}
        setProducts={setProducts}
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        search={search}
        filteredData={filteredData}
        debounce={debounce}
        filterData={filterData}
        setSearch={setSearch}
      />
      <Orders
        admin={admin}
        orders={orders}
        Tabs={Tabs}
        Tab={Tab}
        TabPanel={TabPanel}
        TabContext={TabContext}
        current={current}
        userInfo={userInfo}
        classes={classes}
      />
      <Bags
        admin={admin}
        bags={bags}
        Tabs={Tabs}
        Tab={Tab}
        TabPanel={TabPanel}
        TabContext={TabContext}
        current={current}
        userInfo={userInfo}
        classes={classes}
        fetchBags={fetchBags}
      />
      <Transactions
        admin={admin}
        transactions={transactions}
        Tabs={Tabs}
        Tab={Tab}
        TabPanel={TabPanel}
        TabContext={TabContext}
        current={current}
        userInfo={userInfo}
        classes={classes}
      />
      <Banners
        Tabs={Tabs}
        Tab={Tab}
        TabPanel={TabPanel}
        TabContext={TabContext}
        current={current}
        banners={banners}
        admin={admin}
        setBanners={setBanners}
        classes={classes}
        Navigation={Navigation}
        FreeMode={FreeMode}
        Thumbs={Thumbs}
        Pagination={Pagination}
        Autoplay={Autoplay}
        Swiper={Swiper}
        SwiperSlide={SwiperSlide}
        setFetchProgres={setFetchProgres}
        setShow={setShow}
      />
      <Users
        admin={admin}
        users={users}
        Tabs={Tabs}
        Tab={Tab}
        TabPanel={TabPanel}
        TabContext={TabContext}
        current={current}
        userInfo={userInfo}
        classes={classes}
        orders={orders}
        bags={bags}
      />
    </>
  );
}