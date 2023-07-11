import React, { useRef, useState } from "react";
import { Box, Container, TextField } from "@mui/material";
import { Stage, Layer, Rect, Text, Transformer, Image } from "react-konva";

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
}) => {
  const textRefs = useRef({});
  const [selectedImageId, setSelectedImageId] = useState(null);
  const imageRefs = useRef({});

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

  const handleTextClick = (id, item) => {
    setStyle(item.fontStyle);
    setSelectedId(id);
    setTextSize(item.size);
    setTextColor(item.color);
  };

  const handleStageClick = () => {
    setSelectedId(null);
    setSelectedImageId(null);
    setStyle("");
    setTextSize("");
    setTextColor("");
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
            {images.map((image) => (
              <React.Fragment key={image.id}>
                <Image
                  image={image.src}
                  width={image.width * 0.15}
                  height={image.height * 0.15}
                  x={100}
                  y={100}
                  draggable
                  onClick={() => setSelectedImageId(image.id)}
                  onTransformEnd={(event) =>
                    handleImageTransform(event, image.id)
                  }
                  ref={(node) => (imageRefs.current[image.id] = node)}
                />
                {selectedImageId === image.id &&
                  imageRefs.current[selectedImageId] && (
                    <Transformer
                      node={imageRefs.current[selectedImageId]}
                      rotateEnabled
                      resizeEnabled
                      keepRatio={false}
                    />
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
    </Container>
  );
};

export default Canvas;
