/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import { getAllCars } from './getAllCars';
import { deleteCar } from '../CarList/deleteCar';

const ViewAllCars = (props) => {
  const [allUsers, setAllUsers] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  useEffect(() => {
    getAllCars(props.user)
      .then((response) => {
        console.log(response.data);
        setAllUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'brand',
      valueGetter: (params) => {
        console.log(params);
        return `${params.row.brand.name}`;
      },
      headerName: 'Brand',
      width: 130
    },
    {
      field: 'model.name',
      valueGetter: (params) => {
        console.log(params);
        return `${params.row.model.name}`;
      },
      headerName: 'Model',
      width: 130
    },
    {
      field: 'user.id',
      valueGetter: (params) => {
        console.log(params);
        return `${params.row.user.id}`;
      },
      headerName: 'User ID',
      width: 200
    },
    {
        field: 'user.name',
        valueGetter: (params) => {
          console.log(params);
          return `${params.row.user.firstName} ${params.row.user.lastName}`;
        },
        headerName: 'User Full Name',
        width: 200
      },
    { field: 'year', headerName: 'Year', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'fuelType', headerName: 'Fuel Type', width: 130 },
    { field: 'transmissionType', headerName: 'Transmisson Type', width: 130 },

    { field: 'color', headerName: 'Color', width: 130 },
    { field: 'mileage', headerName: 'Mileage', width: 130 }
  ];

  return (
    <div>
      {console.log(rowSelectionModel)}
      <DataGrid
        onRowSelectionModelChange={(newSelection) => {
          console.log('new', newSelection);
          setRowSelectionModel(newSelection);
        }}
        rowSelectionModel={rowSelectionModel}
        rows={allUsers}
        columns={columns}
      />
      <Button
        onClick={() => deleteCar(props.user, rowSelectionModel)}
        style={{
          margin: '20px',
          backgroundColor: '#fe7058',
          padding: '10px 30px',
          fontSize: '13px'
        }}
        variant="contained"
      >
        Delete Selected Car
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(ViewAllCars);
