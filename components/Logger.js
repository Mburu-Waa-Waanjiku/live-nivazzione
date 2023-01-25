import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useContext, useEffect } from 'react';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';
import { useStateContext } from '../utils/StateContext';


function Logger() {
  
  const { closeLogin } = useStateContext();
  const [register, setRegister] = useState(false);
  const [passReset, setPassreset] = useState(false);
  const [divSc, setDivSc] = useState(false);

  const handleRegister = () => {
  	setRegister(true);
  	setPassreset(false)
  }
  const handlePassreset = () => {
  	setPassreset(true);
  	setRegister(false);
  }
  const handleLogin = () => {
  	setPassreset(false);
  	setRegister(false);
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      closeLogin();
    }
  }, [router, userInfo]);

  const classes = useStyles();
  const LoginsubmitHandler = async ({ email, password }) => {
    closeSnackbar();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', data);
      closeLogin();
    } catch (err) {
      enqueueSnackbar("Problem Making a Connection");
    }
  };
  
  const submitHandler = async ({ email }) => {
    closeSnackbar();
    try {
      const { data } = await axios.post('/api/users/resetPassword', {
        email,
      });
      dispatch({ type: 'USER_RESETPASSWORD', payload: data });
      setDivSc(true);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  const RegistersubmitHandler = async ({ name, email, password, confirmPassword }) => {
    closeSnackbar();
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords don't match", { variant: 'error' });
      return;
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', data);
      closeLogin();
    } catch (err) {
      enqueueSnackbar(err.response.data ? err.response.data.message : err.message,
        { variant: 'error' });
    }
  };

	return (
		<div style={{zIndex: 1220}} className=" fixed w-full h-full flex justify-center content-center">
		  <div style={{width: "fit-content", height: "fit-content", padding: 20 , }}>
 	        <div className="logger">
 	          <div onClick={closeLogin} style={{float: "right", fontSize: 20, position: "relative", top: -16, right: -6}}>
 	            <b> x </b>
 	          </div>
			  {register ? (
				<div >
	  			    <form onSubmit={handleSubmit(RegistersubmitHandler)} className={classes.form}>
      			      <Typography style={{textAlign: "center"}} component="h1" variant="h1">
      			        Register
      			      </Typography>
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
    			                required: true,
    			                minLength: 6,
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
        			                  ? errors.password.type === 'minLength'
        			                    ? 'Password length is more than 5'
        			                    : 'Password is required'
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
        			            required: true,
        			            minLength: 6,
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
        			                errors.confirmPassword
        			                  ? errors.confirmPassword.type === 'minLength'
        			                    ? 'Confirm Password length is more than 5'
        			                    : 'Confirm  Password is required'
        			                  : ''
        			              }
        			              {...field}
        			            ></TextField>
        			          )}
        			        ></Controller>
        			      </ListItem>
        			      <ListItem>
        			        <Button variant="contained" type="submit" fullWidth color="primary">
        			          Register
        			        </Button>
        			      </ListItem>
          			    <ListItem>
          			      Already have an account? &nbsp;
          			      <a style={{cursor: "pointer"}} onClick={handleLogin}>
    			            Login
    			          </a>
          			    </ListItem>
      				  </List>			    
      				</form>
				</div>
				) : passReset ? (
				<div>
      			{!divSc && <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
      			  <Typography style={{textAlign: "center"}} component="h1" variant="h1">
      			    Reset Password
      			  </Typography>
      			  <List>
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
    			        <Button variant="contained" type="submit" fullWidth color="primary">
    			          Reset password
    			        </Button>
    			      </ListItem>
    			      <ListItem>
    			        Don&apos;t have an account? &nbsp;
    			        <a style={{cursor: "pointer"}} onClick={handleRegister}>
    			          Register
    			        </a>
    			      </ListItem>
    			    </List>
    			  </form>}
    			  {divSc && 
    			  <div>
            	  	<div style={{color: "#7ac142"}} className="home-ft w-full justify-self-stretch mt-8">
           	  	       A Link Has Been Sent To Your Email
           	  	    </div>
           	  	    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
           	  	      <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
           	  	      <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
           	  	    </svg>
           	        <div className="mb-12">
            	    </div>
           	  	  </div>}
    			</div>
	  		    ) : (
				<div>
      			    <form onSubmit={handleSubmit(LoginsubmitHandler)} className={classes.form}>
    			      <Typography style={{textAlign: "center"}} component="h1" variant="h1">
    			        Login
    			      </Typography>
    			      <List>
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
    			            <div style={{cursor: "pointer"}} onClick={handlePassreset}>
    			              Forgot Password?
    			            </div>
    			        </ListItem>
    			        <ListItem>
    			          <Controller
    			            name="password"
    			            control={control}
    			            defaultValue=""
    			            rules={{
    			              required: true,
    			              minLength: 6,
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
    			                    ? errors.password.type === 'minLength'
    			                      ? 'Password length is more than 5'
    			                      : 'Password is required'
    			                    : ''
    			                }
    			                {...field}
    			              ></TextField>
    			            )}
    			          ></Controller>
    			        </ListItem>
    			        <ListItem>
    			          <Button variant="contained" type="submit" fullWidth color="primary">
    			            Login
    			          </Button>
    			        </ListItem>
    			        <ListItem>
    			          Don&apos;t have an account? &nbsp;
    			            <a style={{cursor: "pointer"}} onClick={handleRegister}>
    			              Register
    			            </a>
    			        </ListItem>
    			      </List>
    			    </form>
				</div>
				)
		      }
		    </div>
		  </div>
		</div>
	)
}

export default Logger			    			    			    