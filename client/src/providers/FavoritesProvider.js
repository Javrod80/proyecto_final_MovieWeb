/**
 * Proveedor del contexto de favoritos para gestionar las películas favoritas de un usuario.
 * 
 * Este componente crea un contexto que permite a la aplicación manejar las películas favoritas del usuario.
 * Proporciona funciones para agregar, eliminar y obtener las películas favoritas desde una API.
 * El estado de favoritos se guarda en el estado local del contexto y se sincroniza con la API.
 * 
 * @component
 * @example
 * 
 * <FavoritesProvider>
 *   <App />
 * </FavoritesProvider>
 * 
 * @returns {JSX.Element} El proveedor de contexto que envuelve el árbol de componentes.
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import useFetch from "../hook/useFetch";

const FavoritesContext = createContext();
/**
 * Hook personalizado para acceder al contexto de favoritos.
 * 
 * Este hook proporciona el estado de las películas favoritas y las funciones para agregar, 
 * eliminar y obtener favoritos.
 * 
 * @returns {Object} El contexto de favoritos con el estado y funciones necesarias.
 * @property {Array} favorites - La lista de películas favoritas del usuario.
 * @property {Function} addToFavorites - Función para agregar una película a favoritos.
 * @property {Function} fetchFavorites - Función para obtener las películas favoritas del usuario.
 * @property {Function} deleteFavorite - Función para eliminar una película de favoritos.
 * @property {boolean} isLoading - Estado de carga para saber si se están recuperando los favoritos.
 */

export const useFavorites = () => useContext(FavoritesContext);
/**
 * Proveedor que maneja el estado de las películas favoritas del usuario.
 * 
 * El proveedor maneja la sincronización entre el estado local de favoritos y la API. 
 * Permite agregar, eliminar y obtener las películas favoritas del usuario.
 * 
 * @component
 * @example
 * 
 * <FavoritesProvider>
 *   <App />
 * </FavoritesProvider>
 * 
 * @param {Object} props - Props que se pasan al componente.
 * @param {JSX.Element} props.children - Los componentes hijos que están envueltos por el proveedor.
 * 
 * @returns {JSX.Element} El proveedor de contexto de favoritos que envuelve los componentes hijos.
 */
export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const { userId } = useAuth();
    const { isLoading, error, data, fetchData } = useFetch();


    
    /**
     * Función para obtener las películas favoritas del usuario desde la API.
     * 
     * La función realiza una llamada a la API para recuperar los favoritos de un usuario.
     * Si no hay un usuario autenticado, no realiza la llamada.
     */
    const fetchFavorites = useCallback(() => {
        if (!userId) return;
        fetchData(`favorites/all-favorites?userId=${userId}`);
    }, [userId, fetchData]);

    // Cargar favoritos desde la API cuando los datos estén disponibles
    useEffect(() => {
        if (data) setFavorites(data);
    }, [data]);
    // Actualizar favoritos cada vez que se obtienen nuevos datos
    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);
    /**
    * Función para agregar una película a los favoritos.
    * 
    * La función verifica si el usuario está autenticado antes de intentar agregar una película a los favoritos.
    * Si el usuario no está autenticado, muestra un mensaje de error.
    * 
    * @param {Object} movie - La película que se desea agregar a los favoritos.
    */
    const addToFavorites = async (movie) => {
        if (!userId) {
            toast.error("Debes iniciar sesión para agregar favoritos");
            return;
        }

        await fetchData("favorites/add-favorite", "POST", { userId, ...movie });

        if (!error) {
            toast.success("Película agregada a favoritos");
            setFavorites((prevFavorites) => [...prevFavorites, movie]);
        } else {
            toast.error(error);
        }
    };
    /**
    * Función para eliminar una película de los favoritos.
    * 
    * La función realiza una llamada a la API para eliminar una película de los favoritos.
    * Si la operación es exitosa, actualiza el estado local de favoritos.
    * 
    * @param {string} movieId - El ID de la película que se desea eliminar de los favoritos.
    */
    const deleteFavorite = async (movieId) => {
        await fetchData(`favorites/delete-favorites/${movieId}`, "DELETE", null, localStorage.getItem("token"));

        if (!error) {
            toast.success("Película eliminada de favoritos");
            setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.imdbID !== movieId));
        } else {
            toast.error(error);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, fetchFavorites, deleteFavorite, isLoading }}>
            {children}
        </FavoritesContext.Provider>
    );
};
