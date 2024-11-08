import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin/Admin';
import Teacher from './pages/Teacher/Teacher';
import Login from './pages/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="app">
      <Navbar/>
    <Router>
      <Routes>
        <Route path="/login/admin" element={<Admin />} />
        <Route path="/login/teacher" element={<Teacher />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Home />} /> 
      </Routes>
    </Router>
    </div>
  );
}

export default App;
