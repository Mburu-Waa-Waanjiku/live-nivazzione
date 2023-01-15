import React from 'react'
import Link from 'next/link';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Tabsbottom from '../components/Tabsbottom';
import Layout from '../components/Layout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

function Me() {
	const { state, dispatch } = useContext(Store);
    const {userInfo } = state;
    const classes = useStyles();
    const router = useRouter();

    const logoutClickHandler = () => {
      dispatch({ type: 'USER_LOGOUT' });
      Cookies.remove('userInfo');
      Cookies.remove('cartItems');
      Cookies.remove('shippinhAddress');
      Cookies.remove('paymentMethod');
      router.push('/');
    };

	return (
		<Layout>
        <div className="margintopFix">
        <div className={classes.mideaSmallBannerResp}>
            <div>
                <div className="me-container">
                    <div className="name-profile">
                        <div className="me-common-1">
                          {userInfo ? (
                            <Link href="/profile">
                              <div style={{ width: 50, height:50, borderRadius: 50, backgroundColor: "black"}} className="flex justify-center">
                                <b style={{ width: 46, height:46, fontSize: 20, lineHeight: 0.7, borderRadius: 50, color: "white", marginTop: 2}} className="themecolor p-4 ">{userInfo.name.slice(0,1)}</b>
                              </div>
                            </Link>
                            ) : 
                            (<AccountCircle sx={{ color: 'action.active'}} style={{fontSize: 40}}/>) 
                          }
                        </div>
                        {userInfo ? (
                            <div className="mt-2 mb-1.5">
                              <div onClick={logoutClickHandler} className="pending inline prof">
                                Log Out
                              </div>
                            </div>) : (
                            <div className="mt-2 mb-1.5">
                              <div className="pending inline prof">
                                <Link href="/login"> 
                                  Log In 
                                </Link>
                              </div>
                            </div>
                            )
                        }
                        
                    </div>
                </div>
            </div>
            <div className="me-container-1">
                <Link href="/order-history">
                    <div>                
                        <div className="me-container-1-a me-common-1">
                            <div style={{fontSize:17, fontWeight: "bold"}}>My Orders</div>
                        </div>
                        <div className="me-container-1-b me-common-1">
                            <ArrowForwardIosIcon/>
                        </div>
                    </div>
                </Link>
                <Link href="/myBag">
                    <div>                
                        <div className="me-container-1-a me-common-1">
                            <div style={{fontSize:17, fontWeight: "bold"}}>My Bag</div>
                        </div>
                        <div className="me-container-1-b me-common-1">
                            <ArrowForwardIosIcon/>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="me-container-3">
                <div>
                    <div className="me-wishlist"><b>WISHLIST</b></div>
                    <div className="responsive"></div>
                </div>
            </div>
        </div>
        </div>
            <Tabsbottom/>
		</Layout>
	)
}

export default Me 