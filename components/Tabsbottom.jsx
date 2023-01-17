import React, { useContext } from 'react';
import {  
  Badge, 
} from '@material-ui/core';
import { Store } from '../utils/Store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStateContext } from '../utils/StateContext';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import tabsStyles from '../styles/Tabs.module.css';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from '@mui/icons-material/HomeOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import { AiOutlineShopping } from 'react-icons/ai';
import useStyles from '../utils/styles';
import { debounce } from '../utils/helpers';
import Image from 'next/image';

export default function Tabsbottom() {
  const classes = useStyles();
  const { login, setLogin, openLogin, closeLogin, bag, setBag, handleOpenBag, cartopen, setCartopen, handleCartopen, handleCartclose } = useStateContext();

  const router = useRouter();
  const { state } = useContext(Store);
  const { cart, userInfo, bagitems } = state;
  const routes = ["/", "/myBag", "/cart", "/me", "/"];
  
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
                        
            <Tab value={routes[1]} sx={{"&.MuiButtonBase-root": {minWidth:0, padding:"1px 10px"},}} onClick={handleOpenBag}  icon={bagitems[0]?.orderItems.length > 0 ? (
                      <Badge
                        classes={{ badge: classes.badgeLg }}
                        badgeContent={bagitems[0]?.orderItems.length}
                      >
                      <AiOutlineShopping style={{ fontSize: 24 }}/>
                      </Badge>
                    ) : (
                      <AiOutlineShopping style={{ fontSize: 24 }}/>
                    )}  />
            
            <Tab value={routes[2]} sx={{"&.MuiButtonBase-root": {minWidth:0, padding:"1px 10px"},}} onClick={setCartopen} icon={cart.cartItems.length > 0 ? (
                      <Badge
                        classes={{ badge: classes.badgeLg }}
                        badgeContent={cart.cartItems.length}
                      >
                      <AiOutlineShoppingCart style={{ fontSize: 24 }}/>
                      </Badge>
                    ) : (
                      <AiOutlineShoppingCart style={{ fontSize: 24 }}/>
                    )}  />
                                 
            {userInfo ? (<Tab 
                            value={routes[3]} 
                            sx={{"&.MuiButtonBase-root": {minWidth:0, padding:"1px 10px"},}} 
                            onClick={() => router.push("/me")} 
                            icon={
                              <b style={{ width: 24, height:24, lineHeight: 0.2, borderRadius: 50, color: "white"}} className="themecolor p-4 "><a style={{left: "-4px", position: "relative"}}>{userInfo.name.slice(0,1)}</a></b>
                            } />) : (<Tab value={routes[3]} sx={{"&.MuiButtonBase-root": {minWidth:0, padding:"1px 10px"},}} onClick={openLogin} icon={<PersonIcon sx={{ fontSize: 28 }} />} />) }            
            
          </Tabs>
         </div>
        </div>
  );
}
