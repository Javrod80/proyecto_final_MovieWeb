import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { toast } from "react-toastify";
import useFetch from "../hook/useFetch";

const MovieDetails = () => {
    const { imdbID } = useParams();
    const { isAuthenticated, userId } = useAuth();
    const { isLoading, error, data: movie, fetchData } = useFetch();
    const { fetchData: addToFavoritesFetch, error: addToFavoritesError } = useFetch(); 

    useEffect(() => {
        fetchData(`movies/${imdbID}`);
    }, [imdbID, fetchData]);

    const addToFavorites = async () => {
        if (!isAuthenticated) {
            toast.error("Debes estar logueado para agregar a favoritos");
            return;
        }

        if (!userId) {
            toast.error("Error: No se pudo obtener el ID del usuario");
            return;
        }

        const movieData = {
            userId,
            imdbID: movie.imdbID,
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
            Awards: movie.Awards,
        };

        try {
            await addToFavoritesFetch("favorites/add-favorite", "POST", movieData);
            if (!addToFavoritesError) {
                toast.success("Película agregada a favoritos");
            } else {
                throw new Error(addToFavoritesError);
            }
        } catch (err) {
            toast.error(err.message || "Ocurrió un error al agregar a favoritos");
        }
    };

    return (
        <div className="movie-details-container">
            <h1>Detalles de la Película</h1>
            {error && <p>{error}</p>}
            {isLoading ? (
                <p>Cargando detalles...</p>
            ) : movie ? (
                <div className="movie-card">
                    <h2>{movie.Title}</h2>
                    <img src={movie.Poster} alt={movie.Title} />
                    <div className="movie-details-group">
                        {[
                            { label: "Sinopsis", value: movie.Plot },
                            { label: "Año", value: movie.Year },
                            { label: "Clasificación", value: movie.Rated },
                            { label: "Fecha de estreno", value: movie.Released },
                            { label: "Duración", value: movie.Runtime },
                            { label: "Género", value: movie.Genre },
                            { label: "Director", value: movie.Director },
                            { label: "Actores", value: movie.Actors },
                            { label: "Idioma", value: movie.Language },
                            { label: "País", value: movie.Country },
                            { label: "Premios", value: movie.Awards },
                        ].map(({ label, value }) => (
                            <div className="movie-detail-card" key={label}>
                                <h3>{label}</h3>
                                <p><strong>{value}</strong></p>
                            </div>
                        ))}
                    </div>
                    <button className="favorite-button" onClick={addToFavorites}>
                        ❤️ Agregar a Favoritos
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default MovieDetails;
