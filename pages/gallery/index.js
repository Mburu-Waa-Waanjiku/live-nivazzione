import React, {useContext, useState, useEffect } from 'react';
import gallery from '../../styles/gallery.module.css';
import Image from 'next/image';
import Link from 'next/link';
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useStyles from '../../utils/styles';
import { 
  InputBase,
  IconButton,
  Badge,
} from '@material-ui/core';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import SearchCards from '../../components/galleryComponents/SearchCard';
import InstaCards from '../../components/galleryComponents/InstaProducts';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Store } from '../../utils/Store';
import Cart from '../../components/mycart/Cart';
import { useStateContext } from '../../utils/StateContext';
import InstaProducts from '../../models/Rcustomer';
import db from '../../utils/db'; 

function Index({ instaProducts }) {
  

  const { handleCartopen } = useStateContext();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
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

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
  };      

  return (
    <div style={{flexWrap: "wrap", height: "100vh"}} className=" flex justify-center content-center">
      <div className={gallery.Maskcontent}>
        <div className={gallery.LinkGalleryPreview.concat(" ", gallery.flexcolumn)}>
          <div style={{height: 400}}>
            <div>
              <a style={{display: "flex", justifyContent: "center"}}  className={gallery.A.concat(" ", gallery.Asm)}>
                <div className={gallery.Avatar.concat(" ", gallery.Avatarprofile)}>
                  <Image className={gallery.Avatarimg} alt="" src="/icon-512x512.png" width={70} height={50}
                  />
                </div>
              </a>
            </div>
            <div className={gallery.LinkGalleryExtras}>
              <div style={{display: 'flex', placeContent: 'center'}}>
                <div style={{display: 'flex', gap: 10}}>
                  <a href=""
                    className={ gallery.social}>
                    <FontAwesomeIcon icon={faYoutube} />
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=100088268062076"
                    className={ gallery.social}>
                    <FontAwesomeIcon icon={faFacebook}  />
                  </a>
                  <a href="" className={ gallery.social}>
                    <FontAwesomeIcon icon={faTwitter}  />
                  </a>
                  <a href="https://www.instagram.com/shiglam_ke/"
                    className={ gallery.social}>
                    <FontAwesomeIcon icon={faInstagram}  />
                  </a>
                  <a href="https://wa.me/message/E2RFFBWEGFSVN1"
                    className={ gallery.social}>
                    <FontAwesomeIcon icon={faWhatsapp}  />
                  </a>
                </div>
              </div>      
            </div>
            <div className={gallery.LinkGalleryExtras}>
              <div className={classes.smseach} style={{top: '50px', padding: "40px 4px", maxWidth: "650px", backgroundColor: "transparent", display: "flex", justifyContent: "center"}}>
                <div style={{backgroundColor: "rgba(255, 255, 255, 0.7)", oveflow: "hidden", borderRadius: 50, width: "100%"}}>
                  <IconButton
                    type="submit"
                    sx={{"&.MuiIconButton-root": {padding:0},}}
                     aria-label="search"
                    >
                     <SearchIcon />
                   </IconButton>                
                  <InputBase
                    style={{width: "70%"}}
                    placeholder="Find products..."
                    onChange={(e) => debounce((v) => {
                      setSearch(v);
                      }, 10)(e.target.value)}
                  /> 
                </div>
                <IconButton
                  type="submit"
                  sx={{"&.MuiIconButton-root": {padding:0},}}
                  aria-label="search"
                 >
                  <Badge
                    classes={{ badge: classes.badge.concat(" ", classes.transparent) }}
                    badgeContent={cart.cartItems.length}
                   >
                    <AiOutlineShoppingCart onClick={handleCartopen} style={{fontSize: "x-large", color: "white"}} />
                  </Badge>
                </IconButton>  
              </div>
            </div>
          </div>
          {filteredData.isSearch && 
            <div className="flex justify-center" style={{ marginTop: "30px", display: filteredData.isSearch ? "flex" : "none", width: "100%", height: "1000%", overflowX: "hidden", overflowY: "scroll"}} >
              <div style={{ width: "85%", height: "fit-content", backgroundColor: "rgba(255, 255, 255, 0.7)" }} >
                {filteredData.isSearch && !filteredData.resultFound && (
                  <p>No results found..</p>
                )}
                <div className="m-5 grid grid-cols-2 gap-col-4 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
                  {filteredData.products.map((product) => {
                    return (
                      <SearchCards
                        addToCartHandler={addToCartHandler}
                        product={product}
                        key={product.slug}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          }
          {!filteredData.isSearch && 
            <div style={{height: "100%", overflowX: "hidden", overflowY: "scroll"}}>
              <div className="flex justify-center content-center">
                <div className="w-full flex justify-center content-center">
                  <div className={gallery.LinkGalleryExtras}>
                    <Link href="https://www.shiglam.com">
                      <button 
                       type="button"
                       className="mb-5"
                       style={{backgroundColor: "white", fintsize: "1.5rem", borderRadius: 10, padding: "8px 40px", color: "#cabeb1"}}
                      >
                       Shiglam Home
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <InstaCards
                  instaProducts={instaProducts}
                />
              </div>
            </div>
          }  
        </div>
      </div>
      <Cart/>
    </div>
  )
}

export default index;
export async function getServerSideProps() {
  await db.connect();
  const instaProducts = await InstaProducts.find({}, '-reviews').sort({ createdAt: -1 }).lean();
  await db.disconnect();
  
  return {
    props: {
      instaProducts: instaProducts.map(db.convertDocToObj),
    },
  };
}