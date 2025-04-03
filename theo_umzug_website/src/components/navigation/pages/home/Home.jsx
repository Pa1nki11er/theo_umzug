import React from "react";
import "./Home.css"; // Імпорт стилів
import cardImage from "./img/card.jpg"; // Зображення для "Про компанію"
import Contact from "./../contact/Contact.jsx"; // Зображення для "Про компанію"
import { Button, Dropdown, Space, Input,  Flex } from 'antd';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

const Home = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="home-container">
      {/* Хедер */}
      <header className="home-header">
        <h1>{t('homepage.welcome')}</h1>
        <p>{t('homepage.priority')}</p>
        <button className="action-button">{t('homepage.btnContactUs')}</button>
      </header>

      {/* Секція "Про компанію" */}
      <section className="about-section">
        <h2>{t('homepage.aboutCompany')}</h2>
        <p>{t('homepage.companyDescription')}</p>
        <img src={cardImage} alt="Про компанію" />
      </section>

      {/* Секція послуг */}
      <section className="services-section">
        <h2>{t('homepage.ourServices')}</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>Umzug Hilfe</h3>
            <p>{t('homepage.serviceDescriptionUmzugHilfe')}</p>
          </div>
          <div className="service-card">
            <h3>Umzug Taxi</h3>
            <p>{t('homepage.serviceDescriptionUmzugTaxi')}</p>
          </div>
        </div>
      </section>

      {/* Секція переваг */}
      <section className="advantages-section">
        <h2>{t('homepage.whyUs')}</h2>
        <ul>
          <li>{t('homepage.whyUsReasons.reason1')}</li>
          <li>{t('homepage.whyUsReasons.reason2')}</li>
          <li>{t('homepage.whyUsReasons.reason3')}</li>
        </ul>
      </section>
      <section className="contact-section">
          <Contact></Contact>
      </section>
      {/* Футер */}
      <footer className="home-footer">
        <p>© 2025 All Rights Reserved</p>
        <p>+49(015) 123-45-67 | Email: info@logistics.com</p>
      </footer>
    </div>
  );
};

export default Home;
