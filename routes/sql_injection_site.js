const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require("../models");
const router = express();

router.set('view engine', 'ejs');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/', (req, res) => {
  res.render('sql_injection_vulnerabililty_site.ejs');
});

router.post('/', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.redirect('/sql_injection?message=' + encodeURIComponent('Username and password must be provided.'));
  }

  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
    .then(users => {
      if (users.length > 0) {
        res.redirect(`/sql_injection?message=${encodeURIComponent(`Welcome, ${users[0].username}!`)}`);
      } else {
        res.redirect('/sql_injection?message=' + encodeURIComponent('Invalid username or password.'));
      }
    })
    .catch(err => {
      res.redirect('/sql_injection?message=' + encodeURIComponent('Error encountered while logging in.'));
    });
});

module.exports = router;
