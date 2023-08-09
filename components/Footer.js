import React from 'react'
import { 
  Typography,
  ListItem,
} from '@material-ui/core';
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import dynamic from 'next/dynamic';
const DynamicFooterDocs = dynamic(() => import('./FooterDocs'), {
  loading: () => " ",
})
import useStyles from '../utils/styles';
import Image from 'next/image';
import { useStateContext } from '../utils/StateContext';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Footer() {

    const { openinfos, handleOpeninfosReturn, handleOpeninfos, handleOpeninfosShipping, handleOpeninfosHelp } = useStateContext();
    const classes = useStyles();

	return (
		<div className={classes.footer}>
      <div className={classes.smbrandh}>
        <ListItem onClick={handleOpeninfos} style={{color: 'white', justifyContent: 'space-between', padding: '10px 30px'}}>
          <Typography style={{fontWeight: 'bolder', fontSize: 14}}>About shiglam</Typography>
          <Typography style={{ alignSelf: 'right'}}>
            <div className=" self-center"><ArrowForwardIosIcon style={{fontSize:15, fontWeight: 'bolder'}}/></div>
          </Typography>
        </ListItem>
        <ListItem onClick={handleOpeninfosHelp} style={{justifyContent: 'space-between', padding: '10px 30px', color: 'white'}}>
          <Typography style={{fontWeight: 'bolder', fontSize: 14}}>Help desk</Typography>
          <Typography style={{ alignSelf: 'right'}}>
            <div className=" self-center"><ArrowForwardIosIcon style={{fontSize:15, fontWeight: 'bolder'}}/></div>
          </Typography>
        </ListItem>
        <ListItem onClick={handleOpeninfosReturn} style={{color: 'white', justifyContent: 'space-between', padding: '10px 30px'}}>
          <Typography style={{fontWeight: 'bolder', fontSize: 14}}>Return policy</Typography>
          <Typography style={{ alignSelf: 'right'}}>
            <div className=" self-center"><ArrowForwardIosIcon style={{fontSize:15, fontWeight: 'bolder'}}/></div>
          </Typography>
        </ListItem>
        <ListItem onClick={handleOpeninfosShipping} style={{color: 'white', justifyContent: 'space-between', padding: '10px 30px 30px 30px'}}>
          <Typography style={{fontWeight: 'bolder', fontSize: 14}}>Shipping</Typography>
          <Typography style={{ alignSelf: 'right'}}>
            <div className=" self-center"><ArrowForwardIosIcon style={{fontSize:15, fontWeight: 'bolder'}}/></div>
          </Typography>
        </ListItem>
      </div>
      <div className={classes.cartnlg}>
        <div className="footerbc">
          <div>
            <div className="home-ft" style={{ color: 'white', fontSize: 11}}>
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
            <div className="home-ft" style={{color: 'white', fontSize: 11}}>
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
            <div className="home-ft" style={{color: 'white', fontSize: 11}}>
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
            <div className="home-ft" style={{color: 'white', fontSize: 11}}>
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
      <Typography style={{color: 'darkgray',fontSize: 11, fontWeight:100, fontFamily: 'Roboto,Arial'}}>All rights reserved. shiglam ©. </Typography>
    </div>
	)
}

export default Footer