import React from 'react'
import { useState,useEffect } from 'react'
import CssStyle from './Manage.module.css'


const ManageSubject = () => {
 const [subject, setSubject] = useState([]); 
   const[addData,setAddData]=useState({
     subjectName:'',
   })
   const[updateData,setupdateData]=useState({
    subjectName:subject.subjectName
   })
   const handleViewAll = async () => {
     try {
       const res = await fetch("http://localhost:5000/subject");
       const jsonRes = await res.json();
       setSubject(jsonRes); 
       console.log(jsonRes);
     } catch (error) {
       console.error("Error:", error);
     }
   };
     const handleDlt=async(subjectId)=>{
      try{
        const res=await fetch(`http://localhost:5000/subject/${subjectId}`,{
          method:"DELETE",
        });
        console.log(`Deleting subject with ID: ${subjectId}`);
        if(res.ok){
          alert("subject deleted successfully");
          setSubject((prevSubjects) => prevSubjects.filter((t) => t.subjectId !== subjectId));
        }
        else{
          alert("could not delete subject");
          console.log("Failed to delete subject")
        }
      }
      catch(error){
        console.log("Error:",error.message);
      }
    };
      const handleAdd = async () => {
        try {
        const res = await fetch("http://localhost:5000/subject", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(addData),
         });
   
           if (res.ok) {
         const newSubject = await res.json();
          alert('Subject added successfully');
          setSubject((prevSubjects) => [...prevSubjects, newSubject]);
        } else {
          const errorResponse = await res.json(); 
          console.log("Error response:", errorResponse);
          alert("Failed to add Subject: " + (errorResponse.message || "Unknown error"));
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("Something went wrong. Please try again.");
      }
    };
     const handleEdit=async(subjectId)=>{
       try{
         const res=await fetch(`http://localhost:5000/subject/${subjectId}`,{
           method:'PUT',
           headers:{
             'Content-Type':'application/json'
         },
           body:JSON.stringify(updateData)
         })
         if (res.ok) {
          const updatedSubject = await res.json(); 
          alert("Subject updated successfully");
          setSubject((prevSubjects) =>
            prevSubjects.map((subject) =>
              subject.subjectId === subjectId ? updatedSubject : subject
            )
          )}else {
          const errorResponse = await res.json(); 
          console.log("Error response:", errorResponse);
          alert("Failed to update Subject: " + (errorResponse.message || "Unknown error"));
        }}
        catch(error){
          console.error("An error occurred:", error);
          alert("Something went wrong. Please try again.");
        }  
     }
   
 
   return (
     <div>
       <div className={CssStyle.container}>
         <input type="text" 
         placeholder="Subject Name" 
         value={addData.subjectName} 
         onChange={(e) => setAddData({ ...addData, subjectName: e.target.value })}
         />
         <button onClick={handleAdd} className="btn btn-info">Add</button>
         <br /><br />
         <button onClick={handleViewAll} className="btn btn-info">View All</button>
       </div>
       <ul>
  {subject.map((subject, index) => (
    <li key={subject.subjectId || index}>
      <p>Subject Name: {subject.subjectName}</p>
      <button onClick={() => handleDlt(subject.subjectId)} className="btn btn-danger">Delete</button>
      <br />
      <input type="text"
       placeholder='Updated Subject Name' 
        onChange={(e) => setupdateData({ ...updateData, subjectName: e.target.value })}/> <br />
      <button onClick={()=>handleEdit(subject.subjectId)}className="btn btn-success">update</button>
    </li>
  ))}
</ul>

     </div>
   );
 };

export default ManageSubject
