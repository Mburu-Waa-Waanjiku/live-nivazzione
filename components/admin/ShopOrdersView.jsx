import dynamic from 'next/dynamic';
import useStyles from '../../utils/styles';
import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import CartItems from '../galleryComponents/CartItems';
import { HiOutlineArrowRight } from 'react-icons/hi';

function ShopOrdersView({orders, shop}) {

  const [Editor, setEditor] = useState(false);
  const classes = useStyles();

  return (
    <>
      {!Editor ? 
        <div onClick={() => setEditor(true)} className='w-full flex justify-center items-center h-full'>
          <div className='w-12 h-12 bg-grayb flex justify-center items-center rounded-full text-white'>
            <HiOutlineArrowRight/>
          </div>
        </div> :
        <div className={"transition-all duration-1000 "}
          style={{position: "fixed", zIndex: 1210, top: 0, left: Editor ? '0' : '120vw', background: 'white',  width: "100vw", height: "100vh"}}
        >
          <div className={classes.reviewTopTab + " px-4 pt-4 pb-2"} style={{zIndex: 1}}>
            <ArrowBackIosIcon onClick={() => setEditor(false)} sx={{ float:"left",}} /> 
            <div style={{maxHeight: 27}} className="flex justify-center">
              <div className='title-font' >
                {shop.name} Orders
              </div> 
            </div>
          </div>
          <div style={{top: 0, overflowY: "auto", marginLeft: "10px", marginRight: 10, paddingTop: 10, paddingLeft: 6, paddingRight: 6, paddingBottom: 20, height:"92%", overflowX: "hidden"}} className=" relative">
            <div className='w-full h-full overflow-y-scroll flex justify-center overflow-x-hidden'>
              <div className={"grid h-fit place-items-center p-2 gap-3 grid-cols-1 w-full xmd:grid-cols-2 "}>
                {orders.map((order, index) => (
                  <CartItems
                    key={index}
                    item={order}
                  /> 
                ))} 
              </div>   
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default dynamic(() => Promise.resolve(ShopOrdersView), { ssr: false });
