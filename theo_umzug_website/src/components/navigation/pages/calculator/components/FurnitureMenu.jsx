import React, { useState, useEffect } from "react";
import { Flex, Input, Typography, Select, Menu, ConfigProvider } from "antd";
import "./theme.css";
import { useTranslation } from "react-i18next";

const { Title } = Typography;
const FurnitureMenu = ({ onClick, onDoubleClick, onSelect, furnitureList }) => {
  const [stateOpenKeys, setStateOpenKeys] = useState(["2", "23"]);
  const { t, i18n } = useTranslation();

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
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

    const levelKeys = getLevelKeys(furnitureList);
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
      <div
        style={{
          textAlign: "center",
          backgroundColor: "white",
          borderTopLeftRadius: "3px",
          borderTopRightRadius: "3px",
        }}
      >
        <Title
          level={2}
          style={{
            padding: "0px",
            margin: "0px",
          }}
        >
          {t('calculator.furnitureList')}
        </Title>
      </div>
      <div
        className="furnitureList"
        style={{
          maxHeight: "100vh", // задаём максимальную высоту
          overflowY: "scroll", // включаем вертикальный скроллбар
        }}
      >
        <Menu
          mode="vertical"
          style={{
            width: "45vw",
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            borderBottomLeftRadius: "5px",
            fontSize: "1em",

          }}
          items={furnitureList}
          onClick={onClick}
          onDoubleClick={onDoubleClick}
          onSelect={onSelect}
          selectable={false}
        />
      </div>
    </div>
  );
};

export default FurnitureMenu;
