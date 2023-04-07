import { Field, Form, Formik, useField, useFormikContext } from "formik";
import React from "react";
import getMakes from "../database/getMakes";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import router, { useRouter } from "next/router";
import getModels from "../database/getModels";
import { getAsString } from "../src/getAsString";
import useSWR from "swr";
import { Button } from "@mui/material";

const Search = ({ makes, models }) => {
  const { query } = useRouter();
  const initValues = {
    make: getAsString(query.make) || "all",
    model: getAsString(query.model) || "all",
    minPrice: getAsString(query.minPrice) || "all",
    maxPrice: getAsString(query.maxPrice) || "all",
  };

  const prices = [500, 1000, 5000, 15000, 25000, 50000, 250000];

  return (
    <Formik
      initialValues={initValues}
      onSubmit={(values) => {
        router.push(
          {
            pathname: "/cars",
            query: { ...values, page: 1 },
          },
          undefined,
          { shallow: true }
        );
      }}
    >
      {({ values }) => (
        <Form className="container m-auto max-w-3xl mt-14 pb-10 shadow-xl bg-gray-50 sticky top-32">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-10 ">
            <FormControl className="bg-white">
              <InputLabel id="make">Make</InputLabel>
              <Field name="make" as={Select} labelId="search-make" label="Make">
                <MenuItem value="all">
                  <em>All Makes</em>
                </MenuItem>
                {makes?.map((make) => (
                  <MenuItem value={make.make} key={make.make}>
                    {`${make.make} (${make.count})`}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>

            <ModelSelect make={values.make} name="model" models={models} />

            <FormControl className="bg-white">
              <InputLabel id="minPrice">Min Price</InputLabel>
              <Field
                name="minPrice"
                as={Select}
                labelId="search-min"
                label=">Min Price"
              >
                <MenuItem value="all">
                  <em>No Min</em>
                </MenuItem>
                {prices?.map((price) => (
                  <MenuItem value={price} key={price}>
                    {price}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>

            <FormControl className="bg-white">
              <InputLabel id="maxPrice">Max Price</InputLabel>
              <Field
                name="maxPrice"
                as={Select}
                labelId="search-max"
                label=">Max Price"
              >
                <MenuItem value="all">
                  <em>No Max</em>
                </MenuItem>
                {prices?.map((price) => (
                  <MenuItem value={price} key={price}>
                    {price}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
          </div>

          <Button
            className="grid grid-cols-1 m-auto w-3/4 bg-[#1976d2] py-2 rounded-lg"
            variant="contained"
            type="submit"
          >
            SEARCH FOR CARS
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export function ModelSelect({ models, make, ...props }) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({
    name: props.name,
  });

  const { data } = useSWR("/api/models?make=" + make, {
    // dedupingInterval: -> not call again the same url within one minute
    dedupingInterval: 60000,
    onSuccess: (newValues) => {
      if (!newValues.map((a) => a.model).includes(field.value)) {
        setFieldValue("model", "all");
      }
    },
  });
  const newModels = data || models;

  return (
    <FormControl className="bg-white">
      <InputLabel id="model">Model</InputLabel>
      <Select
        name="model"
        labelId="search-model"
        label="Model"
        {...field}
        {...props}
      >
        <MenuItem value="all">
          <em>All Models</em>
        </MenuItem>
        {newModels?.map((model) => (
          <MenuItem value={model.model} key={model.model}>
            {`${model.model} (${model.count})`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Search;

export const getServerSideProps = async (ctx) => {
  const make = getAsString(ctx.query.make);
  const [makes, models] = await Promise.all([getMakes(), getModels(make)]);

  return { props: { makes, models } };
};
