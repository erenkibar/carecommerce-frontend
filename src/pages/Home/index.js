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

const Home = (props) => {
  const [latestCars, setLatestCars] = useState([]);
  const [brand, setBrand] = useState();
  const [models, setModels] = useState([]);
  const [model, setModel] = useState([]);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {},
    validateOnBlur: false
  });

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
                <InputLabel id="fuel-label">Transmission Type</InputLabel>
                <Select
                  onChange={formik.handleChange}
                  labelId="transmissionType-label"
                  label="transmissionType"
                  id="transmissionType"
                  name="transmissionType"
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
      <h2>Recently Added Listings</h2>
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
        {latestCars.map((element) => (
          <Card key={element.id} style={{ margin: 15, minHeight: '500px', minWidth: '300px' }}>
            <CardContent>
              <CardMedia
                component="img"
                height="250"
                sx={{ objectFit: 'cover' }}
                src={`data:image/png;base64,${element.images[0]}`}
              />
            </CardContent>
            <CardContent>
              <Typography gutterBottom variant="h4" component="div">
                {element.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {element.description}
              </Typography>
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
