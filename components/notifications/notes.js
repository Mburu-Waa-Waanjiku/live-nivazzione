import React, { useState } from 'react';
import Image from 'next/image';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import { IoNotificationsSharp, IoNotificationsOutline } from 'react-icons/io5';
import { getError } from '../../utils/error';
import Link from 'next/link';

function Notes({ viewCloseHandler, axios, classes, notification, Cookies, userInfo, dispatch, notifications }) {

	const [openNotes, setOpenNotes] = useState(false);
	const handleOpen = () => {
		setOpenNotes(true)
	}
	const handleClose = () => {
    setOpenNotes(false)
	}
  
  const updateView = async () => {
    try {
      dispatch({ type: 'FETCH_NOTIFICATIONS' });
      const { data } = await axios.post(`/api/users/${userInfo._id}/${notification._id}`);
      dispatch({ type: 'FETCH_NOTIFICATIONS_SUCCESS', payload: data });
      Cookies.set('notifications', data)
    } catch (err) {
      dispatch({ type: 'FETCH_FAVOURITES_FAIL', payload: getError(err) });
    }
  };

  const updateHundler = async () => {
  	if ( !notification.isViewed ) {
  		 await updateView();
  		 handleOpen()
  	} else {
  		handleOpen()
  	}
  }

  return (
  <>
	  <div onClick={updateHundler} style={{maxHeight: 58, overflow: 'hidden', width: '100%', padding: 10, display: !openNotes ? 'grid' : 'none', gap: 3, gridTemplateColumns: '50px 1fr'}}>
	    <div style={{width: 130, height: 'auto', display: notification.isProduct ? 'none' : 'bolck'}}>
	      <Image
	        src="https://res.cloudinary.com/dddx5qpji/image/upload/v1679409410/shopping-bags-removebg-preview_xckkh1.png"
	        width={40}
	        alt="Orders"
	        height={40}
	      />
	    </div>
	    <div style={{width: 130, height: 'auto', display: notification.isProduct ? 'block' : 'none'}} >
	      <Image
	        src="https://res.cloudinary.com/dddx5qpji/image/upload/v1679410586/2198323_oyldct.png"
	        width={40}
          className="bg-gray-100"
	        alt="Product"
	        height={40}
	      />
	    </div>
      <div style={{  borderBottom: '2px solid #ececec', height: 48, fontSize: 17, fontWeight: !notification.isViewed ? 'bold' : 400, lineHeight: 2.3}}>
        {notification.message}
      </div>
	  </div>
	  <div style={{position: "fixed", zIndex: 1310, top: 0, display: openNotes ? 'block' : 'none', background: 'white',  width: "100vw", height: "100vh"}}>
      <div className={classes.reviewTopTab} style={{zIndex: 1}}
       >
        <ArrowBackIosIcon onClick={handleClose} sx={{ float:"left",}} /> 
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
      <div style={{ display: 'grid', padding: 6 }}>
        <div className="flex justify-center">
          <div style={{ maxWidth: 700 }} className="grid gap-3 grid-cols-2 sm:grid-cols-4" >
            <div style={{ alignSelf: 'center', display: notification.isProduct ? 'block' : 'none'}} >
              <Image
                style={{borderRadius: 15}}
                width={364}
                height={484}
                alt="Promo Image"
                className="bg-gray-100"
                src={notification.product[0]?.image[0].item}
              />
            </div>
            <div style={{ alignSelf: 'center', display: notification.isProduct ? 'none' : 'block'}} >
              <Image
                width={364}
                height={484}
                alt="Orders"
                src="https://res.cloudinary.com/dddx5qpji/image/upload/v1679409410/shopping-bags-removebg-preview_xckkh1.png"
              />
            </div>
            <div className="sm:col-span-3 sm:col-start-2" style={{fontSize: 15, alignSelf: 'center'}} >
              {notification.message}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Link href={notification.isProduct ? `https://www.shiglam.com/${notification.product[0].category}/${notification.product[0].slug}` : notification.orderLink } >
            <div onClick={{viewCloseHandler}} className=" flex gap-1 justify-center" style={{ maxWidth: 700, width: '100%', fontWeight: 'bold', borderRadius: 10, boxShadow: '0 2px 5px 1px rgb(64 60 67 / 15%)', margin: 10, padding: 5, fontSize: 18}} >
              <div>
                View
              </div>
              <div style={{display: notification.isProduct ? 'block' : 'none'}}>
                Product
              </div>
              <div style={{display: !notification.isProduct ? 'block' : 'none'}}>
                Order
              </div>
            </div>
          </Link>
        </div>
      </div>
	  </div>
	</>
  )
}

export default Notes