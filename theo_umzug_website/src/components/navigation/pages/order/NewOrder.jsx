import React, { useState, useEffect } from "react";
import Icon from "../../../icon/Icon.jsx";
import { Button, Dropdown, Space, Input, Flex } from "antd";
import Calculator from "./../calculator/Calculator.jsx";
import axios from "axios";

const { TextArea } = Input;

const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const disabledTime = () => ({
  disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 22, 23],
  disabledMinutes: () => [
    ...range(1, 10),
    ...range(11, 20),
    ...range(21, 30),
    ...range(31, 40),
    ...range(41, 50),
    ...range(51, 60),
  ],
  disabledSeconds: () => range(1, 61),
});

const NewOrder = ({ furnitureList }) => {
  console.log(furnitureList);
  return (
    <div>
      <Calculator furnitureList={furnitureList} isOrder="true" />
    </div>
  );
};

export default NewOrder;
