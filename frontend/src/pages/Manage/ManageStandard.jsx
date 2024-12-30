import React from "react";
import { useState,useEffect } from "react";
import CssStyle from './Manage.module.css'

const ManageStandard = () => {
  const [standard, setStandard] = useState([]);
  const [formData, setFormData] = useState({
    standardName: '',
    sectionId: '',
  });
  const handleViewAll = async () => {
    try {
      const res = await fetch("http://localhost:5000/standard");
      const jsonRes = await res.json();
      setStandard(jsonRes);
      console.log(jsonRes);
    } catch (error) {
      console.error("Error:", error);
    }
  };
   const handleDlt = async (standardId) => {
     try {
       const res = await fetch(`http://localhost:5000/standard/${standardId}`, {
         method: "DELETE",
       });
       console.log(`Deleting standard with ID: ${standardId}`);
       if (res.ok) {
         alert("Standard deleted successfully");
         setStandard((prevStandard) =>
           prevStandard.filter((t) => t.standardId !== standardId)
         );
       } else {
         alert("could not delete standard");
         console.log("Failed to delete standard");
       }
     } catch (error) {
       console.log("Error:", error.message);
     }
   };
  const handleAdd = async () => {
    try {
      const res = await fetch("http://localhost:5000/standard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newStandard = await res.json();
        alert("Standard added successfully");
        setStandard((prevStandard) => [...prevStandard, newStandard]);
      } else {
        const errorResponse = await res.json();
        console.log("Error response:", errorResponse);
        alert(
          "Failed to add Standard: " + (errorResponse.message || "Unknown error")
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <div className={CssStyle.container}>
        <input
          type="text"
          placeholder="Standard Name"
          value={formData.standardName}
          onChange={(e) =>
            setFormData({ ...formData, standardName: e.target.value })
          }
        />
        <select
          value={formData.sectionId}
          onChange={(e) =>
            setFormData({ ...formData, sectionId: Number(e.target.value) })
          }
        >
          <option value="">Select Section</option>
          <option value="1">A</option>
          <option value="2">B</option>
          <option value="3">C</option>
          <option value="4">D</option>
          <option value="5">E</option>
          <option value="6">F</option>
          <option value="7">G</option>
          <option value="8">H</option>
          <option value="9">I</option>
          <option value="10">J</option>
        </select>
         <br />
        <button onClick={handleAdd} className="btn btn-info">
          Add
        </button>
        <br />
        <br />
        <button onClick={handleViewAll} className="btn btn-info">
          View All
        </button>
      </div>
      <ul>
        {standard.map((standard,index) => (
          <li key={standard.standardId||index}>
            <p>Standard Name: {standard.standardName}</p>
            <p>Section:{standard.sectionId}</p>
            { <button
              onClick={() => handleDlt(standard.standardId)}
              className="btn btn-danger"
            >
              Delete
            </button> }
            <br />
            <button className="btn btn-success">Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageStandard;
