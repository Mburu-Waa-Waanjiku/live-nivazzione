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
import { AiOutlinePlus } from 'react-icons/ai';
import ArrlessData from './ArrlessData';
import ColorsArr from './ColorsArr';
import SizesArr from './SizesArr';
import ImagesArr from './ImagesArr';
import GalleryArr from './GalleryArr';

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

function NewProds({ fetchProducts, setLive, gallery, setGallery, gallery1, setGallery1, live, Editor, setEditor, image1, setImage1, image2, setImage2, image3, setImage3 }) {
  
  const { state } = useContext(Store);
  const [category, setCategory] = useState(null);
  const Pshopdata = useForm({
    defaultValues: {
      name: '',
      subcategs: '',
      category: '',
      gender: '',
      price: '',
      brand: '',
      description: '',
      color: [{
        slug: '',
        color: '',
      }],
    }
  });
  
  const [{ loadingUpdate }, dispatch] =
  useReducer(reducer, {
    loading: true,
    error: '',
  });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyles();
  const { userInfo } = state;

  const submitHandler = async ( data) => {
    closeSnackbar();
    try {
      dispatch({ type: 'UPDATE_REQUEST' });
      await axios.put(
        `/api/admin/shopproducts`,
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
  };

	return (
		<div>{!Editor ?  
		  ( 
        <div className='sticky inset-bshadow flex gap-2 xmd:gap-4 justify-between top-10 rounded-full bshadow'>
          <div onClick={() => setLive(true)} className={' transition-all max-w-2xl float-right py-3 text-xl rounded-full '.concat(live ? 'grow text-black bg-amber-500' : 'px-6 bg-grayb text-white ')} >
            <div className={'flex justify-center transition-all '.concat(live && 'font-semibold')}>
              <div >L</div><div className={!live && 'hidden transition-all'}>ive</div>
            </div>
          </div>
          <div onClick={() => setLive(false)} className={'float-right max-w-2xl transition-all text-white py-3 text-xl rounded-full '.concat(!live ? 'grow text-black bg-amber-500' : 'px-6 bg-grayb text-white ')} >
            <div className={'flex justify-center transition-all '.concat(!live && 'font-semibold')}>
              <div>P</div><div className={live && 'hidden transition-all'}>ending</div>
            </div>
          </div>
          <div className=' float-right text-white  bg-grayb p-3 text-3xl rounded-full '>
            <AiOutlinePlus onClick={() => setEditor(true)}/>
          </div>
        </div>
      ) :
		  (<div className='p-2' style={{zIndex: 10, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignContent: 'center', position: 'fixed', top: '0px', width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.4)', left: '0px'}}>
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

export default NewProds