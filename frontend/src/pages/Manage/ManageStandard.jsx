import React, { useState, useEffect } from "react";
import CssStyle from "./Manage.module.css";

const ManageStandard = () => {
  const [standard, setStandard] = useState([]);
  const [sections, setSections] = useState([]); 
  const [addData, setaddData] = useState({
    standardName: "",
    sectionId: "",
  });
  const[updateData,setupdateData]=useState({
    standardName: standard.standardName,
    sectionId: standard.sectionId,
     })

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
        body: JSON.stringify(addData),
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
  //Update a standard
  const handleEdit=async(standardId)=>{
     try{
      const res=await fetch(`http://localHost:5000/standard/${standardId}`,{
        method:'PUT',headers:{
          'Content-Type':'application/json'
      },
        body:JSON.stringify(updateData)
      })
      if(res.ok){
        const updatedStandard = await res.json(); 
          alert("Standard updated successfully");
          setStandard((prevStandard =>
            prevStandard.map((standard) =>
              standard.standardId === standardId ? updatedStandard : standard
            )
          ))}
          else {
          const errorResponse = await res.json(); 
          console.log("Error response:", errorResponse);
          alert("Failed to update Standard: " + (errorResponse.message || "Unknown error"));
        }}
        catch(error){
          console.error("An error occurred:", error);
          alert("Something went wrong. Please try again.");
        }  
     }
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
          value={addData.standardName}
          onChange={(e) =>
            setaddData({ ...addData, standardName: e.target.value })
          }
        />
        <select
          value={addData.sectionId}
          onChange={(e) =>
            setaddData({ ...addData, sectionId: Number(e.target.value) })
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
            <div className={CssStyle.update}></div>
            <input type="text"
          placeholder='Updated Standard Name' 
        onChange={(e) => setupdateData({ ...updateData, standardName: e.target.value })}/> <br />
        <select
          onChange={(e) =>
            setupdateData({ ...updateData, sectionId: Number(e.target.value) })
          }
        >
          <option value="">Select Section</option>
          {sections.map((section) => (
            <option key={section.sectionId} value={section.sectionId}>
              {section.sectionName}
            </option>
          ))}
        </select>

      <button onClick={()=>handleEdit(standard.standardId)}className="btn btn-success">Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageStandard;
