import React from 'react';
import AdminCss from './Admin.module.css';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className={AdminCss['admin-container']}>
      <h1>Admin Page</h1>

      <div className={AdminCss['section-buttons']}>
        <Link to="login/admin/manageTeacher">
        <button>Manage Teachers</button>
        </Link>
        <button>Manage Subjects</button>
        <button>Manage Standards</button>
        <button>Manage Schedule</button>
      </div>
    </div>
  );
};

export default Admin;
