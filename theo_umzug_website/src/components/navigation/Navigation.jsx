import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { GlobalOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import Home from './pages/home/Home.jsx';
import Contact from './pages/contact/Contact.jsx';
import NewOrder from './pages/order/NewOrder.jsx';
import Calculator from './pages/calculator/Calculator.jsx';
import './Navigation.css';
import axios from "axios";

import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const [furnitureList, setFurnitureList] = useState([]);
  const currentLang = i18n.language;

  let data = {
    currentLang: currentLang
  }
  useEffect(() => {
    const getFurnitureList = async () => {
      try {
        // const response = await axios.post("/api/furniture", {data});
        const response = await fetch("/api/furniture", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({data}),
        });
        
        const result = await response.json(); // Parse the JSON
        setFurnitureList(result);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    getFurnitureList();
  }, [i18n.language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    console.log(`Language changed to: ${lng}`);
  };

  const items = [
    { key: '1', label: <span>English</span>, onClick: () => changeLanguage('en') },
    { key: '2', label: <span>Deutsch</span>, onClick: () => changeLanguage('de') },
    { key: '3', label: <span>Українська</span>, onClick: () => changeLanguage('uk') },
    { key: '4', label: <span>Русский</span>, onClick: () => changeLanguage('ru') },
  ];

  return (
    <Router>
      <nav className='navStyle'>
        <ul className='ulStyle'>
          <li className='liStyle'>
            <Link to="/" className='linkStyle'>{t('navigation.home')}</Link>
          </li>
          {/* <li className='liStyle'>
            <Link to="/order" className='linkStyle'>{t('navigation.order')}</Link>
          </li> */}
          <li className="liStyle">
            <Link to="/contacts" className="linkStyle">{t('navigation.contacts')}</Link>
          </li>
          <li className="liStyle">
            <Link to="/calculator" className="linkStyle">{t('navigation.calculator')}</Link>
          </li>
          <li className="liStyle">
            <Dropdown className="linkStyle" trigger={['click']} menu={{ items }}>
              <Space>
                <GlobalOutlined className="linkStyle" />
              </Space>
            </Dropdown>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<NewOrder furnitureList={furnitureList}/>} />
        <Route path="/contacts" element={<Contact />} />
        <Route path="/calculator" element={<Calculator furnitureList={furnitureList}/>} />
      </Routes>
    </Router>
  );
};

const navStyle = {
  backgroundColor: '#333',
  padding: '10px',
};

const ulStyle = {
  padding: '10px',
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'center',
  margin: 0,
};

const liStyle = {
  margin: '0 10px',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
};



export default Navigation;
