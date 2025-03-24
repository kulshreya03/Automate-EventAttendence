import React, { useState } from "react";
import '../css/EventData.css';
import { useNavigate } from "react-router-dom";

export const EventData = () => {
  const [formData, setFormData] = useState({
    prn: "",
    name: "",
    year: "FE",
    class: "",
    div: "",
    event: "",
    date: "",
    time: "",
    venue: "",
    faculty: "",
    certificate: null,
  });

  const navigate=useNavigate()
  const [message, setMessage] = useState(""); // For showing submission status


  const logout=async()=>{

    window.localStorage.removeItem("token")
    navigate('/student_login')

  }


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,

      [name]: type === "file" ? files[0] : value, // Store file correctly
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Registration Successful!");
        setFormData({
          prn: "",
          name: "",
          year: "FE",
          class: "",
          div: "",
          event: "",
          date: "",
          time: "",
          venue: "",
          faculty: "",
          certificate: null,
        });
      } else {
        setMessage("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Error submitting form");
    }
  };

  return (
    <div className="background-container">
      <div className="container">
        <h2>Event Registration</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="prn">PRN:</label>
          <input type="text" id="prn" name="prn" value={formData.prn} onChange={handleChange} required />

          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

          <label htmlFor="year">Year:</label>
          <select id="year" name="year" value={formData.year} onChange={handleChange}>
            <option value="FE">First Year</option>
            <option value="SE">Second Year</option>
            <option value="TE">Third Year</option>
            <option value="BE">Final Year</option>
          </select>

          <label htmlFor="class">Class:</label>
          <input type="text" id="class" name="class" value={formData.class} onChange={handleChange} required />

          <label htmlFor="div">Division:</label>
          <input type="text" id="div" name="div" value={formData.div} onChange={handleChange} required />

          <label htmlFor="event">Event Name:</label>
          <input type="text" id="event" name="event" value={formData.event} onChange={handleChange} required />

          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />

          <label htmlFor="time">Time:</label>
          <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required />

          <label htmlFor="venue">Venue:</label>
          <input type="text" id="venue" name="venue" value={formData.venue} onChange={handleChange} required />

          <label htmlFor="faculty">Approving Faculty:</label>
          <input type="text" id="faculty" name="faculty" value={formData.faculty} onChange={handleChange} required />

          <label htmlFor="certificate">Upload Certificate:</label>
          <input type="file" id="certificate" name="certificate" accept=".pdf,.jpg,.png" onChange={handleChange} required />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="submit" className="btn submit">Submit</button>
            <button type="reset" className="btn reset" onClick={() => setFormData({
                prn: "",
                name: "",
                year: "FE",
                class: "",
                div: "",
                event: "",
                date: "",
                time: "",
                venue: "",
                faculty: "",
                certificate: null,
            })}>Reset</button>
          </div>

          <button onClick={logout}>Logout</button>
        </form>
      </div>
    </div>
  );
};
