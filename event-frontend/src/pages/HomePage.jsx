import "../css/HomePage.css";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="main">
      <div className="container">
        <h1>Welcome to the Portal</h1>
        <p>Select your role to continue</p>
        <div className="login-options">

          <div className="student-link">
            <Link to="/student_login">Student Login</Link>
          </div>
          <div className="teacher-link">
            <Link to="/teacher_login">Teacher Login</Link>
          </div>

        </div>
      </div>
      
    </div>
  );
}

export default HomePage;
