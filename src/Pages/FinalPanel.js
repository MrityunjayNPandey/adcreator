import React from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { Button, Container } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
    },
  },
  select: {
    color: "white",
    width: "100%",
  },
  mediaContainer: {
    color: "white",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: theme.spacing(3),
    overflow: "auto",
    "& .MuiCard-root": {
      width: 200,
      height: 200,
      margin: theme.spacing(1),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      border: "2px solid transparent",
      "&.selected": {
        border: `2px solid ${theme.palette.primary.main}`,
      },
    },
  },
  blueButton: {
    backgroundColor: "#178bf1",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#0085fa",
    },
  },
  redButton: {
    backgroundColor: "#ff4081",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#f50057",
    },
  },
  uploadButton: {
    margin: theme.spacing(1),
    textTransform: "none",
  },
  submitButton: {
    margin: theme.spacing(2, 0),
    textTransform: "none",
  },
  downloadButton: {
    margin: theme.spacing(2, 0),
    textTransform: "none",
  },
}));

const FinalPanel = () => {
  const classes = useStyles();
  const { finalPhoto } = useSelector((state) => state);
  console.log("finalPhoto", finalPhoto);

  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement("a");
    link.href = finalPhoto;
    link.download = "finalImage.jpg"; // Set the desired file name
    link.target = "_blank";

    // Simulate a click to start the download
    document.body.appendChild(link);
    link.click();

    // Clean up the temporary link element
    document.body.removeChild(link);
  };

  return (
    <Container className={classes.container}>
      <form className={classes.form}>
        <Typography variant="h4" gutterBottom>
          Step 5: Final Image Preview
        </Typography>
        {finalPhoto && (
          <div>
            <img
              src={finalPhoto}
              alt="FinalImage"
              style={{ maxWidth: 600, maxHeight: 600 }}
            />
          </div>
        )}
        {finalPhoto && (
          <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.downloadButton}
              onClick={handleDownload}
            >
              Download
            </Button>
          </div>
        )}
      </form>
    </Container>
  );
};

export default FinalPanel;
