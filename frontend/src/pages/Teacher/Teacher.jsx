import React, { useState } from 'react';
import TeacherCss from './Teacher.module.css';
import { Link } from 'react-router-dom';

const Teacher = () => {
  const [schedule, setSchedule] = useState([]); 
  const handleClick1 = async () => {
    try {
      const res = await fetch("http://localhost:5000/schedule");
      const jsonRes = await res.json();
      setSchedule(jsonRes); 
      console.log(jsonRes);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={TeacherCss.teacher}>
      <button onClick={handleClick1} className={TeacherCss.ele}>Today's Schedule</button>
      
      <select className={TeacherCss.ele}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <Link to ="/login/teacher/profile">
      <button className={TeacherCss.ele}>My Profile</button>
      </Link>
      <br />
      <div className={TeacherCss.scheduleList}>
          <ul>
            {schedule.map((item, index) => (
              <li key={index} className={TeacherCss.scheduleItem}>
                <h3>{item.subjectName}</h3>
                <p>Teacher: {item.userName}</p>
                <p>Class: {item.standardName} - Section: {item.sectionName}</p>
                <p>Start Time: {item.startTime}</p>
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
};

export default Teacher;
