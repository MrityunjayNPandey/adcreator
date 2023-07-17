import React, { useRef, useState, memo } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import {
  Stage,
  Layer,
  Rect,
  Text,
  Transformer,
  Image,
  Circle,
} from "react-konva";

const Canvas = ({
  background,
  texts,
  setTexts,
  selectedId,
  setSelectedId,
  setStyle,
  setTextSize,
  setTextColor,
  images,
  setImages,
  stageRef,
  shapes,
  selectedObjId,
  setSelectedObjId,
  setShapes,
}) => {
  const textRefs = useRef({});
  const imageRefs = useRef({});
  const shapeRefs = useRef({});

  const handleTextDoubleClick = (id) => {
    setTexts((prevTexts) =>
      prevTexts.map((text) => {
        if (text.id === id) {
          return {
            ...text,
            isEditing: true,
          };
        }
        return text;
      })
    );
  };

  const handleTextInputBlur = (event, id) => {
    const newTexts = texts.map((text) => {
      if (text.id === id) {
        return {
          ...text,
          val: event.target.value,
          isEditing: false,
        };
      }
      return text;
    });
    setTexts(newTexts);
  };

  const handleTextInputKeyDown = (event, id) => {
    if (event.key === "Enter") {
      setTexts((prevTexts) =>
        prevTexts.map((text) => {
          if (text.id === id) {
            return {
              ...text,
              val: event.target.value,
              isEditing: false,
            };
          }
          return text;
        })
      );
    }
  };

  const setTextPosition = (event, id) => {
    setTexts((prevTexts) =>
      prevTexts.map((text) => {
        if (text.id === id) {
          return {
            ...text,
            x: event.target.x(),
            y: event.target.y(),
          };
        }
        return text;
      })
    );
  };

  const handleTextTransform = (event, id) => {
    setTexts((prevTexts) =>
      prevTexts.map((text) => {
        if (text.id === id) {
          return {
            ...text,
            x: event.target.x(),
            y: event.target.y(),
            scaleX: event.target.scaleX(),
            scaleY: event.target.scaleY(),
            rotation: event.target.rotation(),
          };
        }
        return text;
      })
    );
  };

  const handleImageZIndex = (id) => {
    setImages((prevImages) => {
      const image = prevImages.find((img) => img.id === id);
      const index = prevImages.indexOf(image);
      if (index > -1) {
        const updatedImages = [...prevImages];
        updatedImages.splice(index, 1);
        updatedImages.push(image);
        return updatedImages;
      }
      return prevImages;
    });
  };

  const handleImageTransform = (event, id) => {
    setImages((prevImages) => {
      return prevImages.map((image) => {
        if (image.id === id) {
          return {
            ...image,
            x: event.target.x(),
            y: event.target.y(),
            scaleX: event.target.scaleX(),
            scaleY: event.target.scaleY(),
            rotation: event.target.rotation(),
          };
        }
        return image;
      });
    });
  };

  const handleShapeTransform = (event, id) => {};

  const handleRemoveBackground = (id) => {
    const imageFromCanvas = images.find((img) => img.id === id);
    console.log(imageFromCanvas);
  };

  const handleTextClick = (id, item) => {
    setStyle(item.fontStyle);
    setSelectedId(id);
    setTextSize(item.size);
    setTextColor(item.color);
  };

  const handleStageClick = () => {
    setSelectedId(null);
    setSelectedObjId(null);
    setStyle("");
    setTextSize("");
    setTextColor("");
    //setSelectedShapeId(null);
  };

  console.log(texts);

  return (
    <Container
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        minHeight: "75vh",
      }}
    >
      <Box
        sx={{
          width: 500,
          height: 500,
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Stage width={500} height={500} ref={stageRef}>
          <Layer>
            <Rect
              width={500}
              height={500}
              fill={background}
              onClick={handleStageClick}
            />
            {shapes.map((shape) => (
              <React.Fragment key={shape.id}>
                {shape.type === "square" ? (
                  <Rect
                    width={200}
                    height={200}
                    x={100}
                    y={100}
                    fill="lightblue"
                    draggable
                    onClick={() => setSelectedObjId(shape.id)}
                    onTransformEnd={(event) => {
                      handleShapeTransform(event, shape.id);
                    }}
                    ref={(node) => (shapeRefs.current[shape.id] = node)}
                  />
                ) : (
                  <Circle
                    width={200}
                    height={200}
                    x={100}
                    y={100}
                    fill="lightblue"
                    draggable
                    onClick={() => setSelectedObjId(shape.id)}
                    onTransformEnd={(event) => {
                      handleShapeTransform(event, shape.id);
                    }}
                    ref={(node) => (shapeRefs.current[shape.id] = node)}
                  />
                )}
                {selectedObjId === shape.id &&
                  shapeRefs.current[selectedObjId] && (
                    <Transformer
                      node={shapeRefs.current[selectedObjId]}
                      rotateEnabled
                      resizeEnabled
                      keepRatio={false}
                    />
                  )}
              </React.Fragment>
            ))}
            {images.map((image) => (
              <React.Fragment key={image.id}>
                <Image
                  image={image.src}
                  width={image.width}
                  height={image.height}
                  x={image.x}
                  y={image.y}
                  draggable
                  onDragStart={() => handleImageZIndex(image.id)}
                  onClick={() => setSelectedObjId(image.id)}
                  onTransformEnd={(event) =>
                    handleImageTransform(event, image.id)
                  }
                  ref={(node) => (imageRefs.current[image.id] = node)}
                />
                {selectedObjId === image.id &&
                  imageRefs.current[selectedObjId] && (
                    <Transformer
                      node={imageRefs.current[selectedObjId]}
                      rotateEnabled
                      resizeEnabled
                      keepRatio={false}
                    />
                  )}
              </React.Fragment>
            ))}
            {texts.map((text) => (
              <React.Fragment key={text.id}>
                {!text.isEditing && (
                  <>
                    <Text
                      text={text.val}
                      fontFamily={text.fontStyle}
                      fontSize={text.size}
                      fill={text.color}
                      x={text.x}
                      y={text.y}
                      draggable
                      align="center"
                      onDragEnd={(event) => setTextPosition(event, text.id)}
                      onDblClick={() => handleTextDoubleClick(text.id)}
                      onClick={() => handleTextClick(text.id, text)}
                      onTransformEnd={(event) =>
                        handleTextTransform(event, text.id)
                      }
                      ref={(node) => (textRefs.current[text.id] = node)}
                    />
                    {selectedId === text.id && textRefs.current[selectedId] && (
                      <Transformer
                        node={textRefs.current[selectedId]}
                        rotateEnabled
                        resizeEnabled
                        keepRatio={false}
                      />
                    )}
                  </>
                )}
              </React.Fragment>
            ))}
          </Layer>
        </Stage>
        {texts.map((text) => (
          <React.Fragment key={text.id}>
            {text.isEditing && (
              <TextField
                variant="standard"
                defaultValue={text.val}
                autoFocus
                onBlur={(event) => handleTextInputBlur(event, text.id)}
                onKeyDown={(event) => handleTextInputKeyDown(event, text.id)}
                sx={{
                  position: "absolute",
                  top: `${text.y}px`,
                  left: `${text.x}px`,
                  padding: "0",
                  margin: "0",
                  border: "none",
                  background: "transparent",
                }}
                InputProps={{
                  disableUnderline: true,
                  style: {
                    fontSize: `${text.size}px`,
                    fontFamily: `${text.fontStyle}`,
                    color: text.color,
                  },
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Box>
      <Button onClick={() => handleRemoveBackground(selectedObjId)}>
        remove bg
      </Button>
    </Container>
  );
};

export default memo(Canvas);
