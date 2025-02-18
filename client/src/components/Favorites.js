/**
 * Componente que muestra las películas favoritas del usuario.
 * Utiliza el contexto `FavoritesProvider` para obtener y gestionar la lista de películas favoritas.
 */

import React, { useEffect } from "react";
import { useFavorites } from "../providers/FavoritesProvider";
import Reviews from "./Reviews";

/**
 * Componente para mostrar la lista de películas favoritas del usuario.
 * @returns {JSX.Element} El componente de películas favoritas.
 */
const Favorites = () => {
    // Traemos las peliculas favoritas
    const { favorites, isLoading, fetchFavorites,deleteFavorite } = useFavorites();
  
    /**
      * Efecto que se ejecuta al montar el componente para obtener las películas favoritas.
      */
   
    useEffect(() => {
        fetchFavorites();
    }, [fetchFavorites]); 

    // Renderizamos las peliculas favoritas
    return (
        <div className="container mt-3"> 
            <h2 className="text-center text-primary">Mis Películas Favoritas</h2>

            {isLoading ? (
                <p className="text-center text-muted">Cargando películas favoritas...</p>
            ) : favorites.length === 0 ? (
                <p className="text-center text-muted">No tienes películas favoritas.</p>
            ) : (
                <div>
                    {favorites.map((movie) => (
                        <div key={movie.imdbID} className="card mb-3" style={{ maxWidth: '500px', margin: 'auto', top: '40px' }}> {/* Reducir el ancho y margen superior */}
                            <img
                                src={movie.Poster}
                                alt={movie.Title}
                                className="card-img-top"
                                style={{ height: 'auto', maxHeight: '200px', objectFit: 'cover' }}  
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title fw-bold">{movie.Title}</h5>
                                <div className="d-flex justify-content-center mb-3">
                                    <button
                                        className="btn btn-danger btn-sm mx-2"
                                        onClick={() => deleteFavorite(movie.imdbID)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                                {/* Componente para manejar reseñas de la película */}
                                <Reviews movieId={movie.imdbID} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

};

export default Favorites;
