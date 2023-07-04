import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import NavigationBar from './components/NavigationBar';
import { ProtectedRoute } from './components';
import Home from './pages/Home';
import AddCar from './pages/AddAListing';
import CarList from './pages/CarList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Layout>
      <ToastContainer
        position="bottom-center"
        autoClose={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        theme="light"
      />
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/add-car"
          element={
            <ProtectedRoute>
              <AddCar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-cars"
          element={
            <ProtectedRoute>
              <CarList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
