import React, { useState } from 'react';
import TeacherCss from './Teacher.module.css';
import { Link } from 'react-router-dom';

const Teacher = () => {
  const userId = localStorage.getItem('userId');
  const [schedule, setSchedule] = useState([]); 
  const [date, setDate] = useState('');

  const handleFetchSchedule = async (fetchDate) => {
    try {
      const res = await fetch(`http://localhost:5000/schedule/user/${userId}/date/${fetchDate}`);
      const jsonRes = await res.json();
      setSchedule([jsonRes]);  
      console.log(jsonRes);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTodaySchedule = () => {
    const todayDate = new Date().toISOString().split('T')[0]; 
    setDate(todayDate);
    handleFetchSchedule(todayDate);
  };
  const handleDateSchedule = () => {
    if (date) {
      handleFetchSchedule(date); 
    } else {
      alert("Please select a date first.");
    }
  };

  return (
    <div className={TeacherCss.teacher}>
 
      <button onClick={handleTodaySchedule} className={TeacherCss.ele}>Today's Schedule</button>
      
      <input type="date" onChange={(e) => setDate(e.target.value)} value={date} />
    
      <button onClick={handleDateSchedule}>Fetch</button>
      <Link to="/login/teacher/profile">
        <button className={TeacherCss.ele}>My Profile</button>
      </Link>
      <br />
      <div className={TeacherCss.scheduleList}>
        <div>
          {Array.isArray(schedule) && schedule.length > 0 ? (
            schedule.map((item, index) => (
              <div key={item.scheduleId || index}>
                <h2>{item.subjectName}</h2>
                <p>Teacher: {item.userName}</p>
                <p>Class: {item.standardName} - Section: {item.sectionName}</p>
                <p>Start Time: {item.startTime}</p>
                <p>End Time: {item.endTime}</p>
                <p>Schedule Date: {date}</p>
              </div>
            ))
          ) : (
            <p>No schedules available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Teacher;
