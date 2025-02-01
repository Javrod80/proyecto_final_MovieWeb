import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export const useFavorites = () => {
    return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const { userId } = useAuth();

    // Función para obtener los favoritos, memorizada con useCallback
    const fetchFavorites = useCallback(async () => {
        if (!userId) return;

        try {
            const response = await fetch(`http://localhost:5000/movieapp/v1/favorites/all-favorites?userId=${userId}`, {
                method: "GET",
                headers: {
                    "Cache-Control": "no-cache" // Evita respuestas en caché
                }
            });

            if (!response.ok) {
                throw new Error("Error al obtener favoritos");
            }

            const data = await response.json();

            // Actualiza el estado con los datos obtenidos
            setFavorites(data);
        } catch (err) {
            console.error("❌ Error al obtener favoritos:", err);
            toast.error("No se pudieron cargar los favoritos");
        }
    }, [userId]); // Dependencia de userId

    // Cargar favoritos cuando el usuario inicia sesión
    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites, userId]); 

    // Función para agregar a favoritos
    const addToFavorites = async (movie) => {
        if (!userId) {
            toast.error("Debes iniciar sesión para agregar favoritos");
            return;
        }

        const bodyData = JSON.stringify({ userId, ...movie });

        try {
            const response = await fetch("http://localhost:5000/movieapp/v1/favorites/add-favorite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: bodyData,
            });

            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.message || "Error al agregar a favoritos");
            }

            toast.success("Película agregada a favoritos");
           

            // Actualiza el estado con la nueva película
            setFavorites(prevFavorites => [...prevFavorites, movie]);
            fetchFavorites(); // Vuelve a cargar los favoritos
        } catch (err) {
            console.error("❌ Error al agregar a favoritos:", err);
            toast.error(err.message || "Ocurrió un error al agregar a favoritos");
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, fetchFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};