import React, { useState } from "react";
import "../css/TeacherPage.css"; // Importing CSS for styling
import { useNavigate } from "react-router-dom";

export const TeacherPage = () => {
  const [students, setStudents] = useState([]);  // State for fetched students
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const assignedDivision = localStorage.getItem("div"); //assign at login
  const approvingFaculty = localStorage.getItem("faculty");  //assign faculty at login

  const logout=async()=>{ 
    localStorage.removeItem('teacherToken');
    localStorage.removeItem('div');
    localStorage.removeItem('faculty');
    navigate('/teacher_login')
  }

  // Function to fetch students based on division
  const fetchStudents = async () => {

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:5000/api/events/${assignedDivision.toUpperCase()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch data");
      }

      setStudents(data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const fetchFaculty = async () => {

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:5000/api/faculty/${encodeURIComponent(approvingFaculty)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch data");
      }

      setStudents(data);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="teacher-container">
      <h1>Search Students by Division</h1>

      {/* Input field to enter division 
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter Division (e.g., B)"
          value={division}
          onChange={(e) => setDivision(e.target.value.toUpperCase())}
          className="search-input"
        />
        
      </div> */}

        <button onClick={fetchStudents} className="search-button">
          Class Teacher
        </button>

        <button onClick={fetchFaculty} className="search-button">
          Approving Faculty
        </button>


      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}

      {/* Students Table */}
      {students.length > 0 && (
        <table className="students-table">
          <thead>
            <tr>
              <th>Event ID</th>
              <th>PRN</th>
              <th>Name</th>
              <th>Certificate</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.event_id}</td>
                <td>{student.prn}</td>
                <td>{student.name}</td>
                <td>{student.certificate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* No Results Found */}
      {!loading && students.length === 0 && !error && (
        <p className="no-results">No students found for this division.</p>
      )}


      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default TeacherPage;
