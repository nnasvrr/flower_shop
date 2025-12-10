import React from 'react';

const Registration: React.FC = () => {
  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Регистрация</h2>
      <form>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Имя:</label>
          <input type="text" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input type="email" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Пароль:</label>
          <input type="password" style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>
        <button type="submit" style={{ 
          padding: '10px 20px', 
          background: '#ff69b4', 
          color: 'white',
          border: 'none', 
          borderRadius: '5px',
          width: '100%',
          fontSize: '16px',
          cursor: 'pointer'
        }}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Registration;