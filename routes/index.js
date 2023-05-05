const express = require("express");
const path = require("path");

const router = express.Router();

const XSS_vulnerability_site = require("./XSS_vulnerability_site")
const pathtraversal_vulnerability_site = require("./pathtraversal_vulnerability_site")

router.get("/", (req, res) => {
    res.render("index.ejs");
});

router.use("/XSS", XSS_vulnerability_site);

router.use("/path_traversal", pathtraversal_vulnerability_site)

module.exports = router;