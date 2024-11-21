// import module
const express = require('express');
const dotenv = require('dotenv');
const path = require('path')
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
// const authorize = require("../Server-back/middleware/auth.js");


/* --------------------------*/
dotenv.config();
const app = express();
const Admin = express.Router();
app.use(cookieParser());

/* --------------------------*/
// ใช้ middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/* --------------------------*/
    // ตั้งค่าเส้นทาง static
app.use('/', express.static(path.join(__dirname, 'public')));

/* --------------------------*/
app.use('/', Admin);

//  404 ไม่พบเส้นทาง
app.use((req, res, next) => {
    res.status(404).send('Page Not Found');
});
// Error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
})
/* --------------------------*/
// กำหนดเส้นทางสำหรับการเรียกใช้ไฟล์ HTML ต่างๆ  
//ไม่ต้องยืนยันตัวตน
Admin.get('/', (req, res) => {
    console.log('Request at /');
    res.sendFile(path.join(__dirname, 'public', '/html/Home.html'));
})
Admin.get('/login', (req, res) => {
    console.log('Request at /login');
    res.sendFile(path.join(__dirname, 'public', '/html/Login.html'));
});
Admin.get('/Team', (req, res) => {
    console.log('Request at /Team');
    res.sendFile(path.join(__dirname, 'public', '/html/Team.html'));
});
Admin.get('/Search', (req, res) => {
    console.log('Request at /Search');
    res.sendFile(path.join(__dirname, 'public', '/html/Search.html'));
});
Admin.get('/Detail', (req, res) => {
    console.log('Request at /Detail');
    res.sendFile(path.join(__dirname, 'public', '/html/Detail.html'));
});
/* --------------------------*/
Admin.get('/LoginSuccess',(req, res) => {
    console.log('Request at /LoginSuccess');
    res.sendFile(path.join(__dirname, 'public', '/html/LoginSuccess.html'));
});
Admin.get('/Product_view', (req, res) => {
    console.log('Request at /Product');
    res.sendFile(path.join(__dirname, 'public', '/html/Product.html'));
});
Admin.get('/ProductAdd', (req, res) => {
    console.log('Request at /ProductAdd');
    res.sendFile(path.join(__dirname, 'public', '/html/ProductAdd.html'));
});
Admin.get('/ProductEdit', (req, res) => {
    console.log('Request at /ProductEdit');
    res.sendFile(path.join(__dirname, 'public', '/html/ProductEdit.html'));
});
Admin.get('/Admin', (req, res) => {
    console.log('Request at /User');
    res.sendFile(path.join(__dirname, 'public', '/html/Admin.html'));
});
Admin.get('/AdminAdd', (req, res) => {
    console.log('Request at /AdminAdd');
    res.sendFile(path.join(__dirname, 'public', '/html/AdminAdd.html'));
});
Admin.get('/AdminEdit', (req, res) => {
    console.log('Request at /AdminEdit');
    res.sendFile(path.join(__dirname, 'public', '/html/AdminEdit.html'));
});

/* --------------------------*/

// Run Server 
app.listen(process.env.PORT, function () {
    console.log(`Server is running on port: ${process.env.PORT}`);
});
