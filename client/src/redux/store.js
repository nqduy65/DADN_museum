import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "../pages/Main/mainSlice";

const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
  },
});

export default store;
