import axios from 'axios';

export const getAllCars = async (user, id) => {
  const userList = await axios.get('/cars/all', {
    headers: {
      Authorization: `Bearer ${user.user.token}`
    }
  });
  return userList;
};
