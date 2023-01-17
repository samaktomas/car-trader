import { Form, Formik } from "formik";
import React from "react";
import getMakes from "../database/getMakes";

const HomePage = ({ makes }) => {
  return (
    <div className="">
      <Formik initialValues={{}}>
        {({ values }) => (
          <Form>
            <div className="m-10">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-4 shadow-md">
                <div>Make</div>
                <div>Model</div>
                <div>Min</div>
                <div>Max</div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default HomePage;

export const getServerSideProps = async () => {
  const makes = await getMakes();
  return { props: { makes } };
};
