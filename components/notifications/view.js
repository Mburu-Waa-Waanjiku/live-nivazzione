import axios from 'axios'; 
import dynamic from 'next/dynamic';
import useStyles from '../../utils/styles';
import { useStateContext } from '../../utils/StateContext';
import React, { useContext } from 'react';
import { Store } from '../../utils/Store';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import Notes from './notes';
import Loader from '../Loader';
import Cookies from 'js-cookie';

function View() {
  const { state, dispatch } = useContext(Store);
  const classes = useStyles();
  const { userInfo, notifications, loading } = state;
  const { view, viewCloseHandler } = useStateContext();
  const sortedNotes = notifications;
  
  return (
    <div className={"darklucent flex transition-all duration-1000 "} style={{position: "fixed", zIndex: 1310, top: 0, left: view ? '0' : '120vw', width: "100vw", height: "100vh"}}>
      <div onClick={viewCloseHandler} className='flex-grow h-full'></div>
      <div style={{ minWidth: '384px'}} className='w-full max-w-sm bg-white float-right'>
        <div className={classes.reviewTopTab + " px-4 pt-4 pb-2"} style={{zIndex: 1}}>
          <ArrowBackIosIcon onClick={viewCloseHandler} sx={{ float:"left",}} /> 
          <div style={{maxHeight: 27}} className="flex justify-center">
            <div className='title-font' >
              NOTIFICATIONS
            </div> 
          </div>
        </div>
        <div style={{top: 0, overflowY: "auto", height:"92%", overflowX: "hidden"}} className=" relative">
          {loading && 
            <div className='flex justify-center w-full'>
              <Loader/>
            </div>
          }
          {sortedNotes?.map((notification, index) =>( 
            <Notes
              key={index}
              notification = {notification}
              classes={classes}
              dispatch = {dispatch}
              userInfo = {userInfo}
              Cookies = {Cookies}
              notifications = {notifications}
              axios = {axios}
              viewCloseHandler= {viewCloseHandler}
            />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(View), { ssr: false });
