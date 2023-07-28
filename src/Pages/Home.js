import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, makeStyles } from "@material-ui/core";
import {
  FiCard,
  FiCardActionArea,
  FiCardContent,
  FiCardMedia,
} from "./FullImageCard/FullImageCard";

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
    minWidth: 345,
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
    height: 135,
    color: "#ffffff",
    backgroundColor: "rgba(0, 0, 0, 0.24)",
    transition: "background-color 0.3s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  media: {
    height: 140,
  },

  fiCardContentTextSecondary: {
    color: "rgba(255,255,255,0.78)",
  },
});

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/choose");
  };

  return (
    <Container className={classes.container}>
      <Box display="flex" justifyContent="center">
        <Box mx>
          <FiCard className={classes.card}>
            <FiCardActionArea onClick={handleButtonClick}>
              <FiCardMedia
                className={classes.fiCardMedia}
                media="picture"
                alt="Contemplative Reptile"
                image="https://images.pexels.com/photos/3844790/pexels-photo-3844790.jpeg?auto=compress&cs=tinysrgb&h=350"
                title="Contemplative Reptile"
              />
              <FiCardContent className={classes.fiCardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  Create a New Ad
                </Typography>
              </FiCardContent>
            </FiCardActionArea>
          </FiCard>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
