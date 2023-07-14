import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
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
  downloadButton: {
    margin: theme.spacing(2, 0),
    textTransform: "none",
  },
}));

const compressImage = (imageDataUrl, maxSizeInBytes) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = imageDataUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const maxDimension = Math.max(img.width, img.height);
      const scaleFactor = maxDimension > 1200 ? 1200 / maxDimension : 1;

      canvas.width = img.width * scaleFactor;
      canvas.height = img.height * scaleFactor;

      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.8); // Adjust the compression quality as needed
      resolve(compressedDataUrl);
    };
    img.onerror = (error) => reject(error);
  });
};

const FinalPanel = () => {
  const classes = useStyles();
  const { finalPhoto } = useSelector((state) => state);
  //   console.log("finalPhoto", finalPhoto);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = finalPhoto;
    link.download = "finalImage.jpg"; // Set the desired file name
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const dispatch = useDispatch();

  const handleSave = async () => {
    const imageFile = finalPhoto;
    const maxSizeInBytes = 1; // Bytes
    console.log(imageFile.length);
    if (imageFile.length > maxSizeInBytes) {
      const compressedImageDataURL = await compressImage(
        imageFile,
        maxSizeInBytes
      );
      dispatch(setFinalPhoto(compressedImageDataURL));
      console.log(compressedImageDataURL.length);
    }
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
        <Button
          variant="contained"
          className={classes.redButton}
          onClick={handleDownload}
        >
          Download
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          className={classes.blueButton}
        >
          Save
        </Button>
      </form>
    </Container>
  );
};

export default FinalPanel;
