import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

function CarCard({ car }) {
  return (
    <Card className="mb-6 shadow-xl m-auto" sx={{ maxWidth: 600 }}>
      <CardHeader
        title={`${car.make} ${car.model}`}
        subheader={`Price: € ${car.price}`}
      />
      <CardMedia
        component="img"
        height="210"
        image={car.photoUrl}
        alt={car.make}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Year: {car.year}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fuel: {car.fuelType}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          KMs: {car.kms}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Details: {car.details}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CarCard;
