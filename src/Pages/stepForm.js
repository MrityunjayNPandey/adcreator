import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardMedia,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import {
  setProjectName,
  setDescription,
  setSelectedCategory,
  setPhotos,
  setSelectedPhoto,
  setUploadedPhoto,
} from "../Redux/actions"; // Assuming you have your action creators in a separate file

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

const StepForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const {
    projectName,
    description,
    selectedCategory,
    photos,
    selectedPhoto,
    uploadedPhoto,
  } = useSelector((state) => state);

  const API_KEY = "ggFV9hScofwUZWxCLuuW4tphfIJZmgGFKh6k63yrTLp7PVjIKbj9Qd2O";
  const YOUR_SEARCH_QUERY = selectedCategory;
  const API_ENDPOINT = `https://api.pexels.com/v1/search?query=${YOUR_SEARCH_QUERY}&per_page=10`;

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(API_ENDPOINT, {
          headers: {
            Authorization: API_KEY,
          },
        });
        dispatch(setPhotos(response.data.photos));
      } catch (error) {
        console.log(error);
      }
    };

    if (YOUR_SEARCH_QUERY) {
      fetchPhotos();
    }
  }, [YOUR_SEARCH_QUERY]);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Project Name:", projectName);
    console.log("Description:", description);
    console.log("Selected Category:", selectedCategory);
    console.log("Selected Photo:", selectedPhoto);
    console.log("Uploaded Photo:", uploadedPhoto);
  };

  const handleProjectNameChange = (e) => {
    dispatch(setProjectName(e.target.value));
  };

  const handleDescriptionChange = (e) => {
    dispatch(setDescription(e.target.value));
  };

  const handleCategoryChange = (event) => {
    dispatch(setSelectedCategory(event.target.value));
  };

  const handlePhotoSelect = (photo) => {
    dispatch(setSelectedPhoto(photo));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    dispatch(setUploadedPhoto(URL.createObjectURL(file)));
    dispatch(setSelectedPhoto(null)); // Clear selected photo when uploading a new photo
  };

  const renderStepOne = () => {
    return (
      <form className={classes.form}>
        <Typography variant="h4" gutterBottom>
          Step 1: Project Details
        </Typography>
        <TextField
          type="text"
          label="Project Name"
          value={projectName}
          onChange={handleProjectNameChange}
        />
        <TextField
          multiline
          rows={4}
          label="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <Button
          variant="contained"
          className={classes.blueButton}
          onClick={handleNext}
        >
          Next
        </Button>
      </form>
    );
  };

  const renderStepTwo = () => {
    return (
      <form className={classes.form}>
        <Typography variant="h4" gutterBottom>
          Step 2: Select Category
        </Typography>
        <FormControl className={classes.select}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <MenuItem value="">Select a category</MenuItem>
            <MenuItem value="nature">Nature</MenuItem>
            <MenuItem value="wildlife">Wildlife</MenuItem>
            <MenuItem value="art">Art</MenuItem>
            <MenuItem value="architecture">Architecture</MenuItem>
            <MenuItem value="food">Food</MenuItem>
          </Select>
        </FormControl>
        {photos.length > 0 && (
          <>
            <Typography variant="h5">Choose an image:</Typography>
            <div className={classes.mediaContainer}>
              {photos.map((photo) => (
                <Card
                  key={photo.id}
                  className={`${classes.card} ${
                    selectedPhoto === photo ? "selected" : ""
                  }`}
                  onClick={() => handlePhotoSelect(photo)}
                >
                  <CardMedia
                    component="img"
                    src={photo.src.medium}
                    alt={photo.photographer}
                  />
                </Card>
              ))}
            </div>
          </>
        )}
        <Button
          variant="contained"
          className={classes.redButton}
          onClick={handlePrevious}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          className={classes.blueButton}
          onClick={handleNext}
        >
          Next
        </Button>
      </form>
    );
  };

  const renderStepThree = () => {
    return (
      <form className={classes.form}>
        <Typography variant="h4" gutterBottom>
          Step 3: Image Preview and Submission
        </Typography>
        {selectedPhoto && (
          <div>
            <Typography variant="h5">Selected Photo:</Typography>
            <img
              src={selectedPhoto.src.medium}
              alt={selectedPhoto.photographer}
              style={{ maxWidth: 200, maxHeight: 200 }}
            />
          </div>
        )}

        {uploadedPhoto && !selectedPhoto && (
          <div>
            <Typography variant="h5">Uploaded Photo:</Typography>
            <img
              src={uploadedPhoto}
              alt="Uploaded"
              style={{ maxWidth: 200, maxHeight: 200 }}
            />
          </div>
        )}

        <input type="file" accept="image/*" onChange={handlePhotoUpload} />

        <Button
          variant="contained"
          className={classes.redButton}
          onClick={handlePrevious}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={classes.blueButton}
        >
          Submit
        </Button>
      </form>
    );
  };

  return (
    <Container className={classes.container}>
      {currentStep === 1 && renderStepOne()}
      {currentStep === 2 && renderStepTwo()}
      {currentStep === 3 && renderStepThree()}
    </Container>
  );
};

export default StepForm;