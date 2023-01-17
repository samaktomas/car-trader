import { openDB } from "../src/openDB";

async function getModels(make) {
  const db = await openDB();
  const models = await db.all(
    "SELECT model, count (*) as count FROM car WHERE make = ? GROUP BY model",
    make
  );
  return models;
}

export default getModels;
