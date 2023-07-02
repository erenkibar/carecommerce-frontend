import axios from 'axios';

export const getCarListing = async (user) => {
  const carList = await axios.get('/cars/user/listing', {
    headers: {
      Authorization: `Bearer ${user.user.token}`
    }
  });
  return carList;
};
