import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { memo } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { textStyles } from "../Utils/Constants";

const EditToolbar = ({
  selectedId,
  style,
  setTexts,
  setStyle,
  setTextSize,
  textSize,
  setTextColor,
  textColor,
  selectedObjId,
  setImages,
  setShapes,
}) => {
  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    setTexts((prevTexts) =>
      prevTexts.map((text) => {
        if (text.id === selectedId) {
          return {
            ...text,
            fontStyle: event.target.value,
          };
        }
        return text;
      })
    );
  };

  const handleSizeChange = (event) => {
    setTextSize(event.target.value);
    setTexts((prevTexts) =>
      prevTexts.map((text) => {
        if (text.id === selectedId) {
          return {
            ...text,
            size: event.target.value,
          };
        }
        return text;
      })
    );
  };

  const handleColorChange = (event) => {
    setTextColor(event.target.value);
    setTexts((prevTexts) =>
      prevTexts.map((text) => {
        if (text.id === selectedId) {
          return {
            ...text,
            color: event.target.value,
          };
        }
        return text;
      })
    );
  };

  const handleDeleteItem = () => {
    if (selectedId) {
      setTexts((prevTexts) =>
        prevTexts.filter((text) => text.id !== selectedId)
      );
    }

    if (selectedObjId) {
      setImages((prevImages) =>
        prevImages.filter((image) => image.id !== selectedObjId)
      );
      setShapes((prevShapes) =>
        prevShapes.filter((shape) => shape.id !== selectedObjId)
      );
    }
  };

  return (
    <Box
      sx={{
        background: "#484848",
        padding: "5px",
        borderRadius: "8px",
        width: "60%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
          <InputLabel id="styleLabel" sx={{ color: "#fff" }}>
            Style
          </InputLabel>
          <Select
            labelId="styleSelect"
            id="styleSelect"
            value={style}
            label="style"
            onChange={handleStyleChange}
            sx={{
              color: "#fff",
              ".MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
            }}
          >
            {textStyles.map((style, index) => (
              <MenuItem key={index} value={style.font}>
                {style.font}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
          <InputLabel id="demo-select-small-label" sx={{ color: "#fff" }}>
            Size
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={textSize}
            label="Age"
            onChange={handleSizeChange}
            sx={{
              color: "#fff",
              ".MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
            }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={35}>35</MenuItem>
            <MenuItem value={40}>40</MenuItem>
            <MenuItem value={45}>45</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
          <InputLabel id="demo-select-small-label" sx={{ color: "#fff" }}>
            Color
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={textColor}
            label="Age"
            onChange={handleColorChange}
            sx={{
              color: "#fff",
              ".MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
            }}
          >
            <MenuItem value="red">Red</MenuItem>
            <MenuItem value="yellow">Yellow</MenuItem>
            <MenuItem value="green">Green</MenuItem>
            <MenuItem value="blue">Blue</MenuItem>
            <MenuItem value="black">black</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <IconButton onClick={handleDeleteItem}>
          <DeleteIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default memo(EditToolbar);
