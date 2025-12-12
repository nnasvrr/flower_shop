import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

const Main = () => {
  return (
    <div className="main-container">
      <h1 className="main-title">Добро пожаловать в FlowersShop</h1>
      <p className="main-subtitle">
        Свежие цветы с доставкой по всему городу
      </p>
      <Link to="/catalog" className="main-cta-button">
        Перейти в каталог
      </Link>
    </div>
  );
};

export default Main;