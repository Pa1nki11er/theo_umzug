import pool from "./../db.js";
import puppeteer from "puppeteer";
import fs from 'fs/promises'; // Используем fs.promises

const furnitureController = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // Читаем HTML-файл асинхронно
    const htmlContent = await fs.readFile('src/controllers/pdf/orderLayout.html', 'utf8');

    // Устанавливаем HTML-содержимое страницы и ждём полной загрузки
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Генерируем PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=order.pdf",
      "Content-Length": pdfBuffer.length,
    });

    res.send(Buffer.from(pdfBuffer));

  } catch (error) {
    console.error("Ошибка при создании PDF:", error.message);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

export default furnitureController;
