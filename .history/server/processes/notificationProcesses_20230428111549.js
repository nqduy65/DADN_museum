import mqtt from "mqtt";
import {
  saveNotiOnDb,
  saveFanDb,
  saveTempDb,
  saveHumiDb,
  saveAutoDb,
} from "./modelSaver.js";
import { adaRequest } from "../utils/axios.js";
const listenEvents = (io) => {
  const username = `${process.env.ADAFRUIT_USERNAME}`;
  const key = `${process.env.ADAFRUIT_KEY}`;
  const host = "mqtt://io.adafruit.com";
  const client = mqtt.connect(host, {
    username: username,
    password: key,
  });
  var last_update_temp = Date.now();
  var last_update_humi = Date.now();
  var last_update_fan = Date.now();
  var last_update_light = Date.now();
  // var last_update_pump = Date.now();
  var last_update_ct = Date.now();
  client.on("connect", () => {
    console.log("<Notification Processes> Client listen connect Events");
    /* client.subscribe(`${username}/feeds/temperature`);
    client.subscribe(`${username}/feeds/humidity`);
    client.subscribe(`${username}/feeds/soild-moisture`); */
    client.subscribe(`${username}/feeds/ttq-fan`);
    client.subscribe(`${username}/feeds/ttq-autofan`);
    client.subscribe(`${username}/feeds/ttq-humi`);
    client.subscribe(`${username}/feeds/ttq-temp`);
    client.subscribe(`${username}/feeds/ttq-light`);
    client.subscribe(`${username}/feeds/ttq-ct`);
  });
  client.on("message", (topic, message) => {
    console.log(topic, JSON.parse(message.toString()));
    const data = parseFloat(message.toString());
    const createAt = new Date();
    let mess = "";
    /* if(topic.endsWith('temperature')) {

        } else if(topic.endsWith('humidity')) {

        } else if(topic.endsWith('soild-moisture')) {

        } else  */
    if (topic.endsWith("ttq-fan")) {
      last_update_temp = createAt;
      saveFanDb("Phòng 1", data);
      last_update_fan = createAt;
      if (data == 0) {
        mess = "Fan was turned off";
      } else if (data == 1) {
        mess = "Fan was turned on";
      } /*  else if (data == 2) {
                mess = "Fan was turned on medium";
            } else if (data == 3) {
                mess = "Fan was turned on high";
            } */ else {
        mess = "Fan status was adjusted";
      }
      saveNotiOnDb("ttq-fan", mess, createAt);
      io.emit("newNotification", { message: mess, createdAt: createAt });
    } else if (topic.endsWith("ttq-autofan")) {
      saveAutoDb("Phòng 1", data);
    } else if (topic.endsWith("ttq-temp")) {
      last_update_temp = createAt;
      saveTempDb("Phòng 1", data);
      if (data <= 10) {
        mess = `Nhiệt độ quá thấp, dưới 10 độ C (${data} độ C)`;
      } else if (data >= 40) {
        mess = `Nhiệt độ quá cao, trên 40 độ C (${data} độ C)`;
      } else {
        mess = `Nhiệt độ bình thường, (${data} độ C)`;
      }
      saveNotiOnDb("ttq-temp", mess, createAt);
      io.emit("newNotification", { message: mess, createdAt: createAt });
    } else if (topic.endsWith("ttq-autofan")) {
      if (data == 0) {
        mess = "Quạt đã chỉnh sang thủ công";
      } else if (data == 1) {
        mess = "Quạt đã chỉnh sang tự động";
      } else {
        mess = "Mode was adjusted";
      }
      saveNotiOnDb("ttq-autofan", mess, createAt);
      io.emit("newNotification", { message: mess, createdAt: createAt });
    } else if (topic.endsWith("ttq-humi")) {
      last_update_humi = createAt;
      saveHumiDb("Phòng 1", data);
      if (data <= 10) {
        mess = `Độ ẩm quá thấp, dưới 10 % (${data} %)`;
      } else if (data >= 40) {
        mess = `Độ ẩm quá cao, trên 40 % (${data} %)`;
      } else {
        mess = `Độ ẩm bình thường, (${data} %)`;
      }
      saveNotiOnDb("pump", mess, createAt);
      io.emit("newNotification", { message: mess, createdAt: createAt });
    } else if (topic.endsWith("ttq-light")) {
      last_update_light = createAt;
    } else if (topic.endsWith("ttq-tc")) {
      last_update_ct = createAt;
    }
  });

  function checkConnection() {
    // console.log(Date.now()-last_update_temp)
    let deviceCount = 0;
    if (Date.now() - last_update_temp > 1000 * 30) {
      console.log("Temp Disconnected");
    } else {
      deviceCount = deviceCount + 1;
      console.log("Temp Connected");
    }
    if (Date.now() - last_update_humi > 1000 * 30) {
      console.log("Humi Disconnected");
    } else {
      deviceCount = deviceCount + 1;
      console.log("Humi Connected");
    }
    if (Date.now() - last_update_light > 1000 * 30) {
      console.log("Light Disconnected");
    } else {
      deviceCount = deviceCount + 1;
      console.log("Light Connected");
    }
    if (Date.now() - last_update_fan > 1000 * 30) {
      console.log("Fan Disconnected");
    } else {
      deviceCount = deviceCount + 1;
      console.log("Fan Connected");
    }
    if (Date.now() - last_update_ct > 1000 * 30) {
      console.log("Ct Disconnected");
    } else {
      deviceCount = deviceCount + 1;
      console.log("Ct Connected");
    }

    io.emit("deviceConnect", {
      deviceCount: deviceCount,
      total: 5 - deviceCount,
    });
    // if (Date.now() - last_update_fan2 > 12000) {
    //   console.log("Fan 2 Disconnected");
    // } else {
    //   console.log("Fan 2 Connected");
    // }
    // if (Date.now() - last_update_ct > 12000) {
    //   console.log("CT Disconnected");
    // } else {
    //   console.log("CT Connected");
    // }
    // if (Date.now() - last_update_pump > 12000) {
    //   console.log("Pump Disconnected");
    // } else {
    //   console.log("PUmp Connected");
    // }
  }
  const getLogDataTemp = () => {
    console.log("Take data Temp");
    adaRequest
      .get("/feeds/ttq-temp/data/last")
      .then(({ data }) => {
        const value = parseFloat(data.value);
        saveTempDb("Phòng 1", value);
      })
      .catch((error) => {
        res.status(400);
        return next(new Error(error.message));
      });
  };
  const getLogDataHumi = () => {
    console.log("Take data Humi");
    adaRequest
      .get("/feeds/ttq-humi/data/last")
      .then(({ data }) => {
        const value = parseFloat(data.value);
        saveHumiDb("Phòng 1", value);
      })
      .catch((error) => {
        res.status(400);
        return next(new Error(error.message));
      });
  };
  checkConnection();
  setInterval(checkConnection, 1000 * 5);
  setInterval(getLogDataTemp, 1000 * 60 * 60);
  setInterval(getLogDataHumi, 1000 * 60 * 60);
};

export default listenEvents;
