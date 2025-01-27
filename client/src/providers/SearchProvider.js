import React, { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState("");


    return (
        <SearchContext.Provider value={{ movies, setMovies, title, setTitle }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => useContext(SearchContext);