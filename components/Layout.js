import React, { useContext } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Head from 'next/head';
import HeadsetMicRounded from '@mui/icons-material/HeadsetMicRounded';
import MyBag from './mybag/MyBag';
import NextLink from 'next/link';
import { 
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  createMuiTheme,
  ThemeProvider,
  CssBaseline,
  Badge,
  Button,
  MenuItem,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider,
  InputBase,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { BsHeartFill } from 'react-icons/bs';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CancelIcon from '@material-ui/icons/Cancel';
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../utils/styles';
import { Store } from '../utils/Store';
import Image from 'next/image';
import Cookies from 'js-cookie';
import Tabs from "@mui/material/Tabs"; 
import Tab from "@mui/material/Tab";
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { useStateContext } from '../utils/StateContext';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getError } from '../utils/error';
import axios from 'axios';
import ProductNocart from './ProductNocart'; 
import Cart from './mycart/Cart';
import Notification from './notifications/view';
import { useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import dynamic from 'next/dynamic';
import Logo from './svgs/ShiglamLogosvg';
import { IoNotificationsSharp, IoNotificationsOutline } from 'react-icons/io5';
const DynamicFooterDocs = dynamic(() => import('./FooterDocs'), {
  loading: () => " ",
})
const DynamicLogger = dynamic(() => import('./Logger'), {
  loading: () => " ",
})
import Headers from './HeadersContainer';

export default function Layout({ children }) {
  const router = useRouter();
  const { login, view, openLogin, handleOpenBag, handleCartopen, openinfos, handleOpeninfosReturn, handleOpeninfos, handleOpeninfosShipping, handleOpeninfosHelp, searchClick, searchBtn, handleClickSearchf, handleSearchBtn, sidbarVisible, sidebarOpenHandler, sidebarCloseHandler, categ, viewOpenHandler } = useStateContext();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo, bagitems, favourites, notifications } = state;
  const notesLength = [...notifications.filter((notification) => !notification.isViewed )];

  const theme = createMuiTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#242526',
      },
      secondary: {
        main: '#208080',
      },
    },
  });
  const classes = useStyles();

  const [value, setValue] = useState("Category");
  const handleChange = (event, newValue) => {
    setValue(newValue)
  };

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`/api/products`);
      setProducts(data);
    } catch (err) {
            console.log(err);   
          }
  };
  
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
    if (search) {
      fData = [...products.filter((product) => product.description.toLowerCase().indexOf(search.toLowerCase()) != -1)];
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
  
  const fetchFavs = async () => {
    try {
      dispatch({ type: 'FETCH_BAG' });
      const {data } = await axios.get(`/api/users/${userInfo._id}`);
      dispatch({ type: 'FETCH_FAVOURITES_SUCCESS', payload: data });
      Cookies.set('favourites', data);
    } catch (err) {
      dispatch({ type: 'FETCH_FAVOURITES_FAIL', payload: getError(err) });
    }
  };

  const fetchNotes = async () => {
    try {
      dispatch({ type: 'FETCH_NOTIFICATIONS' });
      const { data } = await axios.post(`/api/users/${userInfo._id}`);
      dispatch({ type: 'FETCH_NOTIFICATIONS_SUCCESS', payload: data });
      Cookies.set('notifications', data)
    } catch (err) {
      dispatch({ type: 'FETCH_FAVOURITES_FAIL', payload: getError(err) });
    }
  };

  useEffect(() => {
    fetchProducts();
    filterData();
    fetchNotes();
    fetchFavs();
  }, [search, router, userInfo]);

  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    Cookies.remove('shippinhAddress');
    Cookies.remove('paymentMethod');
    router.push('/');
  };

  return (
    <div>
      <Headers />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" style={{boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%)'}} className={classes.navbar}>
          <Toolbar className={classes.toolbar}>
            <Box className="flex" alignItems="center">
              <div>
                <IconButton
                  edge="start"
                  aria-label="open drawer"
                  onClick={sidebarOpenHandler}
                  className={classes.menuButton}
                >
                  <MenuIcon style={{color: "#222"}} className={classes.navbarButton} />
                </IconButton>
              </div>
              <div className={classes.cartnlg}>
                <Button
                  onClick={handleOpenBag}
                  aria-label="open drawer"
                  className={classes.menuButton}
                > 
                  <BsHeartFill style={{ fontSize: 25, color: "black" }} />                
                </Button>
              </div>
              <NextLink href="/" passHref>
                <Link>
                  <Typography className={classes.brand}>
                    <Logo/>
                  </Typography>
                </Link>
              </NextLink>
            </Box>
            <Drawer
              anchor="left"
              open={sidbarVisible}
              onClose={sidebarCloseHandler}
            >
              <List>
                <div className="flex justify-end">
                  <IconButton
                    style={{padding: "0px 8px"}}
                    sx={{"&.MuiIconButton-root": {padding:0},}}
                    aria-label="close"
                    onClick={sidebarCloseHandler}
                   >
                    <CancelIcon />
                  </IconButton>
                </div>
                <div className="flex justify-center">
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <b className="text-center">SHOP BY</b>
                  </Box>
                </div>
                <TabContext value={value}>
                  <Tabs classes={{root:classes.hmStyle, indicator:classes.ndicateThick }} sx={{"& .MuiTab-root.Mui-selected": {color:"black"}, position:"sticky" ,top: 45, zIndex: 15, minHeight: 40}} value={value} centered onChange={handleChange}>
                    <Tab label="Category" value="Category" />
                    <Tab label="Other" value="Other"/>
                  </Tabs>
                  <Divider light />
                  <TabPanel value="Category">
                    <Tabs value={categ} classes={{ indicator:classes.ndicatenone, scroller: classes.categRut}} sx={{ "& .MuiTab-root.Mui-selected": {color:"black", },"& .MuiButtonBase-root": {textTransform: "none", minInlineSize: "max-content" }, }} fullWidth variant="scrollable" orientation="vertical"  >
                      <Tab onClick={() => {sidebarCloseHandler(); router.push('/Earrings');}} style={{margin: '20px', padding: '10px'}} classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic }} label="EARRINGS" iconPosition="start" icon={<div><Image width={30}  height={30} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678549970/il_570xN.3254524046_9p24_2_ghkimd.jpg"/></div>}/>} />
                      <Tab onClick={() => {sidebarCloseHandler(); router.push('/Anclets');}} style={{ margin: '0 20px 20px 20px', padding: '10px'}} classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic}} label="ANCLETS" iconPosition="start" icon={<div><Image  width={50} height={50} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678549575/ancletsmin_pk4p2f.jpg"/></div>} />
                      <Tab onClick={() => {sidebarCloseHandler(); router.push('/Necklaces');}} style={{ margin: '0 20px 20px 20px', padding: '10px'}} classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic }} label="NECKLACES" iconPosition="start" icon={<div><Image width={50}  height={50} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678542559/neclacesmin_2_pzh7tr.jpg"/></div>}/>} /> 
                    </Tabs>
                  </TabPanel>
                  <TabPanel value="Other">
                    <Tabs value={categ} classes={{ indicator:classes.ndicatenone, scroller: classes.categRut}} sx={{ "& .MuiTab-root.Mui-selected": {color:"black", },"& .MuiButtonBase-root": {textTransform: "none", minInlineSize: "max-content" }, }} fullWidth variant="scrollable" orientation="vertical"  >
                      <Tab onClick={() => {sidebarCloseHandler(); router.push('/trending');}} style={{margin: '20px', padding: '10px'}} classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic }} label="HOT" iconPosition="start" icon={<div><Image width={30}  height={30} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1673000081/offerbanner1_5_upiwk4.jpg"/></div>}/>} />
                      <Tab onClick={() => {sidebarCloseHandler(); router.push('/offers');}} style={{ margin: '0 20px 20px 20px', padding: '10px'}} classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic}} label="OFFERS" iconPosition="start" icon={<div><Image  width={50} height={50} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678549482/salemin_oczx1c.png"/></div>} />
                      <Tab onClick={() => {sidebarCloseHandler(); router.push('/new-products');}} style={{ margin: '0 20px 20px 20px', padding: '10px'}} classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic }} label="NEW" iconPosition="start" icon={<div><Image width={50}  height={50} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678548104/newarrivals2_2_xtemuk.jpg"/></div>}/>} /> 
                    </Tabs>
                  </TabPanel>
                </TabContext>
              </List>
              <div className="absolute flex bottom-0 w-full" style={{borderTop: '1px solid rgba(0, 0, 0, 0.08)'}}>
                <div className="flex justify-evenly p-4 grow">
                  <a href="tel:0770097070">
                    <div className="flex grow justify-center">
                      <HeadsetMicRounded style={{marginRight:10}}/>
                    </div>
                  </a>
                  <Link href="https://wa.me/254103477957?text=Hello,%20I'm%20Jane.I'd%20like%20your%20help%20...." >
                    <div className="flex grow justify-center">
                      <i style={{color:"black", marginRight:10, fontSize:"25px", }} className="fa fa-whatsapp whatsapp-icon"></i>
                    </div>
                  </Link>
                </div>
              </div>
            </Drawer>
            <NextLink href="/" passHref>
                <Link>
                  <Typography style={{color: "#222", paddingTop: '10px'}} className={classes.smbrand}>
                    <Logo/>
                  </Typography>
                </Link>
            </NextLink>  
            <div className=" flex justify-center">
              <div>
                <Typography className={classes.cartnsch} component="span">
                  <SearchIcon onClick={handleSearchBtn} sx={{ color: '#222'}} className={searchBtn ? classes.sizeLg : classes.ndicatenone}/>
                </Typography>
              </div>
              <div className={classes.cartnlg}>
                <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={viewOpenHandler}
                    className={classes.navbarButton}
                  >
                  <Typography className={classes.carton} component="span">
                  {notesLength.length > 0 ? (
                      <Badge
                        classes={{ badge: classes.badgeLg }}
                        badgeContent={notesLength.length}
                      >
                        <IoNotificationsSharp style={{ fontSize: 24, color:' black' }}/>
                      </Badge>
                    ) : (
                      <Badge
                        classes={{ badge: classes.badgetab }}
                        badgeContent={''}
                      >
                        <IoNotificationsOutline style={{ fontSize: 24, color:' black' }}/>
                      </Badge>
                    )}
                  </Typography>
                </Button>
              </div>
              <div className={classes.cartnlg}>
                <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleCartopen}
                    className={classes.navbarButton}
                  >
                  <Typography className={classes.carton} component="span">
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        classes={{ badge: classes.badge }}
                        badgeContent={cart.cartItems.length}
                      >
                        <AiOutlineShoppingCart style={{ fontSize: 22, color: "#222"}} />
                      </Badge>
                    ) : (
                        <AiOutlineShoppingCart style={{ fontSize: 22, color: "#222"}} />
                    )}
                  </Typography>
                </Button>
              </div>
              {userInfo ? (
                <div className={classes.cartnlg}>
                  <NextLink href="https://www.shiglam.com/me" passHref>
                    <Link>
                      <Button
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={loginClickHandler}
                        className={classes.navbarButton}
                      >
                        <b style={{ width: 24, height:24, lineHeight: 0.2, borderRadius: 50, color: "white"}} className="themecolor p-4 "><a style={{left: "-14px", position: "relative"}}>{userInfo.name.slice(0,1)}</a></b>
                      </Button>
                    </Link>
                  </NextLink>
                </div>
              ) : (
                <div className={classes.cartnlg}>
                  <>
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      className={classes.navbarButton}
                     >
                      <Typography onClick={openLogin} className={classes.cartnlgo} component="span"><AccountCircle sx={{ color: 'white'}} className={classes.sizeLg}/></Typography>
                    </Button>
                  </>
                </div>
              )}
            </div>
          </Toolbar>
        </AppBar>
        {login && <DynamicLogger/>}
        {view && <Notification/> }
        <div className={classes.smseachbg} 
             style={{ position: "fixed", zIndex: 1210, top: 0, left: searchClick ? '0' : '120vw', background: 'white',  width: "100vw", height: "100vh"}}
          >
          <div className={classes.reviewTopTab}>
            <ArrowBackIosIcon onClick={handleClickSearchf} sx={{fontSize:10, float:"left", marginTop: 1.5}} />
            <div className="flex justify-center">
              <div className={classes.smseach} style={{marginLeft: "1rem", marginRight: "1rem", top: '50px', padding: "25px 4px", maxWidth: "650px", backgroundColor: "transparent", display: "flex", justifyContent: "center"}}>
                <div style={{boxShadow: "0 2px 5px 1px rgb(64 60 67 / 20%)" ,backgroundColor: "rgba(255, 255, 255, 0.7)", oveflow: "hidden", borderRadius: 50, width: "100%"}}>
                  <IconButton
                    type="submit"
                    sx={{"&.MuiIconButton-root": {padding:0},}}
                     aria-label="search"
                    >
                     <SearchIcon />
                   </IconButton>                
                  <InputBase
                    style={{width: "70%"}}
                    placeholder="Find products..."
                    onChange={(e) => debounce((v) => {
                      setSearch(v);
                      }, 10)(e.target.value)}
                  /> 
                </div>  
              </div>
            </div>
          </div>
          <Cart/>
          <MyBag/>
          <div className="flex place-content-center w-full h-full">
            <div style={{overflowX: 'auto',height: '76%', margin: 20, display: "grid", gridTemplateColumns: 'repeat(3, minmax(0px, 300px))', gap: 10, gridAutoRows: '1fr' }}>
              {filteredData.isSearch && !filteredData.resultFound && (
                <p>No results found..</p>
              )}
              {filteredData.products.map((product) => {
                return (
                  <ProductNocart
                    product={product}
                    key={product.slug}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <Container className={classes.main}>{children}</Container>
      </ThemeProvider>
    </div>
  );
}
