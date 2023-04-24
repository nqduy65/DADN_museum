import { Box, Stack, Typography, Switch } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { styled } from "@mui/material/styles";
import img from "~/static/svgs/fan.svg";
const IOSSwitch = styled((props) => (
  <Switch
    size="small"
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 41,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark" ? "#2ECA45" : "rgba(75, 54, 204, 1)",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 20,
    height: 20,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
const DeviceItem = ({ info, select, onClick }) => {
  return (
    <Box
      onClick={onClick}
      minWidth="290px"
      height="87px"
      backgroundColor={select === info.id ? "#DFDAFF" : "#F2FBFD"}
      boxShadow={select === info.id ? "0px 4px 4px rgba(0, 0, 0, 0.25);" : ""}
      borderRadius="20px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap={1}
      padding={1}
      sx={{
        cursor: "pointer",
        transition: "all ease-in-out 0.5s",
      }}
    >
      <ArrowBackIosIcon
        sx={{
          color: "rgba(75, 54, 204, 1)",
          opacity: select === info.id ? 1 : 0,
          transition: "all 0.25 ease-in-out",
        }}
      />
      <Stack gap={2}>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Typography
            fontWeight=" 600"
            fontSize="16px"
            lineHeight="140%"
            color="rgba(75, 54, 204, 1)"
          >
            {info.name}
          </Typography>
          <img src={img} alt="" />
        </Stack>
        <Typography
          fontWeight=" 600"
          fontSize="16px"
          lineHeight="140%"
          color="rgba(75, 54, 204, 1)"
        >
          Kết nối: {info.connected}
        </Typography>
      </Stack>
      <Stack
        gap={2}
        justifyContent={"flex-end"}
        alignItems={"flex-end"}
        justifySelf={"flex-end"}
      >
        <IOSSwitch defaultChecked size="small" />
        <Typography
          fontWeight=" 600"
          fontSize="16px"
          lineHeight="140%"
          color="rgba(75, 54, 204, 1)"
        >
          {info.auto && `Kết nối: ${info.auto}`}
        </Typography>
      </Stack>
    </Box>
  );
};

export default DeviceItem;
