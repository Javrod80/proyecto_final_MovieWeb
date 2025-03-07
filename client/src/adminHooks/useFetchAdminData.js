import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import useAdminStatus from './useAdminStatus';
/**
 * Custom hook para obtener datos del administrador desde un endpoint.
 *
 * Este hook usa el estado de administrador y el token para realizar una petición al servidor y 
 * obtener datos si el usuario es administrador.
 *
 * @param {string} endpoint - El endpoint de la API desde donde se obtendrán los datos.
 * @returns {object} - Retorna un objeto que contiene los datos obtenidos (`data`), el estado de administrador (`isAdmin`), 
 * el estado de carga (`isLoading`) y los errores (`error`).
 */
const useFetchAdminData = (endpoint) => {
  const { isLoading, error, fetchData } = useFetch();
  const { isAdmin, token } = useAdminStatus();
  const [data, setData] = useState([]); 

  useEffect(() => {
    if (isAdmin && token) {
      const fetchDataAsync = async () => {
        const result = await fetchData(endpoint, 'GET', null, token);
        if (result) {
          setData(result);
        }
      };
      fetchDataAsync();
    }
  }, [isAdmin, fetchData, token, endpoint]);

  return { data, isAdmin, isLoading, error };
};

export default useFetchAdminData;
