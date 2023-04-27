import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "../pages/Main/mainSlice";
import dmanageSlice from "../pages/Manage/dmanage";
import dashBoardSlice from "../pages/DashBroad/dashBroadSlice";
<<<<<<< HEAD
import exhibitSlice  from "../pages/ExhibitManage/exhibitManageSlice";
import recordSlice from "../pages/RecordSave/recordSlice";
=======
// import exhibitSlice from "../pages/exhibitManage/exhibitManageSlice";
>>>>>>> 100510c2a9295ff209e9226fccb845854fc351e5

const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
    dmanage: dmanageSlice.reducer,
    dashboard: dashBoardSlice.reducer,
    exhibit: exhibitSlice.reducer,
    record: recordSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
