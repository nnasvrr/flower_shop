import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { flowerAPI } from '../services/api';
import './Card.css';

const Card = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await flowerAPI.getById(productId);
      setProduct(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке товара:', error);
      setError('Не удалось загрузить информацию о товаре');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (product) => {
    if (product?.image) {
      if (product.image.startsWith('http')) {
        return product.image;
      }
      return `http://127.0.0.1:8000${product.image}`;
    }
    return 'https://via.placeholder.com/500x400/FFC0CB/FFFFFF?text=Flower';
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/500x400/FFC0CB/FFFFFF?text=Нет+фото';
  };

  if (loading) return <div className="loading">Загрузка товара...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Товар не найден</div>;

  return (
    <div className="card-container">
      
      
      <div className="product-card-single">
        <div className="product-image-large">
          <img 
            src={getImageUrl(product)} 
            alt={product.name}
            onError={handleImageError}
          />
        </div>
        
        <div className="product-details">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-category-info">
            Категория: <span>{product.category_name || 'Без категории'}</span>
          </div>
          
          <div className="product-price-info">
            {product.discount_price ? (
              <>
                <span className="product-old-price">{product.price} ₽</span>
                <span className="product-current-price">{product.discount_price} ₽</span>
              </>
            ) : (
              <span className="product-current-price">{product.price} ₽</span>
            )}
          </div>
          
          <div className={`product-stock-info ${product.in_stock ? 'in-stock' : 'out-of-stock'}`}>
            {product.in_stock ? ' В наличии' : ' Нет в наличии'}
          </div>
          
          {product.description && (
            <div className="product-description">
              <h3>Описание</h3>
              <p>{product.description}</p>
            </div>
          )}
          
          <button className="buy-now-btn">Купить</button>
        </div>
      </div>
      
      
    </div>
  );
};

export default Card;