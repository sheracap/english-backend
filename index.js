require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./server/models/models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./server/routes/index");
const errorHandler = require("./server/middleware/ErrorHandlingMiddleware");
const path = require("path");

const PORT = process.env.PORT || 5000;

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