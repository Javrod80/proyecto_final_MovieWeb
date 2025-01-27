import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../providers/SearchProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";

const MoviesSearch = () => {
    const { movies, setMovies, title, setTitle } = useSearch();
    const [error, setError] = useState("");
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();




    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/movies?title=${title}`);
            if (!response.ok) {
                throw new Error("No se encontró la película");
            }
            const data = await response.json();
            if (data.Response === "False") {
                throw new Error("No se encontraron películas");
            }
            setMovies(data.Search);
            setError("");
        } catch (err) {
            setError(err.message);
            setMovies([]);
        }
    };
    const handleLogout = () => {
        logout(); // Llama a la función logout
        navigate("/"); // Redirige al usuario a la página de inicio después de cerrar sesión
    };

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
            <button onClick={handleSearch}>Buscar</button>
            {error && <p>{error}</p>}
            {movies.length > 0 && !error ? (
                <div className="movie-list">
                    {movies.map((movie, index) => (
                        <div key={index} className="movie-item">
                            <h2>{movie.Title}</h2>
                            <img src={movie.Poster} alt={movie.Title} style={{ width: "200px" }} />
                            <Link to={`/movie/${movie.imdbID}`} >
                                Ver detalles
                            </Link>


                        </div>
                    ))}
                </div>
            ) : (
                !error && <p className="no-results">No se encontraron películas.</p>
            )}


            {/* Mostrar mensaje si el usuario está autenticado */}

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