import React from 'react'
import { useState,useEffect } from 'react'
import CssStyle from './Manage.module.css'


const ManageSubject = () => {
 const [subject, setSubject] = useState([]); 
   const[formData,setFormData]=useState({
     subjectName:'',
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
          setSubject((prevSubjects) => prevSubjects.filter((t) => t.SubjectId !== subjectId));
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
            body: JSON.stringify(formData),
         });
   
           if (res.ok) {
         const newUser = await res.json();
          alert('Subject added successfully');
          setSubject((prevSubjects) => [...prevSubjects, newUser]);
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
   
 
   return (
     <div>
       <div className={CssStyle.container}>
         <input type="text" 
         placeholder="Subject Name" 
         value={formData.subjectName} 
         onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
         />
         <button onClick={handleAdd} className="btn btn-info">Add</button>
         <br /><br />
         <button onClick={handleViewAll} className="btn btn-info">View All</button>
       </div>
       <ul>
   {subject
     .map((subject) => (
       <li key={subject.subjectId}>
         <p>Subject Name: {subject.subjectName}</p>
         <button onClick={()=>handleDlt(subject.subjectId)} className="btn btn-danger">Delete</button>
         <br />
         <button className="btn btn-success">Edit</button>
       </li>
     ))}
 </ul>
     </div>
   );
 };

export default ManageSubject
