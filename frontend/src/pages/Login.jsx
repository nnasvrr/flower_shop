import React, { useState } from 'react';
import './Login.css'; // Импорт CSS файла

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидация
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Неверный формат email';
    }
    
    if (!password) {
      newErrors.password = 'Пароль обязателен';
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Сброс ошибок
    setErrors({});
    
    // Имитация запроса на сервер
    try {
      setLoading(true);
      console.log('Отправка данных:', { email, password });
      
      // Здесь будет реальный запрос к API
      // await api.post('/auth/login/', { email, password });
      
      // Имитация задержки
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Вход выполнен успешно!');
      // Здесь обычно редирект или обновление состояния приложения
      
    } catch (error) {
      console.error('Ошибка входа:', error);
      setErrors({ 
        general: 'Неверный email или пароль. Попробуйте снова.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Вход в аккаунт</h2>
      
      {errors.general && (
        <div className="error-message" style={{ marginBottom: '20px' }}>
          ⚠️ {errors.general}
        </div>
      )}
      
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input 
            type="email" 
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ваш@email.com"
            disabled={loading}
          />
          {errors.email && (
            <div className="error-message">⚠️ {errors.email}</div>
          )}
        </div>
        
        <div className="form-group">
          <label className="form-label">Пароль:</label>
          <input 
            type="password" 
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
            disabled={loading}
          />
          {errors.password && (
            <div className="error-message">⚠️ {errors.password}</div>
          )}
        </div>
        
        <button 
          type="submit" 
          className="login-button"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="login-loading"></span>
              Вход...
            </>
          ) : 'Войти'}
        </button>
      </form>
      
      <div className="login-footer">
        Нет аккаунта? 
        <a href="/register" className="login-link">Зарегистрироваться</a>
      </div>
      
      <div className="login-footer" style={{ marginTop: '10px' }}>
        <a href="/forgot-password" className="login-link">Забыли пароль?</a>
      </div>
    </div>
  );
};

export default Login;