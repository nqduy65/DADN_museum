import { Box, Stack, Typography, Button } from "@mui/material";
import warm from "../../../static/jpgs/warm.jpg";
import cold from "../../../static/jpgs/cold.jpg";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { useSnackbar } from "notistack";
import { ADAFRUIT_KEY } from "../../../env";
import { AntSwitch } from "../CamBox";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
const socket = io("http://localhost:8000");

export const StyledSwitch = styled(Switch)(({ theme }) => ({
  width: 55,
  height: 30,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 30,
      height: 25,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "rgba(75, 54, 204, 1)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 30,
    height: 25,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));
const PumpBox = () => {
  const [data, setData] = useState();
  const fetchPump = async () => {
    axios
      .get(`https://io.adafruit.com/api/v2/Relax71/feeds/ttq-pump/data/last`, {
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

  const handleChangeSlider = async (event) => {
    const { data } = await axios
      .post(
        `https://io.adafruit.com/api/v2/Relax71/feeds/ttq-pump/data`,
        {
          value: +event.target.checked,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-AIO-Key": `${ADAFRUIT_KEY}`,
          },
        }
      )
      .catch((err) => {
        toast(`Không thể  thay đổi quạt mức bơm`, "error");
      });
    if (data) {
      toast(`Đã thay đổi bơm  ${data.value}`, "success");
      console.log(data.value);
      setData(data.value);
    } else {
    }
  };

  useEffect(() => {
    fetchPump();
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
      padding={"5px 5px"}
      borderRadius={"20px"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      boxShadow="0px 2px 5px rgba(0, 0, 0, 0.25), inset 0px 0px 1px rgba(0, 0, 0, 0.25);"
      backgroundColor="#818181"
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
        gap={1}
      >
        <StyledSwitch
          value={data}
          onChange={(e) => {
            handleChangeSlider(e);
          }}
        />
        <Typography fontSize={"20px"}>Light 1</Typography>
      </Stack>
    </Box>
  );
};

export default PumpBox;
