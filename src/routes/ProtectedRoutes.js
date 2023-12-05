// import react hooks
import { useState } from "react";

// import react-router-dom
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const [userIn, setUserIn] = useState(true);

    return userIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;