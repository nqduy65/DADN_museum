import { Box, Typography, Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvgTempThunk } from "../../pages/DashBroad/dashBroadSlice";
import { selectAvgTemp } from "../../pages/DashBroad/selectors";
import React from "react";
const ArgTempBox = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("dispatching getAvgTempThunk");
    dispatch(getAvgTempThunk());
  }, []);
  const data = useSelector(selectAvgTemp);
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
      sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
    >
      <Typography
        fontSize={"15px"}
        lineHeight={"20px"}
        fontWeight={500}
        color="#809FB8"
      >
        Nhiệt độ trung bình
      </Typography>
      <Typography
        fontWeight={700}
        fontSize={"23px"}
        lineHeight={"32px"}
        color="rgba(247, 14, 70, 1)"
        display={"flex"}
      >
        {data.data[0]}
        <Typography fontSize={"12px"}>o</Typography>C
      </Typography>
      <Box display={"flex"} alignItems={"center"} gap={1}>
        <Typography
          fontWeight={400}
          fontSize={"21px"}
          lineHeight={"27px"}
          color="rgba(147, 15, 252, 1)"
        >
          {data.data[1] >= 0 && "+"}
          {data.data[1]} %
        </Typography>
        <Typography
          fontWeight={400}
          fontSize={"16px"}
          lineHeight={"22px"}
          color="rgba(130, 130, 130, 1)"
        >
          So với hôm qua
        </Typography>
      </Box>
    </Stack>
  );
};

export default ArgTempBox;
