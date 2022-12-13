import React, { useContext } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Head from 'next/head';
import HeadsetMicRounded from '@mui/icons-material/HeadsetMicRounded';
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
  Switch,
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
  ListItemText,
  InputBase,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
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
import { getError } from '../utils/error';
import Cookies from 'js-cookie';
import Tabs from "@mui/material/Tabs"; 
import Tab from "@mui/material/Tab";
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import { useStateContext } from '../utils/StateContext';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import ProductNocart from './ProductNocart'; 
import { useEffect } from 'react';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasketOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import FooterDocs from './FooterDocs';

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { openinfos, setOpeninfos, handleOpeninfosReturn, handleOpeninfos, handleOpeninfosShipping, handleOpeninfosHelp, handleCloseinfos, searchClick, setSearchClick, searchBtn, setSearchBtn, handleClickSearchf, handleSearchBtn, sidbarVisible, setSidebarVisible, sidebarOpenHandler, sidebarCloseHandler, handleAppbar, categ, setCateg } = useStateContext();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;
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

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const { enqueueSnackbar } = useSnackbar();

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
      fData = [...products.filter((product) => product.description.toLowerCase().indexOf(search) != -1)];
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

  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };
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
        <link rel="icon" href="/shiglama.png" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"></link>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar className={classes.toolbar}>
            <Box className="flex" alignItems="center">
              <div >
                <IconButton
                  edge="start"
                  aria-label="open drawer"
                  onClick={sidebarOpenHandler}
                  className={classes.menuButton}
                >
                  <MenuIcon className={classes.navbarButton} />
                </IconButton>
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
                    <Tab value="Earrings" style={{margin: '20px'}} classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic }} label="Nose & Earrings" iconPosition="start" icon={<div><Image width={30}  height={30} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/b_auto,c_pad,g_center,h_500,w_500/v1666792827/0e8156a292b6b2fc8b3dcce2ee243da1_ed3fmn.jpg"/></div>}/>} />
                    <Tab value="Anclets" style={{ margin: '0 20px 20px 20px'}} classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic}} label="Anclets" iconPosition="start" icon={<div><Image  width={50} height={50} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/b_auto,c_pad,g_north,h_500,q_100,w_500/v1666790299/1602473757eaefd843bc60307bfcdbfde68a678269_thumbnail_600x_ba2xc4.webp"/></div>} />
                    <Tab value="Finger rings" style={{ margin: '0 20px 20px 20px'}} classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic }} label="Finger rings" iconPosition="start" icon={<div><Image width={50} className="bg-gray-100" alt=""  height={50} src="https://res.cloudinary.com/dddx5qpji/image/upload/v1666787251/a0265d90-0416-40a6-9f3d-d0f2086da42b1632576872688ShiningDivaSetof9GoldPlatedStylishRings7_n1ngnt.webp"/></div>}/>} />
                    <Tab value="Waist beads" style={{ margin: '0 20px 20px 20px'}} classes={{ root: classes.wrapperCateg, iconWrapper: classes.categPic }} label="Waist beads" iconPosition="start" icon={<div><Image width={50} className="bg-gray-100" alt="" height={50} src="https://res.cloudinary.com/dddx5qpji/image/upload/c_crop,g_center,h_900,q_200,w_1300/v1666793858/1637744539a70818f7474c4c88e068910c1d310fc0_xrkmyx.webp"/></div>}/>} />
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
                  <Link href="https://wa.me/254770097070?text=Hello,%20I'm%20Jane.I'd%20like%20your%20help%20...." >
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
              <Switch
              className="invisible"
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch> 
              <div >
                <Typography className={classes.cartnsch} component="span"><SearchIcon onClick={handleSearchBtn} sx={{ color: 'white'}} className={searchBtn ? classes.sizeLg : classes.ndicatenone}/></Typography>
              </div>
              <NextLink href="/cart" passHref>
                <Link>
                  <Typography className={classes.carton} component="span">
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        classes={{ badge: classes.badge }}
                        badgeContent={cart.cartItems.length}
                      >
                          <Image alt="" width={25} height={25} src="https://res.cloudinary.com/dddx5qpji/image/upload/v1670519277/rebajas-de-navidad-logotipo-con-gorro-papa-noel-en-bolsa-de-la-compra-con-lineas-en-color-rojo-400-234428440-removebg-preview-removebg-preview_2_rvuqqi.png"></Image>
                      </Badge>
                    ) : (
                        <Image alt="" width={25} height={25} src="https://res.cloudinary.com/dddx5qpji/image/upload/v1670519277/rebajas-de-navidad-logotipo-con-gorro-papa-noel-en-bolsa-de-la-compra-con-lineas-en-color-rojo-400-234428440-removebg-preview-removebg-preview_2_rvuqqi.png"></Image>
                    )}
                  </Typography>
                </Link>
              </NextLink>
              {userInfo ? (
                <div className={classes.cartnlg}>
                <>

                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    className={classes.navbarButton}
                  >
                    <Badge
                        badgeContent=""
                        classes={{ badge: classes.badgel }}
                      >
                        <AccountCircle className={classes.sizeLg}/>
                      </Badge>
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
                <NextLink  href="/login" passHref>
                  <Link>
                    <Typography className={classes.cartnlgo} component="span"><AccountCircle sx={{ color: 'white'}} className={classes.sizeLg}/></Typography>
                  </Link>
                </NextLink>
 
              )}
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.smseachbg} 
             style={{position: "fixed", zIndex: 1110, top: 0, right: searchClick ? '0' : '-100vw', background: 'white',  width: "100vw", height: "100vh"}}
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
          {openinfos && <FooterDocs/>}
          <Typography style={{color: '#666',fontSize: 11, fontWeight:100, fontFamily: 'Roboto,Arial'}}>All rights reserved. shiglam ©. </Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}