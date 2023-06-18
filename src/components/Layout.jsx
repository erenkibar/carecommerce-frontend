import { Container } from '@mui/material'
import React from 'react'

const Layout = (props) => {
  return (
    <Container style={{background: 'white', maxWidth: '100vw', height: '100vh', padding:0}}>
        {props.children}
    </Container>
  )
}

export default Layout