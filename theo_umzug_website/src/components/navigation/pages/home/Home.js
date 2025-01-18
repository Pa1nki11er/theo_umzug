import React from "react";
import "./Home.css"; // Імпорт стилів
import cardImage from "./img/card.jpg"; // Зображення для "Про компанію"
import { Button, Dropdown, Space, Input,  Flex } from 'antd';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

const Home = () => {
  const { t, i18n } = useTranslation();
  
  return (
    <div className="home-container">
      {/* Хедер */}
      <header className="home-header">
        <h1>{useTranslation().t('homepage.welcome')}</h1>
        <p>{useTranslation().t('homepage.priority')}</p>
        <button className="action-button">{useTranslation().t('homepage.btnContactUs')}</button>
      </header>

      {/* Секція "Про компанію" */}
      <section className="about-section">
        <h2>{useTranslation().t('homepage.btnContactUs')}</h2>
        <p>{useTranslation().t('homepage.companyDescription')}</p>
        <img src={cardImage} alt="Про компанію" />
      </section>

      {/* Секція послуг */}
      <section className="services-section">
        <h2>{useTranslation().t('homepage.ourServices')}</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>Umzug Hilfe</h3>
            <p>{useTranslation().t('homepage.serviceDescriptionUmzugHilfe')}</p>
          </div>
          <div className="service-card">
            <h3>Umzug Taxi</h3>
            <p>{useTranslation().t('homepage.serviceDescriptionUmzugTaxi')}</p>
          </div>
        </div>
      </section>

      {/* Секція переваг */}
      <section className="advantages-section">
        <h2>{useTranslation().t('homepage.whyUs')}</h2>
        <ul>
          <li>{useTranslation().t('homepage.whyUsReasons.reason1')}</li>
          <li>{useTranslation().t('homepage.whyUsReasons.reason2')}</li>
          <li>{useTranslation().t('homepage.whyUsReasons.reason3')}</li>
        </ul>
      </section>
      <section className="contact-section">
        <div className="contact-form">
          <h2>{useTranslation().t('homepage.contactUs')}</h2>
          <form className="cf">
              <Input className="inputfield" showCount maxLength={20} placeholder={useTranslation().t('homepage.inputContactUsName')}/>
              <Input className="inputfield" showCount maxLength={40} type="email" placeholder={useTranslation().t('homepage.inputContactUsEmail')} />
              <Input className="inputfield" showCount maxLength={20} placeholder={useTranslation().t('homepage.inputContactUsSubject')} />
              <Flex vertical gap={32}>
                <TextArea className="inputfield" showCount maxLength={300} placeholder={useTranslation().t('homepage.inputContactUsMessage')} />
              </Flex>
            <input className="btnSend" type="button" value={useTranslation().t('homepage.inputContactUsSend')} id="input-submit" />
          </form>
        </div>
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
