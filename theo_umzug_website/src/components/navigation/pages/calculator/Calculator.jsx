import React, { useState, useEffect } from "react";
import Icon from "../../../icon/Icon.jsx";
import { useTranslation } from "react-i18next";
import { DatePicker, Flex, Input, Typography, Select } from "antd";
import "./Calculator.css";
import ApartamentInputSelect from "./components/ApartmentInputSelect.jsx";
import ApartamentInputField from "./components/ApartmentInputField.jsx";
import FormWizard from "react-form-wizard-component";
import "react-form-wizard-component/dist/style.css";
import NumberInput from "./components/NumberInput.jsx";
import InputField from "./components/InputField.jsx";
import FurnitureMenu from "./components/FurnitureMenu.jsx";
import OrderList from "./components/OrderList.jsx";
// import { furnitureItems } from "./components/FurnitureItems.jsx";
import axios from "axios";


const boxStyle = {
  width: "100%",
  height: "100%",
  padding: "15px",
};

const { TextArea } = Input;
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

const Calculator = ({furnitureList}) => {
  const [selectedItems, addItem] = useState([]);
  // const [furnitureList, setFurnitureList] = useState([]);

  const { t, i18n } = useTranslation();

  const selected = ({ key }) => {
    const item = findLabelByKey(key, furnitureList);
    if (!item) return;

    addItem((prev) => {
      // Если prev пустой или undefined, создаем массив
      if (!prev) return [{ ...item, count: 1 }];

      // Проверяем, есть ли уже этот элемент в массиве
      const existingItem = prev.find((el) => el.key === item.key);

      if (existingItem) {
        // Если элемент уже есть, увеличиваем его count
        return prev.map((el) =>
          el.key === item.key ? { ...el, count: (el.count || 1) + 1 } : el
        );
      }

      // Если элемента нет, добавляем его с count = 1
      return [...prev, { ...item, count: 1 }];
    });
  };

  const findLabelByKey = (key, items) => {
    for (const item of items) {
      if (item.key === key) {
        return item;
      }
      if (item.children) {
        const found = findLabelByKey(key, item.children);
        if (found) return found;
      }
    }
    return null;
  };

  return (
    <div className="calculator-main">
      <div className="calculator-container">
        <div className="calculator-inputs">
          <Flex
            wrap
            gap="small"
            justify="space-evenly"
            align="flex-start"
            style={boxStyle}
          >
            <FurnitureMenu onClick={selected} furnitureList={furnitureList} />
            <OrderList items={selectedItems} furnitureList={furnitureList} onChange={addItem}/>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
