import React, { useEffect, useState } from 'react';
import useFetch from '../hook/useFetch';

const AdminDashboard = () => {
  const [tables, setTables] = useState([]);
  const [collections, setCollections] = useState([]);
  const { isLoading, error, fetchData } = useFetch();

};

export default AdminDashboard;
