/**
 * Hook personalizado para realizar solicitudes HTTP a una API.
 * Este hook maneja el estado de carga, el error y los datos de la respuesta.
 * Permite realizar solicitudes HTTP de tipo GET, POST, PUT, DELETE, entre otros.
 * 
 * @example
 * const { isLoading, error, data, fetchData } = useFetch();
 * 
 * 
 * const result = await fetchData("endpoint", "POST", { key: "value" });
 * 
 * @returns {Object} Objeto con el estado de la solicitud HTTP y la función `fetchData`.
 * @returns {boolean} isLoading - Estado de carga (true mientras se espera la respuesta).
 * @returns {string|null} error - Mensaje de error si ocurre un problema en la solicitud.
 * @returns {Object|null} data - Datos de la respuesta si la solicitud fue exitosa.
 * @returns {function} fetchData - Función para realizar la solicitud HTTP.
 */

import { useState, useCallback } from "react";

const BASE_URL = "http://localhost:5000/movieapp/v1"; 

const useFetch = () => {
    /**
       * Estado que indica si la solicitud está en proceso.
       * @type {boolean}
       */
    const [isLoading, setIsLoading] = useState(false);
    /**
    * Estado para almacenar el mensaje de error, si ocurre uno.
    * @type {string|null}
    */
    const [error, setError] = useState(null);
    /**
   * Estado para almacenar los datos obtenidos de la respuesta de la solicitud.
   * @type {Object|null}
   */
    const [data, setData] = useState(null);
    /**
     * Función para realizar solicitudes HTTP.
     * Esta función utiliza `fetch` para enviar una solicitud a la API y maneja los estados de carga, error y datos.
     * 
     * @param {string} endpoint - Endpoint de la API al que se enviará la solicitud.
     * @param {string} [method="GET"] - Método HTTP a usar (por defecto es "GET").
     * @param {Object|null} [body=null] - Cuerpo de la solicitud (usualmente para POST, PUT).
     * @param {string|null} [token=null] - Token de autenticación (opcional).
     * 
     * @returns {Promise<Object|null>} - Datos de la respuesta de la API o null si ocurre un error.
     */
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
