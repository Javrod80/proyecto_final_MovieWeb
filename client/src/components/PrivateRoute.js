// Para evitar que se acceda a la rutas privadas sin estar logueado

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const token = localStorage.getItem("token");

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
