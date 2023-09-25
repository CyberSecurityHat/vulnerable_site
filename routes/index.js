const express = require("express");
const path = require("path");

const router = express.Router();

const reflected_xss_vulnerability_site = require("./reflected_xss_vulnerability_site")
const pathtraversal_vulnerability_site = require("./pathtraversal_vulnerability_site")
const OS_command_injection = require("./OS_command_injection")
const stored_xss_vulnerability_site_board = require("./stored_xss_vulnerability_site_board.js")

router.get("/", (req, res) => {
    res.render("index.ejs");
});

router.use("/reflected_xss", reflected_xss_vulnerability_site);

router.use("/path_traversal", pathtraversal_vulnerability_site)

router.use("/os_command_injection", OS_command_injection)

router.use("/stored_xss/board", stored_xss_vulnerability_site_board)

module.exports = router;