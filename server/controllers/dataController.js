import axios from "axios";
import Notification from "../models/notificationModel.js";
import Room from "../models/roomModel.js";
import Temp from "../models/tempModel.js";
import Fan from "../models/fanModel.js";
import Auto from "../models/autoModel.js";
import Humi from "../models/humiModel.js";
import Camera from "../models/cameraModel.js";
import UserLog from "../models/userLogModel.js";
import { publishData } from "../utils/mqttHelper.js";
import { adaRequest } from "../utils/axios.js";
import moment from "moment";

export const setAutoFan = async (req, res, next) => {
  const { value } = req.body;
  console.log(value);
  if (!value) {
    res.status(400);
    return next(new Error("Value is not sent!"));
  } else {
    let fan = parseFloat(value);
    if (fan >= 0 && fan <= 1) {
      publishData("ttq-autofan", fan, (result) =>
        handleReturn(result, res, next)
      );
    } else {
      res.status(400);
      return next(new Error("Value is invalid"));
    }
  }
};
const handleReturn = async (result, res, next) => {
  if (result) {
    res.status(201).json({
      message: "Set data successful",
    });
  } else {
    res.status(400);
    return next(new Error("Set data failed"));
  }
};

export const setFan = async (req, res, next) => {
  const { value } = req.body;
  if (!value) {
    res.status(400);
    return next(new Error("Value is not sent!"));
  } else {
    let fan = parseFloat(value);
    if (fan >= 0 && fan <= 3) {
      publishData("ttq-fan", fan, (result) => handleReturn(result, res, next));
    } else {
      res.status(400);
      return next(new Error("Value is invalid"));
    }
  }
};

export const setMode = async (req, res, next) => {
  const { value } = req.body;
  if (!value) {
    res.status(400);
    return next(new Error("Value is not sent!"));
  } else {
    let mode = parseFloat(value);
    if (mode >= 0 && mode <= 1) {
      publishData("mode", mode, (result) => handleReturn(result, res, next));
    } else {
      res.status(400);
      return next(new Error("Value is invalid"));
    }
  }
};

export const setLight = async (req, res, next) => {
  const { value } = req.body;
  if (!value) {
    res.status(400);
    return next(new Error("Value is not sent!"));
  } else {
    let light = parseFloat(value);
    if (light >= 0 && light <= 1) {
      publishData("light", light, (result) => handleReturn(result, res, next));
    } else {
      res.status(400);
      return next(new Error("Value is invalid"));
    }
  }
};

export const setPump = async (req, res, next) => {
  const { value } = req.body;
  if (!value) {
    res.status(400);
    return next(new Error("Value is not sent!"));
  } else {
    let pump = parseFloat(value);
    if (pump >= 0 && pump <= 1) {
      publishData("pump", pump, (result) => handleReturn(result, res, next));
    } else {
      res.status(400);
      return next(new Error("Value is invalid"));
    }
  }
};
export const getRoomInfos = async (req, res, next) => {
  console.log("Room Info controller");
  let rooms = await Room.find({}).then((data) => data.map((data) => data.name));

  const promises = rooms.map(async (element) => {
    const latestTemp = await Temp.find({ room: element })
      .sort({ createdAt: -1 })
      .limit(1)
      .exec();
    if (latestTemp.length > 0) {
      var tempData = latestTemp[0].data;
      // Do something with tempData
    } else {
      // No temperature data found for this room
    }
    const latestHumi = await Humi.find({ room: element })
      .sort({ createdAt: -1 })
      .limit(1)
      .exec();
    if (latestHumi.length > 0) {
      var humiData = latestHumi[0].data;
      // Do something with tempData
    } else {
      // No temperature data found for this room
    }
    return { name: element, temp: tempData, humi: humiData };
  });

  const results = await Promise.all(promises);
  rooms = results;

  res.status(200).json({ message: "successful", rooms });
};

