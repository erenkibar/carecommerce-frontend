import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import NavigationBar from './components/NavigationBar';
import LandingPage from './pages/LandingPage';
import { ProtectedRoute } from './components';
import Home from './pages/Home';
import AddCar from './pages/AddAListing';

function App() {
  return (
    <Layout>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-car"
          element={
            <ProtectedRoute>
              <AddCar />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
