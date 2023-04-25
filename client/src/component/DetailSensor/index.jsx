import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { selectDeviceDetail } from "../../pages/Main/selectors";
import LinearProgress from "@mui/material/LinearProgress";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const style = {
  position: "relative",
  width: "100%",
  height: "80%",
  background: "transparent",
  paddingInline: "10px",
  "&.MuiDataGrid-virtualScroller ::-webkit-scrollbar": {
    display: "none",
  },
};
const theme = createTheme({
  palette: {
    primary: {
      main: "#1e88e5", // Thiết lập màu sắc cho primary
    },
    secondary: {
      main: "#1e88e5", // Thiết lập màu sắc cho secondary
    },
  },
});
const DetailSensor = () => {
  const DeviceDetail = useSelector(selectDeviceDetail);
  const columns = [
    { field: "id", headerName: "Mã" },
    {
      field: "room",
      headerName: "Phòng",
      flex: 1,
    },
    {
      field: "device",
      headerName: "Tên thiết bị",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "value",
      headerName: "Giá trị",
      flex: 1,
      renderCell: ({ row: { value } }) => {
        return (
          <Typography
            color={value === "Active" ? "red" : "green"}
            sx={{ ml: "5px" }}
            fontSize={15}
          >
            {value}
          </Typography>
        );
      },
    },
    {
      field: "time",
      headerAlign: "center",
      headerName: "Record at",
      type: "number",
      align: "center",
      flex: 1,
      renderCell: ({ row: { time } }) => {
        return (
          <Typography
            sx={{ ml: "5px" }}
            color={time > 50 ? "red" : "black"}
            fontSize={10}
          >
            {time}
          </Typography>
        );
      },
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <Box
        width="789px"
        height=" 556px"
        boxShadow="inset 0px 4px 4px rgba(0, 0, 0, 0.25);"
        borderRadius="25px;"
      >
        <Typography
          variant="h2"
          sx={{
            width: "100%",
            height: "85px",

            /* Nunito/Heading/24 - Bold */

            fontStyle: " normal;",
            fontWeight: 700,
            fontSize: "28px;",
            lineHeight: "140%;",
            /* identical to box height, or 34px */

            color: "#006C7F",
            padding: "24px",

            /* Inside auto layout */
          }}
        >
          Danh sách sensor
        </Typography>
        <Box sx={style}>
          <DataGrid
            autoHeight={true}
            rows={DeviceDetail.infos}
            columns={columns}
            hideScrollbar={true}
            loading={DeviceDetail.status === "pending"}
            loadingOverlay={<LinearProgress />}
            components={{
              LoadingOverlay: LinearProgress,
            }}
            loadIcon={<LinearProgress sx={{ backgroundColor: "#FF0000" }} />}
            sx={{
              fontSize: "15px",
              boxShadow:
                "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.2);",
              borderRadius: "4px",
              "&.virtualScrollerContent": {
                color: "white",
              },
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DetailSensor;
