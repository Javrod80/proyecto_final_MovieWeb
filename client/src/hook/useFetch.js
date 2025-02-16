import { useState, useCallback } from "react";

const BASE_URL = "http://localhost:5000/movieapp/v1"; 

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const fetchData = useCallback(async (endpoint, method = "GET", body = null, token = null) => {
        setIsLoading(true);
        setError(null);
        setData(null);

        try {
            const url = `${BASE_URL}/${endpoint}`;
            const headers = {
                "Content-Type": "application/json",
            };
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const response = await fetch(url, {
                method,
                headers,
                body: body ? JSON.stringify(body) : null,
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Error en la solicitud");
            }

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
