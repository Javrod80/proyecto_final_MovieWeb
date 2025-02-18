/**
 * Componente para visualizar las películas vistas.
 * 
 * Este componente permite a los usuarios ver las películas que han marcado como vistas. 
 * Muestra una lista de películas con sus posters y permite eliminar el historial de vistas.
 * 
 * @component
 * @example
 * return (
 *   <MovieWatched />
 * )
 */
import React, { useEffect } from "react";
import { useWatched } from "../providers/WatchedProvider";

const MovieWatched = () => {
    /**
    * Obtiene el contexto de películas vistas.
    * @type {Object}
    */
    const { watched, isLoading, fetchWatched, deleteWatchHistoryUser } = useWatched();

    /**
        * Efecto que obtiene las películas vistas cuando el componente se monta.
        */
    useEffect(() => {
        fetchWatched();
    }, [fetchWatched]);

    // Renderiza las peliculas vistas
    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4 mt-4">Películas Vistas</h2> 
            {isLoading ? (
                <p className="text-center">Cargando...</p>
            ) : (
                <div className="d-flex justify-content-center">
                    <ul className="list-group mt-4" style={{ maxWidth: "800px" }}>
                        {watched.length > 0 ? (
                            watched.map((movie) => (
                                <li key={movie.movie_id} className="list-group-item d-flex align-items-center">
                                    <img
                                        src={movie.poster}
                                        alt={movie.title}
                                        style={{
                                            width: "100px",
                                            marginRight: "15px",
                                            maxHeight: "150px",  
                                            objectFit: "cover",  
                                        }}
                                    />
                                    <div className="d-flex flex-column">
                                        <p className="mb-1">{movie.title}</p>
                                        <button
                                            className="btn btn-danger btn-sm mt-2 btn-fixed-size"
                                            onClick={() => deleteWatchHistoryUser(movie.movie_id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-center">No tienes películas vistas.</p>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default MovieWatched;