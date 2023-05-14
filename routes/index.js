const express = require("express");
const path = require("path");

const router = express.Router();

const XSS_vulnerability_site = require("./XSS_vulnerability_site")
const pathtraversal_vulnerability_site = require("./pathtraversal_vulnerability_site")
const OS_command_injection = require("./OS_command_injection")

router.get("/", (req, res) => {
    res.render("index.ejs");
});

router.use("/xss", XSS_vulnerability_site);

router.use("/path_traversal", pathtraversal_vulnerability_site)

router.use("/os_command_injection", OS_command_injection)

module.exports = router;