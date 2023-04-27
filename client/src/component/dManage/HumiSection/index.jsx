import { Box, Typography, Stack } from "@mui/material";
import TempBox from "../TempBox";
import HumiBox from "../HumiBox";

const HumiSection = () => {
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
        Sensor độ ẩm
      </Typography>
      <HumiBox />
    </Stack>
  );
};

export default HumiSection;
