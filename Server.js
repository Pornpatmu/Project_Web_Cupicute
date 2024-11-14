const express = require('express');
const dotenv = require('dotenv');
const path = require('path')

const cors = require('cors');
const bodyParser = require("body-parser")
const functionLogin = require('./functionLogin');


dotenv.config();
const app = express();
const Admin = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', express.static(path.join(__dirname, 'html')));
app.use('/c', express.static(path.join(__dirname, 'css')));
app.use('/i', express.static(path.join(__dirname, 'images')));



/* CORS */
let corsOptions = {
    origin: 'http://localhost:3001', // โดเมนที่อนุญาต
    methods: 'GET,POST,PUT,DELETE' // เมธอดที่อนุญาต
};
app.use(cors(corsOptions));

/* ******************/
Admin.get('/', (req, res) => {
    console.log('Request at /');
    res.sendFile(path.join(__dirname, 'html', '/Home.html'));
})
/* ******************/
Admin.get('/login', (req, res) => {
    console.log('Request at /login');
    res.sendFile(path.join(__dirname, 'html','/Login.html')); 
});
/* ******************/
Admin.get('/Team', (req, res) => {
    console.log('Request at /Team');
    res.sendFile(path.join(__dirname, 'html', 'Team.html'));
});
/* ******************/
// app.use((req, res) => {
//     console.log(`Request at ${req.path}`);
//     console.log('404: Invalid accessed');
//     res.status(404).sendFile(path.join(__dirname, 'html', 'error.html'));
// });
/* ******************/
app.post('/form-login', functionLogin.login);/* ******************/
/* ******************/


app.use('/', Admin);
/* Run Server */
app.listen(process.env.PORT, function () {
    console.log(`Server is running on port: ${process.env.PORT}`);
});
