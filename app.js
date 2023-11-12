const express = require("express");
const path = require("path");

const app = express();
const db = require('./models'); // 'models/index.js' 파일 불러오기

// 데이터베이스 테이블 동기화
db.sequelize.sync().then(() => {
  console.log("Synced with the database.");
}).catch((err) => {
  console.error("Failed to sync with the database:", err);
});

app.set("port", process.env.PORT | 3000);

const indexRouter = require("./routes");

app.set("view engine", "ejs");

app.use("/", express.static(path.join(__dirname, "public"))); //for static files(relative path)
app.use(express.json());

app.use("/", indexRouter);

app.use((req, res, next) => {
    res.status(404).send("Not Found");
})

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트 실행중");
})