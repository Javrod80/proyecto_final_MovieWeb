// Proveedor del contexto de historial de pelúculas vistas
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import useFetch from '../hook/useFetch';

const WatchedContext = createContext();

export const useWatched = () => useContext(WatchedContext);

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
