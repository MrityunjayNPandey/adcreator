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
import ColorPicker from "./ColorPicker";

const EditToolbar = ({
  selectedId,
  style,
  setStyle,
  setTextSize,
  textSize,
  setTextColor,
  textColor,
  selectedObjId,
  setCanvasElements,
}) => {
  const handleStyleChange = (event) => {
    setStyle(event.target.value);
    setCanvasElements((prev) =>
      prev.map((element) => {
        if (element.id === selectedId) {
          return {
            ...element,
            fontStyle: event.target.value,
          };
        }
        return element;
      })
    );
  };

  const handleSizeChange = (event) => {
    setTextSize(event.target.value);
    setCanvasElements((prev) =>
      prev.map((element) => {
        if (element.id === selectedId) {
          return {
            ...element,
            size: event.target.value,
          };
        }
        return element;
      })
    );
  };

  const handleColorChange = (color) => {
    setTextColor(color.hex);
    setCanvasElements((prev) =>
      prev.map((element) => {
        if (element.id === selectedId) {
          return {
            ...element,
            color: color.hex,
          };
        }
        if (element.id === selectedObjId) {
          return {
            ...element,
            color: color.hex,
          };
        }
        return element;
      })
    );
  };

  const handleDeleteItem = () => {
    if (selectedId) {
      setCanvasElements((prev) =>
        prev.filter((element) => element.id !== selectedId)
      );
    }

    if (selectedObjId) {
      setCanvasElements((prev) =>
        prev.filter((element) => element.id !== selectedObjId)
      );
      // setShapes((prevShapes) =>
      //   prevShapes.filter((shape) => shape.id !== selectedObjId)
      // );
    }
  };

  const handleRemoveBackground = async () => {
    // const image = images.find((img) => img.id === selectedObjId);
    // const dataUri = image?.src;
    // console.log(dataUri);
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
        justifyContent: "space-around",
      }}
    >
      {selectedId && (
        <>
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
        </>
      )}
      {selectedId ? (
        <ColorPicker
          textColor={textColor}
          handleColorChange={handleColorChange}
        />
      ) : (
        selectedObjId && (
          <ColorPicker
            textColor={textColor}
            handleColorChange={handleColorChange}
          />
        )
      )}
      {/* <Button variant="contained" onClick={handleRemoveBackground}>
        Remove Background
      </Button> */}
      <IconButton onClick={handleDeleteItem}>
        <DeleteIcon sx={{ color: "#fff", ml: 2 }} />
      </IconButton>
    </Box>
  );
};

export default memo(EditToolbar);
