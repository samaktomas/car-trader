import getModels from "../../database/getModels";
import { getAsString } from "../../src/getAsString";

async function models(req, res) {
  const make = getAsString(req.query.make);
  const models = await getModels(make);
  res.json(models);
}

export default models;
