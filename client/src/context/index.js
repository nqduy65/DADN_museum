import React, { useContext } from "react";

export const ToastContext = React.createContext();
export const UseToast = () => {
  return useContext(ToastContext);
};
