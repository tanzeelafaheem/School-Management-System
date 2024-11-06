import React from 'react'
import HomeCss from './Home.module.css'

const Home = () => {
  return (
    <div className={HomeCss.home}>
    <div className={HomeCss.container}>
        <h1>Login As...?</h1>
      <button className={HomeCss.btn}>Admin</button>
      <button className={HomeCss.btn}>Teacher</button>
    </div>
    </div>
  )
}

export default Home
