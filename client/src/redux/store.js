import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "../pages/Main/mainSlice";
import dmanageSlice from "../pages/Manage/dmanage";
import dashBoardSlice from "../pages/DashBroad/dashBroadSlice";
import exhibitSlice from "../pages/ExhibitManage/exhibitManageSlice";
import recordSlice from "../pages/RecordSave/recordSlice";

const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
    dmanage: dmanageSlice.reducer,
    dashboard: dashBoardSlice.reducer,
    exhibit: exhibitSlice.reducer,
    // record: recordSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
