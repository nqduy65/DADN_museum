import { Box, Typography, Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvgDeviceThunk } from "../../pages/DashBroad/dashBroadSlice";
import {
  selectAvgDevice,
  selectAvgHumi,
  selectAvgTemp,
} from "../../pages/DashBroad/selectors";

const ArgDeviceBox = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAvgDeviceThunk());
  }, []);
  const data = useSelector(selectAvgDevice);
  return (
    <Stack
      width={"20%"}
      height={"104.36px"}
      border={"1.05417px solid #E0E0E0"}
      borderRadius={"10px"}
      bgcolor={"#fff"}
      paddingLeft={1}
      paddingTop={1}
      gap={1}
      boxShadow={"inset 0px 4px 4px rgba(0, 0, 0, 0.25)"}
    >
      <Typography
        fontSize={"15px"}
        lineHeight={"20px"}
        fontWeight={500}
        color="#809FB8"
      >
        Số lượng thiết bị
      </Typography>
      <Typography
        fontWeight={700}
        fontSize={"23px"}
        lineHeight={"32px"}
        color="#6040EF"
        display={"flex"}
      >
        {data.data[0]}
      </Typography>
      <Box display={"flex"} alignItems={"center"} gap={1}>
        <Typography
          fontWeight={400}
          fontSize={"21px"}
          lineHeight={"27px"}
          color="#E6713E"
        >
          {data.data[0] >= 0 && "+"}
          {data.data[1]}
        </Typography>
        <Typography
          fontWeight={400}
          fontSize={"16px"}
          lineHeight={"22px"}
          color="rgba(130, 130, 130, 1)"
        >
          Trong tháng này
        </Typography>
      </Box>
    </Stack>
  );
};

export default ArgDeviceBox;
