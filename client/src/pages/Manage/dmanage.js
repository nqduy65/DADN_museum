import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api";

const initialState = {
  fan: { status: "", data: { room: "", name: "", value: "0", auto: "off" } },
  temp: { status: "", data: { room: "", name: "", value: "0", auto: "off" } },
  humi: { status: "", data: { room: "", name: "", value: "0", auto: "off" } },
};
const dmanageSlice = createSlice({
  name: "dmanage",
  initialState: initialState,
  reducers: {
    changeFan: (state, action) => {
      state.fan.data.value = action.payload;
    },
    changeTemp: (state, action) => {
      state.temp.data.value = action.payload;
    },
    changeHumi: (state, action) => {
      state.humi.data.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFan.pending, (state, action) => {
      state.fan.status = "pending";
    });
    builder.addCase(getFan.fulfilled, (state, action) => {
      state.fan.status = "idle";
      state.fan.data = action.payload.data.data[0];
    });
    builder.addCase(getTemp.pending, (state, action) => {
      state.temp.status = "pending";
    });
    builder.addCase(getTemp.fulfilled, (state, action) => {
      state.temp.status = "idle";
      state.temp.data = action.payload.data.data[0];
    });
    builder.addCase(getHumi.pending, (state, action) => {
      state.humi.status = "pending";
    });
    builder.addCase(getHumi.fulfilled, (state, action) => {
      state.humi.status = "idle";
      state.humi.data = action.payload.data.data[0];
    });
    builder.addCase(setFan.pending, (state, action) => {
      state.fan.status = "pending";
    });
    builder.addCase(setFan.fulfilled, (state, action) => {
      state.fan.status = "idle";
    });
  },
});
export default dmanageSlice;

export const getFan = createAsyncThunk("dmanage/getFan", async () => {
  const res = await API.getFan();
  return res;
});

export const getTemp = createAsyncThunk("dmanage/getTemp", async () => {
  const res = await API.getTemp();
  return res;
});
export const getHumi = createAsyncThunk("dmanage/getHumi", async () => {
  const res = await API.getHumi();
  return res;
});

export const setFan = createAsyncThunk("dmanage/setFan", async (value) => {
  const res = await API.setFan({ value });
  return res;
});
export const setAuto = createAsyncThunk("dmanage/setAuto", async (value) => {
  let res;
  if (value) res = await API.setAutoFan({ value: "1" });
  else res = await API.setAutoFan({ value: "0" });
  return res;
});
