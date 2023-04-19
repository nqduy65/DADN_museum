import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "../pages/Main/mainSlice";
import dmanageSlice from "../pages/Manage/dmanage";
import dashBoardSlice from "../pages/DashBroad/dashBroadSlice";
const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
    dmanage: dmanageSlice.reducer,
    dashboard: dashBoardSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
