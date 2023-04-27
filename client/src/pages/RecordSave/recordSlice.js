import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../api";
const initialState = {
    tempLog: {
        status: 'idle',
        infos: []
    },
    humiLog: {
        status: 'idle',
        infos: []
    }
    // { name: "Phòng 1", temp: "28", humi: "28" },
};
const recordSlice = createSlice({
    name: "record",
    initialState: initialState,
    reducers: {
        changeDevice: (state, action) => {
            state.currDevice = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTempLog.pending, (state, action) => {
            state.tempLog.status = "pending"
        });
        builder.addCase(fetchTempLog.fulfilled, (state, action) => {
            state.tempLog.infos = action.payload
            state.tempLog.status = "idle"
        });
        builder.addCase(fetchHumiLog.pending, (state, action) => {
            state.humiLog.status = "pending"
        });
        builder.addCase(fetchHumiLog.fulfilled, (state, action) => {
            state.humiLog.infos = action.payload
            state.humiLog.status = "idle"
        });
    },
});
export default recordSlice;


export const fetchTempLog = createAsyncThunk("record/fetchTempLog",
    async () => {
        const res = await API.getTempLog();
        // const resJson = await res.json()
        // console.log('fetchtempLog',res.data.data)
        return res.data.data;
    }
);

export const fetchHumiLog = createAsyncThunk("record/fetchHumiLog",
    async () => {
        const res = await API.getHumiLog();
        // const resJson = await res.json()s
        // console.log('fetchHumiLog',res.data.data)
        return res.data.data;
    }
);
// export const updateDevDetail = createAsyncThunk(
//     "todos/updateDevDetail",
//     async (deviceName, { getState }) => {
//         const currRoom = getState().main.currRoom;
//         const res = await API.updateDevDetail({ deviceName, room: currRoom });
//         return [deviceName, res];
//     }
// );
