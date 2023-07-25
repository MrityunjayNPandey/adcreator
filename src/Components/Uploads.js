import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

const Uploads = ({ handleImageUpload, uploadedImage, AddImageToCanvas }) => {
  return (
    <>
      <Box>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: "none" }}
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button
            disableRipple
            sx={{
              background: "#27272A",
              border: "1px solid #3F3F46",
              width: "100%",
              "&:hover": {
                background: "#3F3F46",
                border: "1px solid #3F3F46",
              },
              color: "#fff",
              textTransform: "capitalize",
            }}
            component="span"
            variant="outlined"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Typography>Upload Image</Typography>
            </Box>
          </Button>
        </label>
      </Box>
      <Box sx={{ mt: 1 }}>
        <Grid container spacing={1}>
          {uploadedImage.map((image, index) => (
            <Grid key={index} item md={6}>
              <Button
                disableRipple
                sx={{ width: "100%" }}
                onClick={() => AddImageToCanvas(image.id)}
              >
                <img
                  src={image.src}
                  alt="uploadedImage"
                  style={{ width: "100%" }}
                />
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Uploads;
