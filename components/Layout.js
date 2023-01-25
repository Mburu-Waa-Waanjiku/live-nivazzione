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
  Menu,
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
import { AiOutlineShopping } from 'react-icons/ai';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CancelIcon from '@material-ui/icons/Cancel';
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import SearchIcon from '@material-ui/icons/Search';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStyles from '../utils/styles';
import { Store } from '../utils/Store';
import Image from 'next/image';
import Cookies from 'js-cookie';
import Tabs from "@mui/material/Tabs"; 
import Tab from "@mui/material/Tab";
import TabContext from '@mui/lab/TabContext';
import { useStateContext } from '../utils/StateContext';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ProductNocart from './ProductNocart'; 
import Cart from './mycart/Cart';
import { useEffect } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import dynamic from 'next/dynamic';
const DynamicFooterDocs = dynamic(() => import('./FooterDocs'), {
  loading: () => " ",
})
const DynamicLogger = dynamic(() => import('./Logger'), {
  loading: () => " ",
})

export default function Layout({ title, description, children, socialtitle, socialimages, socialdesc }) {
  const router = useRouter();
  const { login, openLogin, handleOpenBag, handleCartopen, openinfos, handleOpeninfosReturn, handleOpeninfos, handleOpeninfosShipping, handleOpeninfosHelp, searchClick, searchBtn, handleClickSearchf, handleSearchBtn, sidbarVisible, sidebarOpenHandler, sidebarCloseHandler, handleAppbar, categ } = useStateContext();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo, bagitems } = state;
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

  useEffect(() => {
    fetchProducts();
    filterData();
  }, [search]);

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
      <Head>
        <title>{title ? `${title} - shiglam` : 'shiglam '}</title>
        {description && <meta name="description" charset="UTF-8" content={description}></meta>}
        <meta name="google-site-verification" content="tK9s0pQ66YNPGPxWplFwgCSa8dlOmhBlJLmRr_ZLLTM" />
        {socialtitle && <meta 
          property="og:title" 
          content={socialtitle}
        />}
        {socialdesc && <meta
          property="og:description"
          content={socialdesc}
        />}
        {socialimages && <meta
          property="og:image"
          content={socialimages}
        />}
        {scdinfo && <script
          type="application/ld+json"
          dangerouslySetInnerHTML={scdinfo}
          key="product-jsonld"
        />}
        <link rel="icon" href="/shiglama.png" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"></link>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar className={classes.toolbar}>
            <Box className="flex" alignItems="center">
              <div>
                <IconButton
                  edge="start"
                  aria-label="open drawer"
                  onClick={sidebarOpenHandler}
                  className={classes.menuButton}
                >
                  <MenuIcon className={classes.navbarButton} />
                </IconButton>
              </div>
              <div className={classes.cartnlg}>
                <Button
                  onClick={handleOpenBag}
                  aria-label="open drawer"
                  className={classes.menuButton}
                > 
                  {bagitems[0]?.orderItems.length > 0 ? (
                    <Badge
                      classes={{ badge: classes.badge }}
                      badgeContent={bagitems[0]?.orderItems.length}
                     >
                      <AiOutlineShopping style={{ fontSize: 25, color: "white" }} />
                    </Badge>
                   ) : (
                    <AiOutlineShopping style={{ fontSize: 25, color: "white" }} />
                  )}
                </Button>
              </div>
              <NextLink href="/" passHref>
                <Link>
                  <Typography className={classes.brand}>shiglam</Typography>
                </Link>
              </NextLink>
            </Box>
            <Drawer
              anchor="left"
              open={sidbarVisible}
              onClose={sidebarCloseHandler}
            >
              <List>
                <ListItem>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography>Shopping by category</Typography>
                    <IconButton
                      sx={{"&.MuiIconButton-root": {padding:0},}}
                      aria-label="close"
                      onClick={sidebarCloseHandler}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                <Divider light />
                <TabContext value={categ}>
                  <Tabs value={categ} classes={{ indicator:classes.ndicatenone, scroller: classes.categRut}} sx={{ "& .MuiTab-root.Mui-selected": {color:"black", },"& .MuiButtonBase-root": {textTransform: "none", minInlineSize: "max-content" }, }} fullWidth onChange={handleAppbar} variant="scrollable" orientation="vertical"  >
                    <Tab onClick={sidebarCloseHandler} value="Piercings" style={{margin: '20px'}} classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic }} label="Piercing" iconPosition="start" icon={<div><Image width={30}  height={30} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/b_auto,c_pad,g_center,h_500,w_500/v1666792827/0e8156a292b6b2fc8b3dcce2ee243da1_ed3fmn.jpg"/></div>}/>} />
                    <Tab value="Jewelry" style={{ margin: '0 20px 20px 20px'}} classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic}} label="Jewelry" iconPosition="start" icon={<div><Image  width={50} height={50} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/c_thumb,w_200,g_face/v1673000081/offerbanner1_5_upiwk4.jpg"/></div>} />
                    <Tab value="Glam" style={{ margin: '0 20px 20px 20px'}} classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic }} label="Glam" iconPosition="start" icon={<div><Image width={50}  height={50} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/b_auto,c_pad,h_50,q_100,w_50/v1666796089/images_ovntvt.jpg"/></div>}/>} /> 
                  </Tabs>
                </TabContext>
              </List>
              <div className="absolute flex bottom-0 w-full" style={{borderTop: '1px solid rgba(0, 0, 0, 0.08)'}}>
                <div className="flex justify-evenly p-4 grow">
                  <a href="tel:0770097070">
                    <div className="flex grow justify-center">
                      <HeadsetMicRounded style={{marginRight:10}}/>
                    </div>
                  </a>
                  <Link href="https://wa.me/254770097070?text=Hello%20SHIGLAM,%20I'm%20Jane.I%20...." >
                    <div className="flex grow justify-center">
                      <i style={{color:"black", marginRight:10, fontSize:"25px", }} className="fa fa-whatsapp whatsapp-icon"></i>
                    </div>
                  </Link>
                </div>
              </div>
            </Drawer>
            <NextLink href="/" passHref>
                <Link>
                  <Typography className={classes.smbrand}>shiglam</Typography>
                </Link>
            </NextLink>  
            <div className=" flex justify-center">
              <div>
                <Typography className={classes.cartnsch} component="span"><SearchIcon onClick={handleSearchBtn} sx={{ color: 'white'}} className={searchBtn ? classes.sizeLg : classes.ndicatenone}/></Typography>
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
                        <AiOutlineShoppingCart style={{ fontSize: 22, color: "white"}} />
                      </Badge>
                    ) : (
                        <AiOutlineShoppingCart style={{ fontSize: 22, color: "white"}} />
                    )}
                  </Typography>
                </Button>
              </div>
              {userInfo ? (
                <div className={classes.cartnlg}>
                <>

                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    className={classes.navbarButton}
                  >
                    <b style={{ width: 24, height:24, lineHeight: 0.2, borderRadius: 50, color: "white"}} className="themecolor p-4 "><a style={{left: "-14px", position: "relative"}}>{userInfo.name.slice(0,1)}</a></b>
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/me')}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, '/order-history')
                      }
                    >
                      Order Hisotry
                    </MenuItem>
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, '/admin/dashboard')
                        }
                      >
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
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
        <div className={classes.smseachbg} 
             style={{position: "fixed", zIndex: 1210, top: 0, left: searchClick ? '0' : '120vw', background: 'white',  width: "100vw", height: "100vh"}}
          >
          <div className={classes.reviewTopTab}>
            <ArrowBackIosIcon onClick={handleClickSearchf} sx={{fontSize:10, float:"left",}} /> Search
          </div>
          <div className={classes.smseach} style={{top: '50px', padding: 40}}>
            <div className={classes.searchSection}>
                <InputBase
                  classes={{ input: classes.inpttxt,}}
                  className={classes.searchInput}
                  placeholder="Search..."
                  onChange={(e) => debounce((v) => {
                    setSearch(v);
                    }, 10)(e.target.value)}
                />
                <IconButton
                  type="submit"
                  sx={{"&.MuiIconButton-root": {padding:0},}}
                  className={classes.iconButton}
                  aria-label="search"
                 >
                  <SearchIcon />
                </IconButton>
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
        <footer className={classes.footer}>
          <div className={classes.smbrandh}>
            <ListItem onClick={handleOpeninfos} style={{justifyContent: 'space-between', padding: '10px 30px'}}>
              <Typography style={{fontWeight: 'bolder', fontSize: 14}}>About shiglam</Typography>
              <Typography style={{ alignSelf: 'right'}}>
                <div className=" self-center"><ArrowForwardIosIcon style={{fontSize:15, fontWeight: 'bolder'}}/></div>
              </Typography>
            </ListItem>
            <ListItem onClick={handleOpeninfosHelp} style={{justifyContent: 'space-between', padding: '10px 30px'}}>
              <Typography style={{fontWeight: 'bolder', fontSize: 14}}>Help desk</Typography>
              <Typography style={{ alignSelf: 'right'}}>
                <div className=" self-center"><ArrowForwardIosIcon style={{fontSize:15, fontWeight: 'bolder'}}/></div>
              </Typography>
            </ListItem>
            <ListItem onClick={handleOpeninfosReturn} style={{justifyContent: 'space-between', padding: '10px 30px'}}>
              <Typography style={{fontWeight: 'bolder', fontSize: 14}}>Return policy</Typography>
              <Typography style={{ alignSelf: 'right'}}>
                <div className=" self-center"><ArrowForwardIosIcon style={{fontSize:15, fontWeight: 'bolder'}}/></div>
              </Typography>
            </ListItem>
            <ListItem onClick={handleOpeninfosShipping} style={{justifyContent: 'space-between', padding: '10px 30px 30px 30px'}}>
              <Typography style={{fontWeight: 'bolder', fontSize: 14}}>Shipping</Typography>
              <Typography style={{ alignSelf: 'right'}}>
                <div className=" self-center"><ArrowForwardIosIcon style={{fontSize:15, fontWeight: 'bolder'}}/></div>
              </Typography>
            </ListItem>
          </div>
          <div className={classes.cartnlg}>
            <div className="footerbc">
              <div>
                <div className="home-ft" style={{fontSize: 11}}>
                  Shiglam Info
                </div>
                <div className="footerdivs">
                  About Us
                </div>
                <div className="footerdivs">
                  Be our Rocking Customer
                </div>
              </div>
              <div>
                <div className="home-ft" style={{fontSize: 11}}>
                  Help Desk
                </div>
                <div className="footerdivs">
                  Shipping Info
                </div>
                <div className="footerdivs">
                  FAQ
                </div>
                <div className="footerdivs">
                  Order Tracking
                </div>
              </div>
              <div>
                <div className="home-ft" style={{fontSize: 11}}>
                  Customer Care
                </div>
                <div  className="footerdivs">
                  Contacts Info
                </div>
                <div className="footerdivs">
                  Return Policy
                </div>
              </div>
              <div>
                <div className="home-ft" style={{fontSize: 11}}>
                  Payment Method
                </div>
                <div className="home-ft" ><Image width={120} height={40} alt="Mpesa" src="https://res.cloudinary.com/dddx5qpji/image/upload/q_100/v1667278803/lipanampesa-removebg-preview_ljrcyk.png"></Image></div>
              </div>
            </div>
          </div>
          <div style={{display: 'flex', placeContent: 'center'}}>
            <div style={{display: 'flex', gap: 10, padding: '0 20px 20px 20px'}}>
              <a href=""
                className=" social">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100088268062076"
                className=" social">
                <FontAwesomeIcon icon={faFacebook}  />
              </a>
              <a href="" className=" social">
                <FontAwesomeIcon icon={faTwitter}  />
              </a>
              <a href="https://www.instagram.com/shiglam_ke/"
                className=" social">
                <FontAwesomeIcon icon={faInstagram}  />
              </a>
            </div>
          </div>
          {openinfos && <DynamicFooterDocs/>}
          <Typography style={{color: '#666',fontSize: 11, fontWeight:100, fontFamily: 'Roboto,Arial'}}>All rights reserved. shiglam ©. </Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}