import React, { useState, useEffect } from "react";
import { Flex, Input, Typography, Select, Menu, Divider } from "antd";
import NumberInput from "./NumberInput.jsx";
import ApartmentInputSelect from "./ApartmentInputSelect.jsx";
import ApartmentNumberInput from "./ApartmentNumberInput.jsx";
import "./theme.css";

const { Title } = Typography;

const orderListStyle = {
  backgroundColor: "white",
  width: "40vw",
  textAlign: "center",
  borderRadius: "5px",
};
const orderListSumStyle = {
  backgroundColor: "white",
  width: "40vw",
  textAlign: "start",
  borderRadius: "5px",
  padding: "20px",
};

const oldApartmentFloors = [
  {
    value: 0.2,
    label: "Перший поверх",
  },
  {
    value: 0.4,
    label: "Другий поверх",
  },
  {
    value: 0.6,
    label: "Третій поверх",
  },
  {
    value: 0.8,
    label: "Четвертий поверх",
  },
  {
    value: 1.2,
    label: "П'ятий і вище",
  },
];

const workers = [
  {
    value: 1,
    label: "1",
  },
  {
    value: 2,
    label: "2",
  },
  {
    value: 3,
    label: "3",
  },
  {
    value: 4,
    label: "4",
  },
  {
    value: 5,
    label: "5",
  },
];

const OrderList = ({ items, onChange }) => {
  // Состояния для дополнительных коэффициентов
  const [loadingFloorCoeff, setLoadingFloorCoeff] = useState(0);
  const [unloadingFloorCoeff, setUnloadingFloorCoeff] = useState(0);
  const [loadingDistance, setLoadingDistance] = useState(0);
  const [unloadingDistance, setUnloadingDistance] = useState(0);
  const [distanceBetween, setDistanceBetween] = useState(0);

  // Основные итоги (вес, объем, базовая цена)
  const [totals, setTotals] = useState({ weight: 0, volume: 0, price: 200 });

  useEffect(() => {
    // Рассчитываем базовые итоги из items. Здесь для примера базовая цена равна 200 + сумма стоимости товаров.
    const newTotals = items.reduce(
      (acc, item) => {
        const { weight, volume, unitPrice } = item.details;
        return {
          weight: acc.weight + weight * item.count,
          volume: acc.volume + volume * item.count,
          price: acc.price + unitPrice * item.count,
        };
      },
      { weight: 0, volume: 0, price: 100 } // здесь можно задать нужную базовую стоимость (например, 200€)
    );

    const basePrice = newTotals.price;

    // Дополнительная стоимость за этажи:
    // Суммируем коэффициенты для загрузки и выгрузки и умножаем на базовую стоимость
    const floorAdditional =
      basePrice * (loadingFloorCoeff + unloadingFloorCoeff);

    // Дополнительная стоимость за расстояние от входа до машины:
    // За каждый метр добавляется 0.02 коэффициента
    const distanceToTruckAdditional =
      basePrice * 0.02 * (loadingDistance + unloadingDistance);

    // Стоимость за расстояние между пунктами (прямое добавление: 1 км = 2€)
    const distanceBetweenAdditional = distanceBetween * 2;

    const finalPrice =
      basePrice +
      floorAdditional +
      distanceToTruckAdditional +
      distanceBetweenAdditional;

    setTotals({
      weight: parseFloat(newTotals.weight.toFixed(2)),
      volume: parseFloat(newTotals.volume.toFixed(3)),
      price: parseFloat(finalPrice.toFixed(2)),
    });
  }, [
    items,
    loadingFloorCoeff,
    unloadingFloorCoeff,
    loadingDistance,
    unloadingDistance,
    distanceBetween,
  ]);

  return (
    <Flex
      wrap
      gap="small"
      justify="start"
      align="center"
      vertical
      style={orderListStyle}
    >
      <Flex gap="middle" align="center">
        <Title
          level={3}
          style={{
            padding: "0px",
            margin: "0px",
          }}
        >
          <Flex
            style={orderListSumStyle}
            gap="large"
            align="center"
            justify="center"
          >
            <span>Ціна: {totals.price} €</span>
            <span>Об'єм: {totals.volume} m³</span>
            <span>Вага: {totals.weight} kg</span>
          </Flex>
        </Title>
      </Flex>
      <Divider
        style={{
          borderColor: "black",
          padding: "0px",
          marginBottom: "0px",
        }}
      />
      <div
        className="furnitureList"
        style={{
          maxHeight: "80vh", // задаём максимальную высоту
          overflowY: "scroll", // включаем вертикальный скроллбар
        }}
      >
        <Flex gap="small" align="center" justify="space-around">
          <Flex gap="small" align="center" justify="center" vertical>
            <ApartmentInputSelect
              title={"Етаж (Пункт загрузки)"}
              options={oldApartmentFloors}
              placeholder={"Етаж"}
              onChange={(value) => {
                // value — выбранный коэффициент (например, 0.4 для 2-го этажа)
                setLoadingFloorCoeff(value);
              }}
            />
            <ApartmentNumberInput
              title={"Відстань від входу до вантажівки (Пункт загрузки)"}
              placeholder={"Відстань"}
              onChange={(value) => {
                // Приводим значение к числу, если оно приходит как строка
                setLoadingDistance(Number(value));
              }}
            />
            <ApartmentNumberInput
              title={"Відстань від пункту загрузи до пунтку вигрузки"}
              placeholder={"Відстань (кілометри)"}
              onChange={(value) => {
                setDistanceBetween(Number(value));
              }}
            />
          </Flex>
          <Flex gap="small" align="center" justify="center" vertical>
            <ApartmentInputSelect
              title={"Етаж (Пункт вигрузки)"}
              options={oldApartmentFloors}
              placeholder={"Етаж"}
              onChange={(value) => {
                setUnloadingFloorCoeff(value);
              }}
            />
            <ApartmentNumberInput
              title={"Відстань від входу до вантажівки (Пункт вигрузки)"}
              placeholder={"Відстань"}
              onChange={(value) => {
                setUnloadingDistance(Number(value));
              }}
            />
            <ApartmentInputSelect
              title={"Кількість робітників"}
              options={workers}
              placeholder={"Робітники"}
              // onChange={(value) => {
              //   setUnloadingFloorCoeff(value);
              // }}
            />
          </Flex>
        </Flex>

        <Divider
          style={{
            borderColor: "black",
            padding: "0px",
            marginBottom: "0px",
            marginTop: "0px",
          }}
        />

        <Title
          level={2}
          style={{
            padding: "0px",
            margin: "0px",
          }}
        >
          Список замовлення
        </Title>

        {items.map((item, index) => (
          <NumberInput
            key={index}
            iconName={item.iconname}
            title={item.label}
            value={item.count}
          />
        ))}
      </div>
    </Flex>
  );
};

export default OrderList;
