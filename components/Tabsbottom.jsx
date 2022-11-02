import React, { useContext } from 'react';
import {
  
  Badge, 
  
} from '@material-ui/core';
import { Store } from '../utils/Store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasketOutlined';
import tabsStyles from '../styles/Tabs.module.css';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from '@mui/icons-material/HomeOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../utils/styles';
import { debounce } from '../utils/helpers';

export default function Tabsbottom() {
 const classes = useStyles();

  const router = useRouter();
  const { state } = useContext(Store);
  const { cart, userInfo } = state;
  const routes = ["/", "/search", "/cart", "/me", "/"];
  
  const history = router.pathname;
  
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
    <div className="tabb">
       <div className={tabsStyles.backgcoverticalcenter}>
         
          <Tabs className={tabsStyles.bottomnav} sx={{"& .MuiTabs-flexContainer": {justifyContent:"space-evenly"},"& .MuiTab-root.Mui-selected": {color:"black"}, bottom: visible ? '280px' : '210px',}} classes={{ indicator:classes.ndicatenone}} value={history !== "/b" ? history : false} fullWidth   >
            
            <Tab value={routes[0]} sx={{"&.MuiButtonBase-root": {minWidth:0, padding:"1px 10px"},}} onClick={() => router.push("/")} icon={<HomeIcon sx={{ fontSize: 28 }} />} />
                        
            <Tab value={routes[1]} sx={{"&.MuiButtonBase-root": {minWidth:0, padding:"1px 10px"},}} onClick={() => router.push("/search")} icon={<SearchIcon sx={{ fontSize: 28 }} />}  />
            
            <Tab value={routes[2]} sx={{"&.MuiButtonBase-root": {minWidth:0, padding:"1px 10px"},}} onClick={() => router.push("/cart")} icon={cart.cartItems.length > 0 ? (
                      <Badge
                        classes={{ badge: classes.badgeLg }}
                        badgeContent={cart.cartItems.length}
                      >
                        <ShoppingBasketIcon sx={{ fontSize: 28 }} />
                      </Badge>
                    ) : (
                      <ShoppingBasketIcon sx={{ fontSize: 28 }} />
                    )}  />
                                 
            {userInfo ? (<Tab value={routes[3]} sx={{"&.MuiButtonBase-root": {minWidth:0, padding:"1px 10px"},}} onClick={() => router.push("/me")} icon={<PersonIcon sx={{ fontSize: 28 }} />} />) : (<Tab value={routes[3]} sx={{"&.MuiButtonBase-root": {minWidth:0, padding:"1px 10px"},}} onClick={() => router.push("/login")} icon={<PersonIcon sx={{ fontSize: 28 }} />} />) }            
            
          </Tabs>
         </div>
        </div>
  );
}
