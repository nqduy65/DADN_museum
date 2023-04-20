import { Box, Stack, Typography } from "@mui/material";
import ArgTempBox from "../../component/dashbroad/ArgTempBox";
import { useDispatch } from "react-redux";
import { getAvgTempThunk } from "./dashBroadSlice";
import { useEffect, useState } from "react";
import ArgHumiBox from "../../component/dashbroad/ArgHumiBox";
import ArgDeviceBox from "../../component/dashbroad/ArgDeviceBox";
import ArgNotification from "../../component/dashbroad/ArgNotification";
import ArgUserLog from "../../component/dashbroad/ArgUserLog";
import MyResponsiveLine from "../../component/dashbroad/MyResponsiveLine ";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const DashBroad = () => {
  const [value, setValue] = useState("3");

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("dispatching getAvgTempThunk");
    dispatch(getAvgTempThunk());
  }, []);
  return (
    <Box margin={"50px 100px 50px 50px"}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <ArgTempBox />
        <ArgHumiBox />
        <ArgDeviceBox />
        <ArgDeviceBox />
      </Stack>
      <Box
        mt={5}
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bgcolor={"#FFF"}
        borderRadius={"10.5417px"}
        position={"relative"}
        paddingTop={"100px"}
      >
        <FormControl
          sx={{
            m: 1,
            minWidth: 120,
            position: "absolute",
            left: "20%",
            top: 0,
            pointerEvents: "auto",
          }}
        >
          <InputLabel id="demo-simple-select-helper-label">Sensor</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={value}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={1}>Độ ẩm</MenuItem>
            <MenuItem value={2}>Nhiệt độ</MenuItem>
            <MenuItem value={3}>Cả hai</MenuItem>
          </Select>
          <FormHelperText>Chọn độ ẩm hay nhiệt độ</FormHelperText>
        </FormControl>
        <Typography
          fontWeight={400}
          fontSize={"14px"}
          lineHeight={"19px"}
          sx={{ position: "absolute", top: 10, left: "50%" }}
        >
          Biểu đồ biến thiên nhiệt độ và độ ẩm trong 24h qua
        </Typography>
        <Box width="90%" height={"500px"}>
          <MyResponsiveLine value={value} />
        </Box>
      </Box>
      <Stack direction={"row"} justifyContent={"space-between"} mt={"50px"}>
        <ArgNotification />
        <ArgUserLog />
      </Stack>
    </Box>
  );
};

export default DashBroad;
