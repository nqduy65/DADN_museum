import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { mockDataTeam } from "../../data/mockData";
const style = {
  position: "relative",
  width: "100%",
  height: "80%",
  background: "transparent",
  pl: "100px",
  pr: "100px",
  "&.MuiDataGrid-virtualScroller ::-webkit-scrollbar": {
    display: "none",
  },
};

const DetailSensor = () => {
  const columns = [
    { field: "id", headerName: "Mã thiết thị" },
    {
      field: "name",
      headerName: "Phòng",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Tên thiết bị",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Giá trị",
      flex: 1,
      renderCell: ({ row: { phone } }) => {
        return (
          <Typography
            color={phone === "Active" ? "red" : "green"}
            sx={{ ml: "5px" }}
          >
            {phone}
          </Typography>
        );
      },
    },
    {
      field: "access",
      headerAlign: "center",
      headerName: "Record at",
      type: "number",
      align: "center",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Typography
            sx={{ ml: "5px" }}
            color={access > 50 ? "#FFE600" : "black"}
          >
            {access} ms
          </Typography>
        );
      },
    },
  ];
  return (
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
          rows={mockDataTeam}
          columns={columns}
          hideScrollbar={true}
          sx={{
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
  );
};

export default DetailSensor;
