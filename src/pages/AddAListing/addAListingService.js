import axios from 'axios';

export const getModelsByBrand = async (brandId) => {
  try {
    const response = await axios.get(`/model/${brandId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addACar = async (values, user) => {
  console.log(values, user);
  try {
    const response = await axios.post(
      '/cars/add',
      {
        year: String(values.year),
        mileage: values.mileage,
        price: values.price,
        title: values.title,
        description: values.description,
        fuelType: 'PETROL',
        transmissionType: 'MANUAL',
        userID: '1',
        brandID: '1',
        modelID: '1'
      },
      {
        headers: {
          Authorization: `Bearer ${user.user.token}`
        }
      }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};
