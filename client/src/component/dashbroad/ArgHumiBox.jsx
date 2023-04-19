import { Box, Typography, Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvgHumiThunk } from "../../pages/DashBroad/dashBroadSlice";
import { selectAvgHumi, selectAvgTemp } from "../../pages/DashBroad/selectors";

const ArgHumiBox = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("dispatching getAvgTempThunk");
    dispatch(getAvgHumiThunk());
  }, [dispatch]);
  const data = useSelector(selectAvgHumi);
  console.log(data);
  return (
    <Stack
      width={"264.97px"}
      height={"104.36px"}
      border={"1.05417px solid #E0E0E0"}
      borderRadius={"10px"}
      bgcolor={"#fff"}
      paddingLeft={1}
      paddingTop={1}
      gap={1}
    >
      <Typography
        fontSize={"15px"}
        lineHeight={"20px"}
        fontWeight={500}
        color="#809FB8"
      >
        Độ ẩm trung bình
      </Typography>
      <Typography
        fontWeight={700}
        fontSize={"23px"}
        lineHeight={"32px"}
        color="#6040EF"
        display={"flex"}
      >
        {data.data[0]} %
      </Typography>
      <Box display={"flex"} alignItems={"center"} gap={1}>
        <Typography
          fontWeight={400}
          fontSize={"21px"}
          lineHeight={"27px"}
          color="rgba(96, 64, 239, 1)"
        >
          {data.data[0] >= 0 && "+"}
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

export default ArgHumiBox;
