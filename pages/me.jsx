import React from 'react'
import Link from 'next/link';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Tabsbottom from '../components/Tabsbottom';
import Layout from '../components/Layout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';

function Me() {
	const { state } = useContext(Store);
    const {userInfo } = state;
    const classes = useStyles();
	return (
		<Layout>
        <div className="margintopFix">
        <div className={classes.mideaSmallBannerResp}>
            <div>
                <div className="me-container">
                    <div className="name-profile">
                        <div className="me-common-1">
                            <AccountCircle sx={{ color: 'action.active'}} />
                        </div>
                        {userInfo ? (<div className="mb-1.5">{userInfo.name}</div>) : (<div className="mb-1.5"><Link href="/login"> Login </Link></div>)}
                        <div className="pending inline prof">
                            <Link href="/profile">
                                Edit Profile
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="me-container-1">
                <div className="me-container-1-a me-common-1">
                    <div style={{fontSize:17, fontWeight: "bold"}}>My Orders</div>
                </div>
                <div className="me-container-1-b me-common-1">
                    <Link href="/order-history">
                        <ArrowForwardIosIcon/>
                    </Link>
                </div>
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