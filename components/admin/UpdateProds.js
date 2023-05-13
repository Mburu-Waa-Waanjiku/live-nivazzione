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
import { Select } from 'antd';

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

function UpdateProds({ fetchProducts, admin, product, productID}) {
  const { Option } = Select;
  const productId = productID;
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

  const fetchData = async () => {
    try {
      dispatch({ type: 'FETCH_REQUEST' });
      const { data } = await axios.get(`/api/admin/products/${productId}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: 'FETCH_SUCCESS' });
      setValue('name', data.name);
      setValue('slug', data.slug);
      setValue('price', data.price);
      setValue('prevprice', data.prevprice);          
      setIsOnoffer(data.isOnoffer);
      setValue('burgainp', data.burgainp);
      setValue('fridayp', data.fridayp);
      setIsNeww(data.isNeww);
      setIsBurgain(data.isBurgain);
      setIsEditorsChoice(data.isEditorsChoice);
      setValue('gender', data.gender);
      setValue('distinctCateg1', data.distinctCateg[0]);
      setValue('distinctCateg2', data.distinctCateg[1]);
      setValue('distinctCateg3', data.distinctCateg[2]);
      setValue('distinctCateg4', data.distinctCateg[3]);
      setValue('distinctCateg5', data.distinctCateg[4]);
      setValue('distinctCateg6', data.distinctCateg[5]);
      setValue('image0', data.image[0]?.item);
      setValue('image1', data.image[1]?.item);
      setValue('image2', data.image[2]?.item);
      setValue('gallery', data.gallery);
      setValue('featuredImage', data.featuredImage);
      setIsFeatured(data.isFeatured);
      setIsCollectn(data.isCollectn);
      setIsFridayfs(data.IsFridayfs);
      setValue('initialStock', data.initialStock);
      setValue('collectionType', data.collectionType);
      setValue('category', data.category);
      setValue('brand', data.brand);
      setValue('countInStock', data.countInStock);
      setValue('description', data.description);
    } catch (err) {
      dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
    }
  };

  useEffect(() => {
    if (!userInfo) {
      return router.push('/login');
    } else {
      fetchData();
    }
  }, [ productId, router, setValue, userInfo]);
  
  const uploadHandler = async (e, imageField = 'images') => {
    
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
          name,
          slug,
          category,
          image0,
          image1,
          image2,
          gallery,
          prevprice,
          gender,
          distinctCateg1,
          distinctCateg2,
          distinctCateg3,
          distinctCateg4,
          distinctCateg5,
          distinctCateg6,
          price,
          brand,
          initialStock,
          collectionType,
          countInStock,
          description,
          featuredImage,
          burgainp,
          fridayp,
          
  }) => {
    closeSnackbar();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      const { data } = await axios.put(
        `/api/admin/products/${productId}`,
        {
          name,
          slug,
          category,
          image0,
          image1,
          image2,
          gallery,
          prevprice,
          burgainp,
          fridayp,
          gender,
          isEditorsChoice,
          distinctCateg1,
          distinctCateg2,
          distinctCateg3,
          distinctCateg4,
          distinctCateg5,
          distinctCateg6,
          price,
          brand,
          initialStock,
          countInStock,
          collectionType,
          description,
          featuredImage,
          isFeatured,
          isNeww,
          isBurgain,
          isOnoffer,
          isCollectn,
          IsFridayfs,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: 'UPDATE_SUCCESS' });
      enqueueSnackbar('Product updated successfully', { variant: 'success' });
      setEditor(false);
      fetchProducts();
    } catch (err) {
      dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const [isFeatured, setIsFeatured] = useState(false);
  const [isOnoffer, setIsOnoffer] = useState(false);
  const [isEditorsChoice, setIsEditorsChoice] = useState(false);
  const [isNeww, setIsNeww] = useState(false);
  const [isBurgain, setIsBurgain] = useState(false);
  const [isCollectn, setIsCollectn] = useState(false);
  const [IsFridayfs, setIsFridayfs] = useState(false);


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
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="name"
                                label="Name"
                                error={Boolean(errors.name)}
                                helperText={errors.name ? 'Name is required' : ''}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="image0"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="image0"
                                label="Image1"
                                error={Boolean(errors.image)}
                                helperText={errors.image ? 'Image is required' : ''}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="image1"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="image1"
                                label="Image2"
                                error={Boolean(errors.image)}
                                helperText={errors.image ? 'Image is required' : ''}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="image2"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="image2"
                                label="Image3"
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
                            <input type="file"  onChange={uploadHandler} hidden multiple/>
                          </Button>
                          {loadingUpload && <CircularProgress />}
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="gender"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="gender"
                                label="gender"
                                error={Boolean(errors.distinct)}
                                helperText={
                                  errors.category ? 'Distinct is required' : ''
                                }
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <ListItem>
                          <FormControlLabel
                            label="Is Neww"
                            control={
                              <Checkbox
                                onClick={(e) => setIsNeww(e.target.checked)}
                                checked={isNeww}
                                name="isNeww"
                              />
                            } 
                          ></FormControlLabel>
                        </ListItem>
                        <ListItem>
                          <FormControlLabel
                            label="Is EdditorsChoice"
                            control={
                              <Checkbox
                                onClick={(e) => setIsEditorsChoice(e.target.checked)}
                                checked={isEditorsChoice}
                                name="isEditorsChoice"
                              />
                            } 
                          ></FormControlLabel>
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="slug"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="slug"
                                label="Slug"
                                error={Boolean(errors.slug)}
                                helperText={errors.slug ? 'Slug is required' : ''}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="price"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }} 
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="price"
                                label="Price or New price if Is Onoffer"
                                error={Boolean(errors.price)}
                                helperText={errors.price ? 'Price is required' : ''}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <ListItem>
                          <FormControlLabel
                            label="Is Collection"
                            control={
                              <Checkbox
                                onClick={(e) => setIsCollectn(e.target.checked)}
                                checked={isCollectn}
                                name="isCollectn"
                              />
                            } 
                          ></FormControlLabel>
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="collectionType"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="collectionType"
                                label="Collection Type"
                                error={Boolean(errors.collectionType)}
                                helperText={
                                  errors.collectionType ? 'collectionType is required' : ''
                                }
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <div className="pl-3 text-lg" >Category</div>
                        <ListItem>
                          <Controller
                            name="category"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <>
                                <Select className="w-full" defaultValue="lucy" {...field}>
                                  <Option value="Anklets">Anklets</Option>
                                  <Option value="Earrings">Earrings</Option>
                                  <Option value="Necklace" > Necklace</Option>
                                  <Option value="Collection">Collection</Option>
                                </Select>
                              </>
                            )}
                          ></Controller>
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="brand"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="brand"
                                label="Brand"
                                error={Boolean(errors.brand)}
                                helperText={errors.brand ? 'Brand is required' : ''}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="initialStock"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="initialStock"
                                label="Starting stock"
                                error={Boolean(errors.initialStock)}
                                helperText={
                                  errors.initialStock
                                    ? 'Starting stock is required'
                                    : ''
                                }
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="countInStock"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="countInStock"
                                label="Count in stock"
                                error={Boolean(errors.countInStock)}
                                helperText={
                                  errors.countInStock
                                    ? 'Count in stock is required'
                                    : ''
                                }
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                id="description"
                                label="Description"
                                error={Boolean(errors.description)}
                                helperText={
                                  errors.description
                                    ? 'Description is required'
                                    : ''
                                }
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <div className="flex justify-between p-2">
                          <div>
                            <b> OFFERS </b>
                          </div>
                          {!Offers ? 
                            <div onClick={() => {setOffers(true)}} style={{cursor: 'pointer'}}>
                              <b>+</b>
                            </div> :
                            <div onClick={() => {setOffers(false)}} style={{cursor: 'pointer'}}>
                              <b> - </b>
                            </div>
                          }
                        </div>
                        {Offers && 
                        <div className="bg-white py-3 rounded-md">
                        <ListItem>
                          <FormControlLabel
                            label="Is Onoffer"
                            control={
                              <Checkbox
                                onClick={(e) => setIsOnoffer(e.target.checked)}
                                checked={isOnoffer}
                                name="isOnoffer"
                              />
                            } 
                          ></FormControlLabel>
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="prevprice"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: false,
                            }} 
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="prevprice"
                                label="Previous price"
                                error={Boolean(errors.prevprice)}
                                helperText={errors.prevprice ? 'Previous price is required' : ''}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <ListItem>
                          <FormControlLabel
                            label="Burgain"
                            control={
                              <Checkbox
                                onClick={(e) => setIsBurgain(e.target.checked)}
                                checked={isBurgain}
                                name="isBurgain"
                              />
                            } 
                          ></FormControlLabel>
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="burgainp"
                            control={control}
                            defaultValue=""
                            
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="burgainp"
                                label="Burgain Price"
                                error={Boolean(errors.burgainp)}
                                helperText={errors.burgainp ? 'New Burgain Price is required' : ''}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <ListItem>
                          <FormControlLabel
                            label="Friday Offs"
                            control={
                              <Checkbox
                                onClick={(e) => setIsFridayfs(e.target.checked)}
                                checked={IsFridayfs}
                                name="IsFridayfs"
                              />
                            } 
                          ></FormControlLabel>
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="fridayp"
                            control={control}
                            defaultValue=""
                            
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="fridayp"
                                label="Friday offs Price"
                                error={Boolean(errors.fridayp)}
                                helperText={errors.fridayp ? 'New Friday offs Price is required' : ''}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        </div>}
                        <div className="flex justify-between p-2">
                          <div>
                            <b> FEATURED IMAGES </b>
                          </div>
                          {!Featured ? 
                            <div onClick={() => {setFeatured(true)}} style={{cursor: 'pointer'}}>
                              <b>+</b>
                            </div> :
                            <div onClick={() => {setFeatured(false)}} style={{cursor: 'pointer'}}>
                              <b> - </b>
                            </div>
                          }
                        </div>
                        {Featured && 
                        <div className="bg-white py-3 rounded-md">
                        <ListItem>
                          <Controller
                            name="gallery"
                            control={control}
                            defaultValue=""
                            
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="gallery"
                                label="gallery"
                                error={Boolean(errors.gallery)}
                                helperText={errors.gallery ? 'Gallery is required' : ''}
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
                          <FormControlLabel
                            label="Is Featured"
                            control={
                              <Checkbox
                                onClick={(e) => setIsFeatured(e.target.checked)}
                                checked={isFeatured}
                                name="isFeatured"
                              />
                            } 
                          ></FormControlLabel>
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="featuredImage"
                            control={control}
                            defaultValue=""
                            
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="featuredImage"
                                label="Featured Image"
                                error={Boolean(errors.image)}
                                helperText={
                                  errors.image ? 'Featured Image is required' : ''
                                }
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
                              onChange={(e) => uploadHandler(e, 'featuredImage')}
                              hidden
                            />
                          </Button>
                          {loadingUpload && <CircularProgress />}
                        </ListItem>
                        </div>}
                        <div className="flex justify-between p-2">
                          <div>
                            <b> SIMILAR PRODUCTS </b>
                          </div>
                          {!similarProds ? 
                            <div onClick={() => {setSimilarProds(true)}} style={{cursor: 'pointer'}}>
                              <b>+</b>
                            </div> :
                            <div onClick={() => {setSimilarProds(false)}} style={{cursor: 'pointer'}}>
                              <b> - </b>
                            </div>
                          }
                        </div>
                        {similarProds && 
                        <div className="bg-white py-3 rounded-md">
                        <ListItem>
                          <Controller
                            name="distinctCateg1"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="distinctCateg1"
                                label="Similar prod 1"
                                error={Boolean(errors.distinctCateg)}
                                helperText={
                                  errors.category ? 'Distinct Category is required' : ''
                                }
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        <ListItem>
                          <Controller
                            name="distinctCateg2"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="distinctCateg2"
                                label="Similar prod 2"
                                error={Boolean(errors.distinctCateg)}
                                helperText={
                                  errors.category ? 'Distinct Category is required' : ''
                                }
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem><ListItem>
                          <Controller
                            name="distinctCateg3"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="distinctCateg3"
                                label="Similar prod 3"
                                error={Boolean(errors.distinctCateg)}
                                helperText={
                                  errors.category ? 'Distinct Category is required' : ''
                                }
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem><ListItem>
                          <Controller
                            name="distinctCateg4"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="distinctCateg4"
                                label="Similar prod 4"
                                error={Boolean(errors.distinctCateg)}
                                helperText={
                                  errors.category ? 'Distinct Category is required' : ''
                                }
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem><ListItem>
                          <Controller
                            name="distinctCateg5"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="distinctCateg5"
                                label="Similar prod 5"
                                error={Boolean(errors.distinctCateg)}
                                helperText={
                                  errors.category ? 'Distinct Category is required' : ''
                                }
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem><ListItem>
                          <Controller
                            name="distinctCateg6"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id="distinctCateg6"
                                label="Similar prod 6"
                                error={Boolean(errors.distinctCateg)}
                                helperText={
                                  errors.category ? 'Distinct Category is required' : ''
                                }
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                        </div>}
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
