import { Box, Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import LinearProgress from "@mui/material/LinearProgress";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useState } from 'react'
const style = {
  position: "relative",
  width: "100%",
  height: '80vh',
  background: "transparent",
  paddingInline: "10px",
  "&.MuiDataGrid-virtualScroller ::-webkit-scrollbar": {
    display: "none",
  },
};

//Mockdata
const columns = [
  { field: 'id', headerName: 'Mã thiết bị', width: 90 },
  {
    field: 'deviceName',
    headerName: 'Tên thiết bị',
    flex: 1,
    minWidth: 150,
    editable: true,
  },
  {
    field: 'value',
    headerName: 'Giá trị',
    flex: 1,
    minWidth: 150,
    editable: true,
  },
  {
    field: 'recordAt',
    headerName: 'Thời gian sao lưu',
    flex: 1,
    // type: 'number',
    minWidth: 150,
    editable: true,
  },
];

const rows = [
  { id: 1, deviceName: 'Nhiệt', value: '27.2', recordAt: '20/04/2023' },
  { id: 1, deviceName: 'Nhiệt', value: '27.2', recordAt: '20/04/2023' },
  { id: 1, deviceName: 'Nhiệt', value: '27.2', recordAt: '20/04/2023' },
  { id: 1, deviceName: 'Nhiệt', value: '27.2', recordAt: '20/04/2023' },
  { id: 1, deviceName: 'Nhiệt', value: '27.2', recordAt: '20/04/2023' },
  { id: 1, deviceName: 'Nhiệt', value: '27.2', recordAt: '20/04/2023' },
  { id: 1, deviceName: 'Nhiệt', value: '27.2', recordAt: '20/04/2023' },
  { id: 1, deviceName: 'Nhiệt', value: '27.2', recordAt: '20/04/2023' },
  { id: 1, deviceName: 'Nhiệt', value: '27.2', recordAt: '20/04/2023' },
  { id: 1, deviceName: 'Nhiệt', value: '27.2', recordAt: '20/04/2023' },
  { id: 1, deviceName: 'Nhiệt', value: '27.2', recordAt: '20/04/2023' },
];

const handleOnClick = () => {
  console.log("button click")
}
const RecordSave = () => {
  const [device, setDevice] = useState('')

  const handleChange = (event) => {
    setDevice(event.target.value);
  };
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

      <Typography
        variant="h5"
        style={{ fontWeight: 'bold', marginBottom: 3, marginTop: 10, padding: "24px", }}
      >
        Chọn theo thiết bị
      </Typography>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Thiết bị</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={device}
          label="Thiết bị"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'temp'}>Nhiệt</MenuItem>
          <MenuItem value={'humi'}>Độ ẩm</MenuItem>
          <MenuItem value={'light'}>Ánh sáng</MenuItem>
        </Select>
        <FormHelperText>With label + helper text</FormHelperText>
      </FormControl>
      <Box sx={style}>
        <DataGrid
          rows={rows}
          columns={columns}
          hideScrollbar={true}
          loadIcon={<LinearProgress sx={{ backgroundColor: "#FF0000" }} />}
          sx={{
            boxShadow:
              "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.2);",
            borderRadius: "4px",
            "&.virtualScrollerContent": {
              color: "white",
            },
            backgroundColor: "white"
          }}
        />
      </Box>
    </div>
  )
}

export default RecordSave