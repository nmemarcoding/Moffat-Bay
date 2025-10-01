import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AboutUs from './pages/AboutUs';
import Attractions from './pages/Attractions';
import AvailabilityPage from './pages/AvailabilityPage';
import BookingDetailsPage from './pages/BookingDetailsPage';
import ConfirmationPage from './pages/ConfirmationPage';
import MyReservationsPage from './pages/MyReservationsPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ContactUsPage from './pages/ContactUsPage';
import AdminSearchPage from './pages/AdminSearchPage';
import api from './services/apiService';

function App() {
  const [serverRunning, setServerRunning] = useState(null); // null = checking, true = running, false = down

  // Set document title
  useEffect(() => {
    document.title = "Moffat Bay Lodge | Resort Management";
  }, []);

  useEffect(() => {
    const checkServer = async () => {
      try {
        // Using the ping endpoint to check server status
        await api.get('/ping');
        setServerRunning(true);
      } catch (error) {
        console.error('❌ Server check failed:', error.message);
        setServerRunning(false);
      }
    };

    checkServer();
  }, []);

  if (serverRunning === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100 px-4">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-white text-2xl font-bold">MB</span>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Moffat Bay Lodge</h2>
          <p className="mt-3 text-gray-600">Loading application...</p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto animate-pulse rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!serverRunning) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-red-100 px-4">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center opacity-50">
              <span className="text-white text-2xl font-bold">MB</span>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-red-600">Server Unavailable</h2>
          <p className="mt-3 text-gray-700">Unable to reach the Moffat Bay Lodge server. Please try refreshing or check your connection.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

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
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/admin/search" element={<AdminSearchPage />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
