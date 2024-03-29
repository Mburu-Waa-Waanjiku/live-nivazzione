import axios from 'axios';
import React, { useContext, useReducer, useState } from 'react';
import {
  List,
  ListItem,
  CircularProgress,
  Button,
  TextField,
} from '@material-ui/core';
import { getError } from '../../utils/error';
import { Store } from '../../utils/Store';
import useStyles from '../../utils/styles';
import { Controller, useFieldArray, useFormContext, FormProvider, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import ArrlessData from '../shop/ArrlessData';
import ColorsArr from '../shop/ColorsArr';
import SizesArr from '../shop/SizesArr';
import ImagesArr from '../shop/ImagesArr';
import GalleryArr from '../shop/GalleryArr';
import { TfiWrite } from 'react-icons/tfi';
import Addasadmin from './Addasadmin';

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true, errorUpdate: '' };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false, errorUpdate: '' };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    default:
      return state;
  }
}

function UpdateProds({ isOnoffer, setIsOnoffer, isEditorsChoice, setIsEditorsChoice, isCollectn, setIsCollectn, fetchProducts, fetchPendingPs, isProduct, gallery, product, setGallery, gallery1, setGallery1, image1, setImage1, image2, setImage2, image3, setImage3 }) {
  
  const [Editor, setEditor] = useState(false);
  const { state } = useContext(Store);
  const [category, setCategory] = useState(null);
  const Pshopdata = useForm({
    defaultValues: {
      name: product.name,
      subcategs: product.subcategs,
      category: product.category,
      gender: product.gender,
      price: product.price,
      brand: product.brand,
      description: product.description,
      color: product.color,
      image: product.image,
      gallery: product.gallery,
      sizes: product.sizes,
      distinctCateg: product.distinctCateg,
      isCollectn: product.isCollectn,
      isOnoffer: product.isOnoffer,
      collectionType: product.collectionType,
      isEditorsChoice: product.isEditorsChoice
    }
  });
  
  const [{ loadingUpdate }, dispatch] =
  useReducer(reducer, {
    loading: true,
    error: '',
  });

  const imgsetter = () => {
    setEditor(true);
    setImage1(product.image[0].item);
    setImage2(product.image[1]?.item);
    setImage3(product.image[2]?.item);
    setGallery(product.gallery[0]?.item);
    setGallery1(product.gallery[1]?.item);
    setIsEditorsChoice(product.isEditorsChoice);
    setIsCollectn(product.isCollectn);
    setIsOnoffer(product.isOnoffer);

  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const { userInfo } = state;

  const submitHandler = async ( data) => {
    closeSnackbar();
    if(isProduct == true) {
        try {
          dispatch({ type: 'UPDATE_REQUEST' });
          await axios.put(
            `/api/admin/products/${product._id}`,
            data ,
            { headers: { authorization: `Bearer ${userInfo.token}` } }
          );
          dispatch({ type: 'UPDATE_SUCCESS' });
          fetchProducts();
          enqueueSnackbar('Product updated successfully', { variant: 'success' });
          setEditor(false);
        } catch (err) {
          dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
          enqueueSnackbar(getError(err), { variant: 'error' });
        }
    } else {
      try {
        dispatch({ type: 'UPDATE_REQUEST' });
        await axios.post(
          `/api/admin/products/${product._id}`,
          data ,
          { headers: { authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: 'UPDATE_SUCCESS' });
        fetchProducts();
        fetchPendingPs();
        enqueueSnackbar('Product updated successfully', { variant: 'success' });
        setEditor(false);
      } catch (err) {
        dispatch({ type: 'UPDATE_FAIL', payload: getError(err) });
        enqueueSnackbar(getError(err), { variant: 'error' });
      }
    }
  };

	return (
		<div>{!Editor ?  
		  ( 
        <div onClick={imgsetter} className='p-4 rounded-full bg-grayb text-amber-500 font-bold text-2xl  xsm:grow'>
          <div className='w-full gap-3 items-center justify-center flex'>
            <TfiWrite className='text-2xl'/>
            <div className='hidden xsm:block'>Edit</div>
          </div>
        </div>
      ) :
		  (<div className='p-2 z-50' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', position: 'fixed', top: '0px', width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.4)', left: '0px'}}>
			  <div className='rounded-3xl w-full relative bg-white max-w-xl h-full xsm:w-3/4 xsm:w-3/4' style={{ overflow: 'hidden'}}>
          <div className="flex justify-end ">
            <div className=' translate-y-3 z-10' onClick={() => {setEditor(false);}} style={{ cursor: 'pointer', fontSize: 19, fontWeight: 900, padding: '0px 10px' }}>
              x
            </div>
          </div>
          <div style={{height: 'calc(100% - 85px)', overflow: 'scroll'}}>
            <div className="h-full mt-3 px-2 pb-4 xmsm:px-6">
              <div className="text-center bg-grayb font-semibold title-font text-lg py-3 w-full rounded-full">
                <div className='text-white' >
                  Create a product
                </div>
              </div>
              <ListItem>
                <FormProvider {...Pshopdata}>
                  <form
                    onSubmit={Pshopdata.handleSubmit(submitHandler)}
                    className={classes.form}
                    >
                    <List>
                      <ImagesArr
                        image1={image1}
                        setImage1={setImage1}
                        image2={image2}
                        setImage2={setImage2}
                        image3={image3}
                        setImage3={setImage3}
                        ListItem={ListItem}
                        TextField={TextField}
                        useFieldArray={useFieldArray}
                        useForm={useForm}
                        useFormContext={useFormContext}
                      />
                      <GalleryArr
                        gallery={gallery}
                        setGallery={setGallery}
                        gallery1={gallery1}
                        setGallery1={setGallery1}
                        ListItem={ListItem}
                        TextField={TextField}
                        useFieldArray={useFieldArray}
                        useForm={useForm}
                        useFormContext={useFormContext}
                      />
                      <ArrlessData
                        Controller={Controller}
                        ListItem={ListItem}
                        TextField={TextField}
                        userInfo={userInfo}
                        useForm={useForm}
                        useFormContext={useFormContext}
                        setCategory={setCategory}
                        category={category}
                      />
                      <SizesArr
                        Controller={Controller}
                        ListItem={ListItem}
                        TextField={TextField}
                        useFieldArray={useFieldArray}
                        useForm={useForm}
                        useFormContext={useFormContext}
                        category={category}
                      />
                      <ColorsArr
                        Controller={Controller}
                        ListItem={ListItem}
                        TextField={TextField}
                        useFieldArray={useFieldArray}
                        useForm={useForm}
                        useFormContext={useFormContext}
                      />
                      <Addasadmin
                        Controller={Controller}
                        ListItem={ListItem}
                        TextField={TextField}
                        userInfo={userInfo}
                        useForm={useForm}
                        useFormContext={useFormContext}
                        setCategory={setCategory}
                        isOnoffer={isOnoffer}
                        setIsOnoffer={setIsOnoffer}
                        isEditorsChoice={isEditorsChoice}
                        setIsEditorsChoice={setIsEditorsChoice}
                        isCollectn={isCollectn}
                        setIsCollectn={setIsCollectn}
                      />
                      <ListItem>
                        <Button
                          variant="contained"
                          type="submit"
                          fullWidth
                          color="primary"
                          style={{borderRadius: 24, marginTop: '16px', padding: 12, backgroundColor: '#202020'}}
                        >
                          Update
                        </Button>
                        {loadingUpdate && <CircularProgress />}
                      </ListItem>
                    </List>
                  </form>
                </FormProvider>
              </ListItem>
            </div>
          </div>
			  </div>
		  </div>)}
		</div>
	)
}

export default UpdateProds
