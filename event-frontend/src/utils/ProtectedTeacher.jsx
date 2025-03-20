import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedTeacher = (props) => {
    // let auth={'token': false}
    return (
        props.isAuthenticated ? 
        <Outlet /> : <Navigate to="/teacher_login" />
    )
}

export default ProtectedTeacher;