export const getRoomDevices = async (req, res, next) => {
  let room = req.query["room"] ? req.query["room"] : "";
  const lastAuto = await Auto.find({ room })
    .sort({ createdAt: -1 })
    .limit(1)
    .exec();
  console.log(lastAuto);
  if (lastAuto.length > 0) {
    var autoData = lastAuto[0].value;
    // Do something with tempData
  } else {
    // No temperature data found for this room
  }
  res.status(200).json({
    message: "successful",
    data: [
      { id: "1", name: "Quạt", connected: "1/1", auto: `${autoData}/1` },
      { id: "2", name: "Camera", connected: "0/1" },
      { id: "3", name: "Sensor nhiệt độ", connected: "1/1" },
      { id: "4", name: "Sensor độ ẩm", connected: "1/1" },
    ],
  });
};

export const getDeviceDetail = async (req, res, next) => {
  let { deviceName, room } = req.body;
  if (deviceName === "Quạt") {
    const latestFan = await Fan.find({ room })
      .sort({ createdAt: -1 })
      .limit(1)
      .exec();
    console.log(latestFan);
    if (latestFan.length > 0) {
      var fanData = latestFan[0].data;
      var time = latestFan[0].updatedAt;
      // Do something with tempData
    } else {
      // No temperature data found for this room
    }
    const lastAuto = await Auto.find({ room })
      .sort({ createdAt: -1 })
      .limit(1)
      .exec();
    console.log(lastAuto);
    if (lastAuto.length > 0) {
      var autoData = lastAuto[0].data;
      // Do something with tempData
    } else {
      // No temperature data found for this room
    }
    res.status(200).json({
      message: "successful",
      data: [
        {
          id: 1,
          room: "Phòng 1",
          device: "sensor_room_1",
          value: fanData,
          time: time,
        },
      ],
    });
  }

  if (deviceName === "Sensor nhiệt độ") {
    const latestTemp = await Temp.find({ room })
      .sort({ createdAt: -1 })
      .limit(1)
      .exec();
    console.log(latestTemp);
    if (latestTemp.length > 0) {
      var tempData = latestTemp[0].data;
      var time = latestTemp[0].updatedAt;
      // Do something with tempData
    } else {
      // No temperature data found for this room
    }
    res.status(200).json({
      message: "successful",
      data: [
        {
          id: 1,
          room: "Phòng 1",
          device: "sensor_room_1",
          value: tempData,
          time: time,
        },
      ],
    });
  }
  if (deviceName === "Sensor độ ẩm") {
    const latestHumi = await Humi.find({ room })
      .sort({ createdAt: -1 })
      .limit(1)
      .exec();
    console.log(latestHumi);
    if (latestHumi.length > 0) {
      var humiData = latestHumi[0].data;
      var time = latestHumi[0].updatedAt;
      // Do something with tempData
    } else {
      // No temperature data found for this room
    }
    res.status(200).json({
      message: "successful",
      data: [
        {
          id: 1,
          room: "Phòng 1",
          device: "sensor_room_1",
          value: humiData,
          time: time,
        },
      ],
    });
  }
  if (deviceName === "Camera") {
    const latestCamera = await Camera.find({ room })
      .sort({ createdAt: -1 })
      .limit(1)
      .exec();
    console.log(latestCamera);
    if (latestCamera.length > 0) {
      var cameraData = latestCamera[0].data;
      var time = latestCamera[0].updatedAt;
      console.log(cameraData);
      // Do something with tempData
    } else {
      cameraData = [];
      // No temperature data found for this room
    }
    if (cameraData.length > 0) {
      res.status(200).json({
        message: "successful",
        data: [
          {
            id: 1,
            room: "Phòng 1",
            device: "sensor_room_1",
            value: cameraData,
            time: time,
          },
        ],
      });
    } else {
      res.status(404).json({
        message: "failed",
        data: [],
      });
    }
  }
};
export const getTemp = async (req, res, next) => {
  const latestTemp = await Temp.find({ room: "Phòng 1" })
    .sort({ createdAt: -1 })
    .limit(1)
    .exec();
  console.log(latestTemp);
  if (latestTemp.length > 0) {
    var tempData = latestTemp[0].data;
    var time = latestTemp[0].updatedAt;
    // Do something with tempData
  } else {
    // No temperature data found for this room
  }
  res.status(200).json({
    message: "successful",
    data: [
      {
        id: 1,
        room: "Phòng 1",
        device: "Temp 1",
        value: tempData,
        time: time,
      },
    ],
  });
};

