// const express = require("express");
// const app = express();
// const port = 3001;
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const mysql = require("mysql");
//
// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "test",
// });
//
// connection.connect();
//
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());
// app.use(bodyParser.json());
//
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
//
// app.post("/login", (req, res) => {
//   const telephone = req.body.Telephone;
//
//   // 추가 데이터로 phone 값을 지정합니다.
//
//
//   connection.query(
//     "INSERT INTO test (phone) VALUES (?)",
//     [telephone],
//     function (err, rows, fields) {
//       if (err) {
//         console.log("DB 저장 실패", err);
//         // 클라이언트에 에러 상태 전달
//         return res.status(500).json({ error: "DB 저장 실패" });
//       } else {
//         console.log("DB 저장 성공");
//         return res.status(200).json({ success: true });
//       }
//     }
//   );
// });
//
// app.post("/post", (req, res) => {
//   const imageData = req.body.image;
//   const phone = req.body.phone;
//
//   connection.query(
//     "UPDATE test SET image = ? WHERE phone = ?",
//     [imageData, phone],
//     function (err, results, fields) {
//       if (err) {
//         console.log("이미지 업로드 실패", err);
//         return res.status(500).json({ error: "이미지 업로드 실패" });
//       } else if (results.affectedRows === 0) {
//         console.log("일치하는 레코드가 없음");
//         return res.status(404).json({ error: "일치하는 레코드가 없음" });
//       } else {
//         console.log("이미지 업로드 성공");
//         return res.status(200).json({ success: true });
//       }
//     }
//   );
// });
//
// app.get('/timeline',(req,res) => {
//   connection.query(
//     "SELECT * from test",(err,data)=> {
//       if(err) {
//         console.log('err');
//         res.send(err);
//       }
//       else {
//         console.log("suceess");
//         res.send(data);
//       }
//     }
//   )
// })
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });