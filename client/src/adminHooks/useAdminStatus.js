import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

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
