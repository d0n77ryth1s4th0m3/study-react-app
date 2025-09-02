import { useState, useEffect } from 'react';
import { employeesAPI } from '../services/api';

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await employeesAPI.getAll();
      setEmployees(response.data);
    } catch (err) {
      setError('Ошибка при загрузке сотрудников');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await employeesAPI.delete(id);
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (err) {
      setError('Ошибка при удалении сотрудника');
      console.error('Error deleting employee:', err);
      throw err; // Re-throw to handle in component
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return {
    employees,
    loading,
    error,
    fetchEmployees,
    deleteEmployee,
    setError
  };
};
