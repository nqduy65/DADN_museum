import { Box, Typography, Stack, Button } from "@mui/material";
import Slider from "@mui/material/Slider";
import { AntSwitch } from "../CamBox";
import { useDispatch, useSelector } from "react-redux";
import { selectFan } from "../../../pages/Manage/selectors";

import { io } from "socket.io-client";
import { useEffect } from "react";
import dmanageSlice, { getFan, setFan } from "../../../pages/Manage/dmanage";
import { useSnackbar } from "notistack";

const FanBox = () => {
  const dispatch = useDispatch();
  const socket = io("http://localhost:8000");
  useEffect(() => {
    dispatch(getFan());

    socket.on("fanUpdate", ({ fan }) => {
      console.log("vo nay", fan);
      toast(`Quạt đã thay đổi mức ${fan}`);
      dispatch(dmanageSlice.actions.changeFan(fan));
    });
  }, []);

  const fandata = useSelector(selectFan);
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
    <Stack
      width={"368px"}
      height={"180px"}
      boxShadow={"0px 1px 2px rgba(0, 0, 0, 0.5)"}
      padding={"16px"}
      borderRadius={"25px"}
      gap={1}
    >
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={20} lineHeight={"140%"} fontWeight={500}>
          Quạt 1
        </Typography>
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
        >
          <Typography fontSize={20} lineHeight={"140%"} fontWeight={500}>
            On
          </Typography>
          <AntSwitch />
        </Box>
      </Box>
      <Stack
        width={"80%"}
        height={"80%"}
        borderRadius={"25px"}
        padding={"10px 35px"}
        gap={"20px"}
        sx={{
          background:
            "linear-gradient(208.53deg, rgba(94, 68, 255, 0.2) 0%, rgba(94, 68, 255, 0.2) 0.01%, rgba(184, 91, 174, 0.2) 60.61%, rgba(255, 110, 110, 0.2) 106.43%);",
        }}
      >
        <Box
          display="flex"
          alignItems={"flex-end"}
          gap={1}
          justifyContent={"flex-end"}
        >
          <Typography
            fontSize={"14px"}
            lineHeight={"140%"}
            fontWeight={500}
            color={"#4B36CC"}
          >
            Tự động
          </Typography>
          <AntSwitch />
        </Box>
        <Stack>
          <Typography fontSize={"14px"} lineHeight={"21px"} gap={1}>
            Tốc độ
          </Typography>
          <Slider
            value={parseInt(fandata.data.value)}
            disabled={fandata.status !== "idle"}
            aria-label="Default"
            onChange={(event, value) => {
              console.log(value);
              dispatch(setFan(value.toString()));
            }}
            valueLabelDisplay="auto"
            max={3}
            sx={{
              color: "black",
              "& .MuiSlider-track": {
                border: "none",
              },
              "& .MuiSlider-thumb": {
                width: 30,
                height: 30,
                backgroundColor: "#fff",
                borderRadius: "8px",
                "&:before": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  boxShadow: "none",
                },
              },
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FanBox;
