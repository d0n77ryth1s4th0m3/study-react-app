import { useState, useEffect } from 'react';
import { incidentsAPI } from '../services/api';

export const useIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await incidentsAPI.getAll();
      setIncidents(response.data);
    } catch (err) {
      setError('Ошибка при загрузке инцидентов');
      console.error('Error fetching incidents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  return {
    incidents,
    loading,
    error,
    fetchIncidents,
    setError
  };
};
