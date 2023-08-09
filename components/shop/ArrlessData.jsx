import React, { useEffect, useState } from 'react'
import { Select } from 'antd';
import axios from 'axios';

export default function ArrlessData({ useForm, category, setCategory, useFormContext, ListItem, TextField,  Controller, userInfo }) {
  
  const { Option } = Select;
  const [categs, setCategs] = useState([]);
  const genders = ['Women', 'Men', 'Unisex'];
  
  const {
    formState: { errors },    
  } = useForm();
  const { control } = useFormContext();
  
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setCategs(data);
    } catch (err) {
      console.log(err)
    }

  }
  
  useEffect(() => {
    fetchCategories()
  }, []);

  return (
    <>
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
      <div className="pl-3 title-font text-lg" >Gender</div>
      <ListItem>
        <Controller
          name="gender"
          control={control}
          defaultValue=""
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <Select className="w-full" defaultValue="lucy" {...field}>
              {genders.map((categ) => (
                <Option key={categ} value={categ}>{categ}</Option>
              ))}
            </Select>
          )}
        ></Controller>
      </ListItem>
      <div className="pl-3 title-font text-lg" >Category</div>
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
                {categs?.slice(2).map((categ) => (
                  <Option key={categ} value={categ.midText}><div onClick={() => {setCategory(categ)}}>{categ.midText}</div></Option>
                ))}
              </Select>
            </>
          )}
        ></Controller>
      </ListItem>
      <div className="pl-3 title-font text-lg" >Sub-Category</div>
      <ListItem>
        <Controller
          name="subcategs"
          control={control}
          defaultValue=""
          rules={{
            required: true,
          }}
          render={({ field }) => (
            <>
              <Select className="w-full" {...field} size='4' mode="multiple" maxTgCount={4}>
                {category?.discount.map((categ) => (
                  <Option key={categ} value={categ}>{categ}</Option>
                ))}
              </Select>
            </>
          )}
        ></Controller>
      </ListItem>
    </>
  )
}
