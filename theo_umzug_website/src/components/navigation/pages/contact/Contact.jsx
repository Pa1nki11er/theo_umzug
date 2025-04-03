import React, { useState, useEffect } from "react";
import "./Contact.css"; // Importing styles
import Icon from "./../../../icon/Icon.jsx";
import { Button, Dropdown, Space, Input, Flex, message } from "antd";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;

const Contact = () => {
  const [statusName, setStatusName] = useState("");
  const [statusEmail, setStatusEmail] = useState("");
  const [statusSubject, setStatusSubject] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: 'success',
      content: t("homepage.emailSended"),
    });
  };

  const { t, i18n } = useTranslation();

  const onChange = (e) => {
    console.log("Change:", e.target.value);
  };

  const sendEmail = async () => {
    let userEmail = document.getElementById("userEmail").value;
    let userName = document.getElementById("userName").value;
    let subject = document.getElementById("emailSubject").value;
    let message = document.getElementById("message").value;
    let btnSend = document.getElementById("input-submit");
    
    btnSend.setAttribute("disabled", true);
    btnSend.style.backgroundColor = "grey";
    let isValid = validateInputs();
    if (!isValid) {
      return;
    }

    let data = {
      to: userEmail,
      name: userName,
      subject: subject,
      text: message,
    };

    const response = await fetch("http://localhost:3001/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    });
    const body = await response.json();
    
    success();
    btnSend.style.backgroundColor = "#ff9800";
    console.log("Email sent!");
  };


  const validateInputs = () => {
    let userEmail = document.getElementById("userEmail").value;
    let userName = document.getElementById("userName").value;
    let subject = document.getElementById("emailSubject").value;
    let message = document.getElementById("message").value;
    const inputs = [
      { value: userName, status: setStatusName },
      { value: userEmail, status: setStatusEmail },
      { value: subject, status: setStatusSubject },
      { value: message, status: setStatusMessage },
    ];
    let isValid = true;
    inputs.forEach((input) => {
      if (input.value === 0 || input.value === "") {
        input.status("error");
        isValid = false;
      } else {
        // Например, если значение корректное, сбрасываем ошибку
        input.status("");
      }
    });

    return isValid;
  };

  
  
  return (
    <div className="contact-container">
      {contextHolder}

      <div className="contact-text">
        <h1 className="contact-text-h1">{t("homepage.contactUs")}</h1>
        <div className="contact-information-line">
          <Icon
            iconName={"email"}
            alt="Email icon"
            style={{ width: "50px", height: "50px" }}
          />
          <span>TheoUmzug@example.com</span>
        </div>
        <div className="contact-information-line">
          <Icon
            iconName={"phone"}
            alt="Email icon"
            style={{ width: "50px", height: "50px" }}
          />
          <span>+49 123 456 789</span>
        </div>
      </div>
      <div className="contact-form">
        <form className="cf">
          <Input
            className="inputfield"
            id="userName"
            showCount
            maxLength={20}
            placeholder=  {t("homepage.inputContactUsName")}
            status={statusName}
            type=""
          />
          <Input
            className="inputfield"
            id="userEmail"
            showCount
            maxLength={40}
            type="email"
            placeholder={t("homepage.inputContactUsEmail")}
            status={statusEmail}
          />
          <Input
            className="inputfield"
            id="emailSubject"
            showCount
            maxLength={20}
            placeholder={t("homepage.inputContactUsSubject")}
            status={statusSubject}
          />
          <Flex vertical gap={32}>
            <TextArea
              className="inputfield"
              id="message"
              showCount
              maxLength={300}
              onChange={onChange}
              placeholder={t("homepage.inputContactUsMessage")}
              rows={5}
              status={setStatusMessage}
            />
          </Flex>
          <input
            className="btnSend"
            type="button"
            value={t("homepage.inputContactUsSend")}
            id="input-submit"
            onClick={sendEmail}
            disabled={false}
          />
        </form>
      </div>
    </div>
  );
};

export default Contact;
