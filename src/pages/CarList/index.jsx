/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCarListing } from './getListing';
import { Button, Card, CardContent, Container, Typography } from '@mui/material';
import './index.css';
import { deleteCar } from './deleteCar';
import { toast } from 'react-toastify';

const CarList = (props) => {
  const [carList, setCarList] = useState([]);

  const removeCar = (car) => {
    const updatedCarList = carList.filter((element) => element.id !== car);
    setCarList(updatedCarList);
    deleteCar(props.user, car)
      .then(() => toast.success('Car listing deleted succesfully'))
      .catch((e) => toast.error('Error deleting car listing'));
  };

  useEffect(() => {
    getCarListing(props.user).then((response) => {
      setCarList(response.data);
    });
  }, []);

  return (
    <Container
      style={{
        backgroundColor: 'whitesmoke',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        width: '100%',
        height: 'auto'
      }}
    >
      {carList.map((element) => (
        <Card
          key={element.id}
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: '5px'
          }}
        >
          <Container
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center'
            }}
          >
            <CardContent>
              <img
                style={{ objectFit: 'contain', width: '300px', height: 'auto' }}
                src={`data:image/png;base64,${element.images[0]}`}
              />
            </CardContent>
            <Container style={{ display: 'flex', flexDirection: 'column' }}>
              <Container style={{ margin: '10px' }}>
                <Typography gutterBottom variant="h4" component="div">
                  {element.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {element.description}
                </Typography>
              </Container>
              <Container style={{ display: 'flex', flexDirection: 'row' }}>
                <CardContent>
                  <h3>Year</h3>
                  <p>{element.year}</p>
                  <h3>Mileage</h3>
                  <p>{element.mileage} km</p>
                  <h3>Fuel Type</h3>
                  <p>{element.fuelType} </p>
                </CardContent>
                <CardContent>
                  <h3>Color</h3>
                  <p>{element.color}</p>
                  <h3>Transmission </h3>
                  <p>{element.transmissionType}</p>
                  <h3>Engine Size</h3>
                  <p>{element.engineSize} </p>
                </CardContent>
                <CardContent>
                  <Button onClick={() => removeCar(element.id)} style={{ color: 'red' }}>
                    Delete
                  </Button>
                </CardContent>
              </Container>
            </Container>
          </Container>
        </Card>
      ))}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(CarList);
