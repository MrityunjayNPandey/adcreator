import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Canvas, EditToolbar, MenuBar } from "../Components";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFinalPhoto } from "../Redux/actions";
import { useNavigate } from "react-router-dom";
const drawerWidth = 350;

export default function AdvancePanel() {
  const [background, setBackground] = useState("white");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedObjId, setSelectedObjId] = useState(null);
  const [style, setStyle] = useState("");
  const [textSize, setTextSize] = useState("");
  const [textColor, setTextColor] = useState("");
  const [uploadedImage, setUploadedImage] = useState([]);
  const [canvasElements, setCanvasElements] = useState([]);
  const stageRef = useRef(null);

  //example of how to use:
  //contains: id, type, src(base64)
  const { selectedPhoto } = useSelector((state) => state);

  useEffect(() => {
    if (selectedPhoto) {
      const image = selectedPhoto;
      const htmlImage = new Image();
      htmlImage.onload = () => {
        const updatedImage = {
          ...image,
          src: htmlImage,
          isSelectedAPI: true,
          height: htmlImage.height,
          width: htmlImage.width,
          x: 0,
          y: 0,
        };
        htmlImage.classList.add("canvas-image");
        setCanvasElements((prev) => [...prev, updatedImage]);
      };
      htmlImage.src = image.src;
    }
  }, [selectedPhoto]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSaveToImage = () => {
    const uri = stageRef.current.toDataURL();
    dispatch(setFinalPhoto(uri));
    navigate("/finalpanel");
  };

  console.log(canvasElements);

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
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            setCanvasElements={setCanvasElements}
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
          setStyle={setStyle}
          setTextSize={setTextSize}
          textSize={textSize}
          setTextColor={setTextColor}
          textColor={textColor}
          selectedObjId={selectedObjId}
          setCanvasElements={setCanvasElements}
        />
        <Canvas
          background={background}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          setStyle={setStyle}
          setTextSize={setTextSize}
          setTextColor={setTextColor}
          stageRef={stageRef}
          selectedObjId={selectedObjId}
          setSelectedObjId={setSelectedObjId}
          canvasElements={canvasElements}
          setCanvasElements={setCanvasElements}
        />
      </Box>
    </Box>
  );
}
