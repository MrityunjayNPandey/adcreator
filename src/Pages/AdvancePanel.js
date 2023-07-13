import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Canvas from "../Components/Canvas";
import MenuBar from "../Components/MenuBar";
import EditToolbar from "../Components/EditToolbar";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const drawerWidth = 350;

export default function AdvancePanel() {
  const [background, setBackground] = useState("white");
  const [texts, setTexts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [style, setStyle] = useState("");
  const [textSize, setTextSize] = useState("");
  const [textColor, setTextColor] = useState("");
  const [uploadedImage, setUploadedImage] = useState([]);
  const [images, setImages] = useState([]);
  const [shapes, setShapes] = useState({
    square: [],
    circle: [],
  });
  const stageRef = useRef(null);

  console.log(shapes);

  const handleSaveToImage = () => {
    const uri = stageRef.current.toDataURL();
    console.log(uri);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#303030",
          borderBottom: "1px solid rgba(255,255,255,0.8)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            Editor
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={handleSaveToImage}
          >
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#303030",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <MenuBar
            setBackground={setBackground}
            setTexts={setTexts}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            setImages={setImages}
            setShapes={setShapes}
          />
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          background: "#eeeade",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Toolbar />
        <EditToolbar
          selectedId={selectedId}
          style={style}
          setTexts={setTexts}
          setStyle={setStyle}
          setTextSize={setTextSize}
          textSize={textSize}
          setTextColor={setTextColor}
          textColor={textColor}
        />
        <Canvas
          background={background}
          texts={texts}
          setTexts={setTexts}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          setStyle={setStyle}
          setTextSize={setTextSize}
          setTextColor={setTextColor}
          images={images}
          setImages={setImages}
          stageRef={stageRef}
          shapes={shapes}
          setShapes={setShapes}
        />
      </Box>
    </Box>
  );
}
