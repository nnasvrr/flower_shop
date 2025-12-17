import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>О нас</h1>
        <p className="about-subtitle">Магазин цветов FlowerShop — ваша радость в каждом букете</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>Наша история</h2>
          <p>Идея о сочетании высокой флористики и максимальной доступности. И многолетнее доверие клиентов – лучший 
            показатель того, что мы движемся в правильном направлении.</p>
          <p> Мы уверены, что через цветы можно передать все свои лучшие чувства:
             внимание, заинтересованность и любовь. Признаться в любви без слов легко – доверьтесь 
             букетам FlowerShop.</p>
        </div>
        <div className="about-section contact-section">
          <h2>Контакты</h2>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-label">Адрес:</span>
              <span className="contact-value">г. Ульяновск, ул. Андрея Блаженого, д. 3</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">Телефон:</span>
              <span className="contact-value">+7 (123) 456-78-90</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">Email:</span>
              <span className="contact-value">flowerShop73@gmail.com</span>
                          </div>
            <div className="contact-item">
              <span className="contact-label">Режим работы:</span>
              <span className="contact-value">Ежедневно с 9:00 до 21:00</span>
            </div>
          </div>
        </div>
        <div className="about-section">
          <h2>Как нас найти</h2>
          <div className="address-info">
            <p>Наш магазин расположен в центре города Ульяновск.</p>
            <p>Адрес: г. Ульяновск, ул. Андрея Блаженого, дом 3.</p>
            <p>Мы находимся рядом с центральном рынком, в 3-х минутах ходьбы от стадиона.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;