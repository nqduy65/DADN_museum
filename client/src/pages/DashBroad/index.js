import { Box, Stack } from "@mui/material";
import ArgTempBox from "../../component/dashbroad/ArgTempBox";
import { useDispatch } from "react-redux";
import { getAvgTempThunk } from "./dashBroadSlice";
import { useEffect } from "react";
import ArgHumiBox from "../../component/dashbroad/ArgHumiBox";

const DashBroad = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("dispatching getAvgTempThunk");
    dispatch(getAvgTempThunk());
  }, [dispatch]);
  return (
    <Box margin={"50px 50px 50px"}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <ArgTempBox />
        <ArgHumiBox />
      </Stack>
    </Box>
  );
};

export default DashBroad;
