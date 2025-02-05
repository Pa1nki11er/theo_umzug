import React from 'react';
import './Contact.css'; // Importing styles
import Icon from './../../../icon/Icon.jsx';
import { Button, Dropdown, Space, Input,  Flex } from 'antd';
const { TextArea } = Input;
const Contact = () => {
  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };
  return (
    <div className="contact-container">
      <div className="contact-text">
        <h1 className='contact-text-h1'>Напишіть нам!</h1>
        <div className='contact-information-line'>
          <Icon 
            iconName={"email"} 
            alt="Email icon" 
            style={{ width: '50px', height: '50px' }} 
          />
          <span>TheoUmzug@example.com</span>
        </div>
        <div className='contact-information-line'>
          <Icon 
            iconName={"phone"} 
            alt="Email icon" 
            style={{ width: '50px', height: '50px' }} 
          />
          <span>+49 123 456 789</span>
        </div>
      </div>
      <div className="contact-form">
        <form className="cf">
            <Input className="inputfield" showCount maxLength={20} placeholder="Ваше ім'я"/>
            <Input className="inputfield" showCount maxLength={40} type="email" placeholder="Емейл" />
            <Input className="inputfield" showCount maxLength={20} placeholder="Тема" />
            <Flex vertical gap={32}>
              <TextArea className="inputfield" showCount maxLength={300} onChange={onChange} placeholder="Повідомлення" />
            </Flex>
          <input className="btnSend" type="button" value="Відправити!" id="input-submit" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
