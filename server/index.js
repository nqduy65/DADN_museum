import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import http from "http";
import updateRealTime from "./adafruit/updateRealTime.js";
import listenEvents from "./processes/notificationProcesses.js";
import { Server } from "socket.io";
import connectDB from "./config/connectDB.js";
import route from "./routes/index.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --------------------------DEPLOYMENT-----------------------
// let __dirname1 = path.resolve();
// __dirname1 = __dirname1.substring(0, __dirname1.length - 7)
// console.log(__dirname1)

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname1, "/client/build")));

//     app.get("*", (req, res) =>
//       res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
//     );
//   } else {
//     app.get("/", (req, res) => {
//       res.send("API BKMotel is running..");
//     });
// }
// --------------------------DEPLOYMENT-----------------------
app.use(cors());
connectDB();

const server = http.createServer(app);

const ioServer = new Server(server, {
  cors: {
    origin: `*`,
  },
});

updateRealTime(ioServer);
// listenEvents(ioServer);
ioServer.listen(process.env.SOCKET_PORT);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
//   })
//   .catch((error) => console.log(`Server can't listening`));

route(app);
app.use(notFound);
// app.use(errorHandler);
