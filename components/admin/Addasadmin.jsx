import React from 'react';
import {
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { Select } from 'antd';

export default function Addasadmin({  isOnoffer, setIsOnoffer, isEditorsChoice, setIsEditorsChoice, isCollectn, setIsCollectn, useForm, useFormContext, ListItem, Controller}) {
  
  const {
    formState: { errors },    
  } = useForm();
  const { control, register } = useFormContext();

  const selector = [];
  const { Option } = Select;
  const colllections = ['Cute collection', 'Slay Collection', 'Aesthetic Collection'];

  return (
    <>
      <div className="pl-3 title-font text-lg" >Edit as Admin</div>
      <ListItem>
        <FormControlLabel
          label="Is EdditorsChoice"
          control={
            <Checkbox
            style={{color: '#202020'}}
            onClick={(e) => setIsEditorsChoice(e.target.checked)}
              checked={isEditorsChoice}
              {...register('isEditorsChoice')}
              name="isEditorsChoice"
            />
          } 
        ></FormControlLabel>
      </ListItem>
      <ListItem>
        <FormControlLabel
          label="Is Onoffer"
          control={
            <Checkbox
              style={{color: '#202020'}}
              onClick={(e) => setIsOnoffer(e.target.checked)}
              checked={isOnoffer}
              {...register('isOnoffer')}
              name="isOnoffer"
            />
          } 
        ></FormControlLabel>
      </ListItem>
      <ListItem>
        <FormControlLabel
          label="Is Collection"
          control={
            <Checkbox
              style={{color: '#202020'}}
              onClick={(e) => setIsCollectn(e.target.checked)}
              checked={isCollectn}
              {...register('isCollectn')}
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
            <>
              <Select className="w-full" {...field} size='4' mode="multiple" maxTgCount={4}>
                {colllections.map((categ) => (
                  <Option key={categ} value={categ}>{categ}</Option>
                ))}
              </Select>
            </>
          )}
        ></Controller>
      </ListItem>
      <ListItem>
        <Controller
          name="distinctCateg"
          control={control}
          defaultValue=""
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <>
              <Select className="w-full" {...field} mode="tags" placeholder="Add slugs">
                {selector?.map((v) => (
                  <Option key={v}  value={v}>
                    {v} 
                  </Option>
                ))}
              </Select>
            </>
          )}
        ></Controller>
      </ListItem>
    </>
  )
}
