import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Сброс ошибки при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Проверка силы пароля
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    let strength = '';
    if (password.length === 0) {
      strength = '';
    } else if (password.length < 6) {
      strength = 'weak';
    } else if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      strength = 'medium';
    } else {
      strength = 'strong';
    }
    setPasswordStrength(strength);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Имя обязательно';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Фамилия обязательна';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Подтвердите пароль';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Необходимо согласие с условиями';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      setLoading(true);
      console.log('Регистрация:', formData);
      
      // Здесь будет реальный запрос к API
      // await api.post('/auth/register/', formData);
      
      // Имитация задержки
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Регистрация успешна! Проверьте вашу почту для подтверждения.');
      // Здесь обычно редирект на страницу входа или подтверждения
      
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      setErrors({ 
        general: 'Ошибка при регистрации. Попробуйте снова.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <h2 className="registration-title">Регистрация</h2>
      <p className="registration-subtitle">
        Создайте аккаунт для совершения покупок
      </p>
      
      {errors.general && (
        <div className="error-message" style={{ marginBottom: '20px' }}>
          ⚠️ {errors.general}
        </div>
      )}
      
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label required">Имя:</label>
            <input 
              type="text" 
              name="firstName"
              className={`form-input ${errors.firstName ? 'error' : ''}`}
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Введите имя"
              disabled={loading}
            />
            {errors.firstName && (
              <div className="error-message">⚠️ {errors.firstName}</div>
            )}
          </div>
          
          <div className="form-group">
            <label className="form-label required">Фамилия:</label>
            <input 
              type="text" 
              name="lastName"
              className={`form-input ${errors.lastName ? 'error' : ''}`}
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Введите фамилию"
              disabled={loading}
            />
            {errors.lastName && (
              <div className="error-message">⚠️ {errors.lastName}</div>
            )}
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label required">Email:</label>
          <input 
            type="email" 
            name="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            value={formData.email}
            onChange={handleChange}
            placeholder="ваш@email.com"
            disabled={loading}
          />
          {errors.email && (
            <div className="error-message">⚠️ {errors.email}</div>
          )}
        </div>
        
        <div className="form-group">
          <label className="form-label required">Пароль:</label>
          <input 
            type="password" 
            name="password"
            className={`form-input ${errors.password ? 'error' : ''}`}
            value={formData.password}
            onChange={handleChange}
            placeholder="Не менее 6 символов"
            disabled={loading}
          />
          {errors.password ? (
            <div className="error-message">⚠️ {errors.password}</div>
          ) : passwordStrength && (
            <div className={`password-strength ${passwordStrength}`}>
              Сложность пароля: {
                passwordStrength === 'weak' ? 'Слабый' :
                passwordStrength === 'medium' ? 'Средний' : 'Сильный'
              }
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label className="form-label required">Подтвердите пароль:</label>
          <input 
            type="password" 
            name="confirmPassword"
            className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Повторите пароль"
            disabled={loading}
          />
          {errors.confirmPassword && (
            <div className="error-message">⚠️ {errors.confirmPassword}</div>
          )}
        </div>
        
        <div className="checkbox-group">
          <input 
            type="checkbox" 
            name="agreeToTerms"
            id="agreeToTerms"
            className="checkbox-input"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            disabled={loading}
          />
          <label htmlFor="agreeToTerms" className="checkbox-label">
            Я согласен с <a href="/terms">условиями использования</a> и{' '}
            <a href="/privacy">политикой конфиденциальности</a>
          </label>
        </div>
        {errors.agreeToTerms && (
          <div className="error-message">⚠️ {errors.agreeToTerms}</div>
        )}
        
        <button 
          type="submit" 
          className="registration-button"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="registration-loading"></span>
              Регистрация...
            </>
          ) : 'Зарегистрироваться'}
        </button>
      </form>
      
      <div className="registration-footer">
        Уже есть аккаунт? 
        <Link to="/login" className="registration-link">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Registration;