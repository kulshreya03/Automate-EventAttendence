import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedStudent = () => {
    const token = localStorage.getItem("token"); // Check for student token
    const location = useLocation();

    if (!token) {
        // Redirect to login if not authenticated
        return <Navigate to="/student_login" replace />;
    }

    // Prevent access to login page after logging in
    if (location.pathname === "/student_login") {
        return <Navigate to="/event_data" replace />;
    }

    return <Outlet />;
};

export default ProtectedStudent;
