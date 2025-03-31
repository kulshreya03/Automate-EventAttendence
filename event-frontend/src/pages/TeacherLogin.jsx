import "../css/TeacherLogin.css";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";


function TeacherLogin() {

    const [formData,setFormData]=useState({
        uname:"",
        password:""
    })

     const [message, setMessage] = useState("");
    const navigate = useNavigate(); // ✅ Initialize navigation

    // ✅ Redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem("teacherToken");
        if (token) {
            navigate("/events");
        }
    }, [navigate]);

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
            const response = await fetch("http://localhost:5000/api/loginTeacher", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("teacherToken", data.token); // ✅ Store token
                localStorage.setItem("div", data.div); //Store teacher div
                navigate("/events"); // ✅ Redirect on success
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
                <h2>Teacher Login</h2>
                {message && <p className="message">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <label>Enter Your Username</label>
                    <input type="text" name="uname" placeholder="Enter Username" value={formData.uname} onChange={handleChange} required />

                    <label>Enter Your Password</label>
                    <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required /><br></br>
                    <button type="submit">Login</button>
                
                </form>
            </div>
        </div>
    );
}

export default TeacherLogin;
