import React from "react";
import Card from "../../../../components/card";
import { openDB } from "../../../../src/openDB";

function CarDetails({ car }) {
  return <Card car={car} />;
}

export default CarDetails;

export const getServerSideProps = async (ctx) => {
  const id = ctx.params.id;
  const db = await openDB();
  const car = await db.get("SELECT * FROM Car where id = ?", id);

  return { props: { car: car || null } };
};
