import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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
        welcome:"Тут ви можете прорахувати вартість вашого замовлення!",
        inputCalculatorDistance: "Відстань",
        inputCalculatorWeight: "Вага",
        inputCalculatorVolume: "Об'єм",
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
        priority: "Unsere Hauptprinzipien - Zuverlässigkeit, Schnelligkeit und Qualität",
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
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes content
    },
  });

export default i18n;
