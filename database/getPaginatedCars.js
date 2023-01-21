import React from "react";
import { getAsString } from "../src/getAsString";
import { openDB } from "../src/openDB";

const mainQuery = `
    FROM car
    WHERE (@make is NULL OR @make = make)
    AND (@model is NULL OR @model = model)
    AND (@minPrice is NULL OR @minPrice <= price)        
    AND (@maxPrice is NULL OR @maxPrice >= price)`;

export default async function getPaginatedCars(query) {
  const db = await openDB();

  const page = getValueNumber(query.page) || 1;
  const rowsPerPage = getValueNumber(query.rowsPerPage) || 4;
  const offset = (page - 1) * rowsPerPage;

  const dbParams = {
    "@make": getValueString(query.make),
    "@model": getValueString(query.model),
    "@minPrice": getValueNumber(query.minPrice),
    "@maxPrice": getValueNumber(query.maxPrice),
  };

  const carsPromise = db.all(
    `SELECT * ${mainQuery} LIMIT @rowsPerPage OFFSET @offset`,
    {
      ...dbParams,
      "@rowsPerPage": rowsPerPage,
      "@offset": offset,
    }
  );

  const totalRowsPromise = db.get(
    `SELECT COUNT(*) as count ${mainQuery}`,
    dbParams
  );

  const [cars, totalRows] = await Promise.all([carsPromise, totalRowsPromise]);

  return { cars, totalPages: Math.ceil(totalRows.count / rowsPerPage) };
}

export const getValueNumber = (value) => {
  const str = getValueString(value);
  const number = parseInt(str);
  return isNaN(number) ? null : number;
};

export const getValueString = (value) => {
  const str = getAsString(value);
  return !str || str.toLowerCase() === "all" ? null : value;
};
