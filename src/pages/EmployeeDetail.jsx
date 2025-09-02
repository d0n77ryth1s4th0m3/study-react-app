import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { employeesAPI } from '../services/api';

function EmployeeDetail() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const response = await employeesAPI.getById(id);
        setEmployee(response.data);
      } catch (err) {
        setError('Ошибка при загрузке данных сотрудника');
        console.error('Error fetching employee:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) return <div className="page-container">Загрузка...</div>;
  if (error) return <div className="page-container">Ошибка: {error}</div>;
  if (!employee) return <div className="page-container">Сотрудник не найден</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>👤 Профиль сотрудника</h1>
        <Link to="/" className="btn">
          ← Назад к списку
        </Link>
      </div>

      <div className="employee-detail">
        <div className="employee-profile">
          <img src={employee.image} alt={employee.name} className="employee-image" />
          <h2>{employee.name}</h2>
          <p className="employee-position">{employee.position}</p>
        </div>

        <div className="employee-details-grid">
          <div className="detail-item">
            <label>Отель:</label>
            <span>{employee.department}</span>
          </div>
          <div className="detail-item">
            <label>Смена:</label>
            <span>{employee.shift}</span>
          </div>
          <div className="detail-item">
            <label>Телефон:</label>
            <span>{employee.phone}</span>
          </div>
          <div className="detail-item">
            <label>Email:</label>
            <span>{employee.email}</span>
          </div>
          <div className="detail-item">
            <label>Статус:</label>
            <span className={`status ${employee.status === 'На дежурстве' ? 'status-on' : 'status-off'}`}>
              {employee.status}
            </span>
          </div>
          <div className="detail-item">
            <label>Дата найма:</label>
            <span>{employee.hireDate}</span>
          </div>
        </div>

        <div className="skills-section">
          <h3>Навыки и квалификации:</h3>
          <div className="skills-list">
            {employee.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          <Link to={`/employee/edit/${id}`} className="btn btn-primary">
            ✏️ Редактировать профиль
          </Link>
          <Link to="/" className="btn">
            ← Назад
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDetail;