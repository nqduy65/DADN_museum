import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api";
const initialState = {
  argTemp: { status: "", data: [0, 0] },
  argHumi: { status: "", data: [0, 0] },
};
const dashBoardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    changeAvgTemp: (state, action) => {
      state.currRoom = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAvgTempThunk.pending, (state, action) => {
      state.argTemp.status = "pending";
      console.log("getAvgTempThunk is pending");
    });
    builder.addCase(getAvgTempThunk.fulfilled, (state, action) => {
      console.log("getAvgTempThunk is fulfilled");
      console.log(action.payload.data);
      state.argTemp.status = "idle";
      state.argTemp.data[0] = action.payload.data.avgTempTodayValue;
      state.argTemp.data[1] = action.payload.data.percentChange;
    });
    builder.addCase(getAvgTempThunk.rejected, (state, action) => {
      console.log("getAvgTempThunk is rejected:", action.error.message);
    });
    builder.addCase(getAvgHumiThunk.pending, (state, action) => {
      state.argTemp.status = "pending";
      console.log("getAvgTempThunk is pending");
    });
    builder.addCase(getAvgHumiThunk.fulfilled, (state, action) => {
      console.log("getAvgTempThunk is fulfilled");
      console.log(action.payload.data);
      state.argTemp.status = "idle";
      state.argHumi.data[0] = action.payload.data.avgHumiTodayValue;
      state.argHumi.data[1] = action.payload.data.percentChange;
    });
    builder.addCase(getAvgHumiThunk.rejected, (state, action) => {
      console.log("getAvgTempThunk is rejected:", action.error.message);
    });
  },
});
export default dashBoardSlice;

export const getAvgTempThunk = createAsyncThunk(
  "dashboard/getAvgTempThunk",
  async () => {
    try {
      const res = await API.getAvgTemp();
      return res;
    } catch (error) {
      console.log("Error in getAvgTemp: ", error);
      throw error;
    }
  }
);
export const getAvgHumiThunk = createAsyncThunk(
  "dashboard/getAvgHumiThunk",
  async () => {
    try {
      const res = await API.getAvgHumi();
      return res;
    } catch (error) {
      console.log("Error in getAvgTemp: ", error);
      throw error;
    }
  }
);
// export const updateDevices = createAsyncThunk(
//   "todos/updateDevices",
//   async (room) => {
//     const res = await API.updateDevices();
//     return res;
//   }
// );
// export const updateDevDetail = createAsyncThunk(
//   "todos/updateDevDetail",
//   async (deviceName, { getState }) => {
//     const currRoom = getState().main.currRoom;
//     const res = await API.updateDevDetail({ deviceName, room: currRoom });
//     return [deviceName, res];
//   }
// );
