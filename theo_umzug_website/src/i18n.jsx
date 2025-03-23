import i18n, { t } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { or } from "ajv/dist/compile/codegen";

const resources = {
  uk: {
    translation: {
      navigation: {
        home: "Головна",
        order: "Оформити замовлення",
        contacts: "Контакти",
        calculator: "Калькулятор",
      },
      homepage: {
        welcome: "Транспортування для вас!",
        priority: "Наші основні принципи - надійність, швидкість та якість",
        btnContactUs: "Зв’язатися з нами",
        aboutCompany: "Про компанію",
        companyDescription: `
          Наша компанія спеціалізується на наданні професійних послуг із
          перевезення вантажів. Ми гарантуємо надійність, оперативність та
          індивідуальний підхід до кожного клієнта.
        `,
        ourServices: "Наші послуги",
        serviceDescriptionUmzugHilfe: `
          Ретельна підготовка, великі об'єми, великий транспортний засіб
        `,
        serviceDescriptionUmzugTaxi: `
          Безпечні та швидкі перевезення, маленький об'єм
        `,
        whyUs: "Чому обирають нас?",
        whyUsReasons: {
          reason1: "Швидкість",
          reason2: "Відповідальність",
          reason3: "Доступні ціни",
        },
        contactUs: "Зв’яжіться з нами",
        inputContactUsName: "Ім'я",
        inputContactUsEmail: "Електронна пошта",
        inputContactUsSubject: "Тема",
        inputContactUsMessage: "Повідомлення",
        inputContactUsSend: "Відправити",
      },
      calculator: {
        furnitureList: "Каталог меблів",
        price: "Ціна",
        weight: "Вага",
        volume: "Об'єм",
        kg: "кг",
        loadPoint: "Пункт завантаження",
        unloadPoint: "Пункт розвантаження",
        floor: "Поверх",
        distanceLoadingToUnloading: "Відстань від пункту загрузи до пунтку вигрузки",
        distanceToTruck: "Відстань від входу до вантажівки",
        orderList: "Список замовлення",
        addPosition: "Додайте позицію!",
        distance: "Відстань",
        floors: {
          ground: "Перший поверх",
          second: "Другий поверх",
          third: "Третій поверх",
          fourth: "Четвертий поверх",
          fifthAndMore: "П'ятий і вище",
        },
      },
      orderPDF: {
        orderLabel: "Замовлення",
        orderItems: "Позиції замовлення",
        item: "Позиція",
        quantity: "Кількість",
        unitPrice: "Ціна за одиницю",
        totalUnitPrice: "Загальна ціна",
        issueDate: "Дата видачі",
        distanceToTruck: "Відстань від входу до вантажівки",
        floor: "Поверх",
        loadPoint: "Пункт завантаження",
        unloadPoint: "Пункт розвантаження",
        transportInfo: "Інформація про транспортування",
      },
    },
  },
  en: {
    translation: {
      navigation: {
        home: "Home",
        order: "Place Order",
        contacts: "Contacts",
        calculator: "Calculator",
      },
      homepage: {
        welcome: "Transportation for you!",
        priority: "Our main principles - reliability, speed, and quality",
        btnContactUs: "Contact Us",
        aboutCompany: "About the Company",
        companyDescription: `
          Our company specializes in providing professional cargo
          transportation services. We guarantee reliability, efficiency, and
          a personalized approach to every client.
        `,
        ourServices: "Our Services",
        serviceDescriptionUmzugHilfe: `
          Thorough preparation, large volumes, big vehicles
        `,
        serviceDescriptionUmzugTaxi: `
          Safe and quick transport, small volumes
        `,
        whyUs: "Why choose us?",
        whyUsReasons: {
          reason1: "Speed",
          reason2: "Responsibility",
          reason3: "Affordable prices",
        },
        contactUs: "Contact Us",
        inputContactUsName: "Name",
        inputContactUsEmail: "Email",
        inputContactUsSubject: "Subject",
        inputContactUsMessage: "Message",
        inputContactUsSend: "Send",
      },
      calculator: {
        furnitureList: "Furniture Catalog",
        price: "Price",
        weight: "Weight",
        volume: "Volume",
        kg: "kg",
        loadPoint: "Loading Point",
        unloadPoint: "Unloading Point",
        floor: "Floor",
        distanceLoadingToUnloading:
          "Distance from loading point to unloading point",
        distanceToTruck: "Distance from entrance to truck",
        orderList: "Order List",
        addPosition: "Add Position",
        distance: "Distance",
        floors: {
          ground: "Ground floor",
          first: "First floor",
          second: "Second floor",
          third: "Third floor",
          fourth: "Fourth floor",
          fifthAndMore: "Fifth and above",
        },
      },
      orderPDF: {
        orderLabel: "Order",
        orderItems: "Order Items",
        item: "Item",
        quantity: "Count",
        unitPrice: "Unit Price",
        totalUnitPrice: "Total Price",
        issueDate: "Issue Date",
        floor: "Floor",
        distanceToTruck: "Distance from entrance to truck",
        loadPoint: "Loading Point",
        unloadPoint: "Unloading Point",
        transportInfo: "Transportation Information",
      },
    },
  },
  de: {
    translation: {
      navigation: {
        home: "Startseite",
        order: "Bestellung aufgeben",
        contacts: "Kontakte",
        calculator: "Rechner",
      },
      homepage: {
        welcome: "Transport für Sie!",
        priority:
          "Unsere Hauptprinzipien - Zuverlässigkeit, Schnelligkeit und Qualität",
        btnContactUs: "Kontaktieren Sie uns",
        aboutCompany: "Über das Unternehmen",
        companyDescription: `
          Unser Unternehmen spezialisiert sich auf professionelle Dienstleistungen
          im Bereich Gütertransport. Wir garantieren Zuverlässigkeit, Effizienz und
          einen individuellen Ansatz für jeden Kunden.
        `,
        ourServices: "Unsere Dienstleistungen",
        serviceDescriptionUmzugHilfe: `
          Sorgfältige Vorbereitung, großes Volumen, großes Fahrzeug
        `,
        serviceDescriptionUmzugTaxi: `
          Sicherer und schneller Transport, kleines Volumen
        `,
        whyUs: "Warum uns wählen?",
        whyUsReasons: {
          reason1: "Schnelligkeit",
          reason2: "Verantwortung",
          reason3: "Erschwingliche Preise",
        },
        contactUs: "Kontaktieren Sie uns",
        inputContactUsName: "Name",
        inputContactUsEmail: "E-Mail",
        inputContactUsSubject: "Betreff",
        inputContactUsMessage: "Nachricht",
        inputContactUsSend: "Senden",
      },
      calculator: {
        furnitureList: "Möbelkatalog",
        price: "Preis",
        weight: "Gewicht",
        volume: "Volumen",
        kg: "kg",
        loadPoint: "Ladepunkt",
        unloadPoint: "Entladepunkt",
        floor: "Etage",
        distanceLoadingToUnloading: "Entfernung vom Ladepunkt zum Entladepunkt",
        distanceToTruck: "Entfernung vom Eingang zum LKW",
        orderList: "Bestellliste",
        addPosition: "Position hinzufügen",
        distance: "Entfernung",
        floors: {
          ground: "Erdgeschoss",
          first: "Erster Stock",
          second: "Zweiter Stock",
          third: "Dritter Stock",
          fourth: "Vierter Stock",
          fifthAndMore: "Fünfter und höher",
        },
      },
      orderPDF: {
        orderLabel: "Bestellung",
        orderItems: "Bestellpositionen",
        item: "Position",
        quantity: "Anzahl",
        unitPrice: "Stückpreis",
        totalUnitPrice: "Gesamtpreis",
        issueDate: "Ausgabedatum",
        floor: "Etage",
        distanceToTruck: "Entfernung vom Eingang zum LKW",
        loadPoint: "Ladepunkt",
        unloadPoint: "Entladepunkt",
        transportInfo: "Transportinformationen",
      },
    },
  },
  ru: {
    translation: {
      navigation: {
        home: "Главная",
        order: "Оформить заказ",
        contacts: "Контакты",
        calculator: "Калькулятор",
      },
      homepage: {
        welcome: "Транспорт для вас!",
        priority: "Наши главные принципы - надежность, скорость и качество",
        btnContactUs: "Связаться с нами",
        aboutCompany: "О компании",
        companyDescription: `
          Наша компания специализируется на предоставлении профессиональных
          услуг по грузоперевозкам. Мы гарантируем надежность, оперативность
          и индивидуальный подход к каждому клиенту.
        `,
        ourServices: "Наши услуги",
        serviceDescriptionUmzugHilfe: `
          Тщательная подготовка, большой объем, крупный транспорт
        `,
        serviceDescriptionUmzugTaxi: `
          Безопасная и быстрая перевозка, маленький объем
        `,
        whyUs: "Почему выбирают нас?",
        whyUsReasons: {
          reason1: "Скорость",
          reason2: "Ответственность",
          reason3: "Доступные цены",
        },
        contactUs: "Свяжитесь с нами",
        inputContactUsName: "Имя",
        inputContactUsEmail: "Электронная почта",
        inputContactUsSubject: "Тема",
        inputContactUsMessage: "Сообщение",
        inputContactUsSend: "Отправить",
      },
      calculator: {
        furnitureList: "Каталог мебели",
        price: "Цена",
        weight: "Вес",
        volume: "Объем",
        kg: "кг",
        loadPoint: "Пункт загрузки",
        unloadPoint: "Пункт выгрузки",
        floor: "Этаж",
        distanceLoadingToUnloading:
          "Расстояние от пункта загрузки до пункта выгрузки",
        distanceToTruck: "Расстояние от входа до грузовика",
        orderList: "Список заказов",
        addPosition: "Добавьте позицию!",
        distance: "Расстояние",
        floors: {
          ground: "Первый этаж",
          second: "Второй этаж",
          third: "Третий этаж",
          fourth: "Четвёртый этаж",
          fifthAndMore: "Пятый и выше",
        },
      },
      orderPDF: {
        orderLabel: "Заказ",
        orderItems: "Позиции заказа",
        item: "Позиция",
        quantity: "Количество",
        unitPrice: "Цена за единицу",
        totalUnitPrice: "Общая цена",
        issueDate: "Дата выдачи",
        floor: "Этаж",
        distanceToTruck: "Расстояние от входа до грузовика",
        loadPoint: "Пункт загрузки",
        unloadPoint: "Пункт выгрузки",
        transportInfo: "Информация о транспортировке",
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already escapes content
    },
  });

export default i18n;
