import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Select } from 'antd';

export default function ColorsArr({ useFormContext, useFieldArray, useForm, TextField,  Controller }) {
  
  const CSS_COLORS = ['aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgrey', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'grey', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgrey', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen'];

  const { Option } = Select;
  const {
    formState: { errors },
  } = useForm();

  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'color'
  })
  
  const handleAppend = (value) => {
    append(value);
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const color ={
    slug: '',
    color: '',
  }

  return (
    <div>
      <div className='text-2xl title-font text-center pt-4 pb-1'>Colors</div>
      {fields.map((field, index) => (
        <div key={field.id} className='pb-3'>
          <div  className="pt-3 pb-2 title-font text-lg" >{`Color ${index + 1}`}</div>
          <div className='flex gap-2 xsm:gap-4 pb-2 xsm:pb-4'>
            <div className='grow'>
              <Controller
                name={`color.${index}.slug`}
                control={control}
                defaultValue=""
                rules={{
                  required: false,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    disabled={index < 1 }
                    multiline
                    id={`color.${index}.slug`}
                    label={index < 1 ? "This Product" : "Slug"}
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
                name={`color.${index}.color`}
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Select className="w-full select-h w-32" {...field} size='4' >
                    {CSS_COLORS.map((categ) => (
                      <Option key={categ} value={categ}>
                        <div className='flex gap-2 itens-center'>
                          <div style={{borderColor: categ}} className='flex rounded-full justify-center items-center p-1 border-1'>
                            <div style={{background: categ}} className='p-2 rounded-full'></div>
                          </div>
                          {categ}
                        </div>
                      </Option>
                    ))}
                  </Select>
                )}
              ></Controller>
            </div>
          </div>
          <div className={'flex justify-end'}>
            <div onClick={ () => {index > 0 && handleRemove(index)}} className={'p-3 bg-grayb text-white text-2xl rounded'}>
              <RiDeleteBin5Fill/>
            </div>
          </div>
        </div>
      ))}
      <div className={'flex pb-4 '.concat(fields.length > 0 && 'absolute')}>
        <div onClick={() => handleAppend(color)} style={{ transform:  fields.length > 0 ? 'translateY(-60px)' : 'translateY(0px)'}} className='p-3 bg-grayb text-white text-2xl rounded'>
          <AiOutlinePlus/>
        </div>
      </div>
    </div>
  )
}
