import React, { useState, useEffect } from "react";


export const furnitureItems = [
  {
    key: "1",
    icon: "",
    label: "Ліжко",
    children: [
      {
        key: "11",
        iconname: "bed",
        label: "Ліжко 90х200",
        count: 0,
        details: {
          weight: 50,
          volume: 0.54,
          workingHours: 0.4,
          unitPrice: 14,
        },
      },
      {
        key: "12",
        iconname: "bed",
        label: "Ліжко 140х200",
        count: 0,
        details: {
          weight: 70,
          volume: 0.84,
          workingHours: 0.4,
          unitPrice: 14,
        },
      },
      {
        key: "13",
        iconname: "bed",
        label: "Ліжко 180х200",
        count: 0,
      },
    ],
  },
  {
    key: "2",
    icon: "",
    label: "Шафа",
    children: [
      {
        key: "21",
        label: "Шафа до 1м",
        count: 0,
      },
      {
        key: "22",
        label: "Шафа до 2м",
        count: 0,
      },
    ],
  },
  {
    key: "3",
    icon: "",
    label: "Пральна машинка",
  },
];
