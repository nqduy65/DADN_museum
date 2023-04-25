import { Box, Typography, Stack } from "@mui/material";
import MiniBox from "../MiniBox";
const RoomBox = ({ name, temp, humi, selected, onClick }) => {
  return (
    <Box
      width=" 323px;"
      height="129px;"
      backgroundColor={selected ? "#ECE9FF" : "#F2FBFD"}
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25);"
      borderRadius="0px 20px"
      paddingLeft="20px"
      flexShrink={0}
      onClick={onClick}
      sx={{
        transition: "all 0.5s ease-in-out",
      }}
      paddingTop={2}
    >
      <Typography
        variant="h3"
        sx={{
          fontStyle: "normal",
          fontWeight: 500,
          fontSize: "20px",
          lineHeight: "30px",
          /* identical to box height */

          color: "#4B36CC",
        }}
      >
        {name}
      </Typography>
      <Stack direction={"row"} gap={1} marginTop={1}>
        <MiniBox type="temp" num={temp} />
        <MiniBox type="humi" num={humi} />
      </Stack>
    </Box>
  );
};

export default RoomBox;
