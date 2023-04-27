import { Box, Stack, Typography, Button } from "@mui/material";
import warm from "../../../static/jpgs/warm.jpg";
import cold from "../../../static/jpgs/cold.jpg";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useSnackbar } from "notistack";
const socket = io("http://localhost:8000");
const LightBox = () => {
  const [data, setData] = useState();
  const fetchLight = async () => {
    axios
      .get(`https://io.adafruit.com/api/v2/Relax71/feeds/ttq-light/data/last`, {
        headers: {
          "Content-Type": "application/json",
          "X-AIO-Key": `aio_OucE008IMr60Q4wWMFXwyT2GibSR`,
        },
      })
      .then(({ data }) => {
        console.log("HAHAHAHA", data.value);
        setData(data.value);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchLight();
    socket.on("lightUpdate", ({ light }) => {
      console.log("haha");
      toast(`Độ chiếu sáng thay đổi ${light} %`, "warning");
      setData(parseInt(light));
    });
  }, []);

  const toast = (message, variantType) => {
    enqueueSnackbar(message, {
      variant: variantType,
      action: (key) => (
        <Button
          style={{ fontSize: "12px", fontWeight: "600", color: "white" }}
          size="small"
          onClick={() => closeSnackbar(key)}
        >
          Dismiss
        </Button>
      ),
    });
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Box
      className={styles.tempBox}
      width={"300px"}
      height={"200px"}
      bgcolor={"black"}
      sx={{
        background: `url(${cold})`,
        // backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      padding={"5px 5px"}
      borderRadius={"20px"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      boxShadow="0px 2px 5px rgba(0, 0, 0, 0.25), inset 0px 0px 1px rgba(0, 0, 0, 0.25);"
    >
      <Stack
        sx={{
          backgroundColor: " rgba(255, 255, 255, 0.5)",
          borderRadius: " 15px",

          boxShadow: "0px 5px rgba(0, 0, 0, 0.2);",

          color: " #313131;",
          fontSize: "50px;",
          height: "80%",
          width: "80%",
        }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography fontSize={"40px"}>{data} %</Typography>
        <Typography fontSize={"20px"}>Light 1</Typography>
      </Stack>
    </Box>
  );
};

export default LightBox;
