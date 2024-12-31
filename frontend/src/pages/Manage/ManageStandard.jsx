import React, { useState, useEffect } from "react";
import CssStyle from "./Manage.module.css";

const ManageStandard = () => {
  const [standard, setStandard] = useState([]);
  const [sections, setSections] = useState([]); 
  const [formData, setFormData] = useState({
    standardName: "",
    sectionId: "",
  });

  // Fetch sections from the Section table
  const fetchSections = async () => {
    try {
      const res = await fetch("http://localhost:5000/section"); 
      const jsonRes = await res.json();
      setSections(jsonRes);
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  // Fetch all standards
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

  // Delete a standard
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
        alert("Could not delete standard");
        console.log("Failed to delete standard");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  // Add a new standard
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

  // Fetch sections
  useEffect(() => {
    fetchSections();
  }, []);

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
          {sections.map((section) => (
            <option key={section.sectionId} value={section.sectionId}>
              {section.sectionName}
            </option>
          ))}
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
        {standard.map((standard, index) => (
          <li key={standard.standardId || index}>
            <p>Standard Name: {standard.standardName}</p>
            <p>
              Section:{" "}
              {
                sections.find((section) => section.sectionId === standard.sectionId)
                  ?.sectionName
              }
            </p>
            <button
              onClick={() => handleDlt(standard.standardId)}
              className="btn btn-danger"
            >
              Delete
            </button>
            <br />
            <div className={CssStyle.edit}></div>
            <input type="text" placeholder="Standard Name" />
            <input type="text" placeholder="Section" />
            <button className="btn btn-success">Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageStandard;
