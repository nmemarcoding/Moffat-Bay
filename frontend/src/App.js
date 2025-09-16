import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AboutUs from './pages/AboutUs';
import AvailabilityPage from './pages/AvailabilityPage';
import BookingDetailsPage from './pages/BookingDetailsPage';
import ConfirmationPage from './pages/ConfirmationPage';
import MyReservationsPage from './pages/MyReservationsPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactUsPage from './pages/ContactUsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/availability" element={<AvailabilityPage />} />
        <Route path="/booking-details" element={<BookingDetailsPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/my-reservations" element={<MyReservationsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
