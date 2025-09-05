import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />{' '}
        <Route path="/login" element={<LoginPage />} />{' '}
        <Route path="/register" element={<RegisterPage />} />{' '}
      </Routes>{' '}
    </Router>
  );
}

export default App;
