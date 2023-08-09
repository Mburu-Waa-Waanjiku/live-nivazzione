import axios from 'axios';
import React, { useContext, useState } from 'react';
import {
  List,
  ListItem,
  Button,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Store';
import useStyles from '../../utils/styles';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';


function UpdateProds({ setBanners, setFetchProgres, setShow, setshowCreate }) {

  const { state, dispatch } = useContext(Store);
  const [loading, setloading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const { userInfo } = state;
  
  const fetchBanner = async () => {
    setShow(true);
    await setFetchProgres(30);
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
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const submitHandler = async ({
          smallText,
          midText,
          largeText1,
          image,
          buttonText,
          discount,
          desc
          
  }) => {
    closeSnackbar();
    setloading(true);
    try {
      await axios.post(
        `/api/admin/banners`,
        {
          smallText,
          midText,
          largeText1,
          image,
          buttonText,
          discount,
          desc
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
    setloading(false);
    setshowCreate(false);
    enqueueSnackbar('Product created successfully', { variant: 'success' });
    fetchBanner();
    } catch (err) {
      setloading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  
  const uploadHandler = async (e, imageField = 'images') => {
    
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    setloading(true);
    try {
      dispatch({ type: 'UPLOAD_REQUEST' });
      const { data } = await axios.post('/api/admin/upload', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: 'UPLOAD_SUCCESS' });
      setValue(imageField, data.secure_url);
      enqueueSnackbar('File uploaded successfully', { variant: 'success' });
      setloading(false);
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
      setloading(false);
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

	return (
		<div style={{zIndex: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', position: 'fixed', top: '0px', width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.4)', left: '0px'}}>
      <div style={{ overflow: 'hidden', width: '75%', height: '78%', backgroundColor: '#f3f4f7', borderRadius: '5px'}}>
        <div className="flex justify-end bg-white">
          <div onClick={() => {setshowCreate(false);}} style={{ cursor: 'pointer', fontSize: 19, fontWeight: 900, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '0px 10px', borderRadius: 50}}>
            x
          </div>
        </div>
        <div style={{borderBottom: '1px solid rgba(0, 0, 0, 0.1)', backgroundColor: 'white'}} className="text-center font-semibold text-lg">
          <div style={{transform: 'translate(0px, -8px)'}} >
            Edit 
          </div>
          </div>
          <div style={{height: 'calc(100% - 85px)', overflow: 'scroll'}}>
            <div className="h-full px-6">
              <ListItem>
                {loading && <CircularProgress></CircularProgress>}
                  </ListItem>
                  <ListItem>
                    <form
                      onSubmit={handleSubmit(submitHandler)}
                      className={classes.form}
                     >
                      <List>
                        <ListItem>
                          <Controller
                            name="smallText"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="smallText"
                                label="smallText"
                                error={Boolean(errors.smallText)}
                                helperText={errors.smallText ? 'Smalltext is required' : ''}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                    
                        <ListItem>
                          <Controller
                            name="midText"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="midText"
                                label="midText"
                                error={Boolean(errors.midText)}
                                helperText={errors.midText ? 'Mid-text is required' : ''}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="largeText1"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="largeText1"
                                label="largeText1"
                                error={Boolean(errors.largeText1)}
                                helperText={errors.largeText1 ? 'Large-Text is required' : ''}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="image"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="image"
                                label="Image"
                                error={Boolean(errors.image)}
                                helperText={errors.image ? 'Image is required' : ''}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <ListItem>
                          <Button variant="contained" component="label">
                            Upload File
                            <input type="file" onChange={uploadHandler} hidden />
                          </Button>
                          {loading && <CircularProgress />}
                        </ListItem>
                    
                        <ListItem>
                          <Controller
                            name="buttonText"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="buttonText"
                                label="buttonText"
                                error={Boolean(errors.buttonText)}
                                helperText={errors.buttonText ? 'buttonText is required' : ''}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>

                        <ListItem>
                          <Controller
                            name="discount"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="discount"
                                label="discount"
                                error={Boolean(errors.discount)}
                                helperText={errors.discount ? 'Discount is required' : ''}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <ListItem>
                          <Button variant="contained" component="label">
                            Upload File
                            <input
                              type="file"
                              onChange={(e) => uploadHandler(e, 'discount')}
                              hidden
                            />
                          </Button>
                          {loading && <CircularProgress />}
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="desc"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="desc"
                                label="desc"
                                error={Boolean(errors.desc)}
                                helperText={errors.desc ? 'Description is required' : ''}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                         <ListItem>
                          <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                            color="primary"
                          >
                            Update
                          </Button>
                          {loading && <CircularProgress />}
                        </ListItem>
                      </List>
                    </form>
                  </ListItem>
            </div>
          </div>
          <div style={{ borderRadius: '0 0 5px 5px', position: 'absolute', backgroundColor: 'white', width: '75%', height: 50, bottom: '11%', borderTop: '1px solid rgba(0, 0, 0, 0.1)'}} className="text-center font-semibold text-lg">
          <div style={{paddingTop: 5}} >
            Edit 
          </div>
          </div>
      </div>
    </div>
	)
}

export default UpdateProds