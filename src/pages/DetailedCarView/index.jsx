import { Button, Container, Grid, Typography } from '@mui/material';
import { Carousel } from '@trendyol-js/react-carousel';
import React from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

const DetailedCarView = (props) => {
  const car = useLocation();

  return (
    <Grid sx={{ margin: '70px', height: '100%' }} container spacing={2}>
      {console.log(car)}

      <Grid item xs={6}>
        <Carousel
          useArrowKeys
          leftArrow={<Button>{'<'}</Button>}
          rightArrow={<Button>{'>'}</Button>}
          responsive
          swiping
        >
          {car &&
            car.state.car.images.map((element) => (
              <Container
                sx={{
                  borderStyle: 'solid',
                  borderWidth: '1',
                  borderColor: '#fe7058',
                  width: 'auto',
                  height: '500px',
                  backgroundColor: 'white'
                }}
                key={car.id}
              >
                <img
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                  src={`data:image/png;base64,${element}`}
                />
              </Container>
            ))}
        </Carousel>
        <Container sx={{ margin: '35px' }}>
          <Typography sx={{ color: '#fe7058' }} variant="h4">
            {car.state.car.title}
          </Typography>
          <Typography sx={{ width: '100px' }} variant="h7">
            SDFJFSDFJLSKDFJSLFJSLDF:JDKFJDSKFSJDFLKSFJLSDKJFSLDKFJLSDFKJSL:FKJFLKSJD
          </Typography>
          <Typography sx={{ marginTop: '20px', color: '#fe7058' }} variant="h4">
            {car.state.car.price} lv.
          </Typography>

          <Typography
            sx={{ marginTop: '20px', textDecoration: 'underline', color: '#fe7058' }}
            variant="h5"
          >
            Contact Information
          </Typography>
          <Typography variant="h7">
            {car.state.car.user.firstName} {car.state.car.user.lastName}{' '}
          </Typography>
          <Typography sx={{ marginTop: '20px' }} variant="h7">
            {car.state.car.user.email}
          </Typography>
          <Typography>{car.state.car.user.phone}</Typography>
        </Container>
      </Grid>
      <Grid item xs={6}>
        <Container sx={{ margin: '35px' }}>
          <Typography
            sx={{ color: '#fe7058', marginTop: '20px', textDecoration: 'underline' }}
            variant="h6"
          >
            Year
          </Typography>
          <Typography sx={{ color: 'black', marginTop: '5px' }} variant="body1">
            {car.state.car.year}
          </Typography>

          <Typography
            sx={{ color: '#fe7058', marginTop: '20px', textDecoration: 'underline' }}
            variant="h6"
          >
            Color
          </Typography>
          <Typography sx={{ color: 'black', marginTop: '5px' }} variant="body1">
            {car.state.car.color}
          </Typography>

          <Typography
            sx={{ color: '#fe7058', marginTop: '20px', textDecoration: 'underline' }}
            variant="h6"
          >
            Milage
          </Typography>
          <Typography sx={{ color: 'black', marginTop: '5px' }} variant="body1">
            {car.state.car.mileage}
          </Typography>

          <Typography
            sx={{ color: '#fe7058', marginTop: '20px', textDecoration: 'underline' }}
            variant="h6"
          >
            Transmission
          </Typography>
          <Typography sx={{ color: 'black', marginTop: '5px' }} variant="body1">
            {car.state.car.transmissionType}
          </Typography>

          <Typography
            sx={{ color: '#fe7058', marginTop: '20px', textDecoration: 'underline' }}
            variant="h6"
          >
            Fuel Type
          </Typography>
          <Typography sx={{ color: 'black', marginTop: '5px' }} variant="body1">
            {car.state.car.fuelType}
          </Typography>

          <Typography
            sx={{ color: '#fe7058', marginTop: '20px', textDecoration: 'underline' }}
            variant="h6"
          >
            Number of Doors
          </Typography>
          <Typography sx={{ color: 'black', marginTop: '5px' }} variant="body1">
            {car.state.car.numberOfDoors}
          </Typography>
        </Container>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    fetchingError: state.fetchingError,
    fetchingUser: state.fetchingUser
  };
};

export default connect(mapStateToProps)(DetailedCarView);
