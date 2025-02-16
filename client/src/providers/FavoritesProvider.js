import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";
import useFetch from "../hook/useFetch";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const { userId } = useAuth();
    const { isLoading, error, data, fetchData } = useFetch();


    

    const fetchFavorites = useCallback(() => {
        if (!userId) return;
        fetchData(`favorites/all-favorites?userId=${userId}`);
    }, [userId, fetchData]);

    useEffect(() => {
        if (data) setFavorites(data);
    }, [data]);

    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]);

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
