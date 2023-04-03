import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useEffect, useContext, useReducer, useState } from 'react';
import {
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  Button,
  ListItemText,
  TextField,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Store';
import Layout from '../../components/Layout';
import useStyles from '../../utils/styles';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { GrEdit } from 'react-icons/gr';
import Image from 'next/image';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    case 'UPLOAD_REQUEST':
      return { ...state, loadingUpload: true, errorUpload: '' };
    case 'UPLOAD_SUCCESS':
      return {
        ...state,
        loadingUpload: false,
        errorUpload: '',
      };
    case 'UPLOAD_FAIL':
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}

function UpdateProds({ admin, bannerID, banner, fetchBanner }) {
  const bannerId = bannerID;
  const { state } = useContext(Store);
  const [Editor, setEditor] = useState(false);
  const [Offers, setOffers] = useState(false);
  const [Featured, setFeatured] = useState(false);
  const [similarProds, setSimilarProds] = useState(false);
  
  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const classes = useStyles();
  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      return router.push('/login');
    } else {
      const fetchData = async () => {
        try {
          dispatch({ type: 'FETCH_REQUEST' });
          const { data } = await axios.get(`/api/admin/banners/${bannerId}`, {
            headers: { authorization: `Bearer ${userInfo.token}` },
          });
          dispatch({ type: 'FETCH_SUCCESS' });
          setValue('smallText', data.smallText);
          setValue('midText', data.midText);
          setValue('largeText1', data.largeText1);
          setValue('image', data.image);
          setValue('buttonText', data.buttonText);
          setValue('discount', data.discount);
          setValue('desc', data.desc);
        } catch (err) {
          dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
        }
      };
      fetchData();
    }
  }, [bannerId, router, setValue, userInfo]);
  const uploadHandler = async (e, imageField = 'image') => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
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
    } catch (err) {
      dispatch({ type: 'UPLOAD_FAIL', payload: getError(err) });
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
    desc,
    
  }) => {
    closeSnackbar();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/admin/banners/${bannerId}`,
        {
          smallText,
          midText,
          largeText1,
          image,
          buttonText,
          discount,
          desc,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      enqueueSnackbar('Product updated successfully', { variant: 'success' });
      setEditor(false);
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };


	return (
		<div>{!Editor ?  
		  (
        <GrEdit onClick={() => {setEditor(true);}} className={admin.pencolor} style={{ fontSize: 23, borderBottom: '1px solid', marginTop: 3 }}/>
      ) :
		  (<div style={{zIndex: 2, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', position: 'fixed', top: '0px', width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.4)', left: '0px'}}>
			<div style={{ overflow: 'hidden', width: '75%', height: '78%', backgroundColor: '#f3f4f7', borderRadius: '5px'}}>
			  <div className="flex justify-end bg-white">
			    <div onClick={() => {setEditor(false);}} style={{ cursor: 'pointer', fontSize: 19, fontWeight: 900, backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '0px 10px', borderRadius: 50}}>
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
                    {error && (
                      <Typography className={classes.error}>{error}</Typography>
                    )}
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
                          {loadingUpload && <CircularProgress />}
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
                          {loadingUpload && <CircularProgress />}
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
                          {loadingUpdate && <CircularProgress />}
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
		  </div>)}
		</div>
	)
}

export default UpdateProds