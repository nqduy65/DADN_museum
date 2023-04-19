import { Box, Stack } from "@mui/material";
import ArgTempBox from "../../component/dashbroad/ArgTempBox";
import { useDispatch } from "react-redux";
import { getAvgTempThunk } from "./dashBroadSlice";
import { useEffect } from "react";
import ArgHumiBox from "../../component/dashbroad/ArgHumiBox";
import ArgDeviceBox from "../../component/dashbroad/ArgDeviceBox";
import ArgNotification from "../../component/dashbroad/ArgNotification";
import ArgUserLog from "../../component/dashbroad/ArgUserLog";
import MyResponsiveLine, {
  data,
} from "../../component/dashbroad/MyResponsiveLine ";

const DashBroad = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("dispatching getAvgTempThunk");
    dispatch(getAvgTempThunk());
  }, [dispatch]);
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
      >
        <Box width="90%" height={"500px"}>
          <MyResponsiveLine data={data} />
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
