/**
 * Componente para realizar la búsqueda de películas.
 * 
 * Permite a los usuarios buscar películas por título y ver detalles de cada película. 
 * También permite marcar películas como vistas si el usuario ha iniciado sesión.
 * 
 * @component
 * @example
 * return (
 *   <MoviesSearch />
 * )
 */

import React, {  useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../providers/SearchProvider";
import { useAuth } from "../providers/AuthContext";
import { useWatched } from "../providers/WatchedProvider";
import useFetch from "../hook/useFetch";
import usuario100 from '../images/usuario100.png';
import { useProfileImage } from '../providers/ProfileImageContext';

const MoviesSearch = () => {
    /**
     * Obtiene el historial de películas vistas del contexto de búsqueda.
     * @type {Object}
     */
    const { movies, setMovies, title, setTitle } = useSearch();
    /**
   * Obtiene el contexto de autenticación.
   * @type {Object}
   */
    const { isAuthenticated, logout } = useAuth();
    /**
      * Obtiene el contexto de películas vistas.
      * @type {Object}
      */
    const { markAsWatched, watched, fetchWatched } = useWatched();
    const navigate = useNavigate();

    /**
      * Hook personalizado para realizar la búsqueda de películas desde la API.
      * @type {Object}
      */
    const { isLoading, error, data, fetchData } = useFetch();
    const [isCardExpanded, setIsCardExpanded] = useState(true);
    /**
     * Obtiene el contexto de la imagen de perfil.
     * @type {Object}
     */
    const { profileImage } = useProfileImage();
    /**
      * Efecto que obtiene el historial de películas vistas cuando el usuario está autenticado.
      */
    useEffect(() => {
        if (isAuthenticated) {
            fetchWatched();
        }
    }, [fetchWatched, isAuthenticated]);

    /**
      * Efecto que actualiza el estado de las películas cuando la respuesta de la búsqueda cambia.
      */
    useEffect(() => {
        if (data?.Search) {
            setMovies(data.Search);
        } else {
            setMovies([]);
        }
    }, [data, setMovies]);

    /**
     * Realiza la búsqueda de películas por título.
     * Llama al hook `fetchData` para obtener las películas de la API.
     */
    const handleSearch = async () => {
        if (!title) return; 

        await fetchData(`movies/search?title=${title}`);

        setTitle("");
    };
    /**
      * Maneja el cierre de sesión, limpiando el estado de autenticación.
      */
    const handleLogout = () => {
        logout();
        navigate("/");
    };
    /**
    * Verifica si una película ya ha sido marcada como vista.
    * @param {string} movieId - El identificador único de la película.
    * @returns {boolean} `true` si la película ha sido vista, `false` si no.
    */
    const isWatched = (movieId) => watched.some((movie) => movie.movie_id === movieId);

    // Renderizar el componente
    return (
     
        <div className="container mt-4">
            <h1 className="text-center mb-4">Buscar Películas</h1>

           
            <div className="d-flex justify-content-center mb-4">
                <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
                    <div className="card-body">
                        <h5 className="card-title text-center">Buscar por Título</h5>
                        <div className="d-flex justify-content-between mb-3">
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Ingresa el título de la película"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <button className="btn btn-primary" onClick={handleSearch} disabled={isLoading}>
                                {isLoading ? "Buscando..." : "Buscar"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {error && <p className="text-danger text-center">{error}</p>}

           {/* Sección de peliculas */}
            {movies.length > 0 && !error ? (
                <div className="row">
                    {movies.map((movie, index) => (
                        <div key={index} className="col-12 col-md-3 mb-4">
                            <div className="card position-relative">
                                <img src={movie.Poster} alt={movie.Title} className="card-img-top" style={{ height: "300px", objectFit: "cover" }} />
                                <div className="card-body">
                                    <h5 className="card-title">{movie.Title}</h5>
                                    <Link to={`/movie/${movie.imdbID}`} className="btn btn-outline-primary w-100 mb-2">Ver detalles</Link>
                                    <button
                                        className={`btn ${isWatched(movie.imdbID) ? "btn-success" : "btn-outline-success"} w-100`}
                                        onClick={() => markAsWatched(movie)}
                                    >
                                        {isWatched(movie.imdbID) ? (
                                            <span className="bi bi-check-circle"></span>
                                        ) : (
                                            <span className="bi bi-eye"></span>
                                        )}
                                        {isWatched(movie.imdbID) ? " Visto" : " Marcar como Visto"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
               // Sección de mensaje si no se encontraron peliculas
                !error && (
                    <div className="text-center">
                        <div className="card p-4 mx-auto" style={{ maxWidth: '400px', width: '100%' }}>
                            <div className="card-body">
                                <p className="text-center">No se encontraron películas.</p>
                            </div>
                        </div>
                    </div>
                )
            )}

            {/* Sección de bienvenida y logout */}
            {isAuthenticated && (
                <div className="position-fixed" style={{
                    top: '120px',
                    right: '10px',
                    zIndex: 10
                }}>
                    <div className="card p-4" style={{
                        maxWidth: '400px',
                        width: '100%',
                        transition: 'all 0.3s ease',
                        overflow: '100px',
                        height: isCardExpanded ? 'auto' : '150px',
                    }}>
                        <div className="card-body text-center">
                            <h3>{isCardExpanded ? "Bienvenido" : "Ver Perfil"}</h3>
                            {isCardExpanded && (
                                <>
                                    <img src={profileImage ? `http://localhost:5000/${profileImage}` : usuario100}
                                        alt="Imagen de usuario"
                                        className="rounded-circle"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                    <div>
                                        <button className="btn btn-secondary mb-2 w-100" onClick={() => navigate("/profile")}>Ver Perfil</button>
                                        <button onClick={handleLogout} className="btn btn-danger w-100">Cerrar Sesión</button>
                                    </div>
                                </>
                            )}
                            {/* Botón para expandir/replegar */}
                            <button
                                onClick={() => setIsCardExpanded(!isCardExpanded)}
                                className="btn btn-outline-secondary w-100 mt-3"
                            >
                                {isCardExpanded ? "Ver menos" : "Ver más"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );

};

export default MoviesSearch;
