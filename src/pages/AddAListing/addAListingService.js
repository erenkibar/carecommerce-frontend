import axios from 'axios';

export const getModelsByBrand = async (brandId) => {
  try {
    const response = await axios.get(`/model/${brandId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addACar = async (values, user, files) => {
  console.log('values are', values)
  try {
    const response = await axios.post(
      '/cars/add',
      {
        images: files,
        year: String(values.year),
        mileage: values.mileage,
        price: values.price,
        title: values.title,
        description: values.description,
        fuelType: values.fuel,
        transmissionType: values.transmissionType,
        numberOfDoors: values.doors,
        color: values.color,
        brandID: values.brand.id,
        modelID: values.model.id
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
