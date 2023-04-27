import { Box, Stack, Typography } from "@mui/material";
import DeviceThermostatOutlinedIcon from "@mui/icons-material/DeviceThermostatOutlined";
import OpacityOutlinedIcon from "@mui/icons-material/OpacityOutlined";
const MiniBox = ({ type, num }) => {
  return (
    <Box
      width="160px;"
      height="48px;"
      sx={{
        backgroundImage:
          type === "temp"
            ? "linear-gradient(89.21deg, #FABDBD 5.45%, #FDC7A0 101.87%)"
            : "#C2DEF2",
        backgroundColor: type !== "temp" ? "#C2DEF2" : "white",
      }}
      boxShadow="0px 2px 5px rgba(0, 0, 0, 0.25), inset 0px 0px 1px rgba(0, 0, 0, 0.25);"
      borderRadius="20px;"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack direction="row" justifyContent={"center"} alignItems={"center"}>
        {type == "temp" ? (
          <DeviceThermostatOutlinedIcon color={"error"} fontSize="large" />
        ) : (
          <OpacityOutlinedIcon color={"info"} fontSize="large" />
        )}
        <Typography
          sx={{
            fontStyle: "normal;",
            fontWeight: 400,
            fontSize: "12px;",
            lineHeight: "14px;",
          }}
        >
          {type == "temp" ? "Nhiệt độ" : "Độ ẩm"}
        </Typography>
        <Typography
          sx={{
            marginLeft: "8px",
            fontStyle: "normal;",
            fontWeight: 700,
            fontSize: "20px;",
            lineHeight: "23px;",
            color: "#263660",
          }}
        >
          {num}
        </Typography>
        {type === "temp" ? (
          <Box display="flex" flexDirection={"row"}>
            <Typography
              sx={{
                fontStyle: "normal;",
                fontWeight: 400,
                fontSize: "11px;",
                lineHeight: "15px;",
                color: "#263660",
                transform: "translateY(-4px)",
              }}
            >
              o
            </Typography>
            <Typography
              sx={{
                fontStyle: "normal;",
                fontWeight: 700,
                fontSize: "15px;",
                lineHeight: "20px;",
                color: "#263660",
                transform: "translate(3px,-2px)",
              }}
            >
              c
            </Typography>
          </Box>
        ) : (
          <Box>
            <Typography
              sx={{
                fontStyle: "normal;",
                fontWeight: 400,
                fontSize: "11px;",
                lineHeight: "15px;",
                color: "#263660",
                transform: "translateY(-4px)",
                transform: "translate(3px,-2px)",
              }}
            >
              %
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default MiniBox;
