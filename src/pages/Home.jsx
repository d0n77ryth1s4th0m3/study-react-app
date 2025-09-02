import { Link } from 'react-router-dom';
import { useEmployees } from '../hooks/useEmployees';
import { STRINGS } from '../constants/strings';

function Home() {
  const { employees, loading, error, deleteEmployee, setError } = useEmployees();

  // DELETE - удаление сотрудника
  const handleDeleteEmployee = async (id) => {
    if (window.confirm(STRINGS.CONFIRM_DELETE_EMPLOYEE)) {
      try {
        await deleteEmployee(id);
      } catch (err) {
        // Error already handled in hook
      }
    }
  };

  if (loading) return <div className="page-container">{STRINGS.LOADING}</div>;
  if (error) return <div className="page-container">Ошибка: {error}</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{STRINGS.EMPLOYEES_TITLE}</h1>
        <Link to="/employee/add" className="btn btn-primary">
          {STRINGS.ADD_EMPLOYEE}
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
          <p>{STRINGS.EMPLOYEES_NOT_FOUND}</p>
        </div>
      )}
    </div>
  );
}

export default Home;