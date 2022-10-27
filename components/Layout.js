import React, { useContext } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Head from 'next/head';
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
import CancelIcon from '@material-ui/icons/Cancel';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../utils/styles';
import { Store } from '../utils/Store';
import { getError } from '../utils/error';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useEffect } from 'react';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasketOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';


export default function Layout({ title, description, children }) {
  const router = useRouter();
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

  const [sidbarVisible, setSidebarVisible] = useState(false);
  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const [categories, setCategories] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const [query, setQuery] = useState('');
  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
  const [searchClick, setSearchClick] = useState(false);
  const [searchBtn, setSearchBtn] = useState(true);

  const handleClickSearchf = () => {
    setSearchClick(false);
    setSearchBtn(true);
  };
  const handleSearchBtn = () => {
    setSearchClick(true);
    setSearchBtn(false);
  }
  return (
    <div>
      <Head>
        <title>{title ? `${title} - NiVAZZi` : 'NiVAZZi '}</title>
        {description && <meta name="description" charset="UTF-8" content={description}></meta>}
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"></link>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar className={classes.toolbar}>
            <Box className="flex" alignItems="center">
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={sidebarOpenHandler}
                className={classes.menuButton}
              >
                <MenuIcon className={classes.navbarButton} />
              </IconButton>
              <NextLink href="/" passHref>
                <Link>
                  <Typography className={classes.brand}>NiVAZZi</Typography>
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
                {categories.map((category) => (
                  <NextLink
                    key={category}
                    href={`/search?category=${category}`}
                    passHref
                  >
                    <ListItem
                      button
                      component="a"
                      onClick={sidebarCloseHandler}
                    >
                      <ListItemText primary={category}></ListItemText>
                    </ListItem>
                  </NextLink>
                ))}
              </List>
            </Drawer>
            <NextLink href="/" passHref>
                <Link>
                  <Typography className={classes.smbrand}>NiVAZZi</Typography>
                </Link>
            </NextLink>  
            <div className=" flex justify-center">
              <Switch
              className="invisible"
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch> 
              <div>
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
                        <ShoppingBasketIcon/>
                      </Badge>
                    ) : (
                      <ShoppingBasketIcon/>
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
                        classes={{ badge: classes.badge }}
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
        <div className={classes.smseach} style={{top: searchClick ? '60px' : '0',}}>
            <ArrowBackIosIcon onClick={handleClickSearchf} sx={{fontSize:10, height:"100%",padding: "5px"}} />
            <div className={classes.searchSection}>
              <form onSubmit={submitHandler} className={classes.searchForm}>
                <InputBase
                  name="query"
                  classes={{ input: classes.inpttxt,}}
                  className={classes.searchInput}
                  placeholder="Search products"
                  onChange={queryChangeHandler}
                />
                <IconButton
                  type="submit"
                  sx={{"&.MuiIconButton-root": {padding:0},}}
                  className={classes.iconButton}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
              </form>
            </div>
        </div>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>All rights reserved. NiVAZZi ©. </Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}