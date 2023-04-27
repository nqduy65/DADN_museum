import { Box, Typography, Stack } from "@mui/material";
import TempBox from "../TempBox";
import HumiBox from "../HumiBox";
import LightBox from "../LightBox";
import BurglarBox from "../BurglarBox";

const BurglarSection = () => {
  return (
    <Stack
      width={"100%"}
      backgroundColor={"#FFFFFF"}
      boxShadow={"inset 0px 4px 4px rgba(0, 0, 0, 0.25)"}
      borderRadius={"25px"}
      padding={"24px 40px"}
      gap={1}
      alignItems={"center"}
    >
      <Typography
        fontWeight={700}
        fontSize={"28px"}
        lineHeight={"140%"}
        color={"#006C7F"}
      >
        Sensor Chống trộm
      </Typography>
      <BurglarBox />
    </Stack>
  );
};

export default BurglarSection;
