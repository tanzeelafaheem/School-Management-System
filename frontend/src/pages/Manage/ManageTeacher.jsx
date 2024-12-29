import React, { useState, useEffect, cloneElement } from 'react';

const Manage = () => {
  const [teacher, setTeacher] = useState([]); 
  const[formData,setFormData]=useState({
    userName: '',
    email: '',
    pass: '',
    phoneNo: '',
    userType: 'TEACHER',
  })
  const handleViewAll = async () => {
    try {
      const res = await fetch("http://localhost:5000/user");
      const jsonRes = await res.json();
      setTeacher(jsonRes); 
      console.log(jsonRes);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDlt=async(userId)=>{
    try{
      const res=await fetch(`http://localhost:5000/user/${userId}`,{
        method:"DELETE",
      });
      console.log(`Deleting user with ID: ${userId}`);
      if(res.ok){
        alert("user deleted successfully");
        setTeacher((prevTeachers) => prevTeachers.filter((t) => t.userId !== userId));
      }
      else{
        alert("could not delete user");
        console.log("Failed to delete user")
      }
    }
    catch(error){
      console.log("Error:",error.message);
    }
  };
  const handleAdd = async () => {
    try {
      const res = await fetch("http://localhost:5000/user", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (res.ok) {
        const newUser = await res.json();
        alert('User added successfully');
        setTeacher((prevTeachers) => [...prevTeachers, newUser]);
      } else {
        const errorResponse = await res.json(); 
        console.log("Error response:", errorResponse);
        alert("Failed to add User: " + (errorResponse.message || "Unknown error"));
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div>
      <div className="add">
        <input type="text" 
        placeholder="User Name" 
        value={formData.userName} 
        onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
        />
        <input type="email" 
        placeholder="Email" 
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input type="password" 
        placeholder="password"
         value={formData.pass}
         onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
         />
        <input type="text" 
        placeholder="Phone Number"
         value={formData.phoneNo}
         onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
         />
        <button onClick={handleAdd}>Add</button>
      </div>
      <button onClick={handleViewAll}>View All</button>
      <ul>
  {teacher
    .filter((teacher) => teacher.userType === "TEACHER") // Filter for userType: "TEACHER"
    .map((teacher) => (
      <li key={teacher.userId}>
        <p>Teacher Name: {teacher.userName}</p>
        <p>Email: {teacher.email}</p>
        <p>Contact No: {teacher.phoneNo}</p>
        <button onClick={()=>handleDlt(teacher.userId)}>Delete</button>
        <br />
        <button>Edit</button>
      </li>
    ))}
</ul>
    </div>
  );
};

export default Manage;
