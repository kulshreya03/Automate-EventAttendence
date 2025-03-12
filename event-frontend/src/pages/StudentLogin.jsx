import "../css/StudentLogin.css";
import { useState } from "react";
function StudentLogin() {

    const [formData,setFormData]=useState({
        prn:"",
        password:""
    })

    function handleChange(e)
    {
        const {name,value}=e.target;

        setFormData((prev)=>(
            {...prev,[name]:value}
        ))


    }

    function handleSubmit(e)
    {
        e.preventDefault()

        console.log("Form Submitted",formData)


    }



    return (
        <div className="main">
            <div className="form-container">
                <h2>Student Login</h2>
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
