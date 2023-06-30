import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// http://localhost:4444

// когда любой заропс просиходит то всегда проверяй есть ли что-то в Хранилище (LocalStorage)
instance.interceptors.request.use((config) => {
  // каждый раз когда будет происходить запрос то в загловки будет добавляется Authorization и там будет токен
  // можно проверить через панель инстурментов Headers.!
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});

// axios.get('/posts'); он сам допишет
// для того чтобЫ сокращенно писать код выызвая инстансе

export default instance;
