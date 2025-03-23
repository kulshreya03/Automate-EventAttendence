import { Navigate, Outlet } from "react-router-dom";

const ProtectedTeacher = () => {
    const token = localStorage.getItem("teacherToken"); // Assuming teacher has a separate token

    return token ? <Outlet /> : <Navigate to="/loginTeacher" replace />;
};

export default ProtectedTeacher;
