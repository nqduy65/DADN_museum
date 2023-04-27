import { Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import LinearProgress from "@mui/material/LinearProgress";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { humiLog, tempLog } from "./selectors";
import { fetchHumiLog, fetchTempLog } from "./recordSlice";
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
  // { field: "id", headerName: "Mã", width: 90, flex: 0.5 },
  // {
  //   field: "deviceName",
  //   headerName: "Tên thiết bị",
  //   flex: 1,
  //   minWidth: 150,
  //   editable: true,
  // },
  {
    field: "room",
    headerName: "Phòng",
    flex: 1,
    minWidth: 150,
    editable: true,
  },
  {
    field: "value",
    headerName: "Giá trị",
    flex: 1,
    minWidth: 150,
    editable: true,
  },
  {
    field: "updatedAt",
    headerName: "Thời gian sao lưu",
    flex: 1,
    // type: 'number',
    minWidth: 150,
    editable: true,
  },
];

const RecordSave = () => {
  const [device, setDevice] = useState("temp");

  const dispatch = useDispatch()

  useEffect(() => {
    // eslint-disable-next-line
    dispatch(fetchTempLog());
    dispatch(fetchHumiLog())
  }, [dispatch]);

  const dataTemp = useSelector(tempLog)
  // console.log('dataTemp', dataTemp)
  const dataHumi = useSelector(humiLog)
  const dataHumiFake = [
    { room: 'Phòng 1', value: '44', updatedAt: '27/04/2023 12:45' },
    { room: 'Phòng 1', value: '42', updatedAt: '27/04/2023 12:44' },
    { room: 'Phòng 1', value: '43', updatedAt: '27/04/2023 12:43' },
    { room: 'Phòng 1', value: '41', updatedAt: '27/04/2023 12:42' },
  ]

  // const check = device === 'temp' ? dataTemp : device === 'humi' ? dataHumi : []
  // console.log("checkType", check)
  const handleChange = (event) => {
    setDevice(event.target.value)
  };

  //////function generate rowID because record have no primary key
  // const [id, setId] = useState(1);

  // function generateRowId(row) {
  //   setId((prevCounter) => prevCounter + 1);
  //   return id.toString();
  // }
  function generateRowId(row) {
    return `${row.room}-${row.value}- ${row.updatedAt}`;
  }
  /////
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
        Quản lý sao lưu
      </Typography>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Thiết bị</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={device}
          label="Thiết bị"
          onChange={handleChange}
          sx={{
            backgroundColor: "white",
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"temp"}>Nhiệt</MenuItem>
          <MenuItem value={"humi"}>Độ ẩm</MenuItem>
          <MenuItem value={"light"}>Ánh sáng</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{
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
      }}>
        <DataGrid
          rows={device === 'temp' ? dataTemp : device === 'humi' ? dataHumi : dataHumiFake}
          getRowId={generateRowId}
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

export default RecordSave;
