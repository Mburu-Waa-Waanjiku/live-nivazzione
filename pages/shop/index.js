import React, { useState, useContext } from 'react';
import {
  Button,
  TextField,
} from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { getError } from '../../utils/error';
import Image from 'next/image';
import { Store } from '../../utils/Store';
import { ImBin } from 'react-icons/im';
import { useRouter } from 'next/router';

export default function Shop() {
  
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [loadinglogo, setloadinglogo] =useState(false);
  const [hidelogo, setHidelogo] = useState(false);
  const [loadingbg, setloadingbg] =useState(false);
  const [hidebg, setHidebg] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [logo, setLogo] = useState(null);
  const [createObjectURLlogo, setCreateObjectURLlogo] = useState(null);
  const [bg, setBg] = useState(null);
  const [createObjectURLBg, setCreateObjectURLBg] = useState(null);
  
  const uploadLogoToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
 
      setLogo(i);
      setCreateObjectURLlogo(URL.createObjectURL(i));
    }
  };

  const uploadBgToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
 
      setBg(i);
      setCreateObjectURLBg(URL.createObjectURL(i));
    }
  };
  
  const uploadHandler = async (e, imageField = 'images') => {
    
    const file = logo;
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    setloadinglogo(true);
    try {
      const { data } = await axios.post('/api/admin/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      setValue(imageField, data.secure_url);
      setloadinglogo(false);
      setHidelogo(true);
      enqueueSnackbar('Logo uploaded to cloud', { variant: 'success' });
    } catch (err) {
      setloadinglogo(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  const bguploadHandler = async (e, imageField = 'images') => {
    
    const file = bg;
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    setloadingbg(true);
    try {
      const { data } = await axios.post('/api/admin/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      setValue(imageField, data.secure_url);
      setloadingbg(false);
      setHidebg(true);
      enqueueSnackbar('Banner uploaded to cloud', { variant: 'success' });
    } catch (err) {
      setloadingbg(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const submitHandler = async ({
      shopName,
      logo,
      coverPhoto
    }) => {
    closeSnackbar();
    try {
    const { data } = await axios.post(
      `/api/users/${userInfo._id}/createShop`,
      {
        shopName,
        logo,
        coverPhoto,
      },
      { headers: { authorization: `Bearer ${userInfo.token}` } }
    );
    dispatch({ type: 'USER_LOGIN', payload: data });
    enqueueSnackbar('Your shop is now ready', { variant: 'success' });
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push(`shop/seller/${userInfo.shopId}`);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
    };

  return (
    <div className='bg-grayw w-full p-2'>
      <div className='bshadow title-font bg-white rounded-3xl my-2'>
        <div className='w-full text-center font-bold text-2xl pt-6 pb-3'>
          Welcome to Shops
        </div>
        <div>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className='w-full'
            >
            <div className='w-full'>
              <div className='flex justify-center'>
                <div className='w-full max-w-md my-4 bg-grayb text-center text-white text-xl text-white rounded-xl py-3'>
                  Whats your shops' name..
                </div>
              </div>
              <div className='w-full rounded-3xl bg-grayw mb-8 flex flex-col gap-2'>
                <div className='pb-2'>
                  <Controller
                    name="shopName"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="shopName"
                        label="Shop Name"
                        error={Boolean(errors.name)}
                        helperText={errors.name ? 'Name is required' : ''}
                        {...field}
                      ></TextField>
                    )}
                  >
                  </Controller>
                </div>
              </div>
              <div className='flex justify-center'>
                <div className='w-full max-w-md my-4 bg-grayb text-center text-white text-xl text-white rounded-xl py-3'>
                  Add Your Logo
                </div>
              </div>
              <div className='w-full rounded-3xl bg-grayw mb-8 flex flex-col gap-2'>
                <div className='flex p-2 justify-center '>
                  <div className='h-32 w-32 overflow-hidden rounded-3xl'>
                    {createObjectURLlogo ? 
                      <div>
                        <Image className='w-full h-full' alt="" width={200} height={200} src={createObjectURLlogo}/>
                        <ImBin style={{transform:'translate(90px, -40px)'}} className='absolute bg-white z-10 text-2xl p-1 bg- rounded-full' onClick={() => setCreateObjectURLlogo(null)}/>
                      </div> :
                      <div className='title-font w-full h-full flex justify-center items-center text-xl bg-gray-200 '> Your Logo </div>            
                    }
                  </div>
                </div>
                <div className='hidden'>
                  <Controller
                    name="logo"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        id="logo"
                        error={Boolean(errors.discount)}
                        helperText={errors.discount ? 'Discount is required' : ''}
                        {...field}
                      ></TextField>
                      )}
                  />
                </div>
                {hidelogo ? '' :createObjectURLlogo && !hidelogo ?
                  <div onClick={(e) => uploadHandler(e, 'logo')} className='p-4 bg-grayb rounded-2xl text-white text-xl teaxt-white'> 
                    {loadinglogo ? 'Uploading...' : 'Confirm'} 
                  </div> : 
                  <Button 
                    style={{marginBottom: '8px'}} 
                    variant="contained" 
                    component="label"
                    >
                    Upload File
                    <input type="file" onChange={(e) => {uploadLogoToClient(e)}} hidden
                    />
                  </Button> 
                }
              </div>
              <div className='flex justify-center'>
                <div className='w-full max-w-md my-4 bg-grayb text-center text-white text-xl text-white rounded-xl py-3'>
                  Add your Shop Banner
                </div>
              </div>
              <div className='w-full rounded-3xl bg-grayw mb-8 flex flex-col gap-2'>
                <div className='flex justify-center'>
                  <div style={{width: '250px', height: '139px'}} className='flex justify-center items-center overflow-hidden rounded-3xl'>
                    {createObjectURLBg ? 
                      <div>
                        <Image className='min-w-full h-auto' alt="" width={1000} height={563} src={createObjectURLBg}/> 
                        <ImBin style={{transform:'translate(210px, -40px)'}} className='absolute bg-white z-10 text-3xl p-1 bg- rounded-full' onClick={() => setCreateObjectURLBg(null)}/>
                      </div>:
                      <div className='title-font bg-gray-200 w-full h-full flex justify-center items-center text-xl'> Your Banner </div>
                    }
                  </div>
                </div>
                <div className='hidden'>
                  <Controller
                    name="coverPhoto"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        id="coverPhoto"
                        error={Boolean(errors.discount)}
                        helperText={errors.discount ? 'Discount is required' : ''}
                        {...field}
                      ></TextField>
                    )}
                  />
                </div>
                {hidebg ? '' :createObjectURLBg && !hidebg ?
                  <div onClick={(e) => bguploadHandler(e, 'coverPhoto')} className='p-4 bg-grayb rounded-2xl text-white text-xl teaxt-white'> 
                    {loadingbg ? 'Uploading...' : 'Confirm'} 
                  </div> : 
                  <Button style={{margin: '8px'}} variant="contained" component="label">
                    Upload File
                    <input type="file"  onChange={(e) => {uploadBgToClient(e)}} hidden
                    />
                  </Button>
                }
              </div>
              <button
                className='w-full my-4 bg-grayb text-center text-white text-xl text-white rounded-xl py-3'
                variant="contained"
                type="submit"
                fullWidth
              >
                Create Shop
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}