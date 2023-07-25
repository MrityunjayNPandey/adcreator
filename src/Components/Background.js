import { Button, Grid } from "@mui/material";
import React from "react";
import { backgroundColors } from "../Utils/Constants";

const Background = ({ handleBackground }) => {
  return (
    <Grid container spacing={2}>
      {backgroundColors.map((item, index) => (
        <Grid item md={3} key={index}>
          <Button
            onClick={() => handleBackground(item)}
            sx={{
              width: "100%",
              background: item,
              height: "10vh",
              ":hover": {
                background: item,
                border: "1px solid #fff",
              },
            }}
          ></Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default Background;
