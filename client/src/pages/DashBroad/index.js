import { Box, Stack } from "@mui/material";
import ArgTempBox from "../../component/dashbroad/ArgTempBox";
import { useDispatch } from "react-redux";
import { getAvgTempThunk } from "./dashBroadSlice";
import { useEffect } from "react";
import ArgHumiBox from "../../component/dashbroad/ArgHumiBox";
import ArgDeviceBox from "../../component/dashbroad/ArgDeviceBox";
import ArgNotification from "../../component/dashbroad/ArgNotification";
import ArgUserLog from "../../component/dashbroad/ArgUserLog";

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
      <Stack direction={"row"} justifyContent={"space-between"} mt={"100px"}>
        <ArgNotification />
        <ArgUserLog />
      </Stack>
    </Box>
  );
};

export default DashBroad;
