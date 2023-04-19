import React, { useRef, useState } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
function Camera() {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const toggleCamera = () => {
    if (isCameraOn) {
      videoRef.current.pause();
      setIsCameraOn(false);
    } else {
      const constraints = { video: true };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          setIsCameraOn(true);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      height={"100%"}
    >
      <video
        ref={videoRef}
        className="camera-video"
        style={{ width: "100%", height: "100%" }}
      />
      <button onClick={toggleCamera}>
        {isCameraOn ? "Turn off camera" : "Turn on camera"}
      </button>
    </Box>
  );
}

export default Camera;
