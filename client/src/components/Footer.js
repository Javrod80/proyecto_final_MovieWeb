import React from "react";
import '../styles/Footer.css';

/**
 * Componente Footer
 * 
 * Renderiza el pie de página de la aplicación.
 * 
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 */
export default function Footer() {
    return (
        <footer className="footer">
            <p className="mb-0">© COPYRIGHT 2024 TODOS LOS DERECHOS RESERVADOS.</p>
        </footer>
    );
}
