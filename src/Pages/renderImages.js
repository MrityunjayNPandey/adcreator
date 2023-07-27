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
  TextField,
} from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { setPhotos, setSelectedPhoto } from "../Redux/actions";
import { useNavigate } from "react-router-dom";
import Loader from "react-loader";
import { debounce } from "lodash";

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
      height: 150,
      borderRadius: 16,
      overflow: "hidden",
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
  const { photos, selectedPhoto } = useSelector((state) => state);

  const API_KEY_PEXEL =
    "ggFV9hScofwUZWxCLuuW4tphfIJZmgGFKh6k63yrTLp7PVjIKbj9Qd2O";
  const API_KEY_UNSPLASH = "IEKwy9pi9HGWBmT1vDbHNTpHp7J41vfAHmb0F0_m5Do";

  const [chosenPhoto, setChosenPhoto] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fetchedPage, setFetchedPage] = useState(1);
  const PER_PAGE = 10;
  const INIT_FETCH = 10 * PER_PAGE;

  const [selectedCategory, setSelectedCategory] = useState("random");
  const YOUR_SEARCH_QUERY = selectedCategory;
  const API_ENDPOINT_PEXEL = `https://api.pexels.com/v1/search?query=${YOUR_SEARCH_QUERY}&per_page=${INIT_FETCH}&page=${fetchedPage}`;
  const API_ENDPOINT_UNSPLASH = `https://api.unsplash.com/search/photos/?client_id=${API_KEY_UNSPLASH}`;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const responsePexel = await axios.get(API_ENDPOINT_PEXEL, {
          headers: {
            Authorization: API_KEY_PEXEL,
          },
        });
        const responseUnsplash = await axios.get(API_ENDPOINT_UNSPLASH, {
          params: {
            query: YOUR_SEARCH_QUERY,
            page: fetchedPage,
            per_page: INIT_FETCH,
          },
        });
        const newPhotosPexel = responsePexel.data.photos.map((photo) => ({
          id: photo.id,
          type: "image",
          src: photo.src,
        }));
        const newPhotosUnsplash = responseUnsplash.data.results.map(
          (photo) => ({
            id: photo.id,
            type: "image",
            src: photo.urls,
          })
        );
        const updatedPhotos = [
          ...photos,
          ...newPhotosPexel,
          ...newPhotosUnsplash,
        ];
        dispatch(setPhotos(updatedPhotos));
        const totalResults = updatedPhotos.length;
        const totalPages = Math.ceil(totalResults / PER_PAGE);
        setTotalPages(totalPages);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    const fetchData = async () => {
      if (currentPage === totalPages && YOUR_SEARCH_QUERY) {
        const nextPage = fetchedPage + 1;
        setFetchedPage(nextPage);
        await fetchPhotos();
      }
    };

    fetchData();
  }, [YOUR_SEARCH_QUERY, currentPage]);

  const getBase64FromImageUrl = async (imageUrl) => {
    try {
      setLoading(true);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const navigate = useNavigate();

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    dispatch(setPhotos([]));
    setFetchedPage(1);
    setCurrentPage(1);
    setTotalPages(1);
    setSelectedCategory(newCategory);
    console.log(newCategory, selectedCategory);
  };

  const debouncedHandleCategoryChange = debounce(handleCategoryChange, 500);

  const handlePhotoSelect = async (photo) => {
    const { src, ...args } = photo;
    console.log(src, args);
    dispatch(
      setSelectedPhoto({
        ...args,
        src: await getBase64FromImageUrl(src.large || src.full),
      })
    );
    console.log(selectedPhoto);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedPhotos = photos.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  return (
    <Container className={classes.container}>
      <form className={classes.form}>
        <TextField
          type="text"
          id="outlined-basic"
          label="Search"
          variant="outlined"
          defaultValue={selectedCategory}
          onChange={debouncedHandleCategoryChange}
        />
        <FormControl className={classes.select}>
          <InputLabel id="category-label">Our Suggestions</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleCategoryChange}
          >
            <MenuItem value="Random" selected>
              Select a Suggestion
            </MenuItem>
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
              {paginatedPhotos.map((photo) => (
                <Card
                  key={photo.id}
                  className={`${classes.card} ${
                    chosenPhoto?.id === photo?.id ? "selected" : ""
                  }`}
                  onClick={() => setChosenPhoto(photo)}
                >
                  <CardMedia
                    component="img"
                    src={photo.src.medium || photo.src.regular}
                    alt={photo.id}
                  />
                </Card>
              ))}
            </div>
          </>
        )}
        {totalPages > 1 && (
          <div>
            <Button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        )}
        <Button
          variant="contained"
          className={classes.blueButton}
          onClick={async () => {
            await handlePhotoSelect(chosenPhoto);
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
