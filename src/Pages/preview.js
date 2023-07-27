import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Button } from "@material-ui/core";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFinalPhoto } from "../Redux/actions";

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

const Preview = () => {
  const classes = useStyles();
  const { selectedPhoto } = useSelector((state) => state);
  const navigate = useNavigate();

  const handleEditor = () => {
    navigate("/editor");
  };

  const dispatch = useDispatch();

  const handleFinal = () => {
    dispatch(setFinalPhoto(selectedPhoto.src));
    navigate("/finalpanel");
  };

  return (
    <Container className={classes.container}>
      <form className={classes.form}>
        <Typography variant="h4" gutterBottom>
          Image Preview and Editing
        </Typography>
        {selectedPhoto && (
          <div>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.id}
              style={{ maxWidth: 500, maxHeight: 500 }}
            />
          </div>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleEditor}
          className={classes.blueButton}
        >
          Edit in Editor
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleFinal}
          className={classes.redButton}
        >
          Finalize this Image
        </Button>
      </form>
    </Container>
  );
};

export default Preview;
