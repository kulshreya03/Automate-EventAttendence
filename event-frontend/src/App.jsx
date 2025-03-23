import StudentLogin from './pages/StudentLogin'
import TeacherLogin from './pages/TeacherLogin'
import './App.css'
import HomePage from './pages/Homepage'
import {Routes,Route } from 'react-router-dom'
import { EventData } from './pages/EventData'
import TeacherPage from './pages/TeacherPage'
import { useState } from 'react'
import ProtectedStudent from './utils/ProtectedStudent'
import ProtectedTeacher from './utils/ProtectedTeacher'

function App() {
  const [isLoggedIn,setLoggedIn]=useState()

  return (
    <>
        <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/student_login" element={<StudentLogin />} />
        <Route path="/teacher_login" element={<TeacherLogin />} />

        {/* Protected routes for students */}
        <Route element={<ProtectedStudent />}>
          <Route path="/event_data" element={<EventData />} />
        </Route>

        {/* Protected routes for teachers */}
        <Route element={<ProtectedTeacher />}>
          <Route path="/events" element={<TeacherPage />} />
        </Route>
      
        </Routes>
      
        
    </>
  )
}

export default App
