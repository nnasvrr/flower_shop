import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Registration.css';

const Registration = () => {
  const navigate = useNavigate(); 
  
  const [formData, setFormData] = useState({
    login: '',
    nickname: '',
    firstName: '',
    lastName: '',
    middleName: '',
    gender: '',
    email: '',
    phone: '+7 ',
    password: '',
    confirmPassword: '',
    agreeToData: false,
    agreeToOffer: false,
    agreeToPrivacy: false
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const phoneRef = useRef(null);

  const handleOpenModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  const renderDocument = (type) => {
    const documents = {
      data: {
        title: 'Согласие на обработку персональных данных',
        content: 'Я даю согласие на обработку моих персональных данных для регистрации и использования сервиса'
      },
      offer: {
        title: 'Договор публичной оферты',
        content: 'Настоящий договор регулирует условия использования сервиса при регистрации на сайте'
      },
      privacy: {
        title: 'Политика конфиденциальности',
        content: 'Мы защищаем ваши персональные данные и обеспечиваем их конфиденциальность.'
      }
    };
    
    const doc = documents[type];
    return (
      <div className="document-modal">
        <h3>{doc.title}</h3>
        <div className="document-content">
          {doc.content}
        </div>
        <button onClick={handleCloseModal}>Закрыть</button>
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'firstName' || name === 'lastName' || name === 'middleName') {
      if (value && !/^[а-яА-ЯёЁ\s-]*$/.test(value)) return;
    }
    
    if (name === 'login') {
      if (value && !/^[a-zA-Z0-9_]*$/.test(value)) return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    
    if (value.length < 4) {
      setFormData(prev => ({ ...prev, phone: '+7 ' }));
      return;
    }
    
    const numbers = value.replace(/\D/g, '').slice(1);
    
    let formatted = '+7 ';
    
    if (numbers.length > 0) {
      formatted += '(' + numbers.substring(0, 3);
    }
    if (numbers.length >= 3) {
      formatted += ') ' + numbers.substring(3, 6);
    }
    if (numbers.length >= 6) {
      formatted += '-' + numbers.substring(6, 8);
    }
    if (numbers.length >= 8) {
      formatted += '-' + numbers.substring(8, 10);
    }
    
    setFormData(prev => ({ ...prev, phone: formatted }));
    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
  };

  const handlePhoneKeyDown = (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      
      const cursorPos = e.target.selectionStart;
      const value = e.target.value;
      
      if (cursorPos <= 4) {
        setFormData(prev => ({ ...prev, phone: '+7 ' }));
        setTimeout(() => {
          if (phoneRef.current) phoneRef.current.setSelectionRange(4, 4);
        }, 0);
        return;
      }
      
      if (value === '+7 ') {
        return;
      }
      
      const numbers = value.replace(/\D/g, '').slice(1);
      
      if (numbers.length > 0) {
        const newNumbers = numbers.slice(0, -1);
        
        let formatted = '+7 ';
        
        if (newNumbers.length > 0) {
          formatted += '(' + newNumbers.substring(0, 3);
        }
        if (newNumbers.length >= 3) {
          formatted += ') ' + newNumbers.substring(3, 6);
        }
        if (newNumbers.length >= 6) {
          formatted += '-' + newNumbers.substring(6, 8);
        }
        if (newNumbers.length >= 8) {
          formatted += '-' + newNumbers.substring(8, 10);
        }
        
        setFormData(prev => ({ ...prev, phone: formatted }));
        
        setTimeout(() => {
          if (phoneRef.current) {
            let newCursorPos = cursorPos - 1;
            
            if (formatted.length < value.length) {
              if (cursorPos === 9 || cursorPos === 13 || cursorPos === 16) {
                newCursorPos = cursorPos - 2;
              }
            }
            
            phoneRef.current.setSelectionRange(newCursorPos, newCursorPos);
          }
        }, 0);
      }
    }
  };

  const handlePhoneFocus = () => {
    setTimeout(() => {
      if (phoneRef.current) {
        const phone = phoneRef.current.value;
        if (phone === '+7 ') {
          phoneRef.current.setSelectionRange(4, 4);
        }
      }
    }, 0);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.login.trim()) {
      newErrors.login = 'Логин обязателен';
    } else if (formData.login.length < 3) {
      newErrors.login = 'Минимум 3 символа';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.login)) {
      newErrors.login = 'Только латиница и цифры';
    }
    
    if (!formData.nickname.trim()) {
      newErrors.nickname = 'Никнейм обязателен';
    } else if (formData.nickname.length > 50) {
      newErrors.nickname = 'Максимум 50 символов';
    }
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Имя обязательно';
    } else if (!/^[а-яА-ЯёЁ\s-]+$/.test(formData.firstName)) {
      newErrors.firstName = 'Только кириллица';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Фамилия обязательна';
    } else if (!/^[а-яА-ЯёЁ\s-]+$/.test(formData.lastName)) {
      newErrors.lastName = 'Только кириллица';
    }
    
    if (formData.middleName && !/^[а-яА-ЯёЁ\s-]*$/.test(formData.middleName)) {
      newErrors.middleName = 'Только кириллица';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Выберите пол';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Неверный формат';
    }
    
    if (!formData.phone.trim() || formData.phone === '+7 ') {
      newErrors.phone = 'Телефон обязателен';
    } else if (!/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(formData.phone)) {
      newErrors.phone = 'Введите полный номер: +7 (XXX) XXX-XX-XX';
    }
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Минимум 6 символов';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Подтвердите пароль';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    if (!formData.agreeToData) {
      newErrors.agreeToData = 'Необходимо согласие';
    }
    
    if (!formData.agreeToOffer) {
      newErrors.agreeToOffer = 'Примите договор оферты';
    }
    
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = 'Примите политику конфиденциальности';
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
    setLoading(true);
    
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const loginExists = users.some(user => user.login === formData.login);
      
      if (loginExists) {
        setErrors({ login: 'Этот логин уже занят' });
        setShowErrors(true);
        setLoading(false);
        return;
      }
      const newUser = {
        login: formData.login,
        password: formData.password,
        email: formData.email,
        phone: formData.phone,
        firstName: formData.firstName,
        lastName: formData.lastName,
        nickname: formData.nickname,
        gender: formData.gender,
        middleName: formData.middleName
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      localStorage.setItem('currentUser', JSON.stringify({
        login: formData.login,
        isAuthenticated: true
      }));
      navigate('/Login');
      setLoading(false);
    }, 1000);
    
    return false;
  };

  return (
    <div className="registration-container">
      <h2>Регистрация</h2>
      
      {showErrors && Object.keys(errors).length > 0 && (
        <div className="error-window">
          <div className="error-header">
            <h3>Ошибки:</h3>
            <button onClick={() => setShowErrors(false)}>×</button>
          </div>
          <div className="error-list">
            {Object.values(errors).map((error, index) => (
              <div key={index}>⚠️ {error}</div>
            ))}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Логин</label>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
            placeholder="Введите логин"
            className={errors.login ? 'error' : ''}
          />
        </div>
        
        <div className="form-group">
          <label>Никнейм</label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            placeholder="Введите никнейм"
            maxLength={50}
            className={errors.nickname ? 'error' : ''}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Имя</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Введите имя"
              className={errors.firstName ? 'error' : ''}
            />
          </div>
          <div className="form-group">
            <label>Фамилия</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Введите фамилию"
              className={errors.lastName ? 'error' : ''}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Отчество</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Введите отчество"
            className={errors.middleName ? 'error' : ''}
          />
        </div>
        
        <div className="form-group">
          <label>Пол</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={errors.gender ? 'error' : ''}
          >
            <option value="">Выберите пол</option>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
            <option value="not_specified">Не указан</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            className={errors.email ? 'error' : ''}
          />
        </div>
        
        <div className="form-group">
          <label>Телефон</label>
          <input
            type="tel"
            ref={phoneRef}
            value={formData.phone}
            onChange={handlePhoneChange}
            onKeyDown={handlePhoneKeyDown}
            onFocus={handlePhoneFocus}
            placeholder="+7 (XXX) XXX-XX-XX"
            className={errors.phone ? 'error' : ''}
          />
        </div>
        
        <div className="form-group">
          <label>Пароль</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Придумайте пароль"
            className={errors.password ? 'error' : ''}
          />
        </div>
        
        <div className="form-group">
          <label>Подтвердите пароль</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Повторите пароль"
            className={errors.confirmPassword ? 'error' : ''}
          />
        </div>
        
        <div className="agreements">
          <div className="agreement-item">
            <input
              type="checkbox"
              name="agreeToData"
              checked={formData.agreeToData}
              onChange={handleChange}
              id="agreeToData"
            />
            <label htmlFor="agreeToData">
              Я согласен с <span className="document-link" onClick={() => handleOpenModal('data')}>обработкой персональных данных</span>*
            </label>
          </div>
          
          <div className="agreement-item">
            <input
              type="checkbox"
              name="agreeToOffer"
              checked={formData.agreeToOffer}
              onChange={handleChange}
              id="agreeToOffer"
            />
            <label htmlFor="agreeToOffer">
              Я принимаю <span className="document-link" onClick={() => handleOpenModal('offer')}>договор публичной оферты</span>*
            </label>
          </div>
          
          <div className="agreement-item">
            <input
              type="checkbox"
              name="agreeToPrivacy"
              checked={formData.agreeToPrivacy}
              onChange={handleChange}
              id="agreeToPrivacy"
            />
            <label htmlFor="agreeToPrivacy">
              Я принимаю <span className="document-link" onClick={() => handleOpenModal('privacy')}>политику конфиденциальности</span>*
            </label>
          </div>
          
          {(errors.agreeToData || errors.agreeToOffer || errors.agreeToPrivacy) && (
            <div className="error-text">⚠️ Все соглашения обязательны</div>
          )}
        </div>
        
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
      
      <div className="login-link">
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {modalContent === 'data' && renderDocument('data')}
            {modalContent === 'offer' && renderDocument('offer')}
            {modalContent === 'privacy' && renderDocument('privacy')}
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;