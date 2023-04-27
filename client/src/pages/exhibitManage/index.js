import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from 'prop-types';
import { GridRowModes, DataGridPro, GridToolbarContainer, GridActionsCellItem, GridAddIcon, GridSaveAltIcon } from '@mui/x-data-grid-pro';
import { randomId } from '@mui/x-data-grid-generator';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import LinearProgress from "@mui/material/LinearProgress";
// import { AddIcon, EditIcon, DeleteIcon } from '@mui/icons-material';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CancelIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { selectExhibit } from "./selectors";
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
              handleOnClickUpdate(event, cellValues);
            }}
          >
            Sửa
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ minWidth: "30px" }}
            onClick={(event) => {
              handleOnClickDelete(event, cellValues);
            }}
          >
            Xóa
          </Button>
        </Box>
      );
    },
  },
];
const handleOnClickUpdate = (e) => {
  console.log('update', e);
};
const handleOnClickDelete = (e) => {
  console.log('delete', e);
};

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, exhibitName: '', room: '', locate: '' }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
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
    </>
  );
}

// const ExhibitManage = () => {
//   // const dispatch = useDispatch();
//   const exhibitList = useSelector(selectExhibit)




//   return (
//     <div>
//       <Typography
//         variant="h2"
//         sx={{
//           width: "100%",
//           height: "85px",

//           /* Nunito/Heading/24 - Bold */

//           fontStyle: " normal;",
//           fontWeight: 700,
//           fontSize: "28px;",
//           lineHeight: "140%;",
//           /* identical to box height, or 34px */

//           color: "#4B36CC",
//           padding: "24px",

//           /* Inside auto layout */
//         }}
//       >
//         Quản lý hiện vật
//       </Typography>
//       <Box sx={style}>
//         <DataGrid
//           rows={exhibitList}
//           columns={columns}
//           hideScrollbar={true}
//           loadIcon={<LinearProgress sx={{ backgroundColor: "#FF0000" }} />}
//           sx={{
//             fontSize: "15px",
//             boxShadow:
//               "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.2);",
//             borderRadius: "4px",
//             "&.virtualScrollerContent": {
//               color: "white",
//             },
//             backgroundColor: "white",
//           }}
//         />
//       </Box>
//     </div>
//   );
// };

// export default ExhibitManage;