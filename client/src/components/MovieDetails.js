/**
 * Componente MovieDetails
 * 
 * Muestra los detalles de una película obtenida por su `imdbID` desde la API.
 * Permite a los usuarios autenticados agregar la película a su lista de favoritos.
 *
 * @component
 * @returns {JSX.Element} Renderiza los detalles de la película y un botón para agregarla a favoritos.
 */

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import { toast } from "react-toastify";
import useFetch from "../hook/useFetch";


const MovieDetails = () => {
    // Obtener el imdbID de la URL
    const { imdbID } = useParams();
    const { isAuthenticated, userId } = useAuth();
    //useFetch para la solicitud
    const { isLoading, error, data: movie, fetchData } = useFetch();
    //useFetch para agregar a favoritos
    const { fetchData: addToFavoritesFetch, error: addToFavoritesError } = useFetch(); 

    /**
    * Llama a la API para obtener los detalles de la película cuando cambia el `imdbID`.
    */
    useEffect(() => {
        fetchData(`movies/${imdbID}`);
    }, [imdbID, fetchData]);

    /**
    * Agrega la película a la lista de favoritos del usuario autenticado.
    */
    const addToFavorites = async () => {
        if (!isAuthenticated) {
            toast.error("Debes estar logueado para agregar a favoritos");
            return;
        }

        if (!userId) {
            toast.error("Error: No se pudo obtener el ID del usuario");
            return;
        }
        // Crear el objeto con los datos de la película
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
        // Agregar a favoritos
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
    // Renderizar el componente
    return (
        <div className="container mt-3">
            <h1 className="text-center mb-4 ">Detalles de la Película</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {isLoading ? (
                <div className="text-center">Cargando detalles...</div>
            ) : movie ? (
                <div className="card">
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={movie.Poster} alt={movie.Title} className="img-fluid rounded-start" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h2 className="card-title">{movie.Title}</h2>
                                <div className="mb-3">
                                    <strong>Sinopsis:</strong>
                                    <p>{movie.Plot}</p>
                                </div>
                                <div className="row">
                                    {[
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
                                        <div className="col-12 col-md-6 mb-2" key={label}>
                                            <strong>{label}:</strong>
                                            <p>{value}</p>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={addToFavorites}
                                >
                                    ❤️ Agregar a Favoritos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default MovieDetails;
