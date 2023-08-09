import React, { useState, useContext } from 'react';
import Image from 'next/image';
import { CgBolt } from 'react-icons/cg';
import ShieldTwoTone from '@mui/icons-material/ShieldTwoTone';
import DeleteTwoTone from '@mui/icons-material/DeleteSweepTwoTone';
import Link from 'next/link';
import UpdateProds from './UpdateProds';
import CopyAllIcon from '@mui/icons-material/CopyAllSharp';
import copy from "copy-to-clipboard";
import { BsHeartFill } from 'react-icons/bs';
import { useSnackbar } from 'notistack';
import { getError } from '../../utils/error';
import axios from 'axios';
import { Store } from '../../utils/Store';

function AdminProduct({ setProducts, setFetchProgres, setShow, admin, product, Navigation, FreeMode, Thumbs, Pagination, Autoplay, Swiper, SwiperSlide}) {
  
  const round0 = (num) => Math.round(num * 1 + Number.EPSILON) / 1; // 123.456 => 123
  const subtract = product.prevprice - product.price;
  const percent = round0(subtract/product.prevprice * 100);
  const isProduct = true;

  const [gallery, setGallery] = useState(null);
  const [gallery1, setGallery1] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [isOnoffer, setIsOnoffer] = useState(false);
  const [isEditorsChoice, setIsEditorsChoice] = useState(false);
  const [isCollectn, setIsCollectn] = useState(false);

  const { state } = useContext(Store);
  const { userInfo } = state;

  const { enqueueSnackbar } = useSnackbar();

  const [isClicked, setIsClicked] = useState(false);
  const mylink = product.slug;
  const copyToClipboard = async () => {
    copy(mylink);
    setIsClicked(true);
    await new Promise(resolve => setTimeout(resolve, 1100));        
    setIsClicked(false);
  }
  
  const deleteHandler = async () => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    try {
      await axios.delete(`/api/admin/products/${product._id}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      enqueueSnackbar('Product deleted successfully', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const fetchProducts = async () => {
    try {
      setShow(true);
      await setFetchProgres(30);
      const { data } = await axios.get(`/api/admin/products`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setProducts(data);
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
        <Swiper   
          breakpoints={{
            100: {
              slidesPerView: 1.3,
            }
          }}                  
           modules={[FreeMode, Navigation, Pagination, Autoplay, Thumbs]}
           spaceBetween={10}           
           loop={false}
           navigation= {true}
           centeredSlides={false}
           style={{ width: '100%', maxWidth: '220px' }}
        >
          {product.image.map((img) => (
            <SwiperSlide style={{borderRadius: 15, height: 'calc(100% - 5px)', overflow: 'hidden'}} key={img} >
              <Link
                href={`https://www.shiglam.com/${product.category}/${product.slug}`}
                legacyBehavior>
                <Image
                  src={img.item}
                  width={180}
                  height={240}
                  alt={product.name}
                />
              </Link>
            </SwiperSlide>
            ))
          }
        </Swiper>
        <div className="grid rows-2 px-1">
          <div className="flex justify-between">
            <div className="flex gap-1 mt-2">
              <div style={{ color: 'rgba(0, 0, 0, 0.7)', backgroundColor: 'rgba(209, 214, 224, 0.7)'}} className="py-1 px-2 h-fit rounded font-bold text-sm">
                P
              </div>
              <div className="p-1 text-sm text-zinc-600 font-bold">
                : ${product.price}
              </div>
            </div>
            <div className="flex gap-1 mt-2">
              <div style={{ color: 'rgba(0, 0, 0, 0.7)', backgroundColor: 'rgba(209, 214, 224, 0.7)'}} className="py-1 bg-zinc-500 px-2 h-fit rounded font-bold text-sm">
                C
              </div>
              <div className="p-1 text-zinc-600 text-sm font-bold">
                : {product.countInStock}
              </div>
            </div>
            <div className="flex gap-1 mt-2">
              <div style={{ color: 'rgba(0, 0, 0, 0.7)', backgroundColor: 'rgba(209, 214, 224, 0.7)'}} className="py-1 bg-zinc-500 px-2 h-fit rounded font-bold text-sm">
                S
              </div>
              <div className="p-1 text-zinc-600 font-bold text-sm">
                : {product.distinctCateg.length}
              </div>
            </div>
            <div className="flex gap-1 mt-2">
              <div style={{ color: 'rgba(0, 0, 0, 0.7)', backgroundColor: 'rgba(209, 214, 224, 0.7)'}} className="py-1 bg-zinc-500 px-2 h-fit rounded font-bold text-sm">
                <BsHeartFill style={{ fontSize: 15 }}/>
              </div>
              <div className="p-1 text-zinc-600 font-bold text-sm">
                : {product.favourites.length}
              </div>
            </div>
          </div>
          <div className="flex justify-between pt-3">
            <div>
              <CopyAllIcon onClick={copyToClipboard} style={{ fontSize: 26 }}/>
              {isClicked && 
                <div className="absolute flex content-center">
                  <div style={{ transform: 'translate(30px, -72px)', color: 'white', fontSize: 11, backgroundColor: 'rgb(52, 72, 197)', borderRadius: 5, padding: '4px 8px'}}>
                    Copied
                  </div>
                </div>
              }
            </div>
            {product.isOnoffer ? 
              (<div style={{position: 'relative', zIndex: 1}} className="salesticker">
                 <CgBolt style={{fontSize:16, marginBottom: 2}} />{percent}%
              </div>) : (
              <CgBolt style={{fontSize:26}} />
              )
            }
            {product.isEditorsChoice ?
              (<div>
                <ShieldTwoTone style={{ fontSize: 26, color: '#ffca18' }}/>
                <div style={{ transform: 'translate(10px, -17px)', fontSize: 15, border: '2px solid green', borderRadius: 10, width:13, height: 13, color: 'green', fontWeight: 900}}> 
                  <div style={{ transform: 'translate(1px, -6px)'}}> 🗸 </div>
                </div>
              </div>) : (
              <ShieldTwoTone style={{ fontSize: 26}}/>
              )
            }
            <UpdateProds
              admin={admin}
              product={product}
              fetchProducts={fetchProducts}
              isProduct={isProduct}
              gallery={gallery}
              setGallery={setGallery}
              gallery1={gallery1}
              setGallery1={setGallery1}
              image1={image1}
              setImage1={setImage1}
              image2={image2}
              setImage2={setImage2}
              image3={image3}
              setImage3={setImage3}
              isOnoffer={isOnoffer}
              setIsOnoffer={setIsOnoffer}
              isEditorsChoice={isEditorsChoice}
              setIsEditorsChoice={setIsEditorsChoice}
              isCollectn={isCollectn}
              setIsCollectn={setIsCollectn}
            />
            <DeleteTwoTone onClick={() => {deleteHandler(product._id); fetchProducts();}} style={{ color: 'rgba(220, 38, 38)', fontSize: 26 }}/>
          </div>
        </div>
	  </div>
	</div>
  );
}

export default AdminProduct