import { Box, Stack, Typography, Button } from "@mui/material";
import warm from "../../../static/jpgs/warm.jpg";
import cold from "../../../static/jpgs/cold.jpg";
import styles from "./style.module.css";

import { io } from "socket.io-client";
import { useEffect } from "react";
import dmanageSlice, { getHumi } from "../../../pages/Manage/dmanage";
import { useSnackbar } from "notistack";
import { selectHumi } from "../../../pages/Manage/selectors";
import { useDispatch, useSelector } from "react-redux";

const HumiBox = () => {
  const dispatch = useDispatch();
  const socket = io("http://localhost:8000");
  useEffect(() => {
    dispatch(getHumi());

    socket.on("temperatureUpdate", ({ temperature }) => {
      console.log("vo nay", temperature);
      toast(`Nhiệt độ thay đổi đã thay đổi mức ${temperature}`);
      dispatch(dmanageSlice.actions.changeTemp(temperature));
    });
  }, []);

  const humiData = useSelector(selectHumi);
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
        <Typography fontSize={"40px"}>{humiData.data.value} %</Typography>
        <Typography fontSize={"20px"}>{humiData.data.device}</Typography>
      </Stack>
    </Box>
  );
};

export default HumiBox;
