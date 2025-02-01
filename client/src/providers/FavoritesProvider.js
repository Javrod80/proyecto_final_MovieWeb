import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {useAuth} from "./AuthContext";



const FavoritesContext = createContext();

export const useFavorites = () => {
    return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const { userId } = useAuth();

    useEffect(() => {
        if (userId) {
            fetchFavorites();
        }
    }, [userId]);

    const fetchFavorites = async () => {
        try {
            const response = await fetch(`http://localhost:5000/movieapp/v1/favorites/all-favorites`);
            if (!response.ok) throw new Error("Error al obtener favoritos");

            const data = await response.json();
            setFavorites(data);
        } catch (err) {
            console.error("❌ Error al obtener favoritos:", err);
            toast.error("No se pudieron cargar los favoritos");
        }
    };


    const addToFavorites = async (movie) => {
        if (!userId) {
            toast.error("Debes iniciar sesión para agregar favoritos");
            return;
        }

        // Depuración: Verificar que el userId existe antes de enviarlo
       // console.log("✅ Agregando favorito con userId:", userId);
       // console.log("🎬 Película a agregar:", movie);

        const bodyData = JSON.stringify({ userId, movie });

       // console.log("📤 Enviando body:", bodyData);

        try {
            const response = await fetch("http://localhost:5000/movieapp/v1/favorites/add-favorite", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: bodyData,
            });
            const responseData = await response.json();
            console.log("📥 Respuesta del servidor:", responseData);

            if (!response.ok) {
                throw new Error(responseData.message || "Error al agregar a favoritos");
            }

            setFavorites((prevFavorites) => [...prevFavorites, movie]);
            toast.success("Película agregada a favoritos");
        } catch (err) {
            console.error("❌ Error al agregar a favoritos:", err);
            toast.error(err.message || "Ocurrió un error al agregar a favoritos");
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};