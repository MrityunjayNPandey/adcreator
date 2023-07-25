import { Button, Grid } from "@mui/material";
import React from "react";
import { textStyles } from "../Utils/Constants";

const Text = ({ addTextToCanvas }) => {
  return (
    <Grid container spacing={1}>
      {textStyles.map((item, index) => (
        <Grid item md={6} key={index}>
          <Button
            sx={{ width: "100%", height: "20vh" }}
            onClick={() => addTextToCanvas(item.font, item.color, item.val)}
          >
            <img
              src={item.img}
              alt="text"
              style={{
                width: "100%",
                filter: item.color === "#000" ? "invert(100%)" : "none",
              }}
            />
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default Text;
