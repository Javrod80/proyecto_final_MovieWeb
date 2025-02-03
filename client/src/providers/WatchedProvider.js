import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext";


const WatchedContext = createContext();


export const useWatched = () => {
    return useContext(WatchedContext);
}

const WatchedProvider = ({ children }) => {
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const { userId } = useAuth();

    const fetchWatched = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:5000/movieapp/v1/watched/watch-history/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },                   
            });

            if (!response.ok) {
                throw new Error('Error al obtener las películas vistas');
            }   
            const data = await response.json(); 
            setWatched(data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }, [userId]);

    useEffect(() => {
        fetchWatched();
    }, [fetchWatched]);


    const markAsWatched = async (movie) => {
        if (!userId) {
            console.error("Usuario no autenticado");
            return;
        }

/*
        console.log('Datos a enviar:', {
            user_id: userId,
            movie_id: movie.imdbID,
            title: movie.Title,
            poster: movie.Poster
        });
        */
        try {
            const response = await fetch("http://localhost:5000/movieapp/v1/watched/add-watch-history", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id : userId,
                    movie_id: movie.imdbID,
                    title: movie.Title,
                    poster: movie.Poster,
                }),
            });

            if (!response.ok) {
                throw new Error("Error al marcar la película como vista");
            }

            fetchWatched();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <WatchedContext.Provider value={{ watched, isLoading, fetchWatched, markAsWatched }}>
            {children}
        </WatchedContext.Provider>
    );
};
export default WatchedProvider;