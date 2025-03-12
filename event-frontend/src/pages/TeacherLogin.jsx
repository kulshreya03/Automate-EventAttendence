import "../css/TeacherLogin.css";
import { useState } from "react";

function TeacherLogin() {

    const [formData,setFormData]=useState({
        username:"",
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
                <h2>Teacher Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>Enter Your Username</label>
                    <input type="text" name="username" placeholder="Enter Username" value={formData.username} onChange={handleChange} required />

                    <label>Enter Your Password</label>
                    <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required /><br></br>
                    <button type="submit">Login</button>
                
                </form>
            </div>
        </div>
    );
}

export default TeacherLogin;
