import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Button } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { setSelectedPhoto } from "../Redux/actions"; 
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import {
  FiCard,
  FiCardActionArea,
  FiCardContent,
  FiCardMedia,
} from "./FullImageCard";

const useStyles = makeStyles({
  container: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  },
  card: {
    maxWidth: 345,
    height: 150,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative", 
    "&:hover": {
      "& $fiCardMedia": {
        transform: "scale(1.1)", 
        transition: "transform 0.3s ease", 
      },
      "& $fiCardContent": {
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
      },
    },
  },
  fiCardMedia: {
    height: 300,
    transition: "transform 0.3s ease", 
  },
  fiCardContent: {
    height: 300, 
    color: "#ffffff",
    backgroundColor: "rgba(0, 0, 0, 0.24)", 
    transition: "background-color 0.3s ease", 
  },

  /**
   * Applied to Orginal Card demo
   * Same vale used in Material-ui Card Demos
   */
  media: {
    height: 140,
  },

  fiCardContentTextSecondary: {
    color: "rgba(255,255,255,0.78)",
  },
});

const Choose = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { projectName, description, selectedCategory, selectedPhoto } =
    useSelector((state) => state);

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/editor");
    
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
    <div>
      <Container className={classes.container}>
        <Box display="flex" justifyContent="center">
          <Box mx={5}>
            <FiCard className={classes.card}>
              <FiCardActionArea
                onClick={() => document.getElementById("upload-photo").click()}
              >
                <FiCardMedia
                  className={classes.fiCardMedia}
                  media="picture"
                  alt="Contemplative Reptile"
                  image="https://images.pexels.com/photos/7004697/pexels-photo-7004697.jpeg?auto=compress&cs=tinysrgb&h=350"
                  title="Contemplative Reptile"
                />
                <FiCardContent className={classes.fiCardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Upload an Image
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.fiCardContentTextSecondary}
                    component="p"
                  >
                    <br></br>
                    Have an Image already? Upload it and let's see what we can
                    do together.
                  </Typography>
                </FiCardContent>
              </FiCardActionArea>
            </FiCard>
            <input
              id="upload-photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: "none" }}
            />
          </Box>
          <Box mx={5}>
            <FiCard className={classes.card}>
              <FiCardActionArea
                onClick={() => {
                  navigate("/renderimages");
                }}
              >
                <FiCardMedia
                  className={classes.fiCardMedia}
                  media="picture"
                  alt="Contemplative Reptile"
                  image="https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg?auto=compress&cs=tinysrgb&h=350"
                  title="Contemplative Reptile"
                />
                <FiCardContent className={classes.fiCardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Select an Image from our catalogue
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.fiCardContentTextSecondary}
                    component="p"
                  >
                    Select an Image from a wide range of collection from Pexels
                    and Unsplash.
                  </Typography>
                </FiCardContent>
              </FiCardActionArea>
            </FiCard>
          </Box>
          <Box mx={5}>
            <FiCard className={classes.card}>
              <FiCardActionArea onClick={handleSubmit}>
                <FiCardMedia
                  className={classes.fiCardMedia}
                  media="picture"
                  alt="Contemplative Reptile"
                  image="https://images.pexels.com/photos/1070526/pexels-photo-1070526.jpeg?auto=compress&cs=tinysrgb&h=350"
                  title="Contemplative Reptile"
                />
                <FiCardContent className={classes.fiCardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Skip this step and directly edit on our Editor
                  </Typography>
                  <Typography
                    variant="body2"
                    className={classes.fiCardContentTextSecondary}
                    component="p"
                  >
                    Unleash your inner creativity with the help of our own Image
                    Editor.
                  </Typography>
                </FiCardContent>
              </FiCardActionArea>
            </FiCard>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Choose;
