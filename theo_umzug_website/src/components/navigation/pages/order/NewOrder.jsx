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
  // const handleDoubleClick = (event) => {
  //   console.log(event);
  //   const itemElement = event.target.closest(".ant-menu-item"); // Ищем ближайший элемент меню

  //   console.log(itemElement);
  //   if (!itemElement) return; // Если элемент не найден, выходим

  //   const key = itemElement.getAttribute("data-menu-key"); // Извлекаем ключ из атрибута
  //   console.log(key);

  //   if (!key) return;

  //   const label = findLabelByKey(key, furnitureList);
  //   if (label) {
  //     addItem((prev) => [...prev, label]);
  //   }

  //   console.log("Key:", key);
  //   console.log("Label:", label);
  // };
  // const disabledTime = () => ({
  //   disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 22, 23],
  //   disabledMinutes: () => [
  //     ...range(1, 10),
  //     ...range(11, 20),
  //     ...range(21, 30),
  //     ...range(31, 40),
  //     ...range(41, 50),
  //     ...range(51, 60),
  //   ],
  //   disabledSeconds: () => range(1, 61),
  // });
  // <div className="calculator-main">
  //     {/* <FormWizard
  //       onComplete={handleComplete}
  //       onTabChange={tabChanged}
  //       color={"#e68900"}
  //       nextButtonText={"Далі"}
  //       backButtonText={"Назад"}
  //       finishButtonText={"Порахувати"}
  //     >
  //       <FormWizard.TabContent title="Кількість меблів" icon={"ti-package"}> */}
  //     <div className="calculator-container">
  //       <div className="calculator-inputs">
  //         <Flex
  //           wrap
  //           gap="small"
  //           justify="space-between"
  //           align="flex-start"
  //           style={boxStyle}
  //         >
  //           <FurnitureMenu onClick={selected} furnitureList={furnitureList}/>
  //           <OrderList items={selectedItems} furnitureList={furnitureList}/>

  //         </Flex>
  //       </div>
  //     </div>
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
    //   <style>{`
    //     @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
    //   `}</style>
    // </div>