const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const router = express();

// 데이터베이스 연결 설정
let db = new sqlite3.Database(':memory:');

// EJS 템플릿 엔진 설정
router.set('view engine', 'ejs');

// body-parser를 사용하여 URL 인코딩 및 JSON 파싱 설정
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// 데이터베이스와 테이블 초기화
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['demo', 'demo']);
});

// 로그인 페이지 라우트
router.get('/', (req, res) => {
  res.render('sql_injection_vulnerabililty_site.ejs');
});

// 취약한 로그인 처리 라우트
router.post('/', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  
    db.get(query, (err, row) => {
      if (err) {
        res.redirect(`/sql_injection?message=${encodeURIComponent('Error encountered while logging in.')}`);
      } else if (row) {
        res.redirect(`/sql_injection?message=${encodeURIComponent(`Welcome, ${row.username}!`)}`);
      } else {
        res.redirect('/sql_injection?message=' + encodeURIComponent('Invalid username or password.'));
      }
    });
  });
  

// 서버 종료 시 데이터베이스 연결 해제
process.on('exit', () => {
  db.close();
});

module.exports = router;