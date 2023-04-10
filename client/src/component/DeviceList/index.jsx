import { Box, Typography, Stack } from "@mui/material";
import DeviceItem from "../DeviceItem";
import { useState } from "react";
const DeviceList = () => {
  const [deviceSelect, setSelect] = useState();
  const data = {
    device: [
      { id: "1", name: "Quạt", connected: "5/5", auto: "5/5" },
      { id: "2", name: "Camera", connected: "5/5" },
      { id: "3", name: "Sensor nhiệt độ", connected: "5/5" },
      { id: "4", name: "Sensor độ ẩm", connected: "5/5" },
    ],
  };
  return (
    <Box>
      <Typography
        variant="h2"
        sx={{
          width: "100%",
          height: "34px",

          /* Nunito/Heading/24 - Bold */

          fontStyle: " normal;",
          fontWeight: 700,
          fontSize: "20px;",
          lineHeight: "140%;",
          /* identical to box height, or 34px */

          color: "#006C7F",
          padding: "24px",

          /* Inside auto layout */
        }}
      >
        Danh sách thiết bị
      </Typography>
      <Stack marginTop={"55px"} marginLeft={"55px"} gap={"36px"}>
        {data["device"].map((item) => (
          <DeviceItem
            info={item}
            select={deviceSelect}
            onClick={() => setSelect(item.id)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default DeviceList;
