import pool from "./../db.js";
import puppeteer from "puppeteer";
import fs from 'fs';


const furnitureController = async (req, res) => {
  try {
    // Получаем HTML из тела запроса
    const htmlContent = req.body.data.orderList;
    if (!htmlContent) {
      return res.status(400).json({ error: "Нет данных для создания PDF" });
    }

    // Запускаем браузер Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      // Параметры args могут понадобиться для некоторых окружений (например, в контейнерах)
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // // Устанавливаем HTML-содержимое страницы
    // await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    // Оборачиваем в полноценный HTML-документ
    const fullHtml = `
    <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>PDF Document</title>
      <style>
        button {
          background-color: #4CAF50;
          border: none;
          color: white;
          padding: 15px 32px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 16px;
          margin: 4px 2px;
        }
      </style>
    </head>
    <body>
      <p>Hello World!</p>
      <button>TEST</button>
    </body>
  </html>
`;

    await page.setContent(fullHtml, { waitUntil: "networkidle0" });
    // await page.waitForTimeout(1000); // 500 мс задержки

    // Генерируем PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true, // если нужны фоновые цвета и изображения
    });
    fs.writeFileSync('pdf/order.pdf', pdfBuffer);

    // Закрываем браузер
    await browser.close();

    // Устанавливаем заголовки для отправки PDF
    // res.set({
    //   "Content-Type": "application/pdf",
    //   "Content-Disposition": "attachment; filename=order.pdf",
    //   "Content-Length": pdfBuffer.length,
    // });
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=order.pdf",
      "Content-Length": pdfBuffer.length,
    });

    // Отправляем PDF в ответ
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Ошибка при создании PDF:", error.message);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

export default furnitureController;
