import React from 'react';
import useStyles from '../utils/styles';
import { useStateContext } from '../utils/StateContext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import HeadsetMicRounded from '@mui/icons-material/HeadsetMicRounded';
import ShieldTwoTone from '@mui/icons-material/ShieldTwoTone';
import Image from 'next/image';
import Link from 'next/link';
import { FaTruckMoving } from 'react-icons/fa';
import { BiBox } from 'react-icons/bi';
 
function FooterDocs() {
    const { openinfos, handleCloseinfos } = useStateContext();

    const classes = useStyles();
	return (
		<div className={classes.smseachbg} 
             style={{position: "fixed", zIndex: 1110, top: 0, right: openinfos ? '0' : '-100vw', background: 'white',  width: "100vw", height: "100vh"}}
          >
          <div className={classes.reviewTopTab}>
            <ArrowBackIosIcon onClick={handleCloseinfos} sx={{fontSize:10, float:"left",}} /> SHIGLAM
          </div>

          <div className="w-full p-3" style={{overflowX: 'auto', height: '90%' }}>
            <div>
              <div className="mt-3">
                &quot; FASHON IS CONFIDENCE. WE ARE A BRAND THAT BRINGS OUT YOUR FASHON PASSION AND MAKES THE BEYOND REACH PRODUCTS AVAILABLE, AFFORDABLE AND TURNS THEM TO YOUR STYLE. WHAT DO YOU CRAVE FOR ?? &quot;
                <div style={{float: 'right', fontWeight: 600}}>— FOUNDER</div>
              </div>
              <div className="my-4 text-left text-lg font-medium"> About Us</div>
              <div style={{ textAlign: 'left', fontSize: '1rem', color: '#222222'}}>
                shiglam has been dedicated to providing unique fashion products to consumers around Kenya since November 2022. shiglam has always held women&apos;s opinions close to its core and has forged close relationships with customers passionate about fashion, aesthetics, and lifestyle.
              </div>
              <div className="footerdocs">
                Since its establishment, shiglam has been spreading influence arround Kenya, spreading merry lifestyles.
              </div>
              <div className="footerdocs">
                We work 24 hours a day, 7 days a week, and launch new products each week so you can purchase the latest models at affordable prices. We make fashion accessible and exciting, helping ladies across the Kenya possess the accessories, jewelry and makeup wardrobes of their dreams.
              </div>
            </div>
            <div>
              <div className="my-4 text-left text-lg font-medium"> Our Philosophy</div>
              <div className="footerdocs">
                Shunning traditional fashion brands, shiglam reinforced the “Super Slim” supermodel aesthetic orientation. shiglam encourages women to appreciate themselves and is convinced that each female figure is beautiful and unique. We (shiglam) aspire to help women break free from the shackles of “Body Shame” to rediscover the beauty of their figures.
              </div>
              <div className="footerdocs">
                The brand has always maintained curiosity and high standards; we dream to make different but supporting attempts. shiglam is a high-quality fashion brand, attracting consumers in pursuit of fashion and quality.
              </div>
              <div className="footerdocs">
                We work 24 hours a day, 7 days a week, and launch new products each week so you can purchase the latest models at affordable prices. We make fashion accessible and exciting, helping ladies across the Kenya possess the accessories, jewelry and makeup wardrobes of their dreams.
              </div>
            </div>
            <div>
              <div className="my-4 text-left text-lg font-medium"> OUR PROMISE</div>
              <div className="flex " id="helpDesk"><HeadsetMicRounded/> <div className="footerdocsinner">Customer Care</div></div>
              <div className="footerdocs">
                Any worries? Our 24/7 customer service is always here to help. You can easily find out our friendly customer advisor by whatsapp or phone.
              </div>  
              <div className="flex justify-evenly my-6">
                <a href="tel:0770097070">
                  <div style={{display: 'inline-flex', lineHeight: 2, borderRadius: 3, padding: '5px 20px' , background: 'rgb(34, 34, 34)', color:'white'}}>
                    <HeadsetMicRounded style={{marginRight:10}}/> Contact Us
                  </div>
                </a>
                <Link href="https://wa.me/254770097070?text=Hello,%20I'm%20Jane.I'd%20like%20your%20help%20....">
                  <div style={{display: 'inline-flex', lineHeight: 2, borderRadius: 3, padding: '5px 20px' , background: 'rgb(34, 34, 34)', color:'white'}}>
                      <i style={{color:"white", marginRight:10, fontSize:"25px", }} className="fa fa-whatsapp whatsapp-icon"></i> Whatsapp Us
                  </div>
                </Link>
              </div>         
              <div className="flex mt-2"><ShieldTwoTone/> <div className="footerdocsinner" style={{marginTop: 2}}>Secure Checkout</div></div>
              <div className="footerdocs">
                Security at its finest! All shiglam customers are guaranteed a secure online shopping experience and shop with confidence.
              </div>
              <div className="home-ft" ><Image width={120} height={40} alt="Mpesa" src="https://res.cloudinary.com/dddx5qpji/image/upload/q_100/v1667278803/lipanampesa-removebg-preview_ljrcyk.png"></Image></div>
              <div id="shipping" className="flex mt-2"><FaTruckMoving style={{fontSize:23}}/> <div className="footerdocsinner" style={{marginTop: 1, marginLeft: 12}}>Fast Delivery</div></div>
              <div className="footerdocs">
                Cooperating with <b>Pickup Mtaani</b>, a renowned logistics operators, we offer a different shipping options to fit every customer&apos;s need.
              </div>
              <div id="return" className="flex mt-2"><BiBox style={{fontSize:23}}/><div className="footerdocsinner" style={{marginTop: 1, marginLeft: 12}}>Easy Return</div></div>
              <div className="footerdocs">
                We strive to offer the best shopping experience. If you&apos;re not absolutely satisfied with your orders, we&apos;ll fix it or refund your purchase.
              </div>
              <div className="flex justify-center my-6">
                  <div style={{display: 'inline-flex', border: '1px solid gray', color: 'black', lineHeight: 1, padding: '5px 10px' }}>
                    Return policy &gt;&gt;
                  </div>
              </div>    
            </div>
          </div>
        </div>
	)
}

export default FooterDocs