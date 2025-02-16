import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import useFetch from '../hook/useFetch';

const WatchedContext = createContext();

export const useWatched = () => useContext(WatchedContext);

const WatchedProvider = ({ children }) => {
    const [watched, setWatched] = useState([]);
    const { isLoading, error, data, fetchData } = useFetch();
    const { userId } = useAuth();

    const fetchWatched = useCallback(async () => {
        await fetchData(`watched/watch-history/${userId}`);
    }, [fetchData, userId]);

    useEffect(() => {
        if (userId) {
            fetchWatched();
        }
    }, [userId, fetchWatched]);

    useEffect(() => {
        if (data) {
            setWatched(data);
        }
        if (error) {
            console.error(error);
        }
    }, [data, error]);

    const markAsWatched = async (movie) => {
        if (!userId) {
            console.error("Usuario no autenticado");
            return;
        }

        const body = {
            user_id: userId,
            movie_id: movie.imdbID,
            title: movie.Title,
            poster: movie.Poster,
        };

        await fetchData("watched/add-watch-history", 'POST', body);
        if (!error) {
            fetchWatched();
        } else {
            console.error("Error al marcar la película como vista:", error);
        }
    };

    const deleteWatchHistoryUser = async (movieId) => {
        if (!userId) {
            console.error("Usuario no autenticado");
            return;
        }
        if (!movieId) {
            console.error("movieId no proporcionado");
            return;
        }

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
