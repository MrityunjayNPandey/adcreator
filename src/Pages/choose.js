import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedPhoto } from "../Redux/actions"; // Assuming you have your action creators in a separate file
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

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
}));

const Choose = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { projectName, description, selectedCategory, selectedPhoto } =
    useSelector((state) => state);

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/editor");
    // Handle form submission
    console.log("Project Name:", projectName);
    console.log("Description:", description);
    console.log("Selected Category:", selectedCategory);
    console.log("Selected Photo:", selectedPhoto);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const newItem = {
        id: uuidv4(),
        type: "image",
        src: e.target.result,
      };
      dispatch(setSelectedPhoto(newItem));
      navigate("/preview");
      console.log(selectedPhoto);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Container className={classes.container}>
      <form className={classes.form}>
        <Button
          variant="contained"
          className={classes.blueButton}
          onClick={() => {
            navigate("/renderimages");
          }}
        >
          Select an Image from our catalogue
        </Button>
        <label htmlFor="upload-photo">
          <Button
            variant="contained"
            className={classes.redButton}
            component="span"
          >
            Upload Photo
          </Button>
        </label>
        <input
          id="upload-photo"
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          style={{ display: "none" }}
        />

        <Button
          variant="contained"
          className={classes.blueButton}
          onClick={handleSubmit}
        >
          Skip this step and directly edit on editor
        </Button>
      </form>
    </Container>
  );
};

export default Choose;
