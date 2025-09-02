import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Home from './pages/Home';
import EmployeeDetail from './pages/EmployeeDetail';
import EmployeeForm from './pages/EmployeeForm';
import IncidentList from './pages/IncidentList'; // Добавим страницу инцидентов
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            {/* Главная страница - список сотрудников охраны */}
            <Route path="/" element={<Home />} />
            
            {/* Детализация сотрудника */}
            <Route path="/employee/:id" element={<EmployeeDetail />} />
            
            {/* Добавление нового сотрудника */}
            <Route path="/employee/add" element={<EmployeeForm />} />
            
            {/* Редактирование сотрудника */}
            <Route path="/employee/edit/:id" element={<EmployeeForm />} />
            
            {/* Список инцидентов безопасности */}
            <Route path="/incidents" element={<IncidentList />} />
            
            {/* Детализация инцидента (опционально) */}
            <Route path="/incident/:id" element={<div>Детали инцидента</div>} />
            
            {/* Страница 404 (опционально) */}
            <Route path="*" element={<div>Страница не найдена</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;