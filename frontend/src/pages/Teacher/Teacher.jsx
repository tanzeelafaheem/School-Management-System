import React from 'react'
import TeacherCss from './Teacher.module.css'

const Teacher = () => {
  return (
    <div className={TeacherCss.teacher}>
      <button className={TeacherCss.btn}>Teacher</button>
    </div>
  )
}

export default Teacher
