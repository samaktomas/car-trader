import React, { forwardRef, useState } from "react";
import Search from ".";
import getMakes from "../database/getMakes";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

import getModels from "../database/getModels";
import getPaginatedCars from "../database/getPaginatedCars";
import { getAsString } from "../src/getAsString";
import router, { useRouter } from "next/router";
import { stringify } from "querystring";
import deepEqual from "fast-deep-equal";
import useSWR from "swr";
import CarPagination from "../components/CarPagination";
import CarCard from "../components/CarCard";

function CarsList({ makes, models, cars, totalPages }) {
  const { query } = useRouter();
  const [serverQuery] = useState(query);
  const { data } = useSWR("api/cars?" + stringify(query), {
    initialData: deepEqual(query, serverQuery)
      ? { cars, totalPages }
      : undefined,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 max-w-7xl mx-auto gap-10">
      <div className="lg:col-span-2 mt-9">
        <Search makes={makes} models={models} />
      </div>
      <div className="lg:col-span-3 space-y-5">
        <CarPagination totalPages={data?.totalPages} />
        {data?.cars?.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
        <CarPagination totalPages={data?.totalPages} />
      </div>
    </div>
  );
}

export default CarsList;

export const getServerSideProps = async (ctx) => {
  const make = getAsString(ctx.query.make);
  const [makes, models, pagination] = await Promise.all([
    getMakes(),
    getModels(make),
    getPaginatedCars(ctx.query),
  ]);

  return {
    props: {
      makes,
      models,
      cars: pagination.cars,
      totalPages: pagination.totalPages,
    },
  };
};
