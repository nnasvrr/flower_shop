import React from 'react';

const Main = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Добро пожаловать в FlowersShop </h1>
      <p>Свежие цветы с доставкой по всему городу</p>
      <button style={{ 
        padding: '10px 20px', 
        background: '#b06b6bff', 
        color: 'white',
        border: 'none', 
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer'
      }}>
        Перейти в каталог
      </button>
    </div>
  );
};

export default Main;