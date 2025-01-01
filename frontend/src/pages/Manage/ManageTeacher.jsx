import React, { useState, useEffect } from 'react';
import CssStyle from './Manage.module.css'

  const ManageTeacher = () => {
  const [teacher, setTeacher] = useState([]); 
  const[addData,setAddData]=useState({
    userName: '',
    email: '',
    pass: '',
    phoneNo: '',
    userType: 'TEACHER',
  })
  const[updateData,setupdateData]=useState({
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
        body: JSON.stringify(addData),
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
  const handleEdit=async(userId)=>{
    try{
      const res=await fetch(`http://localhost:5000/user/${userId}`,{
        method:'PUT',
        headers:{
          'Content-Type':'application/json'
      },
        body:JSON.stringify(updateData)
      })
      if(res.ok){
        const updatedUser = await res.json(); 
          alert("User updated successfully");
          setTeacher((prevUser =>
            prevUser.map((user) =>
              user.userId === userId ? updatedUser : user
            )
          ))}
          else {
          const errorResponse = await res.json(); 
          console.log("Error response:", errorResponse);
          alert("Failed to update User: " + (errorResponse.message || "Unknown error"));
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
        placeholder="User Name" 
        value={addData.userName} 
        onChange={(e) => setaddData({ ...addData, userName: e.target.value })}
        />
        <input type="email" 
        placeholder="Email" 
        value={addData.email}
        onChange={(e) => setAddData({ ...addData, email: e.target.value })}
        />
        <input type="password" 
        placeholder="password"
         value={addData.pass}
         onChange={(e) => setAddData({ ...addData, pass: e.target.value })}
         />
        <input type="text" 
        placeholder="Phone Number"
         value={addData.phoneNo}
         onChange={(e) => setAddData({ ...addData, phoneNo: e.target.value })}
          />
        <button onClick={handleAdd} className="btn btn-info">Add</button>
        <br /><br />
        <button onClick={handleViewAll} className="btn btn-info">View All</button>
      </div>
      <ul>
  {teacher
    .filter((teacher) => teacher.userType === "TEACHER") 
    .map((teacher) => (
      <li key={teacher.userId}>
        <p>Teacher Name: {teacher.userName}</p>
        <p>Email: {teacher.email}</p>
        <p>Contact No: {teacher.phoneNo}</p>
        <button onClick={()=>handleDlt(teacher.userId)} className="btn btn-danger">Delete</button>
        <br />
         <input type="text"
          placeholder='Updated Teacher Name' 
        onChange={(e) => setupdateData({ ...updateData, userName: e.target.value })}/>
         <input type="text"
          placeholder='Updated Email' 
        onChange={(e) => setupdateData({ ...updateData, email: e.target.value })}/>
         <input type="text"
          placeholder='Updated Contact-No' 
        onChange={(e) => setupdateData({ ...updateData, phoneNo: e.target.value })}/>
        <button onClick={()=>handleEdit(teacher.userId)}className="btn btn-success">Edit</button>
      </li>
    ))}
</ul>  
    </div>
  );
};

export default ManageTeacher;
