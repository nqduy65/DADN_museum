import { Box, Typography, Stack } from "@mui/material";
import RoomBox from "../../component/RoomBox";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DetailSensor from "../../component/DetailSensor";
import DeviceList from "../../component/DeviceList";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrRoom, selectRoomInfos } from "./selectors";
import mainSlice, { updateDevices, updateRooms } from "./mainSlice";
import { useEffect } from "react";
const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // eslint-disable-next-line
    dispatch(updateRooms());
  }, [dispatch]);
  const currRoom = useSelector(selectCurrRoom);
  const roomInfos = useSelector(selectRoomInfos);
  const handleChangeRoom = (roomName) => {
    dispatch(mainSlice.actions.changeRoom(roomName));
    dispatch(updateDevices(roomName));
  };
  console.log(currRoom);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowForwardIosIcon />,
    prevArrow: <ArrowBackIosIcon />,
  };
  return (
    <Stack margin={"14.05px 55px 100px 53.62px"} gap={2}>
      {/*    Room section  */}
      <Box>
        <Typography
          variant="h2"
          sx={{
            width: " 77px;",
            height: "34px;",

            /* Nunito/Heading/24 - Bold */

            fontStyle: " normal;",
            fontWeight: 700,
            fontSize: "24px;",
            lineHeight: "140%;",
            /* identical to box height, or 34px */

            color: "#211859;",

            /* Inside auto layout */
          }}
        >
          Rooms
        </Typography>
        <Box
          marginTop={"10px"}
          flexDirection={"row"}
          alignItems={"center"}
          gap="40px"
          width="1531.39px"
          height="auto"
          backgroundColor="#FFFFFF;"
          borderRadius="20px;"
          paddingInline="100px"
          paddingBlock="23px"
          sx={{
            "& .slick-list ": {
              // overflow: "visible",
              margin: " 0 -1px;",
              padding: " 5px;",
            },
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          <Slider {...settings}>
            {roomInfos.map((info) => (
              <RoomBox
                name={info.name}
                temp={info.temp}
                humi={info.humi}
                selected={info.name === currRoom}
                onClick={() => handleChangeRoom(info.name)}
              />
            ))}
          </Slider>
        </Box>
      </Box>
      {/* Detail section */}
      <Box marginTop={"8px"}>
        <Typography
          variant="h2"
          sx={{
            width: " 100px;",
            height: "34px;",

            /* Nunito/Heading/24 - Bold */

            fontStyle: " normal;",
            fontWeight: 700,
            fontSize: "24px;",
            lineHeight: "140%;",
            /* identical to box height, or 34px */

            color: "#211859;",

            /* Inside auto layout */
          }}
        >
          Chi tiết
        </Typography>
        <Box
          marginTop={"27px"}
          width={"100%"}
          height="600px"
          backgroundColor="#FFF"
          borderRadius={"25px"}
          sx={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
        >
          <Stack direction={"row"} sx={{ padding: "19px 19px 19px 43px" }}>
            <DetailSensor />
            <DeviceList />
          </Stack>
        </Box>
      </Box>
    </Stack>
  );
};

export default Main;
