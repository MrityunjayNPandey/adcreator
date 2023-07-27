import React, { useRef, memo } from "react";
import { Box, Container, TextField } from "@mui/material";
import {
  Stage,
  Layer,
  Rect,
  Text,
  Transformer,
  Image,
  Shape,
} from "react-konva";

const TempCanvas = ({
  background,
  selectedId,
  setSelectedId,
  setStyle,
  setTextSize,
  setTextColor,
  stageRef,
  selectedObjId,
  setSelectedObjId,
  canvasElements,
  setCanvasElements,
}) => {
  const textRefs = useRef({});
  const imageRefs = useRef({});
  const shapeRefs = useRef({});

  const handleTextDoubleClick = (id) => {
    setCanvasElements((prev) =>
      prev.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            isEditing: true,
          };
        }
        return element;
      })
    );
  };

  const handleTextInputBlur = (event, id) => {
    const newTexts = canvasElements.map((element) => {
      if (element.id === id) {
        return {
          ...element,
          val: event.target.value,
          isEditing: false,
        };
      }
      return element;
    });
    setCanvasElements(newTexts);
  };

  const handleTextInputKeyDown = (event, id) => {
    if (event.key === "Enter") {
      setCanvasElements((prev) =>
        prev.map((element) => {
          if (element.id === id) {
            return {
              ...element,
              val: event.target.value,
              isEditing: false,
            };
          }
          return element;
        })
      );
    }
  };

  const handleElementPosition = (event, id) => {
    setCanvasElements((prev) =>
      prev.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            x: event.target.x(),
            y: event.target.y(),
          };
        }
        return element;
      })
    );
  };

  const handleElementTransform = (event, id) => {
    setCanvasElements((prev) => {
      return prev.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            x: event.target.x(),
            y: event.target.y(),
            scaleX: event.target.scaleX(),
            scaleY: event.target.scaleY(),
            rotation: event.target.rotation(),
          };
        }
        return element;
      });
    });
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
  };

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
          </Layer>
          {canvasElements.map((element) => {
            const methodAsFunction = new Function(
              "context",
              "shape",
              element.method
            );
            console.log(methodAsFunction);

            return (
              <Layer key={element.id}>
                {element.type === "shape" && (
                  <Shape
                    sceneFunc={(context, shape) =>
                      methodAsFunction(context, shape)
                    }
                    width={200}
                    // strokeWidth={4}
                    // stroke="black"
                    height={200}
                    x={100}
                    y={100}
                    fill="#00A1FF"
                    draggable
                    onClick={() => setSelectedObjId(element.id)}
                    onDragEnd={(event) =>
                      handleElementPosition(event, element.id)
                    }
                    onTransformEnd={(event) => {
                      handleElementTransform(event, element.id);
                    }}
                    ref={(node) => (shapeRefs.current[element.id] = node)}
                  />
                )}

                {["image", "photo", "template", "icon"].includes(
                  element.type
                ) && (
                  <Image
                    image={element.src}
                    width={element.width}
                    height={element.height}
                    x={element.x}
                    y={element.y}
                    draggable
                    onClick={() => setSelectedObjId(element.id)}
                    onDragEnd={(event) =>
                      handleElementPosition(event, element.id)
                    }
                    onTransformEnd={(event) =>
                      handleElementTransform(event, element.id)
                    }
                    ref={(node) => (imageRefs.current[element.id] = node)}
                  />
                )}

                {element.type === "text" && !element.isEditing && (
                  <Text
                    text={element.val}
                    fontFamily={element.fontStyle}
                    fontSize={element.size}
                    fill={element.color}
                    x={element.x}
                    y={element.y}
                    draggable
                    align="center"
                    onDragEnd={(event) =>
                      handleElementPosition(event, element.id)
                    }
                    onDblClick={() => handleTextDoubleClick(element.id)}
                    onClick={() => handleTextClick(element.id, element)}
                    onTransformEnd={(event) =>
                      handleElementTransform(event, element.id)
                    }
                    ref={(node) => (textRefs.current[element.id] = node)}
                  />
                )}
                {selectedId === element.id && textRefs.current[selectedId] && (
                  <Transformer
                    node={textRefs.current[selectedId]}
                    rotateEnabled
                    resizeEnabled
                    keepRatio={false}
                  />
                )}
                {selectedObjId === element.id &&
                  imageRefs.current[selectedObjId] && (
                    <Transformer
                      node={imageRefs.current[selectedObjId]}
                      rotateEnabled
                      resizeEnabled
                      keepRatio={false}
                    />
                  )}
                {selectedObjId === element.id &&
                  shapeRefs.current[selectedObjId] && (
                    <Transformer
                      node={shapeRefs.current[selectedObjId]}
                      rotateEnabled
                      resizeEnabled
                      keepRatio={false}
                    />
                  )}
              </Layer>
            );
          })}
        </Stage>
        {canvasElements.map((element) => (
          <React.Fragment key={element.id}>
            {element.type === "text" && element.isEditing && (
              <TextField
                variant="standard"
                defaultValue={element.val}
                autoFocus
                onBlur={(event) => handleTextInputBlur(event, element.id)}
                onKeyDown={(event) => handleTextInputKeyDown(event, element.id)}
                sx={{
                  position: "absolute",
                  top: `${element.y}px`,
                  left: `${element.x}px`,
                  padding: "0",
                  margin: "0",
                  border: "none",
                  background: "transparent",
                }}
                InputProps={{
                  disableUnderline: true,
                  style: {
                    fontSize: `${element.size}px`,
                    fontFamily: `${element.fontStyle}`,
                    color: element.color,
                  },
                }}
              />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Container>
  );
};

export default memo(TempCanvas);
