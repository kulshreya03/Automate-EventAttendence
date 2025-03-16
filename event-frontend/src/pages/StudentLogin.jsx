import "../css/StudentLogin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function StudentLogin() {

    const [formData,setFormData]=useState({
        prn:"",
        password:""
    })

    const [message, setMessage] = useState(""); // ✅ For showing error/success messages
    const navigate = useNavigate(); // ✅ Initialize navigation

    function handleChange(e)
    {
        const {name,value}=e.target;

        setFormData((prev)=>(
            {...prev,[name]:value}
        ))


    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token); // ✅ Store token
                navigate("/event_data"); // ✅ Redirect on success
            } else {
                setMessage(data.message); // Show error message
            }
        } catch (error) {
            console.error("Login error:", error);
            setMessage("Error logging in. Try again!");
        }
    }



    return (
        <div className="main">
            <div className="form-container">
                <h2>Student Login</h2>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <label>Enter Your PRN</label>
                    <input type="text" name="prn" placeholder="Enter PRN" value={formData.prn} onChange={handleChange} required />

                    <label>Enter Your Password</label>
                    <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required /><br></br>
                    <button type="submit">Login</button>
                
                </form>
            </div>
        </div>
    );
}

export default StudentLogin;
