import { useParams } from 'react-router-dom';

function EmployeeDetail() {
  const { id } = useParams();
  
  return (
    <div className="page-container">
      <h1>Профиль сотрудника #{id}</h1>
      <p>Здесь будет детальная информация о сотруднике</p>
    </div>
  );
}

export default EmployeeDetail;