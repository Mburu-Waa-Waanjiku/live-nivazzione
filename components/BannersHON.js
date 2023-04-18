import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { debounce } from '../utils/helpers';
import Link from 'next/link';

function BannersHON({categs, banner, mylink, Anclets, Earrings, Necklaces }) {
    
  const [Offers, setOffers] = useState("http://localhost:3000/offers");
  const [Hot, setHot] = useState("http://localhost:3000/trending");
  const [New, setNew] = useState("http://localhost:3000/new-products");
  
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible( currentScrollPos < 40);

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible, handleScroll]);
  
  return (
      <div className="bannerwidth bannerTransformer">
        <div style={{ maxHeight: '15vh', minHeight: '10vh', overflow: 'hidden'}}>
          {New == mylink && <Image style={{visibility: visible ? 'visible' : 'hidden', transition: 'visibility .2s'}} className="bg-gray-10" width={1600} height={480} alt="New Products" src={banner[9].image[0]}></Image>}
          {Offers == mylink && <Image style={{visibility: visible ? 'visible' : 'hidden', transition: 'visibility .2s'}} className="bg-gray-100" width={1600} height={500} alt="Offers" src={banner[4].image[0]}></Image>}
          {Hot == mylink && <Image style={{visibility: visible ? 'visible' : 'hidden', transition: 'visibility .2s'}} className="bg-gray-100" width={1600} height={500} alt="Offers" src={banner[5].image[0]}></Image>}
          {Earrings == mylink && <Image style={{visibility: visible ? 'visible' : 'hidden', transition: 'visibility .2s'}} className="bg-gray-100" width={1600} height={500} alt="Offers" src={banner[6].image[0]}></Image>}          
          {Anclets == mylink && <Image style={{visibility: visible ? 'visible' : 'hidden', transition: 'visibility .2s'}} className="bg-gray-100" width={1600} height={500} alt="Offers" src={banner[7].image[0]}></Image>}          
          {Necklaces == mylink && <Image style={{visibility: visible ? 'visible' : 'hidden', transition: 'visibility .2s'}} className="bg-gray-100" width={1600} height={500} alt="Offers" src={banner[8].image[0]}></Image>}          
        </div>
        <div style={{ position: 'absolute', width: '100%', transform: 'translate(0px, -60%)', zIndex: 10, display: 'flex', justifyContent: 'center'}}>
          <div style={{ boxShadow: 'rgb(64 60 67 / 20%) 0px 2px 5px 1px', width: '90%', backgroundColor:'rgba(255, 255, 255, 0.9)', gap: 8, borderRadius: 30, padding: '5px 15px 2px 15px'}} className="flex justify-around bannerimg">
            {!categs ? <> 
            <Link href="/trending">
              <div style={{ cursor: 'pointer', scale: Hot == mylink ? '1.2' : '1', transform: Hot ? 'translate(0px, 1.4px)' : 'translate(0px, 0px)' }} >
                <div style={{overflow: 'hidden'}} >
                  <Image width={60}  height={60} className="bg-gray-100 p-2" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1673000081/offerbanner1_5_upiwk4.jpg"/>
                </div>
                <div style={{backgroundColor:'rgba(0, 0, 0, 0.1)', borderRadius: 50, fontSize: 17, transform: 'translate(0px, -108%)', color: Hot == mylink ? 'white' : 'rgba(255, 255, 255, 0.7)', fontWeight: 600, height: 60, width: 60}} className="absolute grid justify-center content-center">
                  <div> Hot </div>
                </div>
              </div>
            </Link>
            <Link href="/offers">
              <div style={{ cursor: 'pointer', scale: Offers == mylink ? '1.2' : '1', transform: Offers ? 'translate(0px, 1.4px)' : 'translate(0px, 0px)' }} >
                <div style={{borderRadius: 50}} >
                  <Image width={60}  height={60} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678547572/sale-concept-with-shopping-cart_23-2148313066_qkggk6.jpg"/>
                </div>
                <div style={{backgroundColor:'rgba(0, 0, 0, 0.1)', borderRadius: 50, fontSize: 17, transform: 'translate(0px, -108%)', color: Offers == mylink ? 'white' : 'rgba(255, 255, 255, 0.7)', fontWeight: 600, height: 60, width: 60}} className="absolute grid justify-center content-center">
                  <div> Offers </div>
                </div>
              </div>
            </Link>
            <Link href="/new-products">
              <div style={{ cursor: 'pointer', scale: New == mylink ? '1.2' : '1', transform: New ? 'translate(0px, 1.4px)' : 'translate(0px, 0px)' }} >
                <div style={{borderRadius: 50 }} >
                  <Image width={60}  height={60} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678548606/newarrivals2_i7nevv.jpg"/>
                </div>
                <div style={{backgroundColor:'rgba(0, 0, 0, 0.1)', borderRadius: 50, fontSize: 17, transform: 'translate(0px, -108%)', color: New == mylink ? 'white' : 'rgba(255, 255, 255, 0.7)', fontWeight: 600, height: 60, width: 60}} className="absolute grid justify-center content-center">
                  <div> New </div>
                </div>
              </div>
            </Link>
            </> : 
            <>
            <Link href="/Anclets">
              <div style={{ cursor: 'pointer', scale: Anclets == mylink ? '1.2' : '1', transform: Hot ? 'translate(0px, 1.4px)' : 'translate(0px, 0px)' }} >
                <div style={{overflow: 'hidden'}} >
                  <Image width={60}  height={60} className="bg-gray-100 p-2" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678549575/ancletsmin_pk4p2f.jpg"/>
                </div>
                <div style={{backgroundColor:'rgba(0, 0, 0, 0.2)', borderRadius: 50, fontSize: 15, transform: 'translate(0px, -108%)', color: Anclets == mylink ? 'white' : 'rgba(255, 255, 255, 0.7)', fontWeight: 600, height: 60, width: 60}} className="absolute grid justify-center content-center">
                  <div> Anclets </div>
                </div>
              </div>
            </Link>
            <Link href="/Earrings">
              <div style={{ cursor: 'pointer', scale: Earrings == mylink ? '1.2' : '1', transform: Offers ? 'translate(0px, 1.4px)' : 'translate(0px, 0px)' }} >
                <div style={{borderRadius: 50}} >
                  <Image width={60}  height={60} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678549970/il_570xN.3254524046_9p24_2_ghkimd.jpg"/>
                </div>
                <div style={{backgroundColor:'rgba(0, 0, 0, 0.2)', borderRadius: 50, fontSize: 15, transform: 'translate(0px, -108%)', color: Earrings == mylink ? 'white' : 'rgba(255, 255, 255, 0.7)', fontWeight: 600, height: 60, width: 60}} className="absolute grid justify-center content-center">
                  <div> Earrings </div>
                </div>
              </div>
            </Link>
            <Link href="/Necklaces">
              <div style={{ cursor: 'pointer', scale: Necklaces == mylink ? '1.2' : '1', transform: New ? 'translate(0px, 1.4px)' : 'translate(0px, 0px)' }} >
                <div style={{borderRadius: 50 }} >
                  <Image width={60}  height={60} className="bg-gray-100" alt="" src="https://res.cloudinary.com/dddx5qpji/image/upload/v1678542559/neclacesmin_2_pzh7tr.jpg"/>
                </div>
                <div style={{backgroundColor:'rgba(0, 0, 0, 0.2)', borderRadius: 50, fontSize: 15, transform: 'translate(0px, -108%)', color: Necklaces == mylink ? 'white' : 'rgba(255, 255, 255, 0.7)', fontWeight: 600, height: 60, width: 60}} className="absolute grid justify-center content-center">
                  <div> Necklaces </div>
                </div>
              </div>
            </Link>
            </>}
          </div>
        </div>
      </div>
  )
}

export default BannersHON