import puppeteer from "puppeteer";
import fs from "fs/promises";
import path from "path";
import * as dateFunctions from "./../helpers/helperFunctions.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

// __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Generates HTML table rows for the order items.
 * @param {Array} items - List of order items.
 * @returns {string} HTML string for table rows.
 */
const generateOrderItemsHTML = (items) =>
  items
    .map(
      (item) => `
        <tr>
          <td>${item.label}</td>
          <td>${item.count}</td>
          <td>${item.details.unitPrice}</td>
          <td>${item.details.unitPrice * item.count}</td>
        </tr>`
    )
    .join("");

/**
 * Controller that processes order data, generates a PDF from an HTML template using Puppeteer,
 * and sends the PDF as a response.
 */
const furnitureController = async (req, res) => {
  let browser; // Declare browser outside try for cleanup in finally
  try {
    // Destructure necessary data from the request body
    const { data } = req.body;
    const { items, totals, translation: translations } = data;
    const price = totals.price;
    const currentDate = dateFunctions.getCurrentFormattedDate();
    console.log("data", data);
    // Load and encode logo image as Base64
    const imagePath = path.join(__dirname, "../img/logo.jpg");
    const imageData = await fs.readFile(imagePath, { encoding: "base64" });
    const base64Image = `data:image/jpeg;base64,${imageData}`;

    // Launch Puppeteer browser
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // Read the HTML template file using an absolute path
    const htmlTemplatePath = path.join(__dirname, "pdf", "orderLayout.html");
    let htmlContent = await fs.readFile(htmlTemplatePath, "utf8");

    // Generate the HTML for order items
    const orderItemsHTML = generateOrderItemsHTML(items);

    // Define placeholders and their replacements
    const replacements = {
      "[orderItems]": orderItemsHTML,
      "[orderLabel]": translations.orderLabel,
      "[totalPrice]": price,
      "[issueDate]": currentDate,
      "[item]": translations.item,
      "[quantity]": translations.quantity,
      "[unitPrice]": translations.unitPrice,
      "[totalUnitPrice]": translations.totalUnitPrice,
      "[logoPath]": base64Image,
      "[oldApartament]": translations.loadPoint || "",
      "[floorOldApartament]": translations.floor || "",
      "[floorOldApartamentNum]": data.loadingFloor || "",
      "[distanceToTruckOldApartament]": translations.distanceToTruck || "",
      "[distanceToTruckOldApartamentNum]": data.loadingDistance || "",
      "[newApartament]": translations.unloadPoint || "",
      "[floorNewApartament]": translations.floor || "",
      "[floorNewApartamentNum]": data.unloadingFloor || "",
      "[distanceToTruckNewApartament]": translations.distanceToTruck || "",
      "[distanceToTruckNewApartamentNum]": data.unloadingDistance || "",
      "[transportInfo]": translations.transportInfo || "",
    };

    // Replace each placeholder in the HTML template
    Object.keys(replacements).forEach((placeholder) => {
      htmlContent = htmlContent.replaceAll(
        placeholder,
        replacements[placeholder]
      );
    });

    // Set the page content and wait for the network to be idle (ensuring all resources load)
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Generate PDF from the page content
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    // Set response headers and send the PDF
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=order.pdf",
      "Content-Length": pdfBuffer.length,
    });
    res.send(Buffer.from(pdfBuffer));
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ error: "Server error" });
  } finally {
    // Ensure the Puppeteer browser is closed in case of errors or after completion
    if (browser) {
      await browser.close();
    }
  }
};

export default furnitureController;
