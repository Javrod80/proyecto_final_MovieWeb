import React from "react";
import '../styles/Header.css'; 


/**
 * Componente Header
 * 
 * Renderiza la cabecera de la aplicación con el título y subtítulo.
 * 
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */
export default function Header() {
    return (
        <header className="header">
            <h1>Movies Web</h1>
            <p>Tu buscador de películas favoritas</p>
        </header>
    );
}
