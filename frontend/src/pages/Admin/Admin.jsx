import React from 'react';
import AdminCss from './Admin.module.css';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className={AdminCss['admin-container']}>
      <h1>Admin Page</h1>

      <div className={AdminCss['section-buttons']}>
        <Link to="/login/admin/manageTeacher">
        <button>Manage Teachers</button>
        </Link>
        <Link to ="/login/admin/manageSubject">
        <button>Manage Subjects</button>
        </Link>
        <Link to ="/login/admin/manageStandard">
        <button>Manage Standard</button>
        </Link>
        <Link to ="/login/admin/manageSchedule">
        <button>Manage Schedule</button>
        </Link>
      </div>
    </div>
  );
};

export default Admin;
