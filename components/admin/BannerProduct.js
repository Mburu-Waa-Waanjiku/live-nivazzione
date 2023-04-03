import React, { useState, useContext } from 'react';
import Image from 'next/image';
import UpdateProds from './UpdateBanner';
import { useSnackbar } from 'notistack';
import { getError } from '../../utils/error';
import axios from 'axios';
import { Store } from '../../utils/Store';

function AdminProduct({ setBanners, setFetchProgres, setShow, deleteHandler, admin, banner, Navigation, FreeMode, Thumbs, Pagination, Autoplay, Swiper, SwiperSlide}) {

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const [isClicked, setIsClicked] = useState(false);
  
  const fetchBanner = async () => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      const { data } = await axios.get(`/api/admin/banners`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setBanners(data);
      await new Promise(resolve => setTimeout(resolve, 1500));        
      await setFetchProgres(79);
      await new Promise(resolve => setTimeout(resolve, 800));        
      await setFetchProgres(100);
      await new Promise(resolve => setTimeout(resolve, 200));
      setShow(false);
    } catch (err) {
      enqueueSnackbar(getError(err));
    }
  };

  return (
	<div style={{ height: 'fit-content', border: '8px solid white', boxShadow: '0 1px 2px rgba(0,0,0,.2)' }}>
	  <div style={{display: 'grid', backgroundColor: 'white', gridTemplateRows: '1fr 80px'}}>
        {banner.image.map((img) => (
            <Image
              className="bg-gray-100"
              key={img}
              src={(img)}
              width={440}
               height={200}
              alt={banner.smallText[0]}
            />
          ))
        }
        <div className="grid rows-2 px-1">
          <div className="flex justify-center">
            <div className="p-1 text-zinc-600 font-bold text-sm">
              {banner.smallText[0]}
            </div>
          </div>
          <div className="flex justify-center pt-3">
            <UpdateProds
              admin={admin}
              bannerID={banner._id}
              banner={banner}
              fetchBanner={fetchBanner}
            />
          </div>
        </div>
	  </div>
	</div>
  )
}

export default AdminProduct