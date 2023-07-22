import React, { memo } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid } from "@mui/material";
import {
  backgroundColors,
  iconsList,
  shapesList,
  templateList,
  textStyles,
} from "../Utils/Constants";
import { v4 as uuidv4 } from "uuid";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  //border: `1px solid ${theme.palette.divider}`,
  background: "#303030",
  color: "#fff",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{
          fontSize: "0.9rem",
          color: "#fff",
        }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  background: "#484848",
}));

function MenuBar({
  setBackground,
  setTexts,
  uploadedImage,
  setUploadedImage,
  setImages,
  setShapes,
}) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleBackground = (color) => {
    setBackground(color);
  };

  const addTextToCanvas = (font, color, val) => {
    setTexts((prev) => [
      ...prev,
      {
        id: uuidv4(),
        type: "text",
        val: val,
        x: 100,
        y: 100,
        isDragging: false,
        isEditing: false,
        fontStyle: font,
        size: 40,
        color: color,
      },
    ]);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const newItem = {
        id: uuidv4(),
        type: "image",
        src: e.target.result,
      };
      setUploadedImage((prev) => [...prev, newItem]);
    };
    reader.readAsDataURL(file);
  };

  const addingItemsToCanvas = (src, type, size, pos) => {
    const htmlImage = new Image();
    htmlImage.onload = () => {
      const updatedImage = {
        id: uuidv4(),
        type: type,
        src: htmlImage,
        height: type === "template" ? 500 : htmlImage.height * size,
        width: type === "template" ? 500 : htmlImage.width * size,
        x: pos,
        y: pos,
      };
      htmlImage.classList.add("canvas-image");
      setImages((prev) => [...prev, updatedImage]);
    };
    htmlImage.src = src;
  };

  const AddImageToCanvas = (id) => {
    const image = uploadedImage.find((item) => item.id === id);
    addingItemsToCanvas(image.src, "image", 0.3, 100);
  };

  const AddIconToCanvas = (src) => {
    addingItemsToCanvas(src, "icon", 0.3, 100);
  };

  const AddTemplateToCanvas = (src) => {
    addingItemsToCanvas(src, "template", 1, 0);
  };

  const handleAddShape = (name) => {
    const newObj = {
      id: uuidv4(),
      type: name,
    };

    setShapes((prevShapes) => [...prevShapes, newObj]);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Background</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            {backgroundColors.map((item, index) => (
              <Grid item md={3} key={index}>
                <Button
                  onClick={() => handleBackground(item)}
                  sx={{
                    width: "100%",
                    background: item,
                    height: "10vh",
                    ":hover": {
                      background: item,
                      border: "1px solid #fff",
                    },
                  }}
                ></Button>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Text</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            {textStyles.map((item, index) => (
              <Grid item md={6} key={index}>
                <Button
                  sx={{ width: "100%", height: "20vh" }}
                  onClick={() =>
                    addTextToCanvas(item.font, item.color, item.val)
                  }
                >
                  <img
                    src={item.img}
                    alt="text"
                    style={{
                      width: "100%",
                      filter: item.color === "#000" ? "invert(100%)" : "none",
                    }}
                  />
                </Button>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Uploads</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button
                disableRipple
                sx={{
                  background: "#27272A",
                  border: "1px solid #3F3F46",
                  width: "100%",
                  "&:hover": {
                    background: "#3F3F46",
                    border: "1px solid #3F3F46",
                  },
                  color: "#fff",
                  textTransform: "capitalize",
                }}
                component="span"
                variant="outlined"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography>Upload Image</Typography>
                </Box>
              </Button>
            </label>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Grid container spacing={1}>
              {uploadedImage.map((image, index) => (
                <Grid key={index} item md={6}>
                  <Button
                    disableRipple
                    sx={{ width: "100%" }}
                    onClick={() => AddImageToCanvas(image.id)}
                  >
                    <img
                      src={image.src}
                      alt="uploadedImage"
                      style={{ width: "100%" }}
                    />
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Shapes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={4}>
            {shapesList.map((shape) => (
              <Grid key={shape.name} item md={6}>
                <Button
                  onClick={() => handleAddShape(shape.name)}
                  sx={{
                    width: "100%",
                    minHeight: "20vh",
                    background: "lightblue",
                    opacity: 0.3,
                    borderRadius: shape.radius,
                    border: "3px solid transparent",
                    ":hover": {
                      background: "lightblue",
                      border: "3px solid #fff",
                    },
                  }}
                ></Button>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>Icons</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            {iconsList.map((icon, index) => (
              <Grid item md={3} key={index}>
                <Button
                  sx={{ width: "100%" }}
                  onClick={() => AddIconToCanvas(icon.src)}
                >
                  <img src={icon.src} alt="icon" style={{ width: "100%" }} />
                </Button>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography>Templates</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1}>
            {templateList.map((template, index) => (
              <Grid item md={6} key={index}>
                <Button
                  sx={{ width: "100%" }}
                  onClick={() => AddTemplateToCanvas(template.src)}
                >
                  <img
                    src={template.src}
                    alt="template"
                    style={{ width: "100%" }}
                  />
                </Button>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default memo(MenuBar);
