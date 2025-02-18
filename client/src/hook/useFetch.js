// Hook personalizado para realizar solicitudes HTTP

import { useState, useCallback } from "react";

const BASE_URL = "http://localhost:5000/movieapp/v1"; 

const useFetch = () => {
    // Estados para controlar el estado de la solicitud
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    // Función para realizar solicitudes HTTP
    const fetchData = useCallback(async (endpoint, method = "GET", body = null, token = null) => {
        setIsLoading(true);
        setError(null);
        setData(null);
        // Realizar la solicitud
        try {
            const url = `${BASE_URL}/${endpoint}`;
            const headers = {
                "Content-Type": "application/json",
            };
            // Agregar el token al encabezado de la solicitud
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }
            // Realizar la solicitud
            const response = await fetch(url, {
                method,
                headers,
                body: body ? JSON.stringify(body) : null,
            });
            // Manejar la respuesta
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Error en la solicitud");
            }
            // Actualizar los estados
            setData(result);
            return result;
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { isLoading, error, data, fetchData };
};

export default useFetch;
