import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Payment } from './pages/Payment';
import { Admin } from './pages/Admin';
import { Schedule } from './pages/Schedule';
import { MyBookings } from './pages/MyBookings';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-bg text-text-main flex flex-col font-sans" id="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/my-bookings" element={<MyBookings />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
