import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  
  const [loginData, setLoginData] = useState({
    login: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'login') {
      if (value && !/^[a-zA-Z0-9_]*$/.test(value)) return;
    }
    
    setLoginData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (errors.general) setErrors(prev => ({ ...prev, general: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!loginData.login.trim()) {
      newErrors.login = 'Логин обязателен';
    } else if (loginData.login.length < 3) {
      newErrors.login = 'Минимум 3 символа';
    } else if (!/^[a-zA-Z0-9_]+$/.test(loginData.login)) {
      newErrors.login = 'Только латиница и цифры';
    }
    
    if (!loginData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (loginData.password.length < 6) {
      newErrors.password = 'Минимум 6 символов';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setShowErrors(true);
      return false;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => 
      user.login === loginData.login && user.password === loginData.password
    );
    
    if (userExists) {
      localStorage.setItem('currentUser', JSON.stringify({
        login: loginData.login,
        isAuthenticated: true
      }));
      window.location.href = '/';
    } else {
      setErrors({ 
        general: 'Неверный логин или пароль' 
      });
      setShowErrors(true);
    }
    
    return false;
  };

  return (
    <div className="login-container">
      <h2>Вход в аккаунт</h2>
      
      {showErrors && Object.keys(errors).length > 0 && (
        <div className="error-window">
          <div className="error-header">
            <h3>Ошибки:</h3>
            <button onClick={() => setShowErrors(false)}>×</button>
          </div>
          <div className="error-list">
            {errors.login && <div key="login">⚠️ {errors.login}</div>}
            {errors.password && <div key="password">⚠️ {errors.password}</div>}
            {errors.general && <div key="general">⚠️ {errors.general}</div>}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Логин</label>
          <input
            type="text"
            name="login"
            value={loginData.login}
            onChange={handleChange}
            placeholder="Введите логин"
            className={errors.login || errors.general ? 'error' : ''}
          />
        </div>
        
        <div className="form-group">
          <label>Пароль</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="Введите пароль"
            className={errors.password || errors.general ? 'error' : ''}
          />
        </div>
        
        <button type="submit" className="submit-btn">
          Войти
        </button>
      </form>
      
      <div className="login-footer">
        Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
      </div>
    </div>
  );
};

export default Login;