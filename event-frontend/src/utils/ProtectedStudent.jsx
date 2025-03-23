import { Navigate, Outlet } from "react-router-dom";

const ProtectedStudent = () => {
    const token = localStorage.getItem("token"); // Check for token

    return token ? <Outlet /> : <Navigate to="/loginStud" replace />;
};

export default ProtectedStudent;
