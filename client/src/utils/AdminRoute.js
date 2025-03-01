import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

/**
 * Componente de ruta protegida para administradores.
 * 
 * Este componente verifica si el usuario tiene un token válido en localStorage
 * y si su rol es "admin". Si el usuario no está autenticado o no tiene los
 * permisos adecuados, es redirigido a la página de inicio de sesión o al home.
 * 
 * @component
 * @returns {JSX.Element} Redirige al usuario si no es administrador o muestra el contenido protegido.
 */
const AdminRoute = () => {
    // Obtener el token de localStorage
    const token = localStorage.getItem("token");

    // Si no hay token, redirigir al inicio de sesión
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        // Decodificar el token para obtener el rol
        const decodedToken = jwtDecode(token);
        const isAdmin = decodedToken.rol === "admin";
        // Si es administrador, mostrar el contenido protegido
        return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return <Navigate to="/login" replace />;
    }
};

export default AdminRoute;
