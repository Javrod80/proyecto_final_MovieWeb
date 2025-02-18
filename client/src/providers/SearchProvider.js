/**
 * Proveedor del contexto de búsqueda para gestionar los resultados de búsqueda de películas.
 * 
 * Este proveedor de contexto maneja los datos relacionados con la búsqueda de películas en la aplicación,
 * como los resultados de búsqueda y el título de búsqueda ingresado por el usuario.
 * 
 * @component
 * @example
 * 
 * <SearchProvider>
 *   <App />
 * </SearchProvider>
 * 
 * @param {Object} props - Props que se pasan al componente.
 * @param {JSX.Element} props.children - Los componentes hijos que estarán envueltos por el proveedor de búsqueda.
 * 
 * @returns {JSX.Element} El proveedor de contexto que envuelve los componentes hijos.
 */
import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext();
/**
 * Hook personalizado para acceder al contexto de búsqueda.
 * 
 * Este hook proporciona el estado de las películas y el título de la búsqueda,
 * así como las funciones necesarias para actualizar dichos estados.
 * 
 * @returns {Object} El contexto de búsqueda con el estado y las funciones necesarias.
 * @property {Array} movies - El array de películas que corresponde a los resultados de búsqueda.
 * @property {Function} setMovies - Función para actualizar el estado de las películas.
 * @property {string} title - El título ingresado para la búsqueda de películas.
 * @property {Function} setTitle - Función para actualizar el estado del título de búsqueda.
 */
export const SearchProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState("");


    return (
        <SearchContext.Provider value={{ movies, setMovies, title, setTitle }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);