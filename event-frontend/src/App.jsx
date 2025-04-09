import StudentLogin from './pages/StudentLogin';
import TeacherLogin from './pages/TeacherLogin';
import './App.css';
import HomePage from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';
import { EventData } from './pages/EventData';
import TeacherPage from './pages/TeacherPage';
import ProtectedStudent from './utils/ProtectedStudent';
import ProtectedTeacher from './utils/ProtectedTeacher';

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/student_login" element={<StudentLogin />} />
        <Route path="/teacher_login" element={<TeacherLogin />} />

        {/* Protected Routes for Students */}
        <Route element={<ProtectedStudent />}>
          <Route path="/event_data" element={<EventData />} />
        </Route>

        {/* Protected Routes for Teachers */}
        <Route element={<ProtectedTeacher />}>
          <Route path="/events" element={<TeacherPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
