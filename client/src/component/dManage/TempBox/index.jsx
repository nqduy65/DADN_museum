import { Box, Stack, Typography, Button } from "@mui/material";
import warm from "../../../static/jpgs/warm.jpg";
import cold from "../../../static/jpgs/cold.jpg";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useEffect } from "react";
import dmanageSlice, { getTemp } from "../../../pages/Manage/dmanage";
import { useSnackbar } from "notistack";
import { selectTemp } from "../../../pages/Manage/selectors";

const TempBox = () => {
  const dispatch = useDispatch();
  const socket = io("http://localhost:8000");
  useEffect(() => {
    dispatch(getTemp());

    socket.on("temperatureUpdate", ({ temperature }) => {
      console.log("vo nay", temperature);
      toast(`Nhiệt độ thay đổi đã thay đổi mức ${temperature}`);
      dispatch(dmanageSlice.actions.changeTemp(temperature));
    });
  }, []);

  // const fandata = useSelector(selectFan);
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

  const tempData = useSelector(selectTemp);
  return (
    <Box
      className={styles.tempBox}
      width={"300px"}
      height={"200px"}
      bgcolor={"black"}
      sx={{
        background: `url(${warm})`,
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
        <Typography fontSize={"40px"}>{tempData.data.value} °c</Typography>
        <Typography fontSize={"20px"}>{tempData.data.device}</Typography>
      </Stack>
    </Box>
  );
};

export default TempBox;
