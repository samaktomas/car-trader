import React from "react";
import { openDB } from "../../../../src/openDB";

function CarDetails() {
  return <div>CarDetails</div>;
}

export default CarDetails;

export const getServerSideProps = async (ctx) => {
  const id = ctx.params.id;
  const db = await openDB();
  const car = await db.get("SELECT * FROM Car where id = ?", id);

  return { props: {} };
};
