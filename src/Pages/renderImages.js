import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardMedia,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedCategory,
  setPhotos,
  setSelectedPhoto,
} from "../Redux/actions"; // Assuming you have your action creators in a separate file
import { useNavigate } from "react-router-dom";
import Loader from "react-loader";

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

const RenderImages = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { selectedCategory, photos, selectedPhoto } = useSelector(
    (state) => state
  );

  const API_KEY = "ggFV9hScofwUZWxCLuuW4tphfIJZmgGFKh6k63yrTLp7PVjIKbj9Qd2O";
  const YOUR_SEARCH_QUERY = selectedCategory;
  const API_ENDPOINT = `https://api.pexels.com/v1/search?query=${YOUR_SEARCH_QUERY}&per_page=10`;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_ENDPOINT, {
          headers: {
            Authorization: API_KEY,
          },
        });
        const photos = await Promise.all(
          response.data.photos.map(async (photo) => ({
            id: photo.id,
            type: "image",
            src: await getBase64FromImageUrl(photo.src.large),
          }))
        );
        dispatch(setPhotos(photos));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (YOUR_SEARCH_QUERY) {
      fetchPhotos();
    }
  }, [API_ENDPOINT, YOUR_SEARCH_QUERY, dispatch]);

  const getBase64FromImageUrl = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    dispatch(setSelectedCategory(event.target.value));
  };

  const handlePhotoSelect = (photo) => {
    dispatch(setSelectedPhoto(photo));
  };

  return (
    <Container className={classes.container}>
      <form className={classes.form}>
        <Typography variant="h4" gutterBottom>
          Select Category
        </Typography>
        <FormControl className={classes.select}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <MenuItem value="">Select a category</MenuItem>
            <MenuItem value="Health and Beauty">Health and Beauty</MenuItem>
            <MenuItem value="Food and Grocery">Food and Grocery</MenuItem>
            <MenuItem value="Entertainment and Activities">
              Entertainment and Activities
            </MenuItem>
            <MenuItem value="Toys, Kids and Baby">Toys, Kids and Baby</MenuItem>
            <MenuItem value="Clothing and Jewellery">
              Clothing and Jewellery
            </MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Books, Coaching and Classes">
              Books, Coaching and Classes
            </MenuItem>
            <MenuItem value="Home and Furniture">Home and Furniture</MenuItem>
          </Select>
        </FormControl>
        <Loader
          loaded={!loading}
          lines={13}
          length={20}
          width={10}
          radius={30}
          color="#000"
        />
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
                  <CardMedia component="img" src={photo.src} alt={photo.id} />
                </Card>
              ))}
            </div>
          </>
        )}
        <Button
          variant="contained"
          className={classes.blueButton}
          onClick={() => {
            navigate("/preview");
          }}
        >
          Preview
        </Button>
      </form>
    </Container>
  );
};

export default RenderImages;
