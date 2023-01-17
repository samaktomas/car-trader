import { openDB } from "../src/openDB";

async function getMakes() {
  const db = await openDB();
  const makes = await db.all(
    "SELECT make, count (*) as count FROM Car group by make"
  );
  return makes;
}

export default getMakes;
