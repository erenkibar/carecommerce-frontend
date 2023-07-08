import axios from 'axios';

export const deleteUser = async (user, id) => {
  const response = await axios.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${user.user.token}`
    }
  });
  return response;
};
