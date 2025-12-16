import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Card from './pages/Card'; 
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Main from './pages/Main';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user?.isAuthenticated) {
        setIsAuthenticated(true);
        setCurrentUser(user);
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    };
    
    checkAuth();
    
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <h1 className="logo">FlowerShop</h1>
            <nav>
              <ul className="nav-links">
                <li><Link to="/" className="nav-link">Главная</Link></li>
                <li><Link to="/catalog" className="nav-link">Каталог</Link></li>
                
                {isAuthenticated ? (
                  <>
                    
                    <li>
                      <button onClick={handleLogout} className="logout-btn">
                        Выйти
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li><Link to="/login" className="nav-link">Вход</Link></li>
                    <li><Link to="/registration" className="nav-link">Регистрация</Link></li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/card/:productId" element={<Card />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <div className="footer-content">
            <p>© 2025 Магазин цветов "FlowerShop". Все права защищены.</p>
            <p>Телефон: +7 (123) 456-78-90 | Адрес: г.Ульяновск , ул. Андрея Блаженого, д. 3</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;