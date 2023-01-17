import React from "react";

function Card({ car }) {
  return (
    <div className="p-8 w-10/12 justify-center m-auto">
      <div className="flex rounded-lg shadow-lg w-full">
        <img
          className="p-8 rounded-lg w-[300px] md:w-[400px] xl:w-[500px] object-contain flex-start"
          src={car.photoUrl}
          alt={car.make}
        />

        <div className="p-6">
          <h2 className="text-gray-900 text-xl font-medium mb-2">
            {car.make + " " + car.model}
          </h2>
          <h2 className="text-gray-700 text-2xl mb-4">€ {car.price}</h2>
          <h4 className="text-gray-700 text-base mb-4">Year: {car.year}</h4>
          <h4 className="text-gray-700 text-base mb-4">Fuel: {car.fuelType}</h4>
          <h4 className="text-gray-700 text-base mb-4">KMs: {car.fuelType}</h4>
          <h4 className="text-gray-700 text-base mb-4 hidden lg:inline">
            Details: {car.details}
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Card;
