import React from "react";
import { useState, useEffect } from "react";
import CssStyle from "./Manage.module.css";

const ManageSchedule = () => {
  const [user, setUser] = useState([]);
  const [subject, setSubject] = useState([]);
  const [standard, setStandard] = useState([]);
  const [section, setSection] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [addData, setAddData] = useState({
    userId: "",
    standardId: "",
    sectionId: "",
    subjectId: "",
    startTime: "",
    endTime: "",
    scheduleDate: "",
  });
  const [updateData, setUpdateData] = useState({
    userId: schedule.userId,
    standardId: schedule.standardId,
    sectionId: schedule.sectionId,
    subjectId: schedule.sectionId,
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    scheduleDate: schedule.scheduleDate,
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
        body: JSON.stringify(addData),
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

  const handleDlt = async (scheduleId) => {
    try {
      const res = await fetch(`http://localhost:5000/schedule/${scheduleId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Schedule deleted succesfully!!");
        setSchedule((prevSchedule) =>
          prevSchedule.filter((t) => t.scheduleId !== schedule.scheduleId)
        );
      } else {
        alert("Could not delete Schedule");
      }
    } catch (error) {
      console.log("Erro:", error.message);
    }
  };

  const handleEdit = async (scheduleId) => {
    if (
      !updateData.userId ||
      !updateData.subjectId ||
      !updateData.scheduleDate
    ) {
      alert("Please fill out all required fields before submitting.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/schedule/${scheduleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (res.ok) {
        const updatedSchedule = await res.json();
        alert("Schedule updated successfully!");
        setSchedule((prevSchedule) =>
          prevSchedule.map((schedule) =>
            schedule.scheduleId === scheduleId ? updatedSchedule : schedule
          )
        );
      } else {
        const errorResponse = await res.json();
        console.error("Error response:", errorResponse);
        alert(
          "Failed to update schedule: " +
            (errorResponse.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Something went wrong. Please try again.");
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
          value={addData.userId || ""}
          onChange={(e) =>
            setAddData({ ...addData, userId: Number(e.target.value) })
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
        </select>
        <br />
        <select
          value={addData.subjectId || ""}
          onChange={(e) =>
            setAddData({ ...addData, subjectId: Number(e.target.value) })
          }
        >
          <option value="">Select Subject</option>
          {subject.map((subject) => (
            <option key={subject.subjectId} value={subject.subjectId}>
              {subject.subjectName}
            </option>
          ))}
        </select>
        <br />
        <select
          value={addData.standardId || ""}
          onChange={(e) =>
            setAddData({ ...addData, standardId: Number(e.target.value) })
          }
        >
          <option value="">Select Standard</option>
          {standard.map((standard) => (
            <option key={standard.standardId} value={standard.standardId}>
              {standard.standardName}
            </option>
          ))}
        </select>
        <br />
        <select
          value={addData.sectionId || ""}
          onChange={(e) =>
            setAddData({ ...addData, sectionId: Number(e.target.value) })
          }
        >
          <option value="">Select Section</option>
          {section.map((section) => (
            <option key={section.sectionId} value={section.sectionId}>
              {section.sectionName}
            </option>
          ))}
        </select>
        <br />
        <p>Start-Time</p>
        <input
          type="time"
          value={addData.startTime || ""}
          onChange={(e) =>
            setAddData({ ...addData, startTime: e.target.value })
          }
        />
        <p>End-Time</p>
        <input
          type="time"
          value={addData.endTime || ""}
          onChange={(e) => setAddData({ ...addData, endTime: e.target.value })}
        />
        <p>Schedule Date</p>
        <input
          type="date"
          value={addData.scheduleDate || ""}
          onChange={(e) =>
            setaddData({ ...addData, scheduleDate: e.target.value })
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
              className="btn btn-danger"
            >
              Delete
            </button>
            <br />
            <div className={CssStyle.edit}>
              <select
                value={updateData.userId || ""}
                onChange={(e) => setUpdateData({
                    ...updateData,
                    userId: Number(e.target.value),
                  })
                }
              >
                <option value="">Select Teacher</option>
                {user
                  .filter((u) => u.userType === "TEACHER")
                  .map((u) => (
                    <option key={u.userId} value={u.userId}>
                      {u.userName}
                    </option>
                  ))}
              </select>
              <br />
              <select
                value={updateData.subjectId || ""}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    subjectId: Number(e.target.value),
                  })
                }
              >
                <option value="">Select Subject</option>
                {subject.map((s) => (
                  <option key={s.subjectId} value={s.subjectId}>
                    {s.subjectName}
                  </option>
                ))}
              </select>
              <br />
              <select
                value={updateData.standardId || ""}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    standardId: Number(e.target.value),
                  })
                }
              >
                <option value="">Select Standard</option>
                {standard.map((s) => (
                  <option key={s.standardId} value={s.standardId}>
                    {s.standardName}
                  </option>
                ))}
              </select>
              <br />
              <select
                value={updateData.sectionId || ""}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    sectionId: Number(e.target.value),
                  })
                }
              >
                <option value="">Select Section</option>
                {section.map((s) => (
                  <option key={s.sectionId} value={s.sectionId}>
                    {s.sectionName}
                  </option>
                ))}
              </select>
              <br />
              <p>Start-Time</p>
              <input
                type="time"
                value={updateData.startTime || ""}
                onChange={(e) =>
                  setUpdateData({ ...updateData, startTime: e.target.value })
                }
              />
              <p>End-Time</p>
              <input
                type="time"
                value={updateData.endTime || ""}
                onChange={(e) =>
                  setUpdateData({ ...updateData, endTime: e.target.value })
                }
              />
              <p>Schedule Date</p>
              <input
                type="date"
                value={updateData.scheduleDate || ""}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    scheduleDate: e.target.value,
                  })
                }
              />
              <button
                onClick={() => handleEdit(schedule.scheduleId)}
                className="btn btn-success"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ManageSchedule;
