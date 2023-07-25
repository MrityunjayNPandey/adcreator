import { Button, Grid } from "@mui/material";
import React from "react";
import { shapesList } from "../Utils/Constants";

const Shapes = ({ handleAddShape }) => {
  return (
    <Grid container spacing={2}>
      {shapesList.map((shape) => (
        <Grid
          key={shape.name}
          item
          md={4}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Button
            onClick={() => handleAddShape(shape.name, shape.method)}
            sx={{
              width: "100%",
              border: "3px solid transparent",
              ":hover": {
                border: "3px solid #fff",
              },
            }}
          >
            <img src={shape.src} alt="shape" style={{ width: "100%" }} />
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default Shapes;
