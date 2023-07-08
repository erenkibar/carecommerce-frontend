/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { getAllUsers } from './getAllUsers';
import { DataGrid } from '@mui/x-data-grid';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import { deleteUser } from './deleteUser';

const ViewAllUsers = (props) => {
  const [allUsers, setAllUsers] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  useEffect(() => {
    getAllUsers(props.user)
      .then((response) => {
        console.log(response.data);
        setAllUsers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 300 },
    { field: 'email', headerName: 'E-mail', width: 130 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'enabled', headerName: 'Enabled', width: 130 },

    {
      field: 'role',
      headerName: 'Role',
      width: 90
    }
  ];

  return (
    <div>
      {console.log(rowSelectionModel)}
      <DataGrid
        onRowSelectionModelChange={(newSelection) => {
          console.log('new', newSelection)
          setRowSelectionModel(newSelection);
        }}
        rowSelectionModel={rowSelectionModel}
        rows={allUsers}
        columns={columns}
      />
      <Button
        onClick={() => deleteUser(props.user, rowSelectionModel)}
        style={{
          margin: '20px',
          backgroundColor: '#fe7058',
          padding: '10px 30px',
          fontSize: '13px'
        }}
        variant="contained"
      >
        Delete Selected User
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(ViewAllUsers);