export const getHumi = async (req, res, next) => {
  const latestHumi = await Humi.find({ room: "Phòng 1" })
    .sort({ createdAt: -1 })
    .limit(1)
    .exec();
  console.log(latestHumi);
  if (latestHumi.length > 0) {
    var humiData = latestHumi[0].data;
    var time = latestHumi[0].updatedAt;
    // Do something with tempData
  } else {
    // No temperature data found for this room
  }
  res.status(200).json({
    message: "successful",
    data: [
      {
        id: 1,
        room: "Phòng 1",
        device: "Humi 1",
        value: humiData,
        time: time,
      },
    ],
  });
};

export const getFan = async (req, res, next) => {
  const latestFan = await Fan.find({ room: "Phòng 1" })
    .sort({ createdAt: -1 })
    .limit(1)
    .exec();
  console.log(latestFan);
  if (latestFan.length > 0) {
    var fanData = latestFan[0].data;
    var time = latestFan[0].updatedAt;
    // Do something with tempData
  } else {
    // No temperature data found for this room
  }
  console.log(fanData);
  if (fanData?.length > 0) {
    res.status(200).json({
      message: "successful",
      data: [
        {
          room: "Phòng 1",
          name: "Fan 1",
          value: fanData,
          time: time,
        },
      ],
    });
  } else {
    res.status(404).json({
      message: "failed",
      data: [],
    });
  }
};

export const getAvgTemp = async (req, res, next) => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );
  const avgTempToday = await Temp.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
    },
    {
      $group: {
        _id: null,
        avgData: {
          $avg: {
            $convert: {
              input: "$data",
              to: "double",
              onError: 0,
              onNull: 0,
            },
          },
        },
      },
    },
  ]);

  // Tính giá trị trung bình của Temp trong ngày hôm trước
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1
  );
  const startOfYesterday = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate()
  );
  const endOfYesterday = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate() + 1
  );
  const avgTempYesterday = await Temp.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfYesterday,
          $lt: endOfYesterday,
        },
      },
    },
    {
      $group: {
        _id: null,
        avgData: {
          $avg: {
            $convert: {
              input: "$data",
              to: "double",
              onError: 0,
              onNull: 0,
            },
          },
        },
      },
    },
  ]);
  const avgTempTodayValue = parseFloat(avgTempToday[0]?.avgData.toFixed(1));
  let avgTempYesterdayValue = avgTempYesterday[0]?.avgData;
  if (avgTempYesterdayValue === undefined) avgTempYesterdayValue = 24;
  // So sánh 2 giá trị trung bình
  const percentChange = parseFloat(
    (
      ((avgTempTodayValue - avgTempYesterdayValue) / avgTempYesterdayValue) *
      100
    ).toFixed(1)
  );

  console.log(avgTempTodayValue, avgTempYesterdayValue, percentChange);
  res.status(200).json({ avgTempTodayValue, percentChange });
};
export const getAvgHumi = async (req, res, next) => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );
  const avgHumiToday = await Humi.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      },
    },
    {
      $group: {
        _id: null,
        avgData: {
          $avg: {
            $convert: {
              input: "$data",
              to: "double",
              onError: 0,
              onNull: 0,
            },
          },
        },
      },
    },
  ]);

  // Tính giá trị trung bình của Temp trong ngày hôm trước
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1
  );
  const startOfYesterday = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate()
  );
  const endOfYesterday = new Date(
    yesterday.getFullYear(),
    yesterday.getMonth(),
    yesterday.getDate() + 1
  );
  const avgHumiYesterday = await Humi.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfYesterday,
          $lt: endOfYesterday,
        },
      },
    },
    {
      $group: {
        _id: null,
        avgData: {
          $avg: {
            $convert: {
              input: "$data",
              to: "double",
              onError: 0,
              onNull: 0,
            },
          },
        },
      },
    },
  ]);
  const avgHumiTodayValue = parseFloat(avgHumiToday[0]?.avgData.toFixed(1));
  let avgHumiYesterdayValue = avgHumiYesterday[0]?.avgData;
  if (avgHumiYesterdayValue === undefined) avgHumiYesterdayValue = 24;
  // So sánh 2 giá trị trung bình
  const percentChange = (
    ((avgHumiTodayValue - avgHumiYesterdayValue) / avgHumiYesterdayValue) *
    100
  ).toFixed(1);

  console.log(avgHumiTodayValue, avgHumiYesterdayValue, percentChange);
  res.status(200).json({ avgHumiTodayValue, percentChange });
};
export const getAvgDevice = async (req, res, next) => {
  res.status(200).json({ totalDevice: 5, change: 0 });
};
export const getNotifications = async (req, res, next) => {
  const notifications = await Notification.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .exec();

  // Format the updatedAt field of each notification to a custom date format
  const formattedNotifications = notifications.map((notification) => {
    const updatedAt = moment(notification.updatedAt).format(
      "hh:mm A, DD/MM/YYYY"
    );
    return { ...notification._doc, updatedAt };
  });

  res.status(200).json({ message: "successful", data: formattedNotifications });
};

