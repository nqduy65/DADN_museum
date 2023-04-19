import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api";
const initialState = {
  currRoom: "",
  currDevice: "",
  DeviceDetail: { status: "pending", device: "", infos: [] },
  roomsInfos: {
    status: "idle",
    infos: [
      // { name: "Phòng 1", temp: "28", humi: "28" },
      // { name: "Phòng 2", temp: "29", humi: "29" },
      // { name: "Phòng 3", temp: "27", humi: "31" },
      // { name: "Phòng 4", temp: "30", humi: "30" },
    ],
  },

  deviceInfos: { status: "pending", room: "", infos: [] },
};
const mainSlice = createSlice({
  name: "main",
  initialState: initialState,
  reducers: {
    changeRoom: (state, action) => {
      state.currRoom = action.payload;
      if (state.curr !== state.deviceInfos.room) {
      }
    },
    changeDevice: (state, action) => {
      state.currDevice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateRooms.pending, (state, action) => {
      state.roomsInfos.status = "pending";
    });
    builder.addCase(updateRooms.fulfilled, (state, action) => {
      state.roomsInfos.status = "idle";
      state.roomsInfos.infos = action.payload.data.rooms;
    });
    builder.addCase(updateDevices.pending, (state, action) => {
      state.deviceInfos.status = "pending";
    });
    builder.addCase(updateDevices.fulfilled, (state, action) => {
      state.deviceInfos.status = "idle";
      state.deviceInfos.infos = action.payload.data.data;
    });
    builder.addCase(updateDevDetail.pending, (state, action) => {
      state.DeviceDetail.status = "pending";
      state.DeviceDetail.infos = [];
    });
    builder.addCase(updateDevDetail.fulfilled, (state, action) => {
      state.DeviceDetail.status = "idle";
      state.DeviceDetail.infos = action.payload[1].data.data;
    });
  },
});
export default mainSlice;

export const updateRooms = createAsyncThunk("todos/updateRooms", async () => {
  const res = await API.updateRooms();
  return res;
});
export const updateDevices = createAsyncThunk(
  "todos/updateDevices",
  async (room) => {
    const res = await API.updateDevices();
    return res;
  }
);
export const updateDevDetail = createAsyncThunk(
  "todos/updateDevDetail",
  async (deviceName, { getState }) => {
    const currRoom = getState().main.currRoom;
    const res = await API.updateDevDetail({ deviceName, room: currRoom });
    return [deviceName, res];
  }
);
