import React, { useState } from "react";
import "../css/TeacherPage.css"; // Importing CSS for styling

export const TeacherPage = () => {
  const [division, setDivision] = useState("");  // State for input division
  const [students, setStudents] = useState([]);  // State for fetched students
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch students based on division
  const fetchStudents = async () => {
    if (!division) {
      setError("Please enter a division.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`http://localhost:5000/api/events/${division.toUpperCase()}`);
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

      {/* Input field to enter division */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter Division (e.g., B)"
          value={division}
          onChange={(e) => setDivision(e.target.value.toUpperCase())}
          className="search-input"
        />
        <button onClick={fetchStudents} className="search-button">
          Search
        </button>
      </div>

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
    </div>
  );
};

export default TeacherPage;
