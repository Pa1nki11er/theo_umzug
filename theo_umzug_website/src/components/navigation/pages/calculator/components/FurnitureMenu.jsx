import React, { useState, useEffect } from "react";
import { NumberField } from "@base-ui-components/react/number-field";
import styles from "./index.module.css";
import Icon from "../../../../icon/Icon.jsx";
import { Flex, Input, Typography, Select, Menu } from "antd";
import { furnitureItems } from "./FurnitureItems.jsx";
import axios from 'axios';

const getLevelKeys = (items1) => {
  const key = {};
  const func = (items2, level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(furnitureItems);

const FurnitureMenu = ({ onClick, onDoubleClick, onSelect }) => {


  const [furnitureList, setFurnitureList] = useState([]);
  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    const getFurnitureList = async () => {
      try {
        const response = await axios.post("/api/furniture", {});
        console.log(response.data);
        setFurnitureList(response.data); // Данные уже распарсены
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    getFurnitureList();
  }, []);
  
  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );

    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <div>
      <p>Furniture Menu</p>
      <Menu
        mode="inline"
        style={{
          width: 300,
          borderRadius: 5,
        }}
        items={furnitureList}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        onSelect={onSelect}
      />
    </div>
  );
};

export default FurnitureMenu;
