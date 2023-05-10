import SearchIcon from '@material-ui/icons/Search';
import React, { useContext } from 'react';
import {  
  Badge, 
} from '@material-ui/core';
import { Store } from '../utils/Store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useStateContext } from '../utils/StateContext';
import tabsStyles from '../styles/Tabs.module.css';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from '@mui/icons-material/HomeOutlined';
import PersonIcon from '@mui/icons-material/PersonOutlined';
import { BsHeartFill } from 'react-icons/bs';
import useStyles from '../utils/styles';
import { debounce } from '../utils/helpers';
import { IoNotificationsSharp, IoNotificationsOutline } from 'react-icons/io5';

export default function Tabsbottom() {
  const classes = useStyles();
  const { handleSearchBtn, openLogin, handleOpenBag , handleCartopen, viewOpenHandler } = useStateContext();

  const router = useRouter();
  const { state } = useContext(Store);
  const { cart, userInfo, bagitems, notifications } = state;
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

  const notesLength = [...notifications.filter((notification) => !notification.isViewed )];

  return (
    <div className="tabb">
       <div className={tabsStyles.backgcoverticalcenter}>
         
          <Tabs className={tabsStyles.bottomnav} sx={{"& .MuiTabs-flexContainer": {justifyContent:"space-evenly"},"& .MuiTab-root.Mui-selected": {color:"black"}, bottom: visible ? '280px' : '210px',}} classes={{ indicator:classes.ndicatenone}} value={history !== "/b" ? history : false} fullWidth   >
            
            <Tab value={routes[0]} sx={{"&.MuiButtonBase-root": {minWidth:0, padding:"1px 10px"},}} onClick={() => router.push("/")} icon={<HomeIcon sx={{ fontSize: 28 }} />} />
                        
            <Tab value={routes[2]} sx={{"&.MuiButtonBase-root": {minWidth:0, padding:"1px 10px"},}} onClick={handleSearchBtn} icon={
                <SearchIcon style={{ fontSize: 24 }}/>
              }
            />

            <Tab value={routes[1]} sx={{"&.MuiButtonBase-root": {minWidth:0, padding:"1px 10px"},}} onClick={handleOpenBag}  icon={<BsHeartFill style={{ fontSize: 23 }}/>}  />
            
            <Tab value={routes[2]} sx={{"&.MuiButtonBase-root": {minWidth:0, padding:"1px 10px"},}} onClick={viewOpenHandler} icon={notesLength.length > 0 ? (
                      <Badge
                        classes={{ badge: classes.badgeLg }}
                        badgeContent={notesLength.length}
                      >
                        <IoNotificationsSharp style={{ fontSize: 24 }}/>
                      </Badge>
                    ) : (
                      <Badge
                        classes={{ badge: classes.badgetab }}
                        badgeContent={''}
                      >
                        <IoNotificationsOutline style={{ fontSize: 24 }}/>
                      </Badge>
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
