import React, { useState, useEffect } from 'react';
import { flowerAPI } from '../services/api';
import { Link } from 'react-router-dom';
import './Catalog.css';

const Catalog = () => {
  const [flowers, setFlowers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const categoriesResponse = await flowerAPI.getCategories();
      setCategories(categoriesResponse.data.results || []);
      
      const params = selectedCategory ? { category: selectedCategory } : {};
      const flowersResponse = await flowerAPI.getAll(params);
      setFlowers(flowersResponse.data.results || []);
      
    } catch (error) {
      console.error('Ошибка при загрузке данных:', error);
      setError('Не удалось загрузить данные с сервера');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (flower) => {
    if (flower.image) {
      if (flower.image.startsWith('http')) {
        return flower.image;
      }
      return `http://127.0.0.1:8000${flower.image}`;
    }
    
    if (flower.image_url) {
      return flower.image_url;
    }
    
    return 'https://via.placeholder.com/250x200/FFC0CB/FFFFFF?text=Flower';
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/250x200/FFC0CB/FFFFFF?text=Нет+фото';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Загрузка товаров...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2 className="error-title">Ошибка</h2>
        <p className="error-message">{error}</p>
        <button 
          className="error-retry-button"
          onClick={fetchData}
        >
          Повторить попытку
        </button>
      </div>
    );
  }

  return (
    <div className="catalog-container">
      <h2 className="catalog-title">Каталог цветов</h2>
      
      <div className="filter-container">
        <label className="filter-label">Фильтр по категории: </label>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="filter-select"
        >
          <option value="">Все категории</option>
          {Array.isArray(categories) && categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className="products-grid">
        {Array.isArray(flowers) && flowers.map(flower => (
          <div key={flower.id} className="product-card">
            <div className="product-image-container">
              <img 
                src={getImageUrl(flower)} 
                alt={flower.name}
                className="product-image"
                onError={handleImageError}
              />
            </div>
            
            <div className="product-info">
              <Link to={`/card/${flower.id}`} className="product-name-link">
                <h3 className="product-name">{flower.name}</h3>
              </Link>
              
              <div className="product-price-stock">
                <span className="product-price">
                  {flower.price} ₽
                </span>
                
                <span className={`product-stock ${flower.in_stock ? 'product-in-stock' : 'product-out-of-stock'}`}>
                  {flower.in_stock ? 'В наличии' : 'Нет в наличии'}
                </span>
              </div>
              
              <p className="product-category">
                <span className="category-label">Категория:</span>
                {flower.category_name || 'Без категории'}
              </p>
              
              {flower.discount_price && (
                <p className="product-discount">
                  Скидка: {flower.discount_price} ₽
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {flowers.length === 0 && !loading && (
        <div className="empty-catalog">
          <div className="empty-catalog-icon"></div>
          <p className="empty-catalog-title">Товары не найдены</p>
          <p className="empty-catalog-subtitle">
            Попробуйте выбрать другую категорию
          </p>
          <button 
            className="empty-catalog-button"
            onClick={() => setSelectedCategory('')}
          >
            Показать все товары
          </button>
        </div>
      )}
    </div>
  );
};

export default Catalog;