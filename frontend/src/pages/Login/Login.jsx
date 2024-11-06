import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import LoginCss from './Login.module.css'
import imgUser from '../../assets/images/userIcon.jpeg'

const Login = () => {
  return (
    <div className={LoginCss.login}>
      <div className={LoginCss.container}>
         <h1>Login In</h1>
         <img src={imgUser} alt="Login" className={LoginCss.loginImg}/>
        <div className={LoginCss.input}>
        <input type="text" placeholder='Email Id' />
        <br/>
        <input type="text" placeholder='Password' />
        <br/>
        </div>
        <div className={LoginCss.options}>
        <label><input type="checkbox" id="remember-me"/> Remember Me</label>
        <a href="#">Forgot Password?</a>
        </div>
      </div>
    </div>
  )
}

export default Login
