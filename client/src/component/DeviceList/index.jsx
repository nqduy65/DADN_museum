import { Box, Typography, Stack } from "@mui/material";
import DeviceItem from "../DeviceItem";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import { useDispatch, useSelector } from "react-redux";
import { selectDeviceInfos } from "../../pages/Main/selectors";
import { updateDevDetail } from "../../pages/Main/mainSlice";
const DeviceList = () => {
  const dispatch = useDispatch();
  let deviceInfos = useSelector(selectDeviceInfos);
  console.log(deviceInfos);
  const [deviceSelect, setSelect] = useState();
  return (
    <Box
      sx={{
        position: "relative",
        opacity: deviceInfos.status === "pending" && "0.6",
      }}
    >
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
          {deviceInfos.infos.map((item) => (
            <DeviceItem
              info={item}
              select={deviceSelect}
              onClick={() => {
                setSelect(item.id);
                dispatch(updateDevDetail(item.name));
              }}
            />
          ))}
        </Stack>
      </Box>
      {deviceInfos.status === "pending" && (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
};

export default DeviceList;
