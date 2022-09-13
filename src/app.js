const express = require("express");
const bodyPraser = require("body-parser");
const cors = require("cors");
const { sequelize } = require("./models");

const router = require("./router/index");

const app = express();

const PORT = process.env.PORT || 3030;

app.use(cors());

const corsOptions = {
  origin: "*",
  method: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyPraser.json());
app.use(bodyPraser.urlencoded({ extended: true }));
app.use("/", router);

app.get("/", (req, res) => {
  res.json({ message: `Server is running on port ${PORT}` });
});

sequelize
  .sync({ force: false }) //연결 유무 확인
  .then(() => {
    console.log("database 연결 성공");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
