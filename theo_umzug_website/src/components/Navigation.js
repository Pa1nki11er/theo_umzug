import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { GlobalOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';
import Home from './pages/home/Home.js';


const Order = () => <h1>Оформить заказ</h1>;
const Contacts = () => <h1>Контакты</h1>;
const Calculator = () => <h1>Калькулятор</h1>;
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        English
      </a>
    )
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        Deutsch
      </a>
    )
    
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        Українська
      </a>
    ),
  },
  {
    key: '4',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        Русский
      </a>
    ),
    primary: true,
  },
];
const Navigation = () => {
  return (
    <Router>
      <nav style={navStyle}>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <Link to="/" style={linkStyle}>Головна</Link>
          </li>
          <li style={liStyle}>
            <Link to="/order" style={linkStyle}>Оформити замовлення</Link>
          </li>
          <li style={liStyle}>
            <Link to="/contacts" style={linkStyle}>Контакти</Link>
          </li>
          <li style={liStyle}>
            <Link to="/calculator" style={linkStyle}>Калькулятор</Link>
          </li>
          <li style={liStyle}>
            <Link to="/" style={linkStyle}>
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <GlobalOutlined />
                  </Space>
                </a>
              </Dropdown>  
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
    </Router>
  );
};

// Стили (необязательно)
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
