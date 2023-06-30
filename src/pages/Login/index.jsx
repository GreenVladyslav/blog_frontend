import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';

export const Login = () => {
  // авторизован или не авторизован ? test@gmail.ua 123456
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  // console.log(isAuth);

  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'test@gmail.ua',
      password: '123456',
    },
    mode: 'onChange',
    // mode: 'all', сразу при фокусе
  });

  const onSumbit = async (values) => {
    const data = await dispatch(fetchAuth(values));
    // console.log(values);

    if (!data.payload) {
      return alert('Не удалось авторизоваться');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSumbit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
          fullWidth
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
