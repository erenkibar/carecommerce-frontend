import axios from 'axios';

export const getLatestCars = async () => {
  const carList = await axios.get('/cars/latest');
  return carList;
};
