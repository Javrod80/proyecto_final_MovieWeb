// Página no encontrada

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
