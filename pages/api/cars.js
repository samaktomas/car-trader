import getPaginatedCars from "../../database/getPaginatedCars";

async function cars(req, res) {
  const cars = await getPaginatedCars(req.query);
  res.json(cars);
}

export default cars;
