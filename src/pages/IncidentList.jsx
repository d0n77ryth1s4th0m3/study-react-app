function IncidentList() {
  return (
    <div className="page-container">
      <h1>🚨 Журнал инцидентов безопасности</h1>
      <p>Здесь будет отображаться список всех зафиксированных инцидентов</p>
      <div className="incident-stats">
        <div className="stat-card">
          <h3>Всего инцидентов</h3>
          <p className="stat-number">15</p>
        </div>
        <div className="stat-card">
          <h3>Решено</h3>
          <p className="stat-number">12</p>
        </div>
        <div className="stat-card">
          <h3>В работе</h3>
          <p className="stat-number">3</p>
        </div>
      </div>
    </div>
  );
}

export default IncidentList;