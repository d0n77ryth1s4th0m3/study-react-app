import { useIncidents } from '../hooks/useIncidents';
import { STRINGS } from '../constants/strings';
import LoadingSpinner from '../components/Common/LoadingSpinner';

function IncidentList() {
  const { incidents, loading, error } = useIncidents();

  if (loading) return <LoadingSpinner message={STRINGS.LOADING} />;
  if (error) return <div className="page-container">Ошибка: {error}</div>;

  const totalIncidents = incidents.length;
  const resolvedIncidents = incidents.filter(incident => incident.status === 'Решено').length;
  const inProgressIncidents = incidents.filter(incident => incident.status === 'В работе').length;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>{STRINGS.INCIDENTS_TITLE}</h1>
      </div>

      <div className="incident-stats">
        <div className="stat-card">
          <h3>Всего инцидентов</h3>
          <p className="stat-number">{totalIncidents}</p>
        </div>
        <div className="stat-card">
          <h3>Решено</h3>
          <p className="stat-number">{resolvedIncidents}</p>
        </div>
        <div className="stat-card">
          <h3>В работе</h3>
          <p className="stat-number">{inProgressIncidents}</p>
        </div>
      </div>

      <div className="incident-list">
        {incidents.map(incident => (
          <div key={incident.id} className="incident-card">
            <div className="incident-header">
              <h3>{incident.title}</h3>
              <span className={`status ${incident.status === 'Решено' ? 'status-resolved' : 'status-in-progress'}`}>
                {incident.status}
              </span>
            </div>
            <div className="incident-details">
              <p><strong>Дата:</strong> {incident.date}</p>
              <p><strong>Время:</strong> {incident.time}</p>
              <p><strong>Отель:</strong> {incident.hotel}</p>
              <p><strong>Серьезность:</strong> {incident.severity}</p>
            </div>
            <div className="incident-description">
              <p>{incident.description}</p>
            </div>
            {incident.resolution && (
              <div className="incident-resolution">
                <p><strong>Решение:</strong> {incident.resolution}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {incidents.length === 0 && (
        <div className="empty-state">
          <p>Инциденты не найдены</p>
        </div>
      )}
    </div>
  );
}

export default IncidentList;