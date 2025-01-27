import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useAuth } from "../providers/AuthContext";
import { toast } from "react-toastify";

const MovieDetails = () => {
    const { imdbID } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState("");
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/movie/${imdbID}`);
                if (!response.ok) {
                    throw new Error("Error al obtener los detalles de la película");
                }
                const data = await response.json();
                setMovie(data);
                setError("");
            } catch (err) {
                setError(err.message);
                setMovie(null);
            }
        };

        fetchMovieDetails();
    }, [imdbID]);

    const addToFavorites = async () => {
        if (!isAuthenticated) {
            toast.error("Debes estar logueado para agregar a favoritos");
            return;
        }
        const movieData = {
            Title: movie.Title,
            Poster: movie.Poster,
            Plot: movie.Plot,
            Year: movie.Year,
            Rated: movie.Rated,
            Released: movie.Released,
            Runtime: movie.Runtime,
            Genre: movie.Genre,
            Director: movie.Director,
            Writer: movie.Writer,
            Actors: movie.Actors,
            Language: movie.Language,
            Country: movie.Country,
            Awards: movie.Awards
        };

        try {
            const response = await fetch("http://localhost:5000/api/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(movieData)
            });

            if (!response.ok) {
                throw new Error("Error al agregar a favoritos");
            }

            toast.success("Película agregada a favoritos");
        } catch (err) {
            toast.error(err.message || "Ocurrió un error al agregar a favoritos");
        }
    };

    return (
        <div className="movie-details-container">
            <h1>Detalles de la Película</h1>
            {error && <p>{error}</p>}
            {movie ? (
                <div className="movie-card">
                    <h2>{movie.Title}</h2>
                    <img src={movie.Poster} alt={movie.Title} />
                    <div className="movie-details-group">
                        <div className="movie-detail-card">
                            <h3>Sinopsis</h3>
                            <p><strong>{movie.Plot}</strong></p>
                        </div>
                        <div className="movie-detail-card">
                            <h3>Año</h3>
                            <p><strong>{movie.Year}</strong></p>
                        </div>
                        <div className="movie-detail-card">
                            <h3>Clasificación</h3>
                            <p><strong>{movie.Rated}</strong></p>
                        </div>
                        <div className="movie-detail-card">
                            <h3>Fecha de estreno</h3>
                            <p><strong>{movie.Released}</strong></p>
                        </div>
                        <div className="movie-detail-card">
                            <h3>Duración</h3>
                            <p><strong>{movie.Runtime}</strong></p>
                        </div>
                        <div className="movie-detail-card">
                            <h3>Género</h3>
                            <p><strong>{movie.Genre}</strong></p>
                        </div>
                        <div className="movie-detail-card">
                            <h3>Director</h3>
                            <p><strong>{movie.Director}</strong></p>
                        </div>
                        <div className="movie-detail-card">
                            <h3>Actores</h3>
                            <p><strong>{movie.Actors}</strong></p>
                        </div>
                        <div className="movie-detail-card">
                            <h3>Idioma</h3>
                            <p><strong>{movie.Language}</strong></p>
                        </div>
                        <div className="movie-detail-card">
                            <h3>País</h3>
                            <p><strong>{movie.Country}</strong></p>
                        </div>
                        <div className="movie-detail-card">
                            <h3>Premios</h3>
                            <p><strong>{movie.Awards}</strong></p>
                        </div>
                    </div>
                    <button className="favorite-button" onClick={addToFavorites}>
                        ❤️ Agregar a Favoritos
                    </button>
                </div>
            ) : (
                <p>Cargando detalles...</p>
            )}
        </div>
    );
};

export default MovieDetails;