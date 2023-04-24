import Notification from "../models/notificationModel.js";
import Humi from "../models/humiModel.js";
import Fan from "../models/fanModel.js";
import Temp from "../models/tempModel.js";
import Auto from "../models/autoModel.js";
export const saveNotiOnDb = async (feed, content, createdAt) => {
  let noti = new Notification({
    feed,
    content,
    createdAt,
  });
  await noti
    .save()
    .then((res) => {
      console.log(`<modelSaver> ${res.content} and saved into database`);
      return true;
    })
    .catch((e) => {
      console.log(`Error ${e}`);
    });
  return false;
};

export const saveFanDb = async (room, data) => {
  let fan = new Fan({
    room,
    data,
  });
  await fan
    .save()
    .then((res) => {
      console.log(`<modelSaver__Fan> ${res.data} and saved into database`);
      return true;
    })
    .catch((e) => {
      console.log(`Error ${e}`);
    });
  return false;
};

export const saveTempDb = async (room, data) => {
  let fan = new Temp({
    room,
    data,
  });
  await fan
    .save()
    .then((res) => {
      console.log(`<modelSaver> ${res.data} and saved into database`);
      return true;
    })
    .catch((e) => {
      console.log(`Error ${e}`);
    });
  return false;
};

export const saveHumiDb = async (room, data) => {
  let fan = new Humi({
    room,
    data,
  });
  await fan
    .save()
    .then((res) => {
      console.log(`<modelSaver> ${res.content} and saved into database`);
      return true;
    })
    .catch((e) => {
      console.log(`Error ${e}`);
    });
  return false;
};
export const saveAutoDb = async (room, data) => {
  let auto = new Auto({
    room,
    data,
  });
  await auto
    .save()
    .then((res) => {
      console.log(`<modelSaver> ${res.content} and saved into database`);
      return true;
    })
    .catch((e) => {
      console.log(`Error ${e}`);
    });
  return false;
};
