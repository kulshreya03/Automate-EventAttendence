import StudentLogin from './pages/StudentLogin'
import TeacherLogin from './pages/TeacherLogin'
import './App.css'
import HomePage from './pages/Homepage'
import {Routes,Route } from 'react-router-dom'
import { EventData } from './pages/EventData'
function App() {


  return (
    <>
      
        <Routes>


          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/student_login' element={ <StudentLogin/> }/>
          <Route path='/teacher_login' element={ <TeacherLogin/> }/>
          <Route path='/event_data' element={<EventData/>}/>

        </Routes>
      
    
      
    </>
  )
}

export default App
