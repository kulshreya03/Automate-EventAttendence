import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedTeacher = () => {
    const token = localStorage.getItem("teacherToken"); // Check for teacher token
    const location = useLocation();

    if (!token) {
        // Redirect to login if not authenticated
        return <Navigate to="/teacher_login" replace />;
    }

    // Prevent access to login page after logging in
    if (location.pathname === "/teacher_login") {
        return <Navigate to="/events" replace />;
    }

    return <Outlet />;
};

export default ProtectedTeacher;
