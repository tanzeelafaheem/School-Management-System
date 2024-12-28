import React from 'react'
import HomeCss from './Home.module.css'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className={HomeCss.home}>
    <div className={HomeCss.container}>
        <h1>Login As...?</h1>
        <Link to="/login">
        <button id="teacher" className={HomeCss.btn}>Teacher</button>
      </Link>
      <button id="Admin" className={HomeCss.btn}>Admin</button>
    </div>
    </div>
  )
}

export default Home
