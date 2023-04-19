import { Box, Typography, Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAvgNotiThunk,
  getAvgUserLogThunk,
} from "../../pages/DashBroad/dashBroadSlice";
import { selectNofi, selectUserLog } from "../../pages/DashBroad/selectors";
import ArgLogBox from "./ArgLogBox";

const ArgUserLog = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("dispatching getAvgTempThunk");
    dispatch(getAvgUserLogThunk());
  }, [dispatch]);
  const data = useSelector(selectUserLog);
  console.log(data);
  return (
    <Stack
      width={"25%"}
      border={"1.05417px solid #E0E0E0"}
      borderRadius={"10px"}
      bgcolor={"#fff"}
      paddingLeft={2}
      paddingRight={5}
      paddingTop={2}
      paddingBottom={10}
      gap={3}
      alignItems={"flex-start"}
    >
      <Typography fontSize={"20px"} fontWeight={500} lineHeight={"140%"}>
        Truy cập gần đây
      </Typography>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
      >
        <Typography
          fontWeight={500}
          lineHeight={"30px"}
          fontSize={"20px"}
          color="#94918A"
        >
          Nhân viên
        </Typography>
        <Typography
          fontWeight={500}
          lineHeight={"30px"}
          fontSize={"20px"}
          color="#94918A"
          sx={{ justifySelf: "end" }}
        >
          Thời gian
        </Typography>
      </Box>
      <Box
        width={"100%"}
        maxHeight={"300px"}
        sx={{
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {data.data.map((item) => (
          <ArgLogBox
            name={item.name}
            role={item.role}
            updatedAt={item.updatedAt}
          />
        ))}
      </Box>
    </Stack>
  );
};

export default ArgUserLog;
