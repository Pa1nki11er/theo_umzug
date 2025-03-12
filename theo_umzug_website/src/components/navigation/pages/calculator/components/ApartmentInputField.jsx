import React from "react";
import { Flex, Input, Typography, Select } from "antd";
import "./../Calculator.css";

const ApartamentInputField = ({ title, options }) => {
  return (
    <Flex wrap gap="small" justify="start" align="center" vertical>
      <Typography.Title level={5}>
        {title}
        <Input
          count={{
            show: true,
            max: 10,
          }}
          style={{
            width: 120,
          }}
        />
      </Typography.Title>
    </Flex>
  );
};

export default ApartamentInputField;
