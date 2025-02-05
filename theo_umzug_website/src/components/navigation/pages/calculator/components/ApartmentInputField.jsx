import React from "react";
import { Flex, Input, Typography, Select } from "antd";
import "./../Calculator.css";

const ApartamentInputField = ({ title, options }) => {
  return (
    <div>
      <Typography.Title level={5}>{title}</Typography.Title>
      <Input
        count={{
          show: true,
          max: 10,
        }}
        style={{
          width: 120,
        }}
      />
    </div>
  );
};

export default ApartamentInputField;
