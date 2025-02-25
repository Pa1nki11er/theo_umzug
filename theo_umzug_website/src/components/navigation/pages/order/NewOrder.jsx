import React, { useState, useEffect } from "react";
import Icon from "../../../icon/Icon.jsx";
import { Button, Dropdown, Space, Input, Flex } from "antd";
import axios from 'axios';


const { TextArea } = Input;

const NewOrder = () => {
  const [ resp, setCost] = useState(null);

  const calculate = async () => {
    try {
      const response = await axios.post("/api/calculate", {});
      setCost(response.data.cost);
    } catch (error) {
      console.error("Ошибка расчёта:", error);
    }
  };
  calculate();
  return <p>{resp}</p>;
};

export default NewOrder;
