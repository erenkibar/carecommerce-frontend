import axios from 'axios';

export const registerUser = (firstname, lastname, email, password) => {
  axios.post('/auth/register', {
    firstname,
    lastname,
    email,
    password
  });
};
