import React, { useState, useEffect } from "react";
import { Flex, Input, Typography, Select, Menu, Divider } from "antd";
import NumberInput from "./NumberInput.jsx";
import ApartmentInputSelect from "./ApartmentInputSelect.jsx";
import ApartmentNumberInput from "./ApartmentNumberInput.jsx";
import CustomButton from "../../../../button/CustomButton.jsx";
import "./theme.css";
import { useTranslation } from "react-i18next";
import axios from "axios";

const { Title } = Typography;

const orderListStyle = {
  backgroundColor: "white",
  height: "100vh",
  textAlign: "center",
  borderRadius: "5px",
  padding: "0px",
  margin: "0px",
};
const orderListSumStyle = {
  backgroundColor: "white",
  width: "50vw",
  textAlign: "start",
  borderRadius: "5px",
  fontSize: "1.5em",
};

let itemList = "";

const OrderList = ({ items, onChange }) => {
  // Состояния для дополнительных коэффициентов
  const [loadingFloorCoeff, setLoadingFloorCoeff] = useState(0);
  const [unloadingFloorCoeff, setUnloadingFloorCoeff] = useState(0);
  const [loadingDistance, setLoadingDistance] = useState(0);
  const [unloadingDistance, setUnloadingDistance] = useState(0);
  const [distanceBetween, setDistanceBetween] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  // Основные итоги (вес, объем, базовая цена)
  const [totals, setTotals] = useState({ weight: 0, volume: 0, price: 200 });

  const oldApartmentFloors = [
    {
      value: 0.2,
      label: t("calculator.floors.ground"),
    },
    {
      value: 0.4,
      label: t("calculator.floors.second"),
    },
    {
      value: 0.6,
      label: t("calculator.floors.third"),
    },
    {
      value: 0.8,
      label: t("calculator.floors.fourth"),
    },
    {
      value: 1.2,
      label: t("calculator.floors.fifthAndMore"),
    },
  ];

  useEffect(() => {
    // Рассчитываем базовые итоги из items. Здесь для примера базовая цена равна 100 + сумма стоимости товаров.
    const newTotals = items.reduce(
      (acc, item) => {
        const { weight, volume, unitPrice } = item.details;
        return {
          weight: acc.weight + weight * item.count,
          volume: acc.volume + volume * item.count,
          price: acc.price + unitPrice * item.count,
        };
      },
      { weight: 0, volume: 0, price: 0 } // здесь можно задать нужную базовую стоимость
    );

    let servicePrice = 100;
    let basePrice = newTotals.price;
    if (distanceBetween !== 0) {
      basePrice = basePrice + servicePrice;
    }
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

  useEffect(() => {
    if (items.length > 0) {
      const lastItemInArray = items[items.length - 1];
      const lastItem = document.getElementById(lastItemInArray.key);
      if (lastItem) {
        lastItem.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [items]);

  const handleItemCountChange = (idKey, newCount) => {
    const updatedItems = items.map((item) =>
      item.key === idKey ? { ...item, count: newCount } : item
    );
    onChange && onChange(updatedItems);
  };

  const createPDF = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/orderPDF",
        {},
        { responseType: "blob" }
      );
      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      if (response.data) {
        setLoading(false);
      }
      window.open(fileURL, "_blank");
    } catch (error) {
      setLoading(false);
      console.error("Ошибка загрузки PDF:", error);
    }
  };

  // При маппинге передаем обновлённое значение и onChange
  let itemList;
  if (Array.isArray(items) && items.length > 0) {
    itemList = items.map((item, index) => (
      <NumberInput
        key={index}
        iconName={item.iconname}
        title={item.label}
        value={item.count}
        idKey={item.key}
        onChange={(newCount) => handleItemCountChange(item.key, newCount)}
      />
    ));
  } else {
    itemList = (
      <Title level={3} style={{ padding: "0px", margin: "0px" }}>
        {t("calculator.addPosition")}
      </Title>
    );
  }
  console.log("orderList", items);

  return (
    <Flex gap="small" vertical style={orderListStyle} id="orderList">
      <Title level={3}>
        <Flex
          style={orderListSumStyle}
          gap="large"
          align="center"
          justify="center"
        >
          <span
            id="priceLabel"
            style={{
              textDecorationLine: "underline",
              fontWeight: "bold",
            }}
          >
            {t("calculator.price")} {totals.price} €
          </span>
          <span>
            {t("calculator.volume")} {totals.volume} m³
          </span>
          <span>
            {t("calculator.weight")} {totals.weight} kg
          </span>
          <Flex align="center" justify="flex-end">
            <CustomButton
              title="PDF"
              onClick={createPDF}
              color="danger"
              isLoading={isLoading}
              size={"large"}
            />
          </Flex>
        </Flex>
      </Title>
      <Divider
        style={{
          borderColor: "black",
          margin: "0px",
        }}
      />

      <div
        className="furnitureList"
        style={{
          maxHeight: "100vh", // задаём максимальную высоту
          overflowY: "scroll", // включаем вертикальный скроллбар
          borderRadius: "5px",
        }}
      >
        <Flex gap="small" align="center" vertical>
          <Title
            level={3}
            style={{
              padding: "0px",
              margin: "0px",
            }}
          >
            {t("calculator.loadPoint")}
          </Title>
          <Flex gap="small" justify="space-around">
            <ApartmentInputSelect
              title={t("calculator.floor")}
              options={oldApartmentFloors}
              placeholder={t("calculator.floor")}
              onChange={(value) => {
                // value — выбранный коэффициент (например, 0.4 для 2-го этажа)
                setLoadingFloorCoeff(value);
              }}
            />
            <ApartmentNumberInput
              title={t("calculator.distanceToTruck")}
              placeholder={t("calculator.distance")}
              onChange={(value) => {
                // Приводим значение к числу, если оно приходит как строка
                setLoadingDistance(Number(value));
              }}
              step={5}
            />
          </Flex>
          <Divider
            style={{
              borderColor: "black",
              margin: "0px",
            }}
          />
          <Title
            level={3}
            style={{
              padding: "0px",
              margin: "0px",
            }}
          >
            {t("calculator.unloadPoint")}
          </Title>
          <Flex>
            <ApartmentInputSelect
              title={t("calculator.floor")}
              options={oldApartmentFloors}
              placeholder={t("calculator.floor")}
              onChange={(value) => {
                setUnloadingFloorCoeff(value);
              }}
            />
            <ApartmentNumberInput
              title={t("calculator.distanceToTruck")}
              placeholder={t("calculator.distance")}
              onChange={(value) => {
                setUnloadingDistance(Number(value));
              }}
              step={5}
            />
          </Flex>
          <Divider
            style={{
              borderColor: "black",
              margin: "0px",
            }}
          />
          <Flex>
            <ApartmentNumberInput
              title={t("calculator.distanceLoadingToUnloading")}
              placeholder={t("calculator.distance")}
              onChange={(value) => {
                setDistanceBetween(Number(value));
              }}
              step={5}
            />
          </Flex>
        </Flex>

        <Divider
          style={{
            borderColor: "black",
          }}
        />

        <Title
          level={2}
          style={{
            padding: "0px",
            margin: "0px",
          }}
        >
          {t("calculator.orderList")}
        </Title>

          {itemList}
      </div>
    </Flex>
  );
};

export default OrderList;
