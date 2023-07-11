import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  pinkButton: {
    backgroundColor: "#ff4081",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#f50057",
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/stepform"); // Replace '/stepform' with the actual path of the desired destination
  };

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        className={classes.pinkButton}
        onClick={handleButtonClick}
      >
        Create a new ad
      </Button>
    </div>
  );
};

export default Home;
