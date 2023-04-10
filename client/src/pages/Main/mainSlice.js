import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  currRoom: "",
  currDevice: "",
  currDeviceDetail: {},
  roomsInfos: {
    status: "idle",
    infos: [
      { name: "Phòng 1", temp: "28", humi: "28" },
      { name: "Phòng 2", temp: "29", humi: "29" },
      { name: "Phòng 3", temp: "27", humi: "31" },
      { name: "Phòng 4", temp: "30", humi: "30" },
    ],
  },

  deviceInfos: { status: "idle", infos: [] },
};
const mainSlice = createSlice({
  name: "main",
  initialState: initialState,
  reducers: {
    changeRoom: (state, action) => {
      state.currRoom = action.payload;
    },
    changeDevice: (state, action) => {
      state.currDevice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateRooms.pending, (state, action) => {});
  },
});
export default mainSlice;

export const updateRooms = createAsyncThunk(
  "todos/updateRooms",
  async (updatedTodo) => {
    const res = await fetch("/api/updateTodo", {
      method: "POST",
      body: JSON.stringify(updatedTodo),
    });

    const data = await res.json();
    console.log("[updateTodo]", { data });
    return data.todos;
  }
);
