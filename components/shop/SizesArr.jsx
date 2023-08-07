import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Select } from 'antd';

export default function SizesArr({ useFormContext, useFieldArray, useForm, TextField,  Controller, }) {

  const { Option } = Select;
  const {
    formState: { errors },
  } = useForm();
  const mysizes = ['NOSIZE','XS','S','L','XL','XXL','3XL','4XL','EUR15','EUR16','EUR17','EUR18','EUR19','EUR20','EUR21','EUR22','EUR23','EUR24','EUR25','EUR26','EUR27','EUR28','EUR29','EUR30','EUR31','EUR32','EUR33','EUR34','EUR35','EUR36','EUR37','EUR38','EUR39','EUR40','EUR41','EUR42','EUR43','EUR44','EUR45','EUR46','EUR47','EUR48']

  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sizes'
  })
  
  const handleAppend = (value) => {
    append(value);
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const sizes = {
    psize: '',
    bust: '',
    shoulder: '',
    sleave: '',
    length: '',
    cuff: '',
    bicep: '',
    thigh: '',
    inseam: '',
    count: '',
  }

  return (
    <div>
      <div className='text-2xl text-center title-font pt-4 pb-1'>Size Info</div>
      {fields.map((field, index) => (
        <div className='pb-3' key={field.id}>
          <div className="pt-3 pb-2 title-font text-lg" >{`Size ${index + 1}`}</div>
          <div className='flex gap-2 xsm:gap-4 pb-2 xsm:pb-4'>
            <div className='grow'>
              <Controller
                name={`sizes.${index}.psize`}
                control={control}
                defaultValue=""
                rules={{
                  required: false,
                }}
                render={({ field }) => (
                  <Select className="w-full select-h " {...field} size='4' >
                    {mysizes.map((categ) => (
                      <Option key={categ} value={categ}>
                        {categ}
                      </Option>
                    ))}
                  </Select>
                )}
              ></Controller>
            </div>
            <div className='grow'>
              <Controller
                name={`sizes.${index}.price`}
                control={control}
                defaultValue=""
                rules={{
                  required: false,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="number"
                    multiline
                    id={`sizes.${index}.price`}
                    label="Item Price"
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
            </div>
          </div>
          <div className='flex gap-2 xsm:gap-4 pb-2 xsm:pb-4'>
            <div className='grow'>
              <Controller
                name={`sizes.${index}.count`}
                control={control}
                defaultValue=""
                rules={{
                  required: false,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    type="number"
                    fullWidth
                    multiline
                    id={`sizes.${index}.count`}
                    label="Stock Count"
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
            </div>
            <div className='grow'>
              <Controller
                name={`sizes.${index}.length`}
                control={control}
                defaultValue=""
                rules={{
                  required: false,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    multiline
                    type="number"
                    id={`sizes.${index}.length`}
                    label="Length cm"
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
            </div>
          </div>
          <div className='flex gap-2 xsm:gap-4 pb-2 xsm:pb-4'>
            <div className='grow'>
              <Controller
                name={`sizes.${index}.sleave`}
                control={control}
                defaultValue=""
                rules={{
                  required: false,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="number"
                    multiline
                    id={`sizes.${index}.sleave`}
                    label="Sleave cm"
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
            </div>
            <div className='grow'>
              <Controller
                name={`sizes.${index}.cuff`}
                control={control}
                defaultValue=""
                rules={{
                  required: false,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="number"
                    multiline
                    id={`sizes.${index}.cuff`}
                    label="Cuff cm"
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
            </div>
          </div>
          <div className='flex gap-2 xsm:gap-4 pb-2 xsm:pb-4'>
            <div className='grow'>
              <Controller
                name={`sizes.${index}.bicep`}
                control={control}
                defaultValue=""
                rules={{
                  required: false,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="number"
                    multiline
                    id={`sizes.${index}.bicep`}
                    label="Bicep cm"
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
            </div>
            <div className='grow'>
              <Controller
                name={`sizes.${index}.thigh`}
                control={control}
                defaultValue=""
                rules={{
                  required: false,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="number"
                    multiline
                    id={`sizes.${index}.thigh`}
                    label="Thigh cm"
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
            </div>
          </div>
          <div className='flex gap-2 xsm:gap-4 pb-2 xsm:pb-4'>
            <div className='grow'>
              <Controller
                name={`sizes.${index}.inseam`}
                control={control}
                defaultValue=""
                rules={{
                  required: false,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="number"
                    multiline
                    id={`sizes.${index}.inseam`}
                    label="Inseam cm"
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
            </div>
            <div className='grow'>
              <Controller
                name={`sizes.${index}.bust`}
                control={control}
                defaultValue=""
                rules={{
                  required: false,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="number"
                    multiline
                    id={`sizes.${index}.bust`}
                    label="Bust cm"
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
            </div>
          </div>
          <div className='flex gap-2 xsm:gap-4 pb-2 xsm:pb-4'>
            <div className='grow'>
              <Controller
                name={`sizes.${index}.shoulder`}
                control={control}
                defaultValue=""
                rules={{
                  required: false,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="number"
                    multiline
                    id={`sizes.${index}.shoulder`}
                    label="Shoulder cm"
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
            </div>
          </div>
          <div className='flex justify-end'>
            <div onClick={() => handleRemove(index)} className='p-3 bg-grayb text-white text-2xl rounded'>
              <RiDeleteBin5Fill/>
            </div>
          </div>
        </div>
      ))}
      <div className={'flex pb-4 '.concat(fields.length > 0 && 'absolute')}>
        <div onClick={() => handleAppend(sizes)} style={{ transform:  fields.length > 0 ? 'translateY(-60px)' : 'translateY(0px)'}} className='p-3 bg-grayb text-white text-2xl rounded'>
          <AiOutlinePlus/>
        </div>
      </div>
    </div>
  )
}
