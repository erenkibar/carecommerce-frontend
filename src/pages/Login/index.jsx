import { Button, Container, Grid, InputLabel, TextField } from '@mui/material'
import React from 'react'
import LogoCar from '../../assets/car.png'

const Login = () => {
  return (
    <Grid container spacing={0} columns={12}>
        <Grid style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}} item xs={6}>
            <Grid item>
                <img style={{alignSelf: 'center'}} src={LogoCar} alt='logo' />
                <div style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
                <h1 style={{color: '#fe7058', margin: 0}}>Buy  &  Sell</h1>
                <h1 style={{color: '#fe7058', margin: 0}}>Vehicles with ease</h1>
                </div>

            </Grid>
        </Grid>
        <Grid item s={6}>
            <Grid style={{display: 'flex', flexDirection: 'column', minHeight: "100%", width: '100%', justifyContent: 'space-around'}}>
                <Container style={{background: 'white', display: 'flex', flexDirection: 'column', alignSelf: 'center', width: '500px'}}>
                    <h2 style={{color: '#fe7058', margin: '20px'}}>Login</h2>
                    <TextField label={'E-mail'} variant='outlined' style={{background: 'white', margin: '20px'}} />
                    <TextField label={'Password'} variant='outlined' style={{background: 'white', margin: '20px'}} />
                    <Button style={{background: '#fe7058', margin: '20px', color: 'white'}}> Log in</Button>
                    <p style={{marginLeft: '20px', color: '#0b3954', fontSize: '13px'}}>Forgotten password?</p>
                </Container>
            </Grid>
        </Grid>
    </Grid>
  )
}



export default Login