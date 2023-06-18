import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { NavigationBar } from './components/NavigationBar';
import Layout from './components/Layout';

function App() {
  return (
      <Layout>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </Layout>
  );
}

export default App;
