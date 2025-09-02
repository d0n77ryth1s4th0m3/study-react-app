import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-brand">
          <h2 style={{ color: 'white', margin: 0 }}>🏨 Система безопасности отелей</h2>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link" style={{ color: 'white' }}>
            👮 Сотрудники
          </Link>
          <Link to="/incidents" className="nav-link" style={{ color: 'white' }}>
            🚨 Инциденты
          </Link>
          <Link to="/employee/add" className="nav-link" style={{ color: 'white' }}>
            ➕ Добавить сотрудника
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;