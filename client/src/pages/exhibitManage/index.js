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
<<<<<<< HEAD
    <GridToolbarContainer>
      <Button color="primary" startIcon={<GridAddIcon />} onClick={handleClick}>
        Thêm mới
      </Button>
    </GridToolbarContainer>
  );
}
EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};
export default function ExhibitManage() {
  const exhibitList = useSelector(selectExhibit)
  const [rows, setRows] = useState(exhibitList);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: 'id',
      headerName: 'Mã hiện vật',
      flex: 1,
      width: 300,
      editable: true,
    },
    {
      field: 'exhibitName',
      headerName: 'Tên hiện vật',
      flex: 1,
      width: 180,
      editable: true,
    },
    {
      field: 'room',
      headerName: 'Phòng',
      flex: 1,
      editable: true
    },
    {
      field: 'locate',
      headerName: 'Vị trí',
      flex: 1,
      width: 180,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex: 1,
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
=======
    <div>
>>>>>>> 100510c2a9295ff209e9226fccb845854fc351e5
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
<<<<<<< HEAD
      <Box
        sx={{
          height: 500,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
          paddingInline: "10px",
          "&.MuiDataGrid-virtualScroller ::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <DataGridPro
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
=======
      <Box sx={style}>
        <DataGrid
          rows={rows}
          columns={columns}
          hideScrollbar={true}
          loadIcon={<LinearProgress sx={{ backgroundColor: "#FF0000" }} />}
>>>>>>> 100510c2a9295ff209e9226fccb845854fc351e5
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
<<<<<<< HEAD
    </>
=======
    </div>
>>>>>>> 100510c2a9295ff209e9226fccb845854fc351e5
  );
};

export default exhibitManage;
