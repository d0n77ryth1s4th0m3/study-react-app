import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { employeesAPI } from '../services/api';
import { STRINGS } from '../constants/strings';

function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    shift: '',
    phone: '',
    email: '',
    skills: '',
    status: 'На дежурстве',
    image: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // GET - загрузка данных для редактирования
  useEffect(() => {
    if (isEdit) {
      const fetchEmployee = async () => {
        try {
          const response = await employeesAPI.getById(id);
          const employee = response.data;
          setFormData({
            ...employee,
            skills: employee.skills.join(', ') // Преобразуем массив в строку
          });
        } catch (err) {
          setError('Ошибка при загрузке данных сотрудника');
          console.error('Error fetching employee:', err);
        }
      };
      fetchEmployee();
    }
  }, [id, isEdit]);

  // Обработчик изменения полей формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Подготовка данных для отправки
      const submissionData = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
      };

      // POST или PUT запрос
      if (isEdit) {
        await employeesAPI.update(id, submissionData);
      } else {
        await employeesAPI.create(submissionData);
      }

      // Перенаправление после успешного сохранения
      navigate('/');
    } catch (err) {
      setError('Ошибка при сохранении данных');
      console.error('Error saving employee:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{isEdit ? '✏️ Редактирование' : '➕ Добавление'} сотрудника</h1>
        <Link to="/" className="btn">
          ← Назад к списку
        </Link>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name" className="form-label">ФИО сотрудника *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="position" className="form-label">Должность *</label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department" className="form-label">Отель *</label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="shift" className="form-label">Смена *</label>
            <select
              id="shift"
              name="shift"
              value={formData.shift}
              onChange={handleInputChange}
              className="form-input"
              required
            >
              <option value="">Выберите смену</option>
              <option value="Утренняя смена (06:00-14:00)">Утренняя смена (06:00-14:00)</option>
              <option value="Дневная смена (08:00-16:00)">Дневная смена (08:00-16:00)</option>
              <option value="Вечерняя смена (14:00-22:00)">Вечерняя смена (14:00-22:00)</option>
              <option value="Ночная смена (22:00-06:00)">Ночная смена (22:00-06:00)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">Телефон *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="skills" className="form-label">Навыки (через запятую)</label>
            <textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              className="form-input"
              rows="3"
              placeholder="Кризисное управление, Первая помощь, Навыки наблюдения"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status" className="form-label">Статус *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="form-input"
              required
            >
              <option value="На дежурстве">На дежурстве</option>
              <option value="Выходной">Выходной</option>
              <option value="Больничный">Больничный</option>
              <option value="Отпуск">Отпуск</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="image" className="form-label">URL изображения</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="form-input"
              placeholder="https://example.com/photo.jpg"
            />
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? STRINGS.SAVING : (isEdit ? STRINGS.UPDATE : STRINGS.ADD)}
          </button>
          <Link to="/" className="btn">
            {STRINGS.CANCEL}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EmployeeForm;