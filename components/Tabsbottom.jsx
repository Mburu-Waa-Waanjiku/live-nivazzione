import React, { useContext } from 'react';
import {
  
  Badge, 
  
} from '@material-ui/core';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasketOutlined';
import tabsStyles from '../styles/Tabs.module.css';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from '@mui/icons-material/HomeOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from '../utils/styles';

export default function Tabsbottom() {
 const classes = useStyles();

  const router = useRouter();
  const { state } = useContext(Store);
  const { cart } = state;
  const routes = ["/", "/search", "/cart", "/me", "/"];
  
  const history = router.pathname;
  

  return (
    <div className="tabb">
       <div className={tabsStyles.backgcoverticalcenter}>
         
          <Tabs className={tabsStyles.bottomnav} value={history !== "/b" ? history : false} fullWidth   >
            
            <Tab value={routes[0]} onClick={() => router.push("/")} icon={<HomeIcon sx={{ fontSize: 28 }} />} />
                        
            <Tab value={routes[1]} onClick={() => router.push("/search")} icon={<SearchIcon sx={{ fontSize: 28 }} />}  />
            
            <Tab value={routes[2]} onClick={() => router.push("/cart")} icon={cart.cartItems.length > 0 ? (
                      <Badge
                        classes={{ badge: classes.badge }}
                        badgeContent={cart.cartItems.length}
                      >
                        <ShoppingBasketIcon sx={{ fontSize: 28 }} />
                      </Badge>
                    ) : (
                      <ShoppingBasketIcon sx={{ fontSize: 28 }} />
                    )}  />
                                 
            <Tab value={routes[3]} onClick={() => router.push("/me")} icon={<PersonIcon sx={{ fontSize: 28 }} />} />               
            
          </Tabs>
         </div>
        </div>
  );
}
