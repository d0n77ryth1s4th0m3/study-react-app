import { useParams } from 'react-router-dom';

function EmployeeForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  
  return (
    <div className="page-container">
      <h1>{isEdit ? 'Редактирование' : 'Добавление'} сотрудника</h1>
      <p>Здесь будет форма для {isEdit ? 'редактирования' : 'добавления'} сотрудника</p>
    </div>
  );
}

export default EmployeeForm;