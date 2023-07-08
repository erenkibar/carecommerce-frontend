import axios from 'axios';

export const getAllUsers = async (user) => {
  const userList = await axios.get('/users/all', {
    headers: {
      Authorization: `Bearer ${user.user.token}`
    }
  });
  return userList;
};
