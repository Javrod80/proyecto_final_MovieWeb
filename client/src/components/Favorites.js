import React, { useEffect } from "react";
import { useFavorites } from "../providers/FavoritesProvider";
import Reviews from "./Reviews";

const Favorites = () => {
    const { favorites, isLoading, fetchFavorites,deleteFavorite } = useFavorites();
  

    
    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]); 

    return (
        <div className="favorites-container">
            <h2>Mis Películas Favoritas</h2>

            {isLoading ? (
                <p>Cargando películas favoritas...</p>
            ) : favorites.length === 0 ? (
                <p>No tienes películas favoritas.</p>
            ) : (
                <ul>
                    {favorites.map((movie) => (
                        <li key={movie.imdbID}>
                            <h3>{movie.Title}</h3>
                            <img src={movie.Poster} alt={movie.Title} width="100" />
                           
                            <button onClick={() => {
                               // console.log("Intentando eliminar:", movie);
                                deleteFavorite(movie.imdbID);
                            }}>
                                Eliminar
                            </button>
                            <Reviews movieId={movie.imdbID} /> {/* Enviar movieId a Reviews */}
                            
                        </li>
                    ))}
                       
                    
                </ul>
            )}
        </div>
    );
};

export default Favorites;
