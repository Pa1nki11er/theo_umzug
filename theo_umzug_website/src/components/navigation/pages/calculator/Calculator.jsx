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
import { furnitureItems } from "./components/FurnitureItems.jsx";
import axios from 'axios';

const boxStyle = {
  width: "100%",
  height: "100%",
  borderRadius: 6,
  backgroundColor: "#e68900",
  padding: "20px",
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

const Calculator = () => {

  
  const [selectedItems, addItem] = useState([]);

  const handleDoubleClick = (event) => {
    console.log(event);
    const itemElement = event.target.closest(".ant-menu-item"); // Ищем ближайший элемент меню

    console.log(itemElement);
    if (!itemElement) return; // Если элемент не найден, выходим

    const key = itemElement.getAttribute("data-menu-key"); // Извлекаем ключ из атрибута
    console.log(key);

    if (!key) return;

    const label = findLabelByKey(key, furnitureItems);
    if (label) {
      addItem((prev) => [...prev, label]);
    }

    console.log("Key:", key);
    console.log("Label:", label);
  };

  const tabChanged = ({ prevIndex, nextIndex }) => {
    console.log("prevIndex", prevIndex);
    console.log("nextIndex", nextIndex);
  };
  const { t, i18n } = useTranslation();

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


  const selected = ({ key }) => {
    const item = findLabelByKey(key, furnitureItems);
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
      console.log([...prev, { ...item, count: 1 }]);
      return [...prev, { ...item, count: 1 }];
    });
  };
  
  const findLabelByKey = (key, items) => {
    for (const item of items) {
      if (item.key === key) {
        return item
      }
      if (item.children) {
        const found = findLabelByKey(key, item.children);
        if (found) return found;
      }
    }
    return null;
  };
  
  // Проверяем, обновляется ли массив
  useEffect(() => {
    console.log("Обновленный selectedItems:", selectedItems);
  }, [selectedItems]);

  return (
    <div className="calculator-main">
      <h1 className="calculator-welcome">{t("calculator.welcome")}</h1>
      {/* <FormWizard
        onComplete={handleComplete}
        onTabChange={tabChanged}
        color={"#e68900"}
        nextButtonText={"Далі"}
        backButtonText={"Назад"}
        finishButtonText={"Порахувати"}
      >
        <FormWizard.TabContent title="Кількість меблів" icon={"ti-package"}> */}
      <div className="calculator-container">
        <div className="calculator-inputs">
          <Flex
            wrap
            gap="small"
            justify="space-between"
            align="flex-start"
            style={boxStyle}
          >
            <FurnitureMenu onClick={selected} />
            <OrderList items={selectedItems} />

          </Flex>
        </div>
      </div>
      {/* </FormWizard.TabContent>
        <FormWizard.TabContent title="Персональні данні" icon="ti-user"> */}
      {/* <Flex
            wrap
            gap="small"
            justify="space-around"
            align="flex-start"
            style={boxStyle}
          >
            <Flex
              wrap
              gap="small"
              justify="flex-start"
              align="flex-start"
              vertical={true}
            >
              <InputField title={"Ім'я"} maxChar={20} iconName="user" />
              <InputField title={"Прізвище"} maxChar={20} iconName="user" />
              <InputField title={"Емейл"} maxChar={40} iconName="mail" />
              <InputField
                title={"Номер телефону"}
                maxChar={40}
                iconName="phone"
              />
            </Flex>
            <Flex
              wrap
              gap="small"
              justify="flex-start"
              align="flex-start"
              vertical={true}
            >
              <div className="input-field">
                <Typography.Title level={5}>Дата перевезення</Typography.Title>
                <DatePicker
                  placeholder="Дата перевезення"
                  showTime
                  maxChar={50}
                  iconName="location"
                  disabledTime={disabledTime}
                />
              </div>
              <InputField
                title={"Адреса звідки"}
                maxChar={50}
                iconName="location"
              />
              <InputField
                title={"Адреса куди"}
                maxChar={50}
                iconName="location"
              />
              <div className="input-field">
                <Typography.Title level={5}>Додаткові послуги</Typography.Title>
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Оберіть послуги"
                  onChange={handleChange}
                  style={{
                    width: "100%",
                  }}
                  options={services}
                />
              </div>
            </Flex>
          </Flex> */}
      {/* </FormWizard.TabContent>
        <FormWizard.TabContent title="Last step" icon="ti-check">
          <h3>Last Tab</h3>
          <p>Some content for the last tab</p>
        </FormWizard.TabContent>
      </FormWizard> */}
      {/* add style */}
      <style>{`
        @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
      `}</style>
    </div>
  );
};

export default Calculator;
