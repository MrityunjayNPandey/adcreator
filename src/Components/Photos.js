import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Photos = ({
  AddPhotoToCanvas,
  debouncedHandleQueryChange,
  pexelPhotos,
  loading,
  query,
}) => {
  return (
    <>
      <TextField
        variant="standard"
        defaultValue={query}
        onChange={debouncedHandleQueryChange}
        placeholder="Search..."
        sx={{
          width: "100%",
          background: "#27272A",
          mb: 2,
          padding: "0px 5px",
          input: {
            color: "#fff",
          },
        }}
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#fff" }} />
            </InputAdornment>
          ),
        }}
      />
      <Typography sx={{ textAlign: "center", mb: 2 }}>
        Photos by{" "}
        <a
          href="https://www.pexels.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "#8abbff" }}
        >
          pexels
        </a>
      </Typography>
      {loading ? (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress sx={{ color: "#fff" }} />
        </Box>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={6}>
            {pexelPhotos.slice(0, 15).map((photo) => (
              <Button
                key={photo.id}
                onClick={() => AddPhotoToCanvas(photo.id, photo.src)}
                disableRipple
                sx={{ width: "100%", padding: 0, mb: 1 }}
              >
                <img
                  src={photo.src}
                  alt="PexelPhotos"
                  style={{ width: "100%", borderRadius: "5px" }}
                  loading="lazy"
                />
              </Button>
            ))}
          </Grid>
          <Grid item md={6}>
            {pexelPhotos.slice(16, 30).map((photo) => (
              <Button
                key={photo.id}
                onClick={() => AddPhotoToCanvas(photo.id, photo.src)}
                disableRipple
                sx={{ width: "100%", padding: 0, mb: 1 }}
              >
                <img
                  src={photo.src}
                  alt="PexelPhoto"
                  style={{ width: "100%", borderRadius: "5px" }}
                  loading="lazy"
                />
              </Button>
            ))}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Photos;
