/**
 * Componente de la página de error 404.
 * 
 * Este componente se muestra cuando el usuario intenta acceder a una página que no existe en la aplicación.
 * Muestra un mensaje de error y un botón para regresar a la página de inicio.
 * 
 * @component
 * @example
 * return <NotFound />;
 * 
 * @returns {JSX.Element} Renderiza la página de error 404 con un mensaje de error y un botón de retorno al inicio.
 */

import React from "react";

export default function NotFound() {
    return (
        <div className="container mt-5 text-center">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="display-4 text-danger">404 - Página No Encontrada</h2>
                    <p className="lead">Lo sentimos, la página que buscas no existe.</p>
                    <a href="/" className="btn btn-primary mt-3">Volver al inicio</a>
                </div>
            </div>
        </div>
    );
}
