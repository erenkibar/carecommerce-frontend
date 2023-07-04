import axios from 'axios';

export const deleteCar = async (user, id) => {
  const response = await axios.delete(`/cars/${id}`, {
    headers: {
      Authorization: `Bearer ${user.user.token}`
    }
  });
  return response;
};