export const getUserLog = async (req, res, next) => {
  const userlogs = await UserLog.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .exec();

  // Format the updatedAt field of each userlog to a date and time format
  const formattedUserLogs = userlogs.map((userlog) => {
    const updatedAt = moment(userlog.updatedAt).format("DD/MM/YYYY HH:mm");
    return { ...userlog._doc, updatedAt };
  });

  res.status(200).json({ message: "successful", data: formattedUserLogs });
};

export const getChartTempData = async (req, res, next) => {
  // Lấy ngày hiện tại
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Đặt giờ về đầu ngày

  // Lấy tất cả các tài liệu của Temp trong ngày hôm nay
  Temp.find({ createdAt: { $gte: today } }, (err, temps) => {
    if (err) {
      console.error(err);
    } else {
      // Chuyển đổi mỗi đối tượng Temp thành đối tượng mới với trường x là createdAt và trường y là giá trị của Temp
      const data = temps.map((temp) => ({
        x: temp.createdAt,
        y: parseFloat(temp.data),
      }));
      res.status(200).json({ message: "successful", data: data });
    }
  });
};
export const getChartHumiData = async (req, res, next) => {
  // Lấy ngày hiện tại
  // Lấy ngày hiện tại
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Đặt giờ về đầu ngày

  // Lấy tất cả các tài liệu của Humi trong ngày hôm nay
  Humi.find({ createdAt: { $gte: today } }, (err, humis) => {
    if (err) {
      console.error(err);
    } else {
      // Chuyển đổi mỗi đối tượng Humi thành đối tượng mới với trường x là createdAt và trường y là giá trị của Humi
      const data = humis.map((humi) => ({
        x: humi.createdAt,
        y: parseFloat(humi.data),
      }));
      res.status(200).json({ message: "successful", data: data });
    }
  });
};

function isIsoDate(str) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str);
  return d instanceof Date && !isNaN(d) && d.toISOString() === str; // valid date
}
function average(data) {
  if (data.length == 0) {
    return 0;
  } else {
    return data.reduce((a, b) => a + b, 0) / data.length;
  }
}
function dataCal(data, today) {
  if (data.length > 0) {
    let result = [];
    let latest;
    if (today) {
      latest = new Date(data[data.length - 1][0]);
    } else {
      latest = new Date(data[data.length - 1][0]);
      latest.setHours(23);
    }
    let arr = new Array(24).fill([]);
    data.map((e) => {
      const d = new Date(e[0]);
      let t = d.getHours();
      arr[t] = [...arr[t], parseFloat(e[1])];
    });
    let eArr = new Array(24).fill(0);
    arr.map((e, i) => {
      eArr[i] = average(e);
    });
    for (let i = latest.getHours(), count = 23; count >= 0; count--) {
      result[count] = { hour: i, value: eArr[i] };
      if (i == 0) {
        i = 23;
      } else {
        i--;
      }
    }
    return result;
  } else {
    return [];
  }
}

