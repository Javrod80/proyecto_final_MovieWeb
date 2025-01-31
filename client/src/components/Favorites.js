import React, { useState, useEffect } from "react";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState("");

    // Obtener las películas favoritas al cargar el componente
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch("http://localhost:5000/movieapp/v1/favorites/all-favorites");
                if (!response.ok) {
                    throw new Error("Error al obtener las películas favoritas");
                }
                const data = await response.json();
                setFavorites(data);
                setError("");
            } catch (err) {
                setError(err.message);
                setFavorites([]);
            }
        };

        fetchFavorites();
    }, []); 
    return (
        <div className="favorites-container">
            <h1>Películas Favoritas</h1>
            {error && <p>{error}</p>}
            {favorites.length > 0 ? (
                <div>
                    {favorites.map((movie, index) => (
                        <div key={index} className="favorites-movie">
                            <h2>{movie.Title}</h2>
                            <img src={movie.Poster} alt={movie.Title} />
                            <p><strong>Sinopsis:</strong> {movie.Plot}</p>
                            <p><strong>Año:</strong> {movie.Year}</p>
                            <p><strong>Clasificación:</strong> {movie.Rated}</p>
                            <p><strong>Fecha de estreno:</strong> {movie.Released}</p>
                            <p><strong>Duración:</strong> {movie.Runtime}</p>
                            <p><strong>Género:</strong> {movie.Genre}</p>
                            <p><strong>Director:</strong> {movie.Director}</p>
                            <p><strong>Escritor:</strong> {movie.Writer}</p>
                            <p><strong>Actores:</strong> {movie.Actors}</p>
                            <p><strong>Idioma:</strong> {movie.Language}</p>
                            <p><strong>País:</strong> {movie.Country}</p>
                            <p><strong>Premios:</strong> {movie.Awards}</p>

                        </div>
                    ))}
                </div>
            ) : (
                !error && <p>No tienes películas favoritas.</p>
            )}
        </div>
    );
};

export default Favorites;