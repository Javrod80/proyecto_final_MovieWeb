import { useEffect, useState } from 'react';
import useFetch from '../hook/useFetch';
import useAdminStatus from './useAdminStatus';

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
