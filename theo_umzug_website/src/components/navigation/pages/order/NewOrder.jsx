import React, { useState, useEffect } from "react";
import Icon from "../../../icon/Icon.jsx";
import { Button, Dropdown, Space, Input, Flex } from "antd";
import Calculator from "./../calculator/Calculator.jsx";
import axios from 'axios';

const { TextArea } = Input;

const NewOrder = ({furnitureList}) => {
  console.log(furnitureList);
  return (
    <div>
      <Calculator furnitureList={furnitureList} isOrder="true"/>

    </div>
  );
};

export default NewOrder;