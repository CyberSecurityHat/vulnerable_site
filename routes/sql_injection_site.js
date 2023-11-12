const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const router = express();

// 데이터베이스 연결 설정
const sequelize = new Sequelize('mysql://root:root@localhost:3306/vuln_site', {
  logging: console.log // 로깅을 활성화하여 SQL 쿼리를 볼 수 있게 합니다. 
});

// EJS 템플릿 엔진 설정
router.set('view engine', 'ejs');

// body-parser를 사용하여 URL 인코딩 및 JSON 파싱 설정
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// 로그인 페이지 라우트
router.get('/', (req, res) => {
  res.render('sql_injection_vulnerabililty_site.ejs'); // EJS 파일 이름 확인 필요
});

// 취약한 로그인 처리 라우트
router.post('/', (req, res) => {
    // 사용자 입력을 직접 쿼리에 삽입
    const username = req.body.username;
    const password = req.body.password;
    // 취약한 쿼리 생성
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    // 취약한 쿼리 실행
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
