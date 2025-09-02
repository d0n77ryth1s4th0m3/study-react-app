import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { employeesAPI } from '../services/api';

function Home() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GET - получение списка сотрудников
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await employeesAPI.getAll();
      setEmployees(response.data);
    } catch (err) {
      setError('Ошибка при загрузке сотрудников');
      console.error('Error fetching employees:', err);
    } finally {
      setLoading(false);
    }
  };

  // DELETE - удаление сотрудника
  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить сотрудника?')) {
      try {
        await employeesAPI.delete(id);
        // Обновляем список после удаления
        setEmployees(employees.filter(emp => emp.id !== id));
      } catch (err) {
        setError('Ошибка при удалении сотрудника');
        console.error('Error deleting employee:', err);
      }
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  if (loading) return <div className="page-container">Загрузка...</div>;
  if (error) return <div className="page-container">Ошибка: {error}</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>👮 Сотрудники службы безопасности</h1>
        <Link to="/employee/add" className="btn btn-primary">
          ➕ Добавить сотрудника
        </Link>
      </div>

      <div className="employee-list">
        {employees.map(employee => (
          <div key={employee.id} className="employee-card">
            <div className="employee-info">
              <h3>{employee.name}</h3>
              <p><strong>Должность:</strong> {employee.position}</p>
              <p><strong>Отель:</strong> {employee.department}</p>
              <p><strong>Смена:</strong> {employee.shift}</p>
              <p><strong>Статус:</strong> 
                <span className={`status ${employee.status === 'На дежурстве' ? 'status-on' : 'status-off'}`}>
                  {employee.status}
                </span>
              </p>
            </div>
            <div className="employee-actions">
              <Link to={`/employee/${employee.id}`} className="btn btn-primary">
                👁️ Просмотр
              </Link>
              <Link to={`/employee/edit/${employee.id}`} className="btn">
                ✏️ Редактировать
              </Link>
              <button 
                onClick={() => handleDeleteEmployee(employee.id)}
                className="btn btn-danger"
              >
                🗑️ Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      {employees.length === 0 && (
        <div className="empty-state">
          <p>Сотрудники не найдены</p>
        </div>
      )}
    </div>
  );
}

export default Home;