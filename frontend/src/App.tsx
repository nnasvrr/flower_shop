import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Registration from './pages/Registration';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Main from './pages/Main';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <header style={{
          background: '#e6b5c7ff',
          color: 'white',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1>FlowerShop</h1>
          <nav>
            <Link to="/" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Главная</Link>
            <Link to="/catalog" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Каталог</Link>
            <Link to="/login" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Вход</Link>
            <Link to="/registration" style={{ color: 'white', margin: '0 10px', textDecoration: 'none' }}>Регистрация</Link>
          </nav>
        </header>

        <main style={{ minHeight: '70vh', padding: '20px' }}>
<Routes>
  <Route path="/" element={<Main />} />
  <Route path="/catalog" element={<Catalog />} />
  <Route path="/login" element={<Login />} />
  <Route path="/registration" element={<Registration />} />
</Routes>
        </main>

        <footer style={{
          background: '#333',
          color: 'white',
          padding: '20px',
          marginTop: '50px',
          textAlign: 'center'
        }}>
          <p>© 2025 Магазин цветов "FlowerShop". Все права защищены.</p>
          <p>Телефон: +7 (123) 456-78-90 | Адрес: г.Ульяновск , ул. Андрея Блаженого, д. 3</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;