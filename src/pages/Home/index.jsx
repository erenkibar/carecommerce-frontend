/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getLatestCars } from './getLatestCars';
import { useFormik } from 'formik';
import { connect, useDispatch } from 'react-redux';
import { getBrands } from '../../store/brands';
import { getModelsByBrand } from '../AddAListing/addAListingService';
import { colors, fuelType, numberOfDoors, transmissionType } from '../AddAListing/consts';
import { searchCars } from './searchCars';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const [latestCars, setLatestCars] = useState([]);
  const [brand, setBrand] = useState();
  const [models, setModels] = useState([]);
  const [model, setModel] = useState([]);
  const [activeSearch, setActiveSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToDetails = (car) => {
    navigate(`/car/${car.id}`, { state: {car} });
  };
  const formik = useFormik({
    initialValues: {
      brand: {},
      model: {},
      minyear: '',
      maxyear: '',
      minmileage: '',
      maxmileage: '',
      fuel: '',
      color: '',
      transmissiontype: '',
      doors: '',
      minprice: '',
      maxprice: ''
    },
    validateOnBlur: false,
    onSubmit: () => {
      const json = SearchJSON.searchCriteriaList.filter((x) => x.value !== '');
      SearchJSON.searchCriteriaList = json;
      console.log(json);
      searchCars(SearchJSON)
        .then((response) => {
          setSearchResults(response.data);
          toast.success('Successful search');
        })
        .catch((e) => toast.error('An error occurred'))
        .finally((e) => setActiveSearch(true));
    },
    onReset: () => {
      setActiveSearch(false);
    }
  });

  const SearchJSON = {
    dataOption: 'all',
    searchCriteriaList: [
      {
        filterKey: 'brand',
        operation: 'eq',
        value: formik.values.brand.name || ''
      },
      {
        filterKey: 'model',
        operation: 'eq',
        value: formik.values.model.name || ''
      },
      {
        filterKey: 'minyear',
        operation: 'gt',
        value: formik.values.minyear.toString()
      },
      {
        filterKey: 'maxyear',
        operation: 'lt',
        value: formik.values.maxyear
      },
      {
        filterKey: 'minmileage',
        operation: 'gt',
        value: formik.values.minmileage
      },
      {
        filterKey: 'maxmileage',
        operation: 'gt',
        value: formik.values.maxmileage
      },
      {
        filterKey: 'fuel',
        operation: 'eq',
        value: formik.values.fuel
      },
      {
        filterKey: 'color',
        operation: 'eq',
        value: formik.values.color
      },
      {
        filterKey: 'transmissiontype',
        operation: 'eq',
        value: formik.values.transmissiontype
      },
      {
        filterKey: 'doors',
        operation: 'eq',
        value: formik.values.doors
      },
      {
        filterKey: 'minprice',
        operation: 'gt',
        value: formik.values.minprice
      },
      {
        filterKey: 'maxprice',
        operation: 'lt',
        value: formik.values.maxprice
      }
    ]
  };

  useEffect(() => {
    dispatch(getBrands());
  }, []);

  useEffect(() => {
    getLatestCars().then((response) => {
      setLatestCars(response.data);
    });
  }, []);

  useEffect(() => {
    if (brand) {
      getModelsByBrand(brand.id).then((response) => {
        setModels(response.data);
        console.log('response data is', response.data);
      });
    }
  }, [brand]);

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        minWidth: '100%'
      }}
    >
      <h2>Search</h2>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          minWidth: '100%',
          justifyContent: 'space-between'
        }}
      >
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'flex-start',
            flexWrap: 'wrap'
          }}
        >
          <Box sx={{ minWidth: 120, margin: '20px' }}>
            <FormControl fullWidth>
              <InputLabel id="brand-label">Brand</InputLabel>
              <Select
                onChange={(e) => {
                  formik.handleChange(e);
                  setBrand(e.target.value);
                }}
                labelId="brand-label"
                label="Brand"
                id="brand"
                name="brand"
                error={formik.touched.brand && Boolean(formik.errors.brand)}
              >
                {props.brands?.map((value) => (
                  <MenuItem value={value} key={value.id}>
                    {value.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {brand && (
            <Box sx={{ minWidth: 120, margin: '20px' }}>
              <FormControl fullWidth>
                <InputLabel id="model-label">Model</InputLabel>
                <Select
                  onChange={(e) => {
                    console.log('e is', e);
                    formik.handleChange(e);
                    setModel(e);
                  }}
                  labelId="model-label"
                  label="Model"
                  id="model"
                  name="model"
                  error={
                    formik.touched.model && formik.values.brand && Boolean(formik.errors.model)
                  }
                >
                  {models?.map((value) => (
                    <MenuItem value={value} key={value.id}>
                      {value.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              value={formik.values.year}
              error={formik.touched.year && Boolean(formik.errors.year)}
              helperText={formik.touched.year && formik.errors.year}
              onChange={formik.handleChange}
              type="number"
              min="1950"
              max="2023"
              id="minyear"
              name="minyear"
              label={'Minimum Year'}
              variant="outlined"
              style={{ background: 'white', margin: '20px', width: '50%' }}
            />
            <TextField
              value={formik.values.year}
              error={formik.touched.year && Boolean(formik.errors.year)}
              helperText={formik.touched.year && formik.errors.year}
              onChange={formik.handleChange}
              type="number"
              min="1950"
              max="2023"
              id="maxyear"
              name="maxyear"
              label={'Maximum Year'}
              variant="outlined"
              style={{ background: 'white', margin: '20px', width: '50%' }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              value={formik.values.mileage}
              error={formik.touched.mileage && Boolean(formik.errors.mileage)}
              helperText={formik.touched.mileage && formik.errors.mileage}
              onChange={formik.handleChange}
              id="minmileage"
              name="minmileage"
              label={'Mileage from (in km)'}
              variant="outlined"
              style={{ background: 'white', margin: '20px', width: '50%' }}
            />
            <TextField
              value={formik.values.mileage}
              error={formik.touched.mileage && Boolean(formik.errors.mileage)}
              helperText={formik.touched.mileage && formik.errors.mileage}
              onChange={formik.handleChange}
              id="maxmileage"
              name="maxmilage"
              label={'Mileage to (in km)'}
              variant="outlined"
              style={{ background: 'white', margin: '20px', width: '50%' }}
            />
          </Box>
        </Container>
        <Container
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            justifyContent: 'flex-start',
            flexWrap: 'wrap'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ margin: '20px', width: '50%' }}>
              <FormControl fullWidth>
                <InputLabel id="fuel-label">Fuel Type</InputLabel>
                <Select
                  onChange={formik.handleChange}
                  labelId="fuel-label"
                  label="fuel"
                  id="fuel"
                  name="fuel"
                >
                  {fuelType.map((value) => (
                    <MenuItem value={value} key={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ margin: '20px', width: '50%' }}>
              <FormControl fullWidth>
                <InputLabel id="fuel-label">Color</InputLabel>
                <Select
                  onChange={formik.handleChange}
                  labelId="color-label"
                  label="color"
                  id="color"
                  name="color"
                >
                  {colors.map((value) => (
                    <MenuItem value={value} key={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ margin: '20px', width: '50%' }}>
              <FormControl fullWidth>
                <InputLabel id="transmissiontype-label">Transmission Type</InputLabel>
                <Select
                  onChange={formik.handleChange}
                  labelId="transmissiontype-label"
                  label="transmissiontype"
                  id="transmissiontype"
                  name="transmissiontype"
                >
                  {transmissionType.map((value) => (
                    <MenuItem value={value} key={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ margin: '20px', width: '50%' }}>
              <FormControl fullWidth>
                <InputLabel id="fuel-label">Number of Doors</InputLabel>
                <Select
                  onChange={formik.handleChange}
                  labelId="doors-label"
                  label="doors"
                  id="doors"
                  name="doors"
                  error={formik.touched.doors && Boolean(formik.errors.doors)}
                >
                  {numberOfDoors.map((value) => (
                    <MenuItem value={value} key={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <TextField
              value={formik.values.mileage}
              error={formik.touched.mileage && Boolean(formik.errors.mileage)}
              helperText={formik.touched.mileage && formik.errors.mileage}
              onChange={formik.handleChange}
              id="minprice"
              name="minprice"
              label={'Minimum price (in лв.)'}
              variant="outlined"
              style={{ background: 'white', margin: '20px', width: '50%' }}
            />
            <TextField
              value={formik.values.mileage}
              error={formik.touched.mileage && Boolean(formik.errors.mileage)}
              helperText={formik.touched.mileage && formik.errors.mileage}
              onChange={formik.handleChange}
              id="maxprice"
              name="maxprice"
              label={'Maximum price (in лв.)'}
              variant="outlined"
              style={{ background: 'white', margin: '20px', width: '50%' }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Button
              onClick={formik.handleSubmit}
              style={{
                margin: '20px',
                backgroundColor: '#fe7058',
                padding: '10px 30px',
                fontSize: '18px'
              }}
              variant="contained"
            >
              Search
            </Button>
            <Button
              onClick={formik.handleReset}
              style={{
                margin: '20px',
                padding: '10px 30px',
                fontSize: '18px'
              }}
              variant="outlined"
            >
              Reset
            </Button>
          </Box>
        </Container>
      </Container>
      {activeSearch ? (
        <h2>{`Search Results (${searchResults.length})`}</h2>
      ) : (
        <h2> Recently Added Listings</h2>
      )}
      <Container
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexGrow: 1,
          minWidth: '100%',
          justifyContent: 'flex-start',
          flexWrap: 'wrap'
        }}
      >
        {console.log(typeof searchResults)}

        {activeSearch
          ? searchResults?.map((element) => (
              <Card
                onClick={() => navigateToDetails(element)}
                key={element.id}
                style={{ margin: 15, minHeight: '500px', minWidth: '300px' }}
              >
                <CardContent>
                  <CardMedia
                    component="img"
                    height="250"
                    sx={{ objectFit: 'cover' }}
                    src={`data:image/png;base64,${element.images[0]}`}
                  />
                </CardContent>
                <CardContent style={{ display: 'flex', flexDirection: 'row' }}>
                  <Container>
                    <Typography gutterBottom variant="h4" component="div">
                      {element.title}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {element.description}
                    </Typography>
                    <Typography
                      style={{ border: '1px', borderColor: 'black' }}
                      variant="h4"
                      color="text.secondary"
                    >
                      {element.price} лв.
                    </Typography>
                  </Container>
                  <Container style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" color="text.secondary">
                      {element.year}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {element.color}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {element.fuel}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {element.transmissionType}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {element.mileage} km.
                    </Typography>
                  </Container>
                </CardContent>
              </Card>
            ))
          : latestCars.map((element) => (
              <Card
                onClick={() => navigateToDetails(element)}
                key={element.id}
                style={{ margin: 15, minHeight: '500px', minWidth: '300px' }}
              >
                <CardContent>
                  <CardMedia
                    component="img"
                    height="250"
                    sx={{ objectFit: 'cover' }}
                    src={`data:image/png;base64,${element.images[0]}`}
                  />
                </CardContent>
                <CardContent style={{ display: 'flex', flexDirection: 'row' }}>
                  <Container>
                    <Typography gutterBottom variant="h4" component="div">
                      {element.title}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {element.description}
                    </Typography>
                    <Typography
                      style={{ border: '1px', borderColor: 'black' }}
                      variant="h4"
                      color="text.secondary"
                    >
                      {element.price} лв.
                    </Typography>
                  </Container>
                  <Container style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" color="text.secondary">
                      {element.year}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {element.color}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {element.fuel}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {element.transmissionType}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {element.mileage} km.
                    </Typography>
                  </Container>
                </CardContent>
              </Card>
            ))}
      </Container>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    brands: state.brands?.brands
  };
};

export default connect(mapStateToProps)(Home);
