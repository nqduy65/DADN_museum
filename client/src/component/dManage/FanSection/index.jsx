import { Box, Typography } from "@mui/material";
import CamBox from "../CamBox";
import FanBox from "../FanBox";

const FanSection = () => {
  return (
    <Box
      width={"100%"}
      backgroundColor={"#FFFFFF"}
      boxShadow={"inset 0px 4px 4px rgba(0, 0, 0, 0.25)"}
      borderRadius={"25px"}
      padding={"24px 40px"}
    >
      <Typography
        fontWeight={700}
        fontSize={"28px"}
        lineHeight={"140%"}
        color={"#006C7F"}
      >
        Danh sách quạt
      </Typography>
      <FanBox />
    </Box>
  );
};

export default FanSection;
