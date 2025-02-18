/**
 * Proveedor del contexto de historial de películas vistas para gestionar el historial de películas
 * que un usuario ha visto en la aplicación.
 * 
 * Este proveedor permite acceder y gestionar el historial de películas vistas de los usuarios,
 * así como marcar nuevas películas como vistas y eliminar películas del historial.
 * 
 * @component
 * @example
 * 
 * <WatchedProvider>
 *   <App />
 * </WatchedProvider>
 * 
 * @param {Object} props - Props que se pasan al componente.
 * @param {JSX.Element} props.children - Los componentes hijos que estarán envueltos por el proveedor de historial de vistas.
 * 
 * @returns {JSX.Element} El proveedor de contexto que envuelve los componentes hijos.
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import useFetch from '../hook/useFetch';

const WatchedContext = createContext();
/**
 * Hook personalizado para acceder al contexto de historial de películas vistas.
 * 
 * Este hook proporciona acceso al historial de películas vistas y las funciones para gestionarlo,
 * como marcar una película como vista y eliminarla del historial.
 * 
 * @returns {Object} El contexto de historial de películas vistas con el estado y las funciones necesarias.
 * @property {Array} watched - El historial de películas vistas por el usuario.
 * @property {Function} fetchWatched - Función para obtener el historial de películas vistas.
 * @property {Function} markAsWatched - Función para marcar una película como vista.
 * @property {Function} deleteWatchHistoryUser - Función para eliminar una película del historial de vistas.
 * @property {boolean} isLoading - Estado de carga para indicar si se están obteniendo los datos del historial.
 */
export const useWatched = () => useContext(WatchedContext);
/**
 * Proveedor que maneja el estado del historial de películas vistas en la aplicación.
 * 
 * Este proveedor permite compartir el estado del historial de películas vistas en todo el árbol de componentes,
 * así como las funciones para agregar o eliminar películas del historial de vistas.
 * 
 * @component
 * @example
 * 
 * <WatchedProvider>
 *   <App />
 * </WatchedProvider>
 * 
 * @param {Object} props - Props que se pasan al componente.
 * @param {JSX.Element} props.children - Los componentes hijos que estarán envueltos por el proveedor de historial de vistas.
 * 
 * @returns {JSX.Element} El proveedor de contexto de historial de películas vistas que envuelve los componentes hijos.
 */
const WatchedProvider = ({ children }) => {
    const [watched, setWatched] = useState([]);
    const { isLoading, error, data, fetchData } = useFetch();
    const { userId } = useAuth();
    // Función para obtener el historial de pelúculas vistas
    const fetchWatched = useCallback(async () => {
        await fetchData(`watched/watch-history/${userId}`);
    }, [fetchData, userId]);
    // Cargar el historial de pelúculas vistas
    useEffect(() => {
        if (userId) {
            fetchWatched();
        }
    }, [userId, fetchWatched]);
    // Actualizar el historial de pelúculas vistas
    useEffect(() => {
        if (data) {
            setWatched(data);
        }
        if (error) {
            console.error(error);
        }
    }, [data, error]);
    // Función para marcar una pelúcula como vista
    const markAsWatched = async (movie) => {
        if (!userId) {
            console.error("Usuario no autenticado");
            return;
        }
        // Crear el cuerpo de la petición
        const body = {
            user_id: userId,
            movie_id: movie.imdbID,
            title: movie.Title,
            poster: movie.Poster,
        };
        // Marcar la pelúcula como vista
        await fetchData("watched/add-watch-history", 'POST', body);
        if (!error) {
            fetchWatched();
        } else {
            console.error("Error al marcar la película como vista:", error);
        }
    };
    //
    const deleteWatchHistoryUser = async (movieId) => {
        if (!userId) {
            console.error("Usuario no autenticado");
            return;
        }
        if (!movieId) {
            console.error("movieId no proporcionado");
            return;
        }
        //
        await fetchData(`watched/delete-watch-history/${userId}/${movieId}`, 'DELETE', null, localStorage.getItem('token'));
        if (!error) {
            fetchWatched();
        } else {
            console.error("Error al eliminar la historia de vistas:", error);
        }
    };

    return (
        <WatchedContext.Provider value={{ watched, isLoading, fetchWatched, markAsWatched, deleteWatchHistoryUser }}>
            {children}
        </WatchedContext.Provider>
    );
};

export default WatchedProvider;
