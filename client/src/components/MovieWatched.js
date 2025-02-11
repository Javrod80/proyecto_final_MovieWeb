import React, { useEffect } from "react";
import { useWatched } from "../providers/WatchedProvider";

const MovieWatched = () => {
    const { watched, isLoading, fetchWatched, deleteWatchHistoryUser } = useWatched();


    useEffect(() => {
        fetchWatched();
    }, [fetchWatched]);

    return (
        <div>
            <h2>Películas Vistas</h2>
            {isLoading ? (
                <p>Cargando...</p>
            ) : (
                <ul>
                    {watched.map((movie) => (
                        <li key={movie.movie_id}>
                            <img src={movie.poster} alt={movie.title} style={{ width: "100px" }} />
                            <p>{movie.title} </p>
                            <button onClick={() => deleteWatchHistoryUser(movie.movie_id)}>Eliminar</button>


                        </li>
                    ))}

                </ul>
            )}
        </div>
    );
}

export default MovieWatched;