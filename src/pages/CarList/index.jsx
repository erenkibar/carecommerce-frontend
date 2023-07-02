/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCarListing } from './getListing';
import { Button, Card, CardContent, Container, Typography } from '@mui/material';

const CarList = (props) => {
  const [carList, setCarList] = useState([]);
  useEffect(() => {
    getCarListing(props.user).then((response) => {
      setCarList(response.data);
    });
  }, []);

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexWrap: 'wrap'
      }}
      item
      s={12}
    >
      <Container
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          width: '100%',
          height: '100vh'
        }}
      >
        {carList.map((element) => (
          <Card
            key={element.id}
            style={{
              display: 'flex',
              flexDirection: 'row',
              margin: '20px',
              flexWrap: 'wrap',
              justifyContent: 'flex-start'
            }}
            sx={{ alignContent: 'center', minWidth: 800, height: 400 }}
          >
            <CardContent>
              <img
                style={{ objectFit: 'contain', width: '300px', height: 'auto' }}
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
                <Button>Delete Icon</Button>
              </Container>
              {console.log(carList)}

            </CardContent>
          </Card>
        ))}
      </Container>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(CarList);
