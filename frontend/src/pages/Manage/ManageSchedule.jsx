import React from "react";
import { useState, useEffect } from "react";
import CssStyle from "./Manage.module.css";

const ManageSchedule = () => {
  const [user, setUser] = useState([]);
  const [subject, setSubject] = useState([]);
  const [standard, setStandard] = useState([]);
  const [section, setSection] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    standardId: "",
    sectionId: "",
    subjectId: "",
    startTime: "",
    endTime: "",
    scheduleDate: "",
  });

  const fetchStandard = async () => {
    try {
      const res = await fetch("http://localhost:5000/standard");
      const jsonRes = await res.json();
      setStandard(jsonRes);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };
  const fetchUSer = async () => {
    try {
      const res = await fetch("http://localhost:5000/user");
      const jsonRes = await res.json();
      setUser(jsonRes);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };
  const fetchSubject = async () => {
    try {
      const res = await fetch("http://localhost:5000/subject");
      const jsonRes = await res.json();
      setSubject(jsonRes);
    } catch (error) {
      console.error("Error fetching Subjects:", error);
    }
  };
  const fetchSection = async () => {
    try {
      const res = await fetch("http://localhost:5000/section");
      const jsonRes = await res.json();
      setSection(jsonRes);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };
  const ViewAllSchedule = async () => {
    try {
      const res = await fetch("http://localhost:5000/schedule");
      const jsonRes = await res.json();
      setSchedule(jsonRes);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };
  const handleAdd = async () => {
    try {
      const res = await fetch("http://localhost:5000/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newSchedule = await res.json();
        alert("Schedule added successfully");
        setStandard((prevSchedule) => [...prevSchedule, newSchedule]);
      } else {
        const errorResponse = await res.json();
        console.log("Error response:", errorResponse);
        alert(
          "Failed to add Schedule: " +
            (errorResponse.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleDlt= async(scheduleId)=>{
    try{
      const res=await fetch(`http://localhost:5000/schedule/${scheduleId}`,{
        method:"DELETE",
      })
      if(res.ok){
        alert("Schedule deleted succesfully!!");
        setSchedule((prevSchedule)=>prevSchedule.filter((t)=>t.scheduleId!==schedule.scheduleId));
      }
      else{
        alert("Could not delete Schedule")
      }
    } catch(error){
      console.log("Erro:",error.message);
    }
  };

  useEffect(() => {
    fetchUSer();
    fetchSubject();
    fetchStandard();
    fetchSection();
  }, []);

  return (
    <div>
      <div className={CssStyle.container}>
        <select
          value={formData.userId}
          onChange={(e) =>
            setFormData({ ...formData, userId: Number(e.target.value) })
          }
        >
          <option value="">Select Teacher</option>
          {user
            .filter((user) => user.userType === "TEACHER")
            .map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.userName}
              </option>
            ))}
        </select>{" "}
        <br />
        <select
          value={formData.subjectId}
          onChange={(e) =>
            setFormData({ ...formData, subjectId: Number(e.target.value) })
          }
        >
          <option value="">Select Subject</option>
          {subject.map((subject) => (
            <option key={subject.subjectId} value={subject.subjectId}>
              {subject.subjectName}
            </option>
          ))}
        </select>{" "}
        <br />
        <select
          value={formData.standardId}
          onChange={(e) =>
            setFormData({ ...formData, standardId: Number(e.target.value) })
          }
        >
          <option value="">Select Standard</option>
          {standard.map((standard) => (
            <option key={standard.standardId} value={standard.standardId}>
              {standard.standardName}
            </option>
          ))}
        </select>{" "}
        <br />
        <select
          value={formData.sectionId}
          onChange={(e) =>
            setFormData({ ...formData, sectionId: Number(e.target.value) })
          }
        >
          <option value="">Select Section</option>
          {section.map((section) => (
            <option key={section.sectionId} value={section.sectionId}>
              {section.sectionName}
            </option>
          ))}
        </select>{" "}
        <br />
        <p>Start-Time</p>
        <input
          type="time"
          value={formData.startTime}
          onChange={(e) =>
            setFormData({ ...formData, startTime: e.target.value })
          }
        />
        <p>End-Time</p>
        <input
          type="time"
          value={formData.endTime}
          onChange={(e) =>
            setFormData({ ...formData, endTime: e.target.value })
          }
        />
        <p>Schedule Date</p>
        <input
          type="date"
          value={formData.scheduleDate}
          onChange={(e) =>
            setFormData({ ...formData, scheduleDate: e.target.value })
          }
        />
        <button onClick={handleAdd} className="btn btn-info">
          Add
        </button>
        <br />
        <br />
        <button onClick={ViewAllSchedule} className="btn btn-info">
          View All
        </button>
      </div>
      <ul>
        {schedule.map((schedule, index) => (
          <li key={schedule.scheduleId || index}>
            <p>Teacher: {schedule.userName}</p>
            <p>Subject : {schedule.subjectName}</p>
            <p>Standard: {schedule.standardName}</p>
            <p>Section: {schedule.sectionName}</p>
            <p>Start Time: {schedule.startTime}</p>
            <p>End Time: {schedule.endTime}</p>
            <p>Schedule Date: {schedule.Scheduledate}</p>
            <button
            onClick={() => handleDlt(schedule.scheduleId)}
              className="btn btn-danger" >
              Delete
            </button>
            <br />
            <div className={CssStyle.edit}></div>
            <button className="btn btn-success">Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageSchedule;
