import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api";
const initialState = {
  argTemp: { status: "", data: [0, 0] },
  argHumi: { status: "", data: [0, 0] },
  argDevice: { status: "", data: [0, 0] },
  argNotification: { status: "", data: [] },
  argUserLog: { status: "", data: [] },
  dataChart: {
    status: "",
    data: [
      {
        id: "temp",
        color: "F70E46",
        data: [],
      },
      {
        id: "humi",
        color: "#6040EF",
        data: [],
      },
    ],
  },
  deviceChart: {
    status: "",
    data: [
      {
        id: "Hoạt động",
        label: "Hoạt động",
        value: 9,
        color: "hsl(271, 70%, 50%)",
      },
      {
        id: "Không kết nối",
        label: "Không kết nối",
        value: 1,
        color: "hsl(333, 70%, 50%)",
      },
    ],
  },
};
const dashBoardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    changeAvgTemp: (state, action) => {
      state.currRoom = action.payload;
    },
    changeDevice: (state, action) => {
      state.deviceChart.data[0].value = action.payload[0];
      state.deviceChart.data[1].value = action.payload[1];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAvgTempThunk.pending, (state, action) => {});
    builder.addCase(getAvgTempThunk.fulfilled, (state, action) => {
      state.argTemp.status = "idle";
      state.argTemp.data[0] = action.payload.data.avgTempTodayValue;
      state.argTemp.data[1] = action.payload.data.percentChange;
    });
    builder.addCase(getAvgTempThunk.rejected, (state, action) => {
      console.log("getAvgTempThunk is rejected:", action.error.message);
    });
    builder.addCase(getAvgHumiThunk.pending, (state, action) => {
      state.argTemp.status = "pending";
    });
    builder.addCase(getAvgHumiThunk.fulfilled, (state, action) => {
      state.argTemp.status = "idle";
      state.argHumi.data[0] = action.payload.data.avgHumiTodayValue;
      state.argHumi.data[1] = action.payload.data.percentChange;
    });
    builder.addCase(getAvgHumiThunk.rejected, (state, action) => {});

    builder.addCase(getAvgDeviceThunk.pending, (state, action) => {
      state.argTemp.status = "pending";
    });
    builder.addCase(getAvgDeviceThunk.fulfilled, (state, action) => {
      state.argTemp.status = "idle";
      state.argDevice.data[0] = action.payload.data.totalDevice;
      state.argHumi.data[1] = action.payload.data.change;
    });
    builder.addCase(getAvgDeviceThunk.rejected, (state, action) => {
      console.log("getAvgDeviceThunk is rejected:", action.error.message);
    });

    builder.addCase(getAvgNotiThunk.pending, (state, action) => {
      state.argNotification.status = "pending";
    });
    builder.addCase(getAvgNotiThunk.fulfilled, (state, action) => {
      console.log(action.payload.data);
      state.argNotification.status = "idle";
      console.log(action.payload.data);
      state.argNotification.data = action.payload.data.data;
      // state.argHumi.data[1] = action.payload.data.change;
    });
    builder.addCase(getAvgNotiThunk.rejected, (state, action) => {
      console.log("getAvgDeviceThunk is rejected:", action.error.message);
    });

    builder.addCase(getAvgUserLogThunk.pending, (state, action) => {
      state.argUserLog.status = "pending";
    });
    builder.addCase(getAvgUserLogThunk.fulfilled, (state, action) => {
      console.log(action.payload.data);
      state.argUserLog.status = "idle";
      state.argUserLog.data = action.payload.data.data;
    });
    builder.addCase(getAvgUserLogThunk.rejected, (state, action) => {
      console.log("getAvgDeviceThunk is rejected:", action.error.message);
    });

    builder.addCase(getChartTempDataThunk.pending, (state, action) => {
      state.dataChart.status = "pending";
    });
    builder.addCase(getChartTempDataThunk.fulfilled, (state, action) => {
      console.log(action.payload.data);
      state.dataChart.status = "idle";
      state.dataChart.data[0].data = action.payload.data.data;
    });
    builder.addCase(getChartTempDataThunk.rejected, (state, action) => {
      console.log("getAvgDeviceThunk is rejected:", action.error.message);
    });

    builder.addCase(getChartHumiDataThunk.pending, (state, action) => {
      state.dataChart.status = "pending";
    });
    builder.addCase(getChartHumiDataThunk.fulfilled, (state, action) => {
      console.log(action.payload.data);
      state.dataChart.status = "idle";
      state.dataChart.data[1].data = action.payload.data.data;
    });
    builder.addCase(getChartHumiDataThunk.rejected, (state, action) => {
      console.log("getAvgDeviceThunk is rejected:", action.error.message);
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
export const getAvgDeviceThunk = createAsyncThunk(
  "dashboard/getAvgDeviceThunk",
  async () => {
    try {
      const res = await API.getAvgDevice();
      return res;
    } catch (error) {
      console.log("Error in getAvgTemp: ", error);
      throw error;
    }
  }
);
export const getAvgNotiThunk = createAsyncThunk(
  "dashboard/getAvgNotiThunk",
  async () => {
    try {
      const res = await API.getNotifications();
      return res;
    } catch (error) {
      console.log("Error in getAvgTemp: ", error);
      throw error;
    }
  }
);
export const getAvgUserLogThunk = createAsyncThunk(
  "dashboard/getAvgUserLogThunk",
  async () => {
    try {
      const res = await API.getUserLog();
      return res;
    } catch (error) {
      console.log("Error in getAvgTemp: ", error);
      throw error;
    }
  }
);
export const getChartTempDataThunk = createAsyncThunk(
  "dashboard/getChartTempDataThunk",
  async () => {
    try {
      const res = await API.getCharTempData();
      return res;
    } catch (error) {
      console.log("Error in getAvgTemp: ", error);
      throw error;
    }
  }
);
export const getChartHumiDataThunk = createAsyncThunk(
  "dashboard/getChartHumiDataThunk",
  async () => {
    try {
      const res = await API.getCharHumiData();
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
