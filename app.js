const express = require("express");
const path = require("path");

const app = express();
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