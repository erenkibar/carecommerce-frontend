import axios from 'axios';

export const getModelsByBrand = async (brandId) => {
  try {
    const response = await axios.get(`/model/${brandId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};
