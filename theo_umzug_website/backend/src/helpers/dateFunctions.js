// dateFunctions.js

/**
 * Returns the current date in the format "dd.mm.yyyy".
 * @returns {string} The current date in the format "dd.mm.yyyy".
 */
export function getCurrentFormattedDate() {
  const now = new Date();
  const day = now.getDate();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${day}.${month}.${year}`;
}

