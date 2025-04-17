import React, { useState, useEffect } from "react";
import {
  Flex,
  Input,
  Typography,
  Select,
  Menu,
  Divider,
  DatePicker,
} from "antd";
import NumberInput from "./NumberInput.jsx";
import ApartmentInputSelect from "./ApartmentInputSelect.jsx";
import ApartmentNumberInput from "./ApartmentNumberInput.jsx";
import InputField from "./InputField.jsx";
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
  width: "50vw",
};

const orderListSumStyle = {
  backgroundColor: "white",
  width: "50vw",
  textAlign: "start",
  borderRadius: "5px",
  fontSize: "1em",
};

let itemList = "";

const OrderList = ({ items, onChange, isOrder }) => {
  // Состояния для дополнительных коэффициентов
  const [loadingFloorCoeff, setLoadingFloorCoeff] = useState(0);
  const [unloadingFloorCoeff, setUnloadingFloorCoeff] = useState(0);
  const [loadingDistance, setLoadingDistance] = useState(0);
  const [statusLoadingDistance, setStatusLoadingDistance] = useState(0);
  const [unloadingDistance, setUnloadingDistance] = useState(0);
  const [statusUnloadingDistance, setStatusUnloadingDistance] = useState(0);
  const [distanceBetween, setDistanceBetween] = useState(0);
  const [statusDistanceBetween, setStatusDistanceBetween] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const [loadingFloor, setLoadingFloor] = useState("");
  const [statusLoadingFloor, setStatusLoadingFloor] = useState("");
  const [unloadingFloor, setUnloadingFloor] = useState("");
  const [statusUnloadingFloor, setStatusUnloadingFloor] = useState("");
  const [colorAddPosition, setColorAddPosition] = useState("black");
  const [isOrderModule, setOrderModule] = useState("none");
  // Основные итоги (вес, объем, базовая цена)
  const [totals, setTotals] = useState({ weight: 0, volume: 0, price: 200 });
  let itemList;

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

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

    let servicePrice = 0;
    let basePrice = newTotals.price;

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

    // Стоимость услуги не должна попадать под влияние коеффициентов??
    // Если расстояние между пунктами равна 0, то показывать стоимость услуги
    if (distanceBetween !== 0) {
      servicePrice = 100;
    }

    const finalPrice =
      basePrice +
      floorAdditional +
      distanceToTruckAdditional +
      distanceBetweenAdditional +
      servicePrice;

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
    if (newCount <= 0) {
      console.log("Удаляем элемент с idKey:", idKey);
      // Remove the item with the matching key
      const updatedItems = items.filter((item) => item.key !== idKey);
      console.log("updatedItems:", updatedItems);
      onChange && onChange(updatedItems);
      return;
    }
    const updatedItems = items.map((item) =>
      item.key === idKey ? { ...item, count: newCount } : item
    );
    console.log("updatedItems:", updatedItems);
    onChange && onChange(updatedItems);
  };

  const createPDF = async () => {
    setLoading(true);
    let isValid = validateInputs();
    if (!isValid) {
      setLoading(false);
      return;
    }

    let data = {
      items: items,
      totals: totals,
      loadingFloor: loadingFloor,
      unloadingFloor: unloadingFloor,
      loadingDistance: loadingDistance,
      unloadingDistance: unloadingDistance,
      distanceBetween: distanceBetween,
      currentLang: i18n.language,
      translation: t("orderPDF", { returnObjects: true }),
    };

    try {
      const response = await fetch("/api/orderPDF", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      // const file = new Blob([response.data], { type: "application/pdf" });
      const blob = await response.blob();
      const fileURL = URL.createObjectURL(blob);
      if (blob) {
        setLoading(false);
      }
      window.open(fileURL, "_blank");
    } catch (error) {
      setLoading(false);
      console.error("Ошибка загрузки PDF:", error);
    }
  };

  const validateInputs = () => {
    const inputs = [
      { value: loadingDistance, status: setStatusLoadingDistance },
      { value: unloadingDistance, status: setStatusUnloadingDistance },
      { value: distanceBetween, status: setStatusDistanceBetween },
      { value: loadingFloor, status: setStatusLoadingFloor },
      { value: unloadingFloor, status: setStatusUnloadingFloor },
    ];
    let isValid = true;
    inputs.forEach((input) => {
      if (input.value === 0 || input.value === "") {
        console.log("input.value", input.value);
        input.status("error");
        isValid = false;
      } else {
        // Например, если значение корректное, сбрасываем ошибку
        input.status("");
      }
    });
    if (items.length === 0) {
      isValid = false;
      setColorAddPosition("red");
    }
    return isValid;
  };

  const handleOrderModule = () => {
    isOrderModule === "none" ? setOrderModule("block") : setOrderModule("none");
  };

  // При маппинге передаем обновлённое значение и onChange
  if (Array.isArray(items) && items.length > 0) {
    itemList = items.map((item, index) => (
      <NumberInput
        key={item.key}
        iconName={item.iconname}
        title={item.label}
        value={item.count}
        idKey={item.key}
        onChange={(newCount) => handleItemCountChange(item.key, newCount)}
      />
    ));
  } else {
    itemList = (
      <Title
        level={3}
        id="addPostionLabel"
        style={{ padding: "0px", margin: "0px", color: colorAddPosition }}
      >
        {t("calculator.addPosition")}
      </Title>
    );
  }

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
          <Flex gap="small" align="center" justify="flex-end">
            <CustomButton
              title="PDF"
              onClick={createPDF}
              color="danger"
              isLoading={isLoading}
              size={"large"}
              iconType="pdf"
            />
            <CustomButton
              title="Make Order"
              onClick={handleOrderModule}
              color="primary"
              isLoading={isLoading}
              size={"large"}
              iconType="text"
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
          <div className="orderModule" style={{ display: isOrderModule }}>
            <Flex gap="small" align="center" vertical>
              <Title
                level={3}
                style={{
                  padding: "0px",
                  margin: "0px",
                }}
              >
                {t("orderPDF.personalData")}
              </Title>
              <Flex wrap gap="small" justify="space-around" align="center">
                <InputField
                  title={t("homepage.inputContactUsName")}
                  placeholder={t("homepage.inputContactUsName")}
                  onChange={() => {}}
                />
                <InputField
                  title={t("homepage.inputContactUsEmail")}
                  placeholder={t("homepage.inputContactUsEmail")}
                  onChange={() => {}}
                />
                <InputField
                  title={t("orderPDF.phoneNumber")}
                  placeholder={t("orderPDF.phoneNumber")}
                  onChange={() => {}}
                />
                <DatePicker
                  placeholder="Дата перевезення"
                  showTime
                  disabledTime={disabledTime}
                />
                <InputField
                  title={t("orderPDF.adressFrom")}
                  placeholder={t("orderPDF.addressFrom")}
                  onChange={() => {}}
                />
                <InputField
                  title={t("orderPDF.adressTo")}
                  placeholder={t("orderPDF.orderDate")}
                  onChange={() => {}}
                />
              </Flex>
            </Flex>
            <Divider
              style={{
                borderColor: "black",
                marginTop: "10px",
              }}
            />
          </div>

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
              onChange={(value, option) => {
                // value — выбранный коэффициент (например, 0.4 для 2-го этажа)
                setLoadingFloorCoeff(value);
                setLoadingFloor(option.label);
              }}
              idElement="loadingFloor"
              status={statusLoadingFloor}
            />
            <ApartmentNumberInput
              title={t("calculator.distanceToTruck")}
              placeholder={t("calculator.distance")}
              onChange={(value) => {
                // Приводим значение к числу, если оно приходит как строка
                setLoadingDistance(Number(value));
              }}
              step={5}
              status={statusLoadingDistance}
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
              onChange={(value, option) => {
                setUnloadingFloorCoeff(value);
                setUnloadingFloor(option.label);
              }}
              idElement="unloadingFloor"
              status={statusUnloadingFloor}
            />
            <ApartmentNumberInput
              title={t("calculator.distanceToTruck")}
              placeholder={t("calculator.distance")}
              onChange={(value) => {
                setUnloadingDistance(Number(value));
              }}
              step={5}
              status={statusUnloadingDistance}
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
              status={statusDistanceBetween}
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
