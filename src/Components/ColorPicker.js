import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { ChromePicker } from "react-color";
import { Box } from "@mui/material";

export default function ColorPicker({ textColor, handleColorChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        disableRipple
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{
          minHeight: "6vh",
          minWidth: "45px",
          background: textColor ? textColor : "#000",
          ":hover": {
            background: textColor ? textColor : "#000",
          },
        }}
      ></Button>
      <Popover
        sx={{ mt: 1 }}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <ChromePicker color={textColor} onChange={handleColorChange} />
      </Popover>
    </div>
  );
}