export const getDayTemperatures = async (req, res, next) => {
  let date = req.query["date"] ? req.query["date"] : null;
  let params;
  let now = true;
  if (date && isIsoDate(date)) {
    let today = new Date();
    let d = new Date(date);
    if (
      today.getFullYear() == d.getFullYear() &&
      today.getMonth() == d.getMonth() &&
      today.getDate() == d.getDate()
    ) {
      params = {
        hours: 24,
      };
    } else {
      let startD = new Date(
        `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()}`
      );
      let startDString = startD.toISOString();
      let endD = new Date(
        `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate() + 1}`
      );
      let endDString = endD.toISOString();
      params = {
        start_time: startDString,
        end_time: endDString,
      };
      now = false;
    }
  } else {
    params = {
      hours: 24,
    };
  }
  adaRequest
    .get(`/feeds/ttq-temp/data/chart`, {
      params: params,
    })
    .then(({ data }) => {
      let values = data["data"];
      let ld = new Date(values[values.length - 1][0]);
      let newValues = values.filter((e) => {
        const d = new Date(e[0]);
        if (d.getHours() == ld.getHours() && d.getDate() == ld.getDate() - 1) {
          return false;
        }
        return true;
      });
      let result = dataCal(newValues, now);
      const newArray = result.map((item) => {
        return { x: item.hour, y: item.value };
      });
      res.status(200).json({ feed_key: "temperature", data: newArray });
    })
    .catch((error) => {
      res.status(400);
      return next(new Error(error.message));
    });
};

export const getDayHumidities = async (req, res, next) => {
  let date = req.query["date"] ? req.query["date"] : null;
  let params;
  let now = true;
  if (date && isIsoDate(date)) {
    let today = new Date();
    let d = new Date(date);
    if (
      today.getFullYear() == d.getFullYear() &&
      today.getMonth() == d.getMonth() &&
      today.getDate() == d.getDate()
    ) {
      params = {
        hours: 24,
      };
    } else {
      let startD = new Date(
        `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate()}`
      );
      let startDString = startD.toISOString();
      let endD = new Date(
        `${d.getFullYear()} ${d.getMonth() + 1} ${d.getDate() + 1}`
      );
      let endDString = endD.toISOString();
      params = {
        start_time: startDString,
        end_time: endDString,
      };
      now = false;
    }
  } else {
    params = {
      hours: 24,
    };
  }
  adaRequest
    .get(`/feeds/ttq-humi/data/chart`, {
      params: params,
    })
    .then(({ data }) => {
      let values = data["data"];
      let ld = new Date(values[values.length - 1][0]);
      let newValues = values.filter((e) => {
        const d = new Date(e[0]);
        if (d.getHours() == ld.getHours() && d.getDate() == ld.getDate() - 1) {
          return false;
        }
        return true;
      });
      let result = dataCal(newValues, now);
      const newArray = result.map((item) => {
        return { x: item.hour, y: item.value };
      });
      res.status(200).json({ feed_key: "humidity", data: newArray });
    })
    .catch((error) => {
      res.status(400);
      return next(new Error(error.message));
    });
};

export const getTempLog = async (req, res, next) => {
  const Templist = await Temp.aggregate([
    {
      $match: { room: "Phòng 1" },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $group: {
        _id: {
          room: "$room",
          value: "$value",
          updatedAt: "$updatedAt",
        },
        doc: { $first: "$$ROOT" },
      },
    },
    {
      $replaceRoot: { newRoot: "$doc" },
    },
    {
      $limit: 40,
    },
  ]).exec();
  const formattedTemplist = Templist.map((templog) => {
    const updatedAt = moment(templog.updatedAt).format("DD/MM/YYYY HH:mm");
    const value = parseFloat(templog.data);
    const room = templog.room;
    return { room, value, updatedAt };
  });
  res.status(200).json({
    message: "successful",
    data: formattedTemplist,
  });
};
export const getHumiLog = async (req, res, next) => {
  const Humilist = await Humi.aggregate([
    {
      $match: { room: "Phòng 1" },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $group: {
        _id: {
          room: "$room",
          value: "$value",
          updatedAt: "$updatedAt",
        },
        doc: { $first: "$$ROOT" },
      },
    },
    {
      $replaceRoot: { newRoot: "$doc" },
    },
    {
      $limit: 40,
    },
  ]).exec();
  const formattedHumilist = Humilist.map((humilog) => {
    const updatedAt = moment(humilog.updatedAt).format("DD/MM/YYYY HH:mm");
    console.log(humilog);
    const value = parseFloat(humilog.data);
    const room = humilog.room;
    return { room, value, updatedAt };
  });
  res.status(200).json({
    message: "successful",
    data: formattedHumilist,
  });
};
