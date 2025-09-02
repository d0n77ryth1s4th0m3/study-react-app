import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>🏨 Система безопасности отелей</h2>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Сотрудники</Link>
          <Link to="/add-employee" className="nav-link">Добавить сотрудника</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;