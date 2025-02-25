import React, { useState } from "react";
import { NumberField } from "@base-ui-components/react/number-field";
import styles from "./index.module.css";
import Icon from "../../../../icon/Icon.jsx";
import { Flex, Input, Typography, Select, Menu, Divider } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import NumberInput from "./NumberInput.jsx";
import { text } from "@fortawesome/fontawesome-svg-core";

// const items = [
//   {
//     key: "1",
//     icon: <MailOutlined />,
//     label: "Navigation One",
//     children: [
//       {
//         key: "11",
//         label: "Option 1",
//       },
//       {
//         key: "12",
//         label: "Option 2",
//       },
//       {
//         key: "13",
//         label: "Option 3",
//       },
//       {
//         key: "14",
//         label: "Option 4",
//       },
//     ],
//   },
//   {
//     key: "543",
//     icon: <MailOutlined />,
//     label: "Navigation One",
//   },
//   {
//     key: "2",
//     icon: <AppstoreOutlined />,
//     label: "Navigation Two",
//     children: [
//       {
//         key: "21",
//         label: "Option 1",
//       },
//       {
//         key: "22",
//         label: "Option 2",
//       },
//       {
//         key: "23",
//         label: "Submenu",
//         children: [
//           {
//             key: "231",
//             label: "Option 1",
//           },
//           {
//             key: "232",
//             label: "Option 2",
//           },
//           {
//             key: "233",
//             label: "Option 3",
//           },
//         ],
//       },
//       {
//         key: "24",
//         label: "Submenu 2",
//         children: [
//           {
//             key: "241",
//             label: "Option 1",
//           },
//           {
//             key: "242",
//             label: "Option 2",
//           },
//           {
//             key: "243",
//             label: "Option 3",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     key: "3",
//     icon: <SettingOutlined />,
//     label: "Navigation Three",
//     children: [
//       {
//         key: "31",
//         label: "Option 1",
//       },
//       {
//         key: "32",
//         label: "Option 2",
//       },
//       {
//         key: "33",
//         label: "Option 3",
//       },
//       {
//         key: "34",
//         label: "Option 4",
//       },
//     ],
//   },
// ];
// const getLevelKeys = (items1) => {
//   const key = {};
//   const func = (items2, level = 1) => {
//     items2.forEach((item) => {
//       if (item.key) {
//         key[item.key] = level;
//       }
//       if (item.children) {
//         func(item.children, level + 1);
//       }
//     });
//   };
//   func(items1);
//   return key;
// };
// const levelKeys = getLevelKeys(items);

const orderListStyle = {
  backgroundColor: "white",
  height: "500px",
  width: "500px",
  textAlign: "center",
  borderRadius: "5px",
};
const orderListSumStyle = {
  backgroundColor: "white",
  height: "100px",
  width: "500px",
  textAlign: "start",
  borderRadius: "5px",
  padding: "20px"
};

const OrderList = ({ items }) => {
  console.log(items);

  return (
    <Flex
      wrap
      gap="small"
      justify="start"
      align="center"
      vertical
      style={orderListStyle}
    >
      <span>Order list</span>

      {items.map((item, index) => (
        <NumberInput
          key={index}
          iconName={item.iconname}
          title={item.label}
          value={item.count}
        />
      ))}
      <Divider
        style={{
          borderColor: "black",
          padding:"0px",
          marginBottom:"0px"
        }}
      />
      <Flex style={orderListSumStyle} vertical gap="small">
        <span>Ціна: </span>
        <span>Об'єм: </span>
        <span>Вага: </span>
ф      </Flex>
    </Flex>
  );
};

export default OrderList;
