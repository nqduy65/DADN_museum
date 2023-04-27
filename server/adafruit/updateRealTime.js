// import { connect } from "mqtt"  // import connect from mqtt
// let client = connect('mqtt://test.mosquitto.org')
import mqtt from "mqtt";
import Fan from "../models/fanModel.js";
// const username = "otaku2k22";
// const key = `aio_etPU89ndBbkDG4kKsGjSkjB3yY49`;
// const host = "mqtt://test.mosquitto.org";
const updateRealTime = (io) => {
  const username = `${process.env.ADAFRUIT_USERNAME}`;
  const key = `${process.env.ADAFRUIT_KEY}`;
  const host = "mqtt://io.adafruit.com";
  const type = "feeds";
  const id_temp = "ttq-temp";
  const id_humi = "ttq-humi";
  const id_fan = "ttq-fan";
  const id_autofan = "ttq-autofan";
  const client = mqtt.connect(host, {
    username: username,
    password: key,
  });
  client.on("connect", () => {
    console.log("<Update real Time> Update> Client listen connect Events");
    /* client.subscribe(`${username}/feeds/temperature`);
    client.subscribe(`${username}/feeds/humidity`);
    client.subscribe(`${username}/feeds/soild-moisture`); */
    client.subscribe(`${username}/${type}/${id_temp}/json`);
    client.subscribe(`${username}/${type}/${id_humi}/json`);
    client.subscribe(`${username}/${type}/${id_fan}/json`);
    client.subscribe(`${username}/${type}/${id_autofan}/json`);
    client.subscribe(`${username}/${type}/ttq-ct/json`);
    client.subscribe(`${username}/${type}/ttq-light/json`);
  });
  function modifyTime(a) {
    a = a.replace("T", "");
    a = a.replace("Z", "");
    var year = parseInt(a.substring(0, 4));
    var month = parseInt(a.substring(5, 7));
    var day = parseInt(a.substring(8, 10));
    var hours = parseInt(a.substring(10, 12));
    var minutes = parseInt(a.substring(13, 15));
    var seconds = parseInt(a.substring(16, 18));
    var milliseconds = 0;
    var res = new Date(year, month, day, hours, minutes, seconds, milliseconds);
    res.setTime(res.getTime() + 7 * 60 * 60 * 1000);
    res = res.toString();
    // time_change = datetime.timedelta(hours=7)
    // x = datetime.datetime(year,month,day,hour,minute,second) + time_change
    return res.substring(0, res.search("GMT"));
  }
  client.on("message", function (topic, message) {
    console.log(
      "<Update real Time> Update>",
      topic,
      JSON.parse(message.toString())
    );
    var createAt = modifyTime(JSON.parse(message.toString()).data.created_at);
    var data = JSON.parse(message.toString()).last_value;
    if (topic.search("ttq-temp") != -1) {
      console.log(`Temperature: ${data}`);
      console.log(`Create at: ${createAt}`);
      io.emit("temperatureUpdate", { temperature: data, date: createAt });
    } else if (topic.search("ttq-humi") != -1) {
      io.emit("humidityUpdate", { humidity: data, date: createAt });

      console.log(`humidityUpdate: ${data}%`);
      console.log(`Create at: ${createAt}`);
    } else if (topic.search("ttq-fan") != -1) {
      io.emit("fanUpdate", { fan: data });
      console.log(`FanLevel: ${data}`);
      console.log(`Create at: ${createAt}`);
      // const newFan = new Fan({ room: "phong 1", data: data });
      // newFan.save();
    } else if (topic.search("ttq-autofan") != -1) {
      io.emit("autoUpdate", { auto: data });
      console.log(`Auto: ${data}`);
      console.log(`Create at: ${createAt}`);
      // const newFan = new Fan({ room: "phong 1", data: data });
      // newFan.save();
    } else if (topic.search("ttq-light") != -1) {
      io.emit("lightUpdate", { light: data });
      console.log(`Light: ${data}`);
      console.log(`Create at: ${createAt}`);
      // const newFan = new Fan({ room: "phong 1", data: data });
      // newFan.save();
    } else if (topic.search("ttq-ct") != -1) {
      io.emit("ctUpdate", { ct: data });
      console.log(`ct: ${data}`);
      console.log(`Create at: ${createAt}`);
      // const newFan = new Fan({ room: "phong 1", data: data });
      // newFan.save();
    }
  });
  client.on("error", (error) => {
    console.error("MQTT error:", error);
  });
};

export default updateRealTime;
