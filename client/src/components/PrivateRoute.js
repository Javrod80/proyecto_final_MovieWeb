/**
 * Componente para proteger rutas privadas.
 * 
 * Este componente se asegura de que los usuarios solo puedan acceder a rutas privadas si están autenticados.
 * Si el usuario no tiene un token en el almacenamiento local, será redirigido a la página de login.
 * 
 * @component
 * @example
 * return (
 *   <PrivateRoute />
 * )
 */

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    /**
    * Obtiene el token de autenticación desde el almacenamiento local.
    * @type {string | null}
    */
    const token = localStorage.getItem("token");
    /**
        * Si el token está presente, se muestra el contenido de la ruta protegida (Outlet),
        * de lo contrario, se redirige al usuario a la página de login.
        * @returns {JSX.Element} El contenido de la ruta protegida o la redirección.
        */
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
