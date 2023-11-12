const express = require("express");
const path = require("path");

const app = express();
const { sequelize } = require("./models");

sequelize.sync({ force: false })
    .then(() => {
        console.log("데이터베이스 연결 성공");
    })
    .catch((err) => {
        console.error(err)
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