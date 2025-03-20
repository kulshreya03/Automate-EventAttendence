import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedStudent = (props) => {
    // let auth={'token': false}
    return (
        props.isAuthenticated ? 
        <Outlet /> : <Navigate to="/student_login" />
    )
}

export default ProtectedStudent;