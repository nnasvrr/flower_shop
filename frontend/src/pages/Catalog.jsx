import React, { useState, useEffect } from 'react';
import { flowerAPI } from '../services/api';

const Catalog = () => {
  const [flowers, setFlowers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Загружаем данные при загрузке компонента и при изменении категории
  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // 1. Загружаем категории - ВАЖНО: получаем data.results, а не data
      const categoriesResponse = await flowerAPI.getCategories();
      setCategories(categoriesResponse.data.results || []); // <- ИЗМЕНЕНИЕ ЗДЕСЬ
      
      // 2. Загружаем товары (с фильтром если выбрана категория)
      const params = selectedCategory ? { category: selectedCategory } : {};
      const flowersResponse = await flowerAPI.getAll(params);
      setFlowers(flowersResponse.data.results || []); // Аналогично для товаров
      
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
    } finally {
      setLoading(false);
    }
  };

  // Показываем загрузку
  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>Загрузка товаров...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Каталог цветов</h2>
      
      {/* Фильтр по категориям */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Категория: </label>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '5px', minWidth: '150px' }}
        >
          <option value="">Все категории</option>
          {Array.isArray(categories) && categories.map(category => ( // <- Добавлена проверка
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      {/* Сетка товаров */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '20px'
      }}>
        {Array.isArray(flowers) && flowers.map(flower => ( // <- Добавлена проверка
          <div 
            key={flower.id} 
            style={{ 
              border: '1px solid #ddd', 
              padding: '15px', 
              borderRadius: '8px',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <h3 style={{ marginBottom: '10px' }}>{flower.name}</h3>
            <p style={{ color: '#666', marginBottom: '10px' }}>{flower.description}</p>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#b06b6bff' }}>
              Цена: {flower.price} ₽
            </p>
            <p style={{ color: '#888', fontSize: '14px' }}>
              Категория: {flower.category_name}
            </p>
            <p style={{ 
              color: flower.in_stock ? 'green' : 'red',
              fontWeight: 'bold'
            }}>
              {flower.in_stock ? '✓ В наличии' : '✗ Нет в наличии'}
            </p>
          </div>
        ))}
      </div>
      
      {/* Если товаров нет */}
      {flowers.length === 0 && (
        <div style={{ textAlign: 'center', marginTop: '40px', padding: '40px' }}>
          <p style={{ fontSize: '18px', color: '#666' }}>Товары не найдены</p>
          <button 
            onClick={() => setSelectedCategory('')}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#b06b6bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Показать все товары
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalog;