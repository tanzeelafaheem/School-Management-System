import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin/Admin';
import Teacher from './pages/Teacher/Teacher';
import Login from './pages/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Profile from './pages/Profile/profile'
import ManageTeacher from './pages/Manage/ManageTeacher'
import ManageSubject from './pages/Manage/ManageSubject';
import ManageSchedule from './pages/Manage/ManageSchedule';
import ManageStandard from './pages/Manage/ManageStandard';

function App() {
  return (
    <div className="app">
      <Navbar/>
    <Router>
      <Routes>
        <Route path="/login/admin" element={<Admin />} />
        <Route path="/login/teacher" element={<Teacher />} />
        <Route path="/login/teacher/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Home />} /> 
        <Route path="/login/admin/manageTeacher"element ={<ManageTeacher/>}/>
        <Route path="/login/admin/manageSubject"element ={<ManageSubject/>}/>
        <Route path="/login/admin/manageStandard"element ={<ManageStandard/>}/>
        <Route path="/login/admin/manageSchedule"element ={<ManageSchedule/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
