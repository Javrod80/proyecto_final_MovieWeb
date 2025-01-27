import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const FavoritesContext = createContext();

export const useFavorites = () => {
    return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = async (movie) => {
        try {
            const response = await fetch("http://localhost:5000/api/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(movie)
            });

            if (!response.ok) {
                throw new Error("Error al agregar a favoritos");
            }

            setFavorites((prevFavorites) => [...prevFavorites, movie]);
            toast.success("Película agregada a favoritos");
        } catch (err) {
            toast.error(err.message || "Ocurrió un error al agregar a favoritos");
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};