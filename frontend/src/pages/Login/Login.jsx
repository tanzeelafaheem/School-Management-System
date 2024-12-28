import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginCss from './Login.module.css';
import imgUser from '../../assets/images/userIcon.jpeg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // console.log('handling login');

    if (!email || !password) {
      alert('Please fill in both email and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, pass: password }), 
      });

      const data = await response.json();

      if (response.ok) {
        const { userId, userName, email, phoneNo, userType } = data;

      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', userName);
      localStorage.setItem('email', email);
      localStorage.setItem('phoneNo', phoneNo);
      localStorage.setItem('userType', userType);

        if (userType === 'ADMIN') {
          alert('Welcome, Admin!');
          navigate('/login/admin');
        } else if (userType === 'TEACHER') {
          alert('Welcome, Teacher!');
          navigate('/login/teacher'); 
        } else {
          alert('Unknown user type');
        }
      } else {
        alert(data.message || 'Invalid email or password');
      }
    } catch (error) {
      alert('An error occurred while logging in. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className={LoginCss.login}>
      <div className={LoginCss.container}>
        <h1>Login</h1>
        <img src={imgUser} alt="Login" className={LoginCss.loginImg} />
        <div className={LoginCss.input}>
          <input
            type="text"
            placeholder="Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
        </div>
        <button onClick={handleLogin} id="submit" className={LoginCss.button}>
          Submit
        </button>
        <div className={LoginCss.options}>
          <label>
            <input type="checkbox" id="remember-me" /> Remember Me
          </label>
          <a href="#">Forgot Password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
