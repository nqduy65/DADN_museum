import { Box, Typography, Stack } from "@mui/material";
import CamBox from "../CamBox";

const CamSection = () => {
  return (
    <Stack
      width={"100%"}
      backgroundColor={"#FFFFFF"}
      boxShadow={"inset 0px 4px 4px rgba(0, 0, 0, 0.25)"}
      borderRadius={"25px"}
      padding={"24px 40px"}
      gap={1}
      justifyContent={"center"}
    >
      <Typography
        fontWeight={700}
        fontSize={"28px"}
        lineHeight={"140%"}
        color={"#006C7F"}
      >
        Camera
      </Typography>
      <Stack direction={"row"}>
        <CamBox />
      </Stack>
    </Stack>
  );
};

export default CamSection;
