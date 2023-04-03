import axios from 'axios'; 
import dynamic from 'next/dynamic';
import useStyles from '../../utils/styles';
import { useStateContext } from '../../utils/StateContext';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { Store } from '../../utils/Store';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import { getError } from '../../utils/error';
import { IoNotificationsSharp, IoNotificationsOutline } from 'react-icons/io5';
import Image from 'next/image';
import Notes from './notes';
import Loader from '../Loader';
import Cookies from 'js-cookie';

function View() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const classes = useStyles();
  const { userInfo, notifications } = state;
  const { view, viewNotes,  viewCloseHandler, NotesCloseHandler, NotesOpenHandler } = useStateContext();

  const fetchNotes = async () => {
    try {
      dispatch({ type: 'FETCH_NOTIFICATIONS' });
      const { data } = await axios.post(`/api/users/${userInfo._id}`);
      dispatch({ type: 'FETCH_NOTIFICATIONS_SUCCESS', payload: data });
      Cookies.set('notifications', data)
    } catch (err) {
      dispatch({ type: 'FETCH_FAVOURITES_FAIL', payload: getError(err) });
    }
  };

  const sortedNotes = [...notifications.sort((a, b) => (a.createdAt - b.createdAt ? 1 : -1))];
  
  return (
    <div className={classes.smseachbg}
      style={{position: "fixed", zIndex: 1310, top: 0, left: view ? '0' : '120vw', background: 'white',  width: "100vw", height: "100vh"}}
     >
      <div className={classes.reviewTopTab} style={{zIndex: 1}}
       >
        <ArrowBackIosIcon onClick={viewCloseHandler} sx={{ float:"left",}} /> 
        <div style={{maxHeight: 27}} className="flex justify-center">
          <div style={{position: 'relative', top: '-10px'}}>
            <Image 
              height={45}
              width={135}
              src="https://res.cloudinary.com/dddx5qpji/image/upload/v1679399348/notifications_mfkuep.png"
            />
          </div>
          <div style={{position: "relative", height: 30}}>
            <IoNotificationsSharp style={{fontSize: 25, position: "relative", top: 0, marginLeft: 10}}/>                
          </div> 
        </div>
      </div>
      <div style={{top: 0, overflowY: "auto", height:"90%", overflowX: "hidden"}} className=" relative">
        {sortedNotes?.map((notification) =>( 
          <Notes
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
  );
}

export default dynamic(() => Promise.resolve(View), { ssr: false });
