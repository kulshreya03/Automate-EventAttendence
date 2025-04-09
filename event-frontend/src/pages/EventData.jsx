// --- START OF FILE EventData.jsx ---

import React, { useState, useEffect } from "react"; // Added useEffect
import "../css/EventData.css";
import { useNavigate } from "react-router-dom";

export const EventData = () => {
  const initialFormData = {
    prn: "",
    name: "",
    year: "FE",
    div: "",
    event: "",
    date: "",
    time: "",
    venue: "",
    faculty: "",
    certificate: null,
    permit: false, // This field wasn't in the form, assuming it's handled elsewhere or default
  };

  const [formData, setFormData] = useState(initialFormData);
  // Use an object for message state to store text and type (success/error)
  const [message, setMessage] = useState(null); // { text: string, type: 'success' | 'error' } | null
  const navigate = useNavigate();

  // Clear message after a few seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 5000); // Message disappears after 5 seconds
      return () => clearTimeout(timer); // Cleanup timer on component unmount or message change
    }
  }, [message]);


  const logout = async () => {
    // Consider adding confirmation dialog here
    window.localStorage.removeItem("token");
    navigate("/student_login");
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target; // Added checked for potential future checkboxes like 'permit'

    // Clear message when user starts typing again
    if (message) setMessage(null);

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  const handleReset = () => {
      setFormData(initialFormData);
      // Reset file input visually (important!)
      const fileInput = document.getElementById('certificate');
      if(fileInput) fileInput.value = null;
      setMessage(null); // Clear any existing messages
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null); // Clear previous messages

    const formDataToSend = new FormData();
    // Append all form data including the file
    Object.keys(formData).forEach((key) => {
        // Ensure null files aren't appended as "null" strings if not required
        if (key === 'certificate' && !formData[key]) {
            // Optionally skip appending if certificate is not mandatory
            // Or handle server-side if it expects null/empty
        } else {
             formDataToSend.append(key, formData[key]);
        }
    });

    // Log FormData contents for debugging (optional)
    // for (let [key, value] of formDataToSend.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        // 'Content-Type': 'multipart/form-data' is set automatically by browser when using FormData
        body: formDataToSend,
        // Add authorization header if needed
        // headers: {
        //   'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        // }
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: "Registration Successful!", type: "success" });
        handleReset(); // Use the reset handler to clear the form
      } else {
        setMessage({ text: `Error: ${data.message || 'Registration failed'}`, type: "error" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage({ text: `Error submitting form: ${error.message || 'Network or server error'}`, type: "error" });
    }
  };

  return (
    <div className="event-registration-container">
      <div className="form-card">
        <h2>Event Registration</h2>

        {/* Conditionally render message with dynamic class */}
        {message && (
          <p className={`message ${message.type}`}>
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate> {/* Added noValidate to rely on custom/backend validation */}
          <div className="form-group">
            <label htmlFor="prn">PRN:</label>
            <input
              type="text"
              id="prn"
              name="prn"
              value={formData.prn}
              onChange={handleChange}
              required
              placeholder="Enter your PRN"
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Year:</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required /* Make select required */
            >
              {/* Optional: Add a default disabled option */}
              {/* <option value="" disabled>Select Year</option> */}
              <option value="FE">First Year</option>
              <option value="SE">Second Year</option>
              <option value="TE">Third Year</option>
              <option value="BE">Final Year</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="div">Division:</label>
            <input
              type="text"
              id="div"
              name="div"
              value={formData.div}
              onChange={handleChange}
              required
              placeholder="Enter your division (e.g., A, B)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="event">Event Name:</label>
            <input
              type="text"
              id="event"
              name="event"
              value={formData.event}
              onChange={handleChange}
              required
              placeholder="Enter the name of the event"
            />
          </div>

          {/* Consider grouping Date & Time */}
          <div style={{ display: 'flex', gap: '15px' }}> {/* Inline style for simple grouping */}
            <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="date">Date:</label>
                <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                />
            </div>

            <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="time">Time:</label>
                <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                />
            </div>
          </div>


          <div className="form-group">
            <label htmlFor="venue">Venue:</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
              placeholder="Enter the event venue"
            />
          </div>

          <div className="form-group">
            <label htmlFor="faculty">Approving Faculty:</label>
            <input
              type="text"
              id="faculty"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
              required
              placeholder="Name of the faculty coordinator"
            />
          </div>

          <div className="form-group">
            {/* Clarify if certificate is optional or required */}
            <label htmlFor="certificate">Upload Certificate (Optional):</label>
            <input
              type="file"
              id="certificate"
              name="certificate"
              accept=".pdf,.jpg,.jpeg,.png" // Added jpeg
              onChange={handleChange}
            />
             <small style={{ display: 'block', marginTop: '5px', color: '#777' }}>
                Accepted formats: PDF, JPG, PNG. Max size: 5MB (Example)
             </small>
          </div>

          {/* Example Checkbox if 'permit' was intended for the form */}
          {/* <div className="form-group" style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              id="permit"
              name="permit"
              checked={formData.permit}
              onChange={handleChange}
              style={{ width: 'auto', height: 'auto' }} // Override default input styles for checkbox
            />
            <label htmlFor="permit" style={{ marginBottom: '0', fontWeight: 'normal' }}> {/* Adjust label style */}
              {/* I have obtained necessary permission. */}
            {/* </label>
          </div> */}

          <div className="form-buttons">
            <button type="submit" className="btn submit">
              Submit
            </button>
            {/* Use the dedicated reset handler */}
            <button
              type="button" // Important: change type to button to prevent form submission
              className="btn reset"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>

        <button className="btn logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

// --- END OF FILE EventData.jsx ---