import React from 'react'
import ProfileCss from './Profile.module.css'

const profile = () => {
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const email = localStorage.getItem('email');
  const phoneNo = localStorage.getItem('phoneNo');
  const userType = localStorage.getItem('userType');

  return (
    <div>
      <div className={ProfileCss.details}>
      <h1>Profile</h1>
      <h2>{userType}</h2>
      <h2>User Id : {userId}</h2>
      <h2>User Name :{userName}</h2>
      <h2>Email :{email}</h2>
      <h2>Contact No : {phoneNo}</h2>
      </div>
    </div>
  )
}

export default profile
