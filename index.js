require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./server/models/models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./server/routes/index");
const errorHandler = require("./server/middleware/ErrorHandlingMiddleware");
const path = require("path");
const events = require("events");

const PORT = process.env.PORT || 5000;
const emitter = new events.EventEmitter();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "server/static")));
app.use(fileUpload({}));
app.use("/api", router);

// Обработка ошибок последний middleware
app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({ message: "working" });
});

app.get("/connect", (req, res) => {
  res.writeHead(200, {
    "Connection": "keep-alive",
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache"
  });

  emitter.on("newMessage", (message) => {
    if (String(message.id) === String(req.query.userid)) {
      res.write(`data: ${JSON.stringify(message)} \n\n`);
    }
  });
});

app.post("/new-message", ((req, res) => {
  const message = req.body;
  emitter.emit("newMessage", message);
  res.status(200).send("hey");
}));

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server is started on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();