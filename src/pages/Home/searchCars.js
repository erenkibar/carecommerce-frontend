import axios from "axios";

export const searchCars = async (searchObject) => {
  try {
    const response = await axios.post('/cars/search', searchObject);
    return response;
  } catch (e) {
    console.log(e);
  }
};
