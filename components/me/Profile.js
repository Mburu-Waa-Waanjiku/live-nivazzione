import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  Button,
  TextField,
} from '@material-ui/core';
import { getError } from '../../utils/error';
import { useSnackbar } from 'notistack';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosRounded';
import axios from 'axios';

function Profile({ dispatch, userInfo, classes }) {

  const [view, setView] = useState(false);
  const handleView = () => {
    router.push("#edit");
  	setView(true)
  }

  const [viewsmall, setViewsmall] = useState(false);
  const handleViewsmall = () => {
  	setViewsmall(true)
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      return router.push('/login');
    }
    setValue('name', userInfo.name);
    setValue('email', userInfo.email);
  }, [router, setValue, userInfo]);
  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    closeSnackbar();
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: 'error' });
      return;
    }
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        {
          name,
          email,
          password,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', data);
      console.log(userInfo.name);
      setViewsmall(false);
      setView(false);
      enqueueSnackbar('Profile updated successfully', { variant: 'success' });
      router.push('/me')
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  return (
	<div style={{borderTop: '1px solid rgba(0, 0, 0, 0.12)'}} className="grid sm:grid-cols-2">
	  <div className="grid justify-center profileborder ">
	    <div className="w-full text-center text-xl p-4">
	      {userInfo.name}
	    </div>
	    <div className="w-full text-center text-xl p-4 pt-0">
	      {userInfo.email}
	    </div>
	    <div className="w-full text-center text-xl p-4 pt-0">
	      {userInfo?.phone}
	    </div>
	  </div>
	  <div style={{ height: '100%' }}>
	    <div className="pt-3 Profileditorsmall" >
	      <Button
	        onClick={handleView}
	        style={{ marginBottom: 'calc(100vh - 425px)', display: !view ? 'block' : 'none', backgroundColor: '#222', padding: '10px 20px', marginLeft: 10, color: 'white', borderRadius: 10}}
	      >
	       Edit
	      </Button>
	    </div>
	    <div className="pt-3 Profileditor" >
	      <Button
	        onClick={handleViewsmall}
	        style={{ marginBottom: 'calc(100vh - 582px)', display: !viewsmall ? 'block' : 'none', backgroundColor: '#222', padding: '10px 20px', marginLeft: 10, color: 'white', borderRadius: 10}}
	      >
	       Edit
	      </Button>
	    </div>
	    <div className="pt-3" style={{ display: view ? 'block' : 'none' }}>
	      <ListItem>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className={classes.form}
          >
            <ListItem>
	            <Button
	              id= "edit"
	              onClick={() => {setView(false)}}
	              style={{backgroundColor: '#222', padding: '10px 20px', marginLeft: 10, color: 'white', borderRadius: 10}}
	            >
	              Close
	            </Button>
            </ListItem>
            <List>
              <ListItem>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    minLength: 2,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="name"
                      label="Name"
                      inputProps={{ type: 'name' }}
                      error={Boolean(errors.name)}
                      helperText={
                        errors.name
                          ? errors.name.type === 'minLength'
                            ? 'Name length is more than 1'
                            : 'Name is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="email"
                      label="Email"
                      inputProps={{ type: 'email' }}
                      error={Boolean(errors.email)}
                      helperText={
                        errors.email
                          ? errors.email.type === 'pattern'
                            ? 'Email is not valid'
                            : 'Email is required'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{
                    validate: (value) =>
                      value === '' ||
                      value.length > 5 ||
                      'Password length is more than 5',
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="password"
                      label="Password"
                      inputProps={{ type: 'password' }}
                      error={Boolean(errors.password)}
                      helperText={
                        errors.password
                          ? 'Password length is more than 5'
                          : ''
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>
              <ListItem>
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    validate: (value) =>
                      value === '' ||
                      value.length > 5 ||
                      'Confirm Password length is more than 5',
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="confirmPassword"
                      label="Confirm Password"
                      inputProps={{ type: 'password' }}
                      error={Boolean(errors.confirmPassword)}
                      helperText={
                        errors.password
                          ? 'Confirm Password length is more than 5'
                          : ''
                      }
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
              </ListItem>
            </List>
          </form>
        </ListItem>
	    </div>
	    <div style={{ display: viewsmall ? 'block' : 'none' }}>
	      <div className={classes.smseachbg}
          style={{position: "fixed", zIndex: 1210, top: 0, background: 'white',  width: "100vw", height: "100vh"}}
         >
          <div style={{backgroundColor: "rgba(255, 255, 255, 0.9)", position: "sticky", top: 0, zIndex: "10"}} className={classes.reviewTopTab}>
            <ArrowBackIosIcon onClick={() => {setViewsmall(false)}} sx={{ float:"left" }} /> 
            <div className="flex justify-center">
              Edit Profile
            </div>
          </div>
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
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="name"
                        label="Name"
                        inputProps={{ type: 'name' }}
                        error={Boolean(errors.name)}
                        helperText={
                          errors.name
                            ? errors.name.type === 'minLength'
                              ? 'Name length is more than 1'
                              : 'Name is required'
                            : ''
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="email"
                        label="Email"
                        inputProps={{ type: 'email' }}
                        error={Boolean(errors.email)}
                        helperText={
                          errors.email
                            ? errors.email.type === 'pattern'
                              ? 'Email is not valid'
                              : 'Email is required'
                            : ''
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: (value) =>
                        value === '' ||
                        value.length > 5 ||
                        'Password length is more than 5',
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="password"
                        label="Password"
                        inputProps={{ type: 'password' }}
                        error={Boolean(errors.password)}
                        helperText={
                          errors.password
                            ? 'Password length is more than 5'
                            : ''
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      validate: (value) =>
                        value === '' ||
                        value.length > 5 ||
                        'Confirm Password length is more than 5',
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="confirmPassword"
                        label="Confirm Password"
                        inputProps={{ type: 'password' }}
                        error={Boolean(errors.confirmPassword)}
                        helperText={
                          errors.password
                            ? 'Confirm Password length is more than 5'
                            : ''
                        }
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
                </ListItem>
              </List>
            </form>
          </ListItem>
        </div>
      </div>
	  </div>
	</div>
  )
}

export default Profile