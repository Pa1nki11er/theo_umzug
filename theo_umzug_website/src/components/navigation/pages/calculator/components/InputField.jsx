import React from "react";
import { Flex, Input, Typography, Select } from "antd";
import "./../Calculator.css";
import { UserOutlined } from '@ant-design/icons';
import { MailOutlined } from '@ant-design/icons';
import { EnvironmentOutlined } from '@ant-design/icons';
import { PhoneOutlined } from '@ant-design/icons';
import Icon from "../../../../icon/Icon.jsx";
const { Paragraph } = Typography;


const InputField = ({ title, maxChar, iconName = "" }) => {
  const icons ={
    "user": <UserOutlined />,
    "mail": <MailOutlined />,
    "location": <EnvironmentOutlined />,
    "phone": <PhoneOutlined />,
  };

  return (
    <div className="input-field">
      <Paragraph>
        {/* <Icon
          iconName={iconName}
          alt={"icon"}
          style={{
            width: "35px",
            height: "35px",
            marginLeft: "20px",
            marginTop: "3px",
          }}
        />  */}
        {title}
      </Paragraph>
      <Input
        count={{
          show: true,
          max: maxChar,
        }}
        placeholder={title}
        prefix={icons[iconName]}
      />
    </div>
  );
};

export default InputField;
