import { Box, Typography, Stack } from "@mui/material";
import CamBox from "../CamBox";
import FanBox from "../FanBox";

const FanSection = () => {
  return (
    <Stack
      width={"100%"}
      backgroundColor={"#FFFFFF"}
      boxShadow={"inset 0px 4px 4px rgba(0, 0, 0, 0.25)"}
      borderRadius={"25px"}
      padding={"24px 40px"}
      gap={1}
    >
      <Typography
        fontWeight={700}
        fontSize={"28px"}
        lineHeight={"140%"}
        color={"#006C7F"}
      >
        Danh sách quạt
      </Typography>
      <Stack direction={"row"}>
        <FanBox />
      </Stack>
    </Stack>
  );
};

export default FanSection;
