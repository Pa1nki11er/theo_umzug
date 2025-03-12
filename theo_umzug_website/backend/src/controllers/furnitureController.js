import pool from "./../db.js";

const furnitureController = async (req, res) => {
  try {
    const { currentLang } = req.body.data; // Extract currentLang
    console.log(currentLang);
    const languages = {
      "uk": "nameUA",
      "de": "nameDE",
      "en": "nameEN",
      "ru": "nameRU",
    }
    const [rows] = await pool.query(`SELECT *, ${languages[currentLang]} as name FROM furniture`);
    // Определяем родительские элементы (где parentId === null)
    const parents = rows.filter((item) => item.parentId === null);

    // Преобразуем каждую родительскую запись в нужный формат
    const result = parents.map((parent) => {
      // Находим дочерние элементы для данного родителя
      const children = rows.filter(
        (child) => child.parentId === parent.furnitureId
      );
      if (children.length == 0) {
        let path = "/img/" + parent.icon + "-svgrepo-com.svg";

        return {
          key: String(parent.furnitureId),
          iconname: parent.icon,
          label: parent.name, // или другой нужный язык (nameEN, nameUA, nameDE)
          details: {
            weight: Number(parent.weight),
            volume: Number(parent.volume),
            workingHours: Number(parent.workingHours),
            unitPrice: Number(parent.unitPrice),
          },
          count: 0, // начальное значение счетчика
        };
      }
      return {
        key: String(parent.furnitureId),
        iconname: parent.icon,
        label: parent.name, // или другой нужный язык (nameEN, nameUA, nameDE)
        children: children.map((child) => ({
          key: String(child.furnitureId),
          iconname: child.icon, // при необходимости можно задать другое значение
          label: child.name, // или другой нужный язык
          details: {
            weight: Number(child.weight),
            volume: Number(child.volume),
            workingHours: Number(child.workingHours),
            unitPrice: Number(child.unitPrice),
          },
          count: 0, // начальное значение счетчика
        })),
      };
    });

    res.json(result);
  } catch (error) {
    console.error("Ошибка при запросе:", error.message);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

export default furnitureController;
