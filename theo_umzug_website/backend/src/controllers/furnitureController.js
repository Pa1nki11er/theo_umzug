import pool from "./../db.js";

const furnitureController = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM furniture");
    // Определяем родительские элементы (где parentId === null)
    const parents = rows.filter((item) => item.parentId === null);

    // Преобразуем каждую родительскую запись в нужный формат
    const result = parents.map((parent) => {
      // Находим дочерние элементы для данного родителя
      const children = rows.filter(
        (child) => child.parentId === parent.furnitureId
      );
      if(children.length == 0 ){
        return {
          key: String(parent.furnitureId),
          icon: parent.icon || "",
          label: parent.nameRU, // или другой нужный язык (nameEN, nameUA, nameDE)
        };
      }
      return {
        key: String(parent.furnitureId),
        icon: parent.icon || "",
        label: parent.nameRU, // или другой нужный язык (nameEN, nameUA, nameDE)
        children: children.map((child) => ({
          key: String(child.furnitureId),
          iconname: child.icon, // при необходимости можно задать другое значение
          label: child.nameRU, // или другой нужный язык
          count: 0, // начальное значение счетчика
          details: {
            weight: Number(child.weight),
            volume: Number(child.volume),
            workingHours: Number(child.workingHours),
            unitPrice: Number(child.unitPrice),
          },
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
