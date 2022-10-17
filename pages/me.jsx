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
            <div className={classes.smseach}>
            </div>
            <div className="">
                <div className="me-container">
                    <div className="name-profile">
                        <div className="me-common-1">
                            <AccountCircle sx={{ color: 'action.active'}} />
                        </div>
                        {userInfo ? (<div>{userInfo.name}</div>) : (<Link href="/login"> Login </Link>)}
                    </div>
                </div>
            </div>
            <div className="me-container-1">
                <div className="me-container-1-a me-common-1">
                    <div>Delivery address links</div>
                </div>
                <div className="me-container-1-b me-common-1">
                    <ArrowForwardIosIcon/>
                </div>
            </div>
            <div className="me-container-3">
                <div>
                    <div className="me-wishlist"><b>WISHLIST</b></div>
                    <div className="responsive"></div>
                </div>
            </div>
            <Tabsbottom/>
		</Layout>
	)
}

export default Me 