import { Box, Typography, Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvgNotiThunk } from "../../pages/DashBroad/dashBroadSlice";
import { selectAvgTemp, selectNofi } from "../../pages/DashBroad/selectors";
import ArgNotiMess from "./ArgNotiMess";

const ArgNotification = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("dispatching getAvgTempThunk");
    dispatch(getAvgNotiThunk());
  }, [dispatch]);
  const data = useSelector(selectNofi);
  console.log(data);
  return (
    <Stack
      width={"25%"}
      border={"1.05417px solid #E0E0E0"}
      borderRadius={"10px"}
      bgcolor={"#fff"}
      paddingLeft={2}
      paddingTop={2}
      paddingBottom={1}
      gap={5}
      alignItems={"flex-start"}
    >
      <Typography fontSize={"20px"} fontWeight={500} lineHeight={"140%"}>
        Thông báo
      </Typography>
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
          <ArgNotiMess
            feed={item.feed}
            updatedAt={item.updatedAt}
            content={item.content}
          />
        ))}
      </Box>
    </Stack>
  );
};

export default ArgNotification;
