import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import Image from 'next/image';

export default function ImagesArr({ image1, setImage1, image2, setImage2, image3, setImage3, useFormContext, useFieldArray, useForm, TextField }) {

  const imgset1 = (e) => {
    if (e.target.value.slice(0, 1) == '/') {
      setImage1(e.target.value);
      console.log('image done')
    } else if (e.target.value.slice(0, 26) == 'https://res.cloudinary.com') {
      setImage1(e.target.value)
    } else {
      console.log('image none')
    }
  }; 
  
  const imgset2 = (e) => {
    if (e.target.value.slice(0, 1) == '/') {
      setImage2(e.target.value)
    } else if (e.target.value.slice(0, 26) == 'https://res.cloudinary.com') {
      setImage2(e.target.value)
    } else {
      console.log('none')
    }
  };

  const imgset3 = async (e) => {
    if (e.target.value.slice(0, 1) == '/') {
      setImage3(e.target.value)
    } else if (e.target.value.slice(0, 26) == 'https://res.cloudinary.com') {
      setImage3(e.target.value)
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
    name: 'image'
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
      <div className='text-2xl text-center title-font pt-4 pb-2'>Images</div>
      {fields.map((field, index) => (
        <div key={field.id} className='pb-3'>
          {image1 && index == 0 && 
            <div className='w-full h-80 relative'>
              <Image layout='fill' src={image1} alt="" objectFit='contain'/>
            </div>
          }
          {image2 && index == 1 && 
            <div className='w-full h-80 relative'>
              <Image layout='fill' src={image2} alt="" objectFit='contain'/>
            </div>
          }
          {image3 && index == 2 && 
            <div className='w-full h-80 relative'>
              <Image layout='fill' src={image3} alt="" objectFit='contain'/>
            </div>
          }
          <div  className="pt-3 pb-2 title-font text-lg" >{`Image ${index + 1}`}</div>
            <div className='pb-3'>
              <TextField
                variant="outlined"
                fullWidth
                id={`image.${index}.item`}
                {...register(`image.${index}.item`)}
                onChange={(e) => {index == 0 ? imgset1(e) : index == 1 ? imgset2(e) : imgset3(e)}}
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
            <div onClick={ () => {index > 0 && handleRemove(index)}} className='p-3 bg-grayb text-white text-2xl rounded'>
              <RiDeleteBin5Fill/>
            </div>
          </div>
        </div>
      ))}
      <div className={'flex pb-4 '.concat( fields.length == 3 ? 'hidden' : fields.length > 0 ? '' : '')}>
        <div onClick={() => { handleAppend(image)}} style={{ transform:  fields.length > 0 ? 'translateY(-60px)' : 'translateY(0px)'}} className='p-3 bg-grayb text-white text-2xl rounded'>
          <AiOutlinePlus/>
        </div>
      </div>
    </div>
  )
}
