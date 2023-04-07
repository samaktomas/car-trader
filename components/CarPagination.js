import React, { forwardRef, useState } from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { getAsString } from "../src/getAsString";
import Link from "next/link";
import { useRouter } from "next/router";

function CarPagination({ totalPages }) {
  const { query } = useRouter();
  return (
    <Pagination
      className="pl-5 lg:pl-20 py-5"
      page={parseInt(getAsString(query.page) || "1")}
      count={totalPages}
      renderItem={(item) => (
        <PaginationItem
          component={MaterialUiLink}
          query={query}
          item={item}
          {...item}
        />
      )}
    />
  );
}

export default CarPagination;

const MaterialUiLink = forwardRef(({ item, query, ...props }, ref) => (
  <Link
    legacyBehavior
    href={{
      pathname: "/cars",
      query: { ...query, page: item.page },
      ...props,
    }}
    shallow
  >
    <a ref={ref} {...props}></a>
  </Link>
));
