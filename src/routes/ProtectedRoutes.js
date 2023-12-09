// import react hooks
import { useContext } from "react";

// import react-router-dom
import { Outlet, Navigate } from "react-router-dom";

// import Context
import { Context } from "../utils/MainContext";

const ProtectedRoutes = () => {
    const { userIn } = useContext(Context);

    return userIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;