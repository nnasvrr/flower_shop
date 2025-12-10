import React from 'react';

const Catalog: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Каталог цветов</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
          <h3>Красные розы</h3>
          <p>Цена: 500 ₽</p>
        </div>
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
          <h3>Тюльпаны</h3>
          <p>Цена: 300 ₽</p>
        </div>
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
          <h3>Орхидеи</h3>
          <p>Цена: 800 ₽</p>
        </div>
      </div>
    </div>
  );
};

export default Catalog;