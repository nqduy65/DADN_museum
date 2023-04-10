// import { connect } from "mqtt"  // import connect from mqtt
// let client = connect('mqtt://test.mosquitto.org')
import mqtt from "mqtt";
// const username = "otaku2k22";
// const key = `aio_etPU89ndBbkDG4kKsGjSkjB3yY49`;
// const host = "mqtt://test.mosquitto.org";
const updateRealTime = (io) => {
  const type = "feeds";
  const host = "io.adafruit.com";
  const port = 8883;
  const username = "Relax71";
  const key = `aio_HUgU11yOJs4Y0vM9UvgejKoaiXGg`;
  const id_temp = "ttq-temp";
  const id_humi = "ttq-humi";
  const id_fan = "ttq-fan";
  const client = mqtt.connect({
    host: host,
    port: port,
    protocol: parseInt(port) === 8883 ? "mqtts" : "mqtt",
    username: username,
    password: key,
    connectTimeout: 60 * 1000,
    keepalive: 3600,
  });
  client.on("connect", () => {
    console.log("Adafruit connected");
    client.subscribe(`${username}/${type}/${id_temp}/json`);
    client.subscribe(`${username}/${type}/${id_humi}/json`);
    client.subscribe(`${username}/${type}/${id_fan}/json`);
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
    }
  });
  client.on("error", (error) => {
    console.error("MQTT error:", error);
  });
};

export default updateRealTime;
