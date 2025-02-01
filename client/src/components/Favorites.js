import React from "react";
import {useFavorites} from "../providers/FavoritesProvider";

const Favorites = () => {
    const {favorites} = useFavorites();

   
    return (
        <div className="favorites-container">
            <h2>Mis Películas Favoritas</h2>
            
            {favorites.length === 0 ? (
                  <p>No tienes películas favoritas.</p>
            ) : (
                
                <ul>
                    {favorites.map((movie) => (
                        <li key={movie.imdbID}>
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title} width="100" />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Favorites;