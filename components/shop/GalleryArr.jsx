import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import Image from 'next/image';

export default function GalleryArr({ gallery, setGallery, gallery1, setGallery1, useFormContext, useFieldArray, useForm, TextField }) {

  const imgset1 = (e) => {
    if (e.target.value.slice(0, 1) == '/') {
        setGallery(e.target.value)
    } else if (e.target.value.slice(0, 26) == 'https://res.cloudinary.com') {
        setGallery(e.target.value)
    } else {
      console.log('none')
    }
  }; 
  
  const imgset2 = (e) => {
    if (e.target.value.slice(0, 1) == '/') {
        setGallery1(e.target.value)
    } else if (e.target.value.slice(0, 26) == 'https://res.cloudinary.com') {
        setGallery1(e.target.value)
    } else {
      console.log('none')
    }
  };

  const {
    formState: { errors },
  } = useForm();

  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'gallery'
  })
  
  const handleAppend = (value) => {
    append(value);
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const image ={
    item: '',
  }

  return (
    <div>
      <div className='text-2xl text-center title-font pt-4 pb-2'>Gallery</div>
      {fields.map((field, index) => (
        <div key={field.id} className='pb-3'>
          {gallery && index == 0 && 
            <div className='w-full h-80 relative'>
              <Image layout='fill' src={gallery} alt="" objectFit='contain'/>
            </div>
          }
          {gallery1 && index == 1 && 
            <div className='w-full h-80 relative'>
              <Image layout='fill' src={gallery1} alt="" objectFit='contain'/>
            </div>
          }
          <div  className="pt-3 pb-2 title-font text-lg" >{`Gallery ${index + 1}`}</div>
            <div className='pb-3'>
              <TextField
                variant="outlined"
                fullWidth
                id={`gallery.${index}.item`}
                {...register(`gallery.${index}.item`)}
                onChange={(e) => {index == 0 ? imgset1(e) : imgset2(e)}}
                label={'Image link'}
                error={Boolean(errors.description)}
                helperText={
                  errors.description
                    ? 'Description is required'
                    : ''
                }
                {...field}
              ></TextField>
            </div>
          <div className={'flex justify-end'}>
            <div onClick={ () => {handleRemove(index)}} className='p-3 bg-grayb text-white text-2xl rounded'>
              <RiDeleteBin5Fill/>
            </div>
          </div>
        </div>
      ))}
      <div className={'flex pb-4 '.concat( fields.length == 2 ? 'hidden' : fields.length > 0 ? 'absolute' : '')}>
        <div onClick={() => { handleAppend(image)}} style={{ transform:  fields.length > 0 ? 'translateY(-60px)' : 'translateY(0px)'}} className='p-3 bg-grayb text-white text-2xl rounded'>
          <AiOutlinePlus/>
        </div>
      </div>
    </div>
  )
}
