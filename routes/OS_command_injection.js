const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.render('OS_command_injection.ejs');
});

router.get('/result', (req, res) => {
  const command = req.query.command;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send('Internal Server Error');
    }

    res.render('OS_command_injection_result.ejs', { output: stdout });
  });
});

router.get('/result', (req, res) => {
  res.render('OS_command_injection_result.ejs');
});

module.exports = router;