import { Box, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
export const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "rgba(75, 54, 204, 1)",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
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

const CamBox = () => {
  return (
    <Stack
      width={"368px"}
      height={"281px"}
      boxShadow={"0px 1px 2px rgba(0, 0, 0, 0.5)"}
      borderRadius={"25px"}
      padding={"16px"}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        margin={"10px 5px"}
      >
        <Typography fontSize={"20px"} fontWeight={500} lineHeight={"140%"}>
          Camera 1
        </Typography>
        <AntSwitch sx={{ justifySelf: "flex-end" }} />
      </Box>
      <Box
        width={"100%"}
        height={"285px"}
        sx={{
          backgroundImage:
            "linear-gradient(208.53deg, rgba(94, 68, 255, 0.2) 0%, rgba(94, 68, 255, 0.2) 0.01%, rgba(184, 91, 174, 0.2) 60.61%, rgba(255, 110, 110, 0.2) 106.43%)",
        }}
        borderRadius={"25px"}
      ></Box>
    </Stack>
  );
};

export default CamBox;
