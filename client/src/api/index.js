import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("userInfo")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("userInfo")).token
    }`;
  }

  return req;
});

export const loginUser = (dataForm) => API.post("/api/user/login", dataForm);

export const register = (dataForm) => API.post("/api/user/register", dataForm);

export const updateRooms = () => API.get("/api/data/getroominfos");

export const updateDevDetail = (dataForm) =>
  API.post("/api/data/getdevicedetail", dataForm);

export const updateDevices = () => API.get("/api/data/getroomdevices");

export const getFan = () => API.get("api/data/getFan");
export const setFan = (value) => API.post("api/data/setFan", value);

export const getAvgTemp = () => API.get("api/data/getavgtemp");
export const getAvgHumi = () => API.get("api/data/getavghumi");
export const getAvgDevice = () => API.get("api/data/getavgdevice");
export const getNotifications = () => API.get("api/data/getnotifications");
export const getUserLog = () => API.get("api/data/getuserlog");
export const setAutoFan = (value) => API.post("api/data/setAutoFan", value);
export const getCharTempData = () => API.get("api/data/daytemperatures");
export const getCharHumiData = () => API.get("api/data/dayhumidities");
// export const getTemperature = () => API.get("/api/data/lasttemperature");

// export const getHumidity = () => API.get("/api/data/lasthumidity");

// export const getSoildMoisture = () => API.get("/api/data/lastsoildmoisture");

// export const setFan = (value) => API.post("/api/data/setfan", value);

// export const setMode = (value) => API.post("api/data/setmode", value);

// export const setPump = (value) => API.post("api/data/setpump", value);

// export const setLight = (value) => API.post("api/data/setlight", value);

// export const getFan = () => API.get("api/data/lastfan");

// export const getMode = () => API.get("api/data/lastmode");

// export const getPump = () => API.get("api/data/lastpump");

// export const getLed = () => API.get("api/data/lastlight");

// export const get24SolidMoistures = () => API.get("api/data/daysoildmoistures");

// export const get24SolidTemperatures = () => API.get("api/data/daytemperatures");

// export const get24SolidHumidities = () => API.get("api/data/dayhumidities");

// export const getNotification = () => API.get("api/data/notifications");
