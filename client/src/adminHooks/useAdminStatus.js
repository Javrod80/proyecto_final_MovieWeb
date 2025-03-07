import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
/**
 * Custom hook para determinar el estado de administrador de un usuario.
 *
 * @returns {object} - Retorna un objeto que contiene el estado de administrador y el token.
 */
const useAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.rol === 'admin') {
        setIsAdmin(true);
      }
    }
  }, [token]);

  return { isAdmin, token };
};

export default useAdminStatus;
