import React from "react";
import AdminGetFavorites from "../admincomponents/AdminGetFavorites";
import AdminGetReviews from "../admincomponents/AdminGetReviews";
import { useAuth } from "../providers/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminGetAllUsers from "../admincomponents/AdminGetAllUsers";
import AdminGetAllWatched from "../admincomponents/AdminGetAllWatched";
/**
 * Componente del dashboard de administración.
 *
 * Este componente representa el panel de administración que contiene diferentes secciones para que los administradores 
 * puedan ver y gestionar favoritos, reseñas, usuarios y visualizaciones.
 *
 * @component
 * @returns {JSX.Element} El componente del dashboard de administración.
 */
const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 text-center">
          <h1>Admin Dashboard</h1>
          <p className="lead">Welcome to the admin dashboard.</p>
          <hr className="my-4" />
          <button className="btn btn-danger" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <AdminGetFavorites  />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <AdminGetReviews />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <AdminGetAllUsers />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <AdminGetAllWatched />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
