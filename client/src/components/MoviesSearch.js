import React, {  useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../providers/SearchProvider";
import { useAuth } from "../providers/AuthContext";
import { useWatched } from "../providers/WatchedProvider";
import useFetch from "../hook/useFetch";

const MoviesSearch = () => {
    const { movies, setMovies, title, setTitle } = useSearch();
    const { isAuthenticated, logout } = useAuth();
    const { markAsWatched, watched, fetchWatched } = useWatched();
    const navigate = useNavigate();

    
    const { isLoading, error, data, fetchData } = useFetch();

    // Obtener historial de películas vistas
    useEffect(() => {
        if (isAuthenticated) {
            fetchWatched();
        }
    }, [fetchWatched, isAuthenticated]);

    // Actualizar movies cuando data cambie
    useEffect(() => {
        if (data?.Search) {
            setMovies(data.Search);
        } else {
            setMovies([]);
        }
    }, [data, setMovies]);

    // Buscar películas 
    const handleSearch = async () => {
        if (!title) return; 

        await fetchData(`http://localhost:5000/movieapp/v1/movies/search?title=${title}`);

        setTitle("");
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const isWatched = (movieId) => watched.some((movie) => movie.movie_id === movieId);

    return (
        <div className="search-container">
            <h1 className="title">Buscar Películas</h1>
            <input
                type="text"
                className="input-buscar"
                placeholder="Ingresa el título de la película"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? "Buscando..." : "Buscar"}
            </button>

            {error && <p>{error}</p>}

            {movies.length > 0 && !error ? (
                <div className="movie-list">
                    {movies.map((movie, index) => (
                        <div key={index} className="movie-item">
                            <h2>{movie.Title}</h2>
                            <img src={movie.Poster} alt={movie.Title} style={{ width: "200px" }} />
                            <Link to={`/movie/${movie.imdbID}`}>Ver detalles</Link>
                            <button onClick={() => markAsWatched(movie)}>
                                {isWatched(movie.imdbID) ? (
                                    <img src="/images/ojo.jpg" alt="Visto" style={{ width: "30px" }} />
                                ) : (
                                    <img src="/images/ojo2.jpg" alt="Marcar como visto" style={{ width: "30px" }} />
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                !error && <p className="no-results">No se encontraron películas.</p>
            )}

            {isAuthenticated && (
                <div className="welcome">
                    <h3>Bienvenido</h3>
                    <button className="welcome-btn" onClick={() => navigate("/profile")}>Ver Perfil</button>
                    <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
                </div>
            )}
        </div>
    );
};

export default MoviesSearch;
