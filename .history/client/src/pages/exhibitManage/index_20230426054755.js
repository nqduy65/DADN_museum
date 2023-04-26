import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import React from "react";
const style = {
  position: "relative",
  width: "100%",
  height: "80vh",
  background: "transparent",
  paddingInline: "10px",
  "&.MuiDataGrid-virtualScroller ::-webkit-scrollbar": {
    display: "none",
  },
};

//Mockdata
const columns = [
  { field: "id", headerName: "Mã hiện vật", width: 90, flex: 0.5 },
  {
    field: "exhibitName",
    headerName: "Tên hiện vật",
    flex: 1,
    minWidth: 150,
    editable: true,
  },
  {
    field: "room",
    headerName: "Phòng",
    flex: 1,
    minWidth: 150,
    editable: true,
  },
  {
    field: "locate",
    headerName: "Vị trí",
    flex: 1,
    // type: 'number',
    minWidth: 150,
    editable: true,
  },
  {
    field: "action",
    headerName: "Action",
    flex: 1,
    minWidth: 150,
    renderCell: (cellValues) => {
      return (
        <Box display="flex" justifyContent="space-between" gap={1}>
          <Button
            variant="contained"
            color="primary"
            sx={{ minWidth: "30px" }}
            onClick={(event) => {
              console.log(event);
              // handleOnClick(event, cellValues);
            }}
          >
            Sửa
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ minWidth: "30px" }}
            onClick={(event) => {
              handleOnClick(event, cellValues);
            }}
          >
            Xóa
          </Button>
        </Box>
      );
    },
  },
];

const rows = [
  { id: 1, exhibitName: "Tranh sơn dầu", room: "1", locate: "A" },
  { id: 2, exhibitName: "Tranh phong thủy", room: "1", locate: "B" },
  { id: 3, exhibitName: "Tranh đá", room: "1", locate: "C" },
  { id: 4, exhibitName: "Tranh Monalisa", room: "1", locate: "D" },
  { id: 5, exhibitName: "Tranh thủ", room: "1", locate: "D" },
  { id: 6, exhibitName: "Tranh phong cảnh", room: "1", locate: "E" },
  { id: 7, exhibitName: "Clifford", room: "1", locate: "G" },
  { id: 8, exhibitName: "Frances", room: "1", locate: "H" },
  { id: 9, exhibitName: "Roxie", room: "1", locate: "F" },
  { id: 1, exhibitName: "Tranh sơn dầu", room: "1", locate: "A" },
  { id: 2, exhibitName: "Tranh phong thủy", room: "1", locate: "B" },
  { id: 3, exhibitName: "Tranh đá", room: "1", locate: "C" },
  { id: 4, exhibitName: "Tranh Monalisa", room: "1", locate: "D" },
  { id: 5, exhibitName: "Tranh thủ", room: "1", locate: "D" },
  { id: 6, exhibitName: "Tranh phong cảnh", room: "1", locate: "E" },
  { id: 7, exhibitName: "Clifford", room: "1", locate: "G" },
  { id: 8, exhibitName: "Frances", room: "1", locate: "H" },
  { id: 9, exhibitName: "Roxie", room: "1", locate: "F" },
];

const handleOnClick = () => {
  console.log("button click");
};
const exhibitManage = () => {
  return (
    <div>
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

          color: "#4B36CC",
          padding: "24px",

          /* Inside auto layout */
        }}
      >
        Quản lý hiện vật
      </Typography>
      <Box sx={style}>
        <DataGrid
          rows={rows}
          columns={columns}
          hideScrollbar={true}
          loadIcon={<LinearProgress sx={{ backgroundColor: "#FF0000" }} />}
          sx={{
            fontSize: "15px",
            boxShadow:
              "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.2);",
            borderRadius: "4px",
            "&.virtualScrollerContent": {
              color: "white",
            },
            backgroundColor: "white",
          }}
        />
      </Box>
    </div>
  );
};

export default exhibitManage;
