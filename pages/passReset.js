import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
} from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import useStyles from '../utils/styles';
import Cookies from 'js-cookie';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';

export default function passReset() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [divSc, setDivSc] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { redirect } = router.query; // login?redirect=/shipping

  const classes = useStyles();
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
  return (
    <Layout title="Login">
      {!divSc && <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component="h1" variant="h1">
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
            <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>}
      {divSc && <div style={{width:"95vw", height: "60vh"}}>
        <div className="w-full h-full flex justify-center place-items-center">
          <div style={{width:"fit-content", height:"fit-content", borderRadius:10, backgroundColor:"#f1f5f9", padding: 20 }}>
            <div className="w-full h-full flex justify-center place-items-center">
              <div style={{backgroundColor: "#30d04a", padding: "30px 40px", fontSize: 30, borderRadius: 50, marginBottom: 10 }} ><div style={{display: divSc ? "block" : "none", transitionProperty: "display", transitionDuration: "3s", transitionDelay: "10s", color: "white", fontWeight: "bold" }} >✓</div></div>
            </div>
            <div className="w-full h-full flex justify-center place-items-center">
              <div style={{fontWeight: "bold", fontSize: 20 }} >A link has been sent to the email.</div>
            </div>
          </div>
        </div>
      </div>}
    </Layout>
  );
}
