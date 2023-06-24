import axios from 'axios';

export const loginUser = (email, password) => {
  axios.post('/auth/login', {
    email,
    password
  });
};
