import { Box, Stack, Typography, Button } from "@mui/material";
import warm from "../../../static/jpgs/warm.jpg";
import cold from "../../../static/jpgs/cold.jpg";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useSnackbar } from "notistack";
import { ADAFRUIT_KEY } from "../../../env";

const socket = io("http://localhost:8000");

const BurglarBox = () => {
  const [data, setData] = useState();
  const fetchLight = async () => {
    axios
      .get(`https://io.adafruit.com/api/v2/Relax71/feeds/ttq-ct/data/last`, {
        headers: {
          "Content-Type": "application/json",
          "X-AIO-Key": `${ADAFRUIT_KEY}`,
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
    socket.on("ctUpdate", ({ ct }) => {
      console.log("haha");
      if (parseInt(ct) === 1) toast(`Chống trộm được bật`, "warning");
      setData(parseInt(ct));
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
        <Typography fontSize={"40px"}>{data}</Typography>
        <Typography fontSize={"20px"}>BURGLAR 1</Typography>
      </Stack>
    </Box>
  );
};

export default BurglarBox;
