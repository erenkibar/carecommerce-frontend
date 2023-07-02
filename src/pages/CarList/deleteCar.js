import axios from 'axios';

export const getCarListing = async (user) => {
  const carList = await axios.delete('/cars/', {
    headers: {
      Authorization: `Bearer ${user.user.token}`
    }
  });
  return carList;
};
