// import module
const express = require('express');
const dotenv = require('dotenv');
const path = require('path')
const mysql = require('mysql2');
const authorize = require("./middleware/auth");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const multer = require('multer');



/* --------------------------*/
dotenv.config();
const app = express();
const Admin = express.Router();
const upload = multer({ dest: 'uploads/' }); // โฟลเดอร์สำหรับเก็บรูปภาพ
// ใช้ path.join() เพื่อสร้าง path ที่ถูกต้อง
const folderPath = path.join('C:', 'Users', 'DELL', 'OneDrive', 'เดสก์ท็อป', 'Web', 'Demo_Web_Cupicute', 'Server-front', 'public', 'images', 'Product');
console.log(folderPath); // จะแสดงผลเป็น path ที่ถูกต้องสำหรับระบบปฏิบัติการ
app.use(cookieParser());

/* --------------------------*/
// ใช้ middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* --------------------------*/

/* CORS */
let corsOptions = {
    origin: 'http://localhost:3001', // โดเมนที่อนุญาต
    methods: 'GET,POST,PUT,DELETE', // เมธอดที่อนุญาต
    credentials: true, // อนุญาตให้ส่ง cookies

};
app.options('*', cors(corsOptions)); // Enable preflight for all routes
app.use(cors(corsOptions));

/* --------------------------*/

// เชื่อมต่อฐานข้อมูล
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
connection.connect(function (err) {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1);  //หยุดการทำงานของ server
    }
    console.log(`Connected DB: ${process.env.DB_NAME}`);
});
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


// /* กำหนดเส้นทางสำหรับการดึงข้อมูลจากฐานข้อมูล

// ============   Upload Image    ============ */

// กำหนดโฟลเดอร์สำหรับจัดเก็บไฟล์
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'C:/Users/DELL/OneDrive/เดสก์ท็อป/Web/Demo_Web_Cupicute/Server-front/public/images/Product');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // ตั้งชื่อไฟล์ให้ไม่ซ้ำ
    },
});

app.post('/uploadImage', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});


// ============  PRODUCT Insert    ============ */
Admin.post('/product', function (req, res) {
    let product = req.body;

    const {productId,productName,price,description,category} = req.body;
    console.log(productId);
    if (!product) {
        return res.status(400).send({
            error: true,
            message: 'Please provide Product information'
        });
    }
    console.log('Received categoryID:', category);
    const value = [productId,productName,price,description,category]
    console.log(value)
    connection.query("INSERT INTO product (ProductID,ProductName,Price,P_Description,CategoryID) VALUES (?,?,?,?,?)", value, function (error, results) {
        if (error) throw error;
        return res.status(200).send({
            error: false,
            data: results,
            message: 'New Product has been created successfully'
        });
    });
});
// ==  PRODUCT Update    == 
// Admin.put('/product',authorize, function (req, res) {
//     let ProductID = req.body.ProductID;
//     let product = req.body.product;

//     if (!ProductID || !product) {
//         return res.status(400).send({
//             error: product,
//             message: 'Please provide Product information'
//         });
//     }
//     connection.query("UPDATE product SET ? WHERE ProductID = ?", [product, ProductID], function (error, results) {
//         if (error) throw error;
//         return res.send({
//             error: false,
//             data: results.affectedRows,
//             message: 'Product has been update successfully'
//         });
//     });
// });

// ==  PRODUCT Update    == 
Admin.put('/product/:id', function (req, res) {
    const { ProductID, product } = req.body;
    const productIdFromBody = ProductID || req.params.id;  // ใช้ ProductID จาก body หรือจาก URL

    console.log('Received ID:', productIdFromBody);
    console.log('Received Payload:', JSON.stringify(req.body, null, 2));

    // ตรวจสอบว่า ProductID และ product ถูกส่งมาครบถ้วน
    if (!productIdFromBody || !product || typeof product !== 'object') {
        return res.status(400).send({
            error: true,
            message: 'Please provide valid ProductID and product details',
        });
    }

    // อัปเดตสินค้าในฐานข้อมูล
    connection.query(
        "UPDATE product SET ? WHERE ProductID = ?",
        [product, productIdFromBody],  // ใช้ productIdFromBody แทน req.params.id
        function (error, results) {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).send({
                    error: true,
                    message: 'Internal Server Error',
                });
            }

            // ตรวจสอบว่ามีการอัปเดตจริงหรือไม่
            if (results.affectedRows === 0) {
                return res.status(404).send({
                    error: true,
                    message: `No product found with ProductID: ${productIdFromBody}`,
                });
            }

            // ส่ง Response กลับไปยัง Client
            return res.send({
                error: false,
                data: results,
                message: 'Product has been updated successfully',
            });
        }
    );
});

// ==  PRODUCT Delete    == 
Admin.delete('/product', function (req, res) {
    console.log('Received DELETE Request:');
    console.log('Body:', req.body); // Debug เพื่อดูว่า `ProductID` ถูกส่งมาหรือไม่

    let ProductID = req.body.ProductID;

    if (!ProductID) {
        return res.status(400).send({
            error: true,
            message: 'Please provide ProductID',
        });
    }

    connection.query('DELETE FROM product WHERE ProductID = ?', [ProductID], function (error, results) {
        if (error) {
            console.error('Error in SQL query:', error);
            throw error;
        }
        return res.send({
            error: false,
            data: results.affectedRows,
            message: 'Product has been deleted successfully',
        });
    });
});
// == PRODUCT Select    == 
Admin.get('/product/:id', function (req, res) {
    let ProductID = req.params.id;

    if (!ProductID) {
        return res.status(400).send({
            error: true,
            message: 'Please provide ProductID'
        });
    }
    connection.query("SELECT * FROM product WHERE ProductID = ?", [ProductID], function (error, results) {
        if (error) throw error;
        if (results.length === 0) {
            return res.status(404).send({
                error: true,
                message: 'Product not found.'
            });
        }

        return res.send({
            error: false,
            data: results[0],
            message: 'Product retrieved'
        });
    });
});
// ==  PRODUCT Select all    == 
Admin.get('/products', function (req, res) {
    connection.query("SELECT * FROM product", function (error, results) {
        if (error) throw error;
        return res.send({
            error: false,
            data: results,
            message: 'Product list'
        });
    });
});


// ============      ============
// Route สำหรับ Product_Edit
// ---------------------ของ เฟิร์น------------------
app.get('/Product_Edit', (req, res) => {
    const productId = req.query.productId; // ดึงค่า productId จาก query string
    if (productId) {
        res.send(`Edit Page for Product ID: ${productId}`);
    } else {
        res.status(400).send('Product ID is missing');
    }
});
// -------------------เก่า---------------------
// app.get('/Product_Edit', (req, res) => {
//     const productId = req.query.productId; // ดึงค่า productId จาก query string
//     if (!productId) {
//         return res.status(400).send('Product ID is missing');
//     }

//     // SQL Query เพื่อดึงข้อมูลผลิตภัณฑ์
//     const sql = `SELECT * FROM products WHERE ProductID = ?`;
//     db.query(sql, [productId], (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Database query error');
//         }
//         if (result.length > 0) {
//             res.json(result[0]); // ส่งข้อมูลผลิตภัณฑ์กลับในรูปแบบ JSON
//         } else {
//             res.status(404).send('Product not found');
//         }
//     });
// });
// -----------------Product Edit Get---------------

// app.get('/Product_Edit', (req, res) => {
//     const productId = req.query.productId;
//     console.log('Product ID:', productId); // Debug
//     if (productId) {
//         res.sendFile(path.join(__dirname, 'public', 'html', 'ProductEdit.html')); // ตรวจสอบตำแหน่งไฟล์
//     } else {
//         console.error('Product ID is missing');
//         res.status(400).send('Product ID is missing');
//     }
// });

// ============  ADMIN + USER Insert    ============
Admin.post('/userAdmin',authorize, (req, res) => {
    let { user, admin } = req.body;
    console.log(user, admin);

    if (!user || !admin) {
        return res.status(400).send({
            error: true,
            message: 'Please provide both User and Admin information'
        });
    }
    // เพิ่มข้อมูล Admin ก่อน
    connection.query("INSERT INTO admin SET ?", admin, function (error, adminResults) {
        if (error) throw error;

        // นำ AdminID ที่เพิ่งสร้างไปใช้กับ User
        user.AdminID = adminResults.insertId;
        connection.query("INSERT INTO user SET ?", user, function (error, userResults) {
            if (error) throw error;
            return res.send({
                error: false,
                data: { admin: adminResults.affectedRows, user: userResults.affectedRows },
                message: 'User and Admin have been created successfully'
            });
        });
    });
});
// ==  ADMIN + USER Update    == 
Admin.put('/userAdmin',authorize, function (req, res) {
    let { user, admin } = req.body;

    if (!user || !user.UserID || !admin || !admin.AdminID) {
        return res.status(400).send({
            error: true,
            message: 'Please provide both UserID and AdminID information'
        });
    }
    connection.query("UPDATE admin SET ? WHERE AdminID = ?", [admin, admin.AdminID], function (error, adminResults) {
        if (error) throw error;
        connection.query("UPDATE user SET ? WHERE UserID = ?", [user, user.UserID], function (error, userResults) {
            if (error) throw error;
            return res.send({
                error: false,
                data: { admin: adminResults.affectedRows, user: userResults.affectedRows },
                message: 'User and Admin have been updated successfully'
            });
        });
    });
});
// ==  ADMIN + USER Delete    == 
Admin.delete('/userAdmin',authorize, function (req, res) {
    let { UserID, AdminID } = req.body;

    if (!UserID || !AdminID) {
        return res.status(400).send({
            error: true,
            message: 'Please provide both UserID and AdminID'
        });
    }
    connection.query("DELETE FROM user WHERE UserID = ?", [UserID], function (error, userResults) {
        if (error) throw error;

        connection.query("DELETE FROM admin WHERE AdminID = ?", [AdminID], function (error, adminResults) {
            if (error) throw error;
            return res.send({
                error: false,
                data: { admin: adminResults.affectedRows, user: userResults.affectedRows },
                message: 'User and Admin have been deleted successfully'
            });
        });
    });
});
// ==  ADMIN + USER Select    == 
Admin.get('/userAdmin/:id',authorize, function (req, res) {
    let UserID = req.params.id;

    if (!UserID) {
        return res.status(400).send({
            error: true,
            message: 'Please provide UserID'
        });
    }

    // ใช้ JOIN เพื่อดึงข้อมูลทั้งสองตาราง
    connection.query(
        `SELECT u.UserID, u.Username, u.U_Password, u.LoginTimestamp, u.User_Image, 
                a.AdminID, a.FirstName, a.LastName, a.PhoneNumber, a.Address, a.Email
         FROM user u
         JOIN admin a ON u.AdminID = a.AdminID
         WHERE u.UserID = ?`,
        [UserID],
        function (error, results) {
            if (error) throw error;

            if (results.length === 0) {
                return res.status(404).send({
                    error: true,
                    message: 'User not found'
                });
            }

            return res.send({
                error: false,
                data: results[0],
                message: 'User and Admin data retrieved successfully'
            });
        }
    );
});
// ==  ADMIN + USER Select all   ==
Admin.get('/userAdmins',authorize, function (req, res) {
    connection.query(
        `SELECT u.UserID, u.Username, u.U_Password, u.LoginTimestamp, u.User_Image, 
                a.AdminID, a.FirstName, a.LastName, a.PhoneNumber, a.Address, a.Email
         FROM user u
         JOIN admin a ON u.AdminID = a.AdminID`,
        function (error, results) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'User and Admin list retrieved successfully'
            });
        }
    );
});
/* --------------------------*/
//เส้นทางในการเข้าสู่ระบบ (สร้างtoken)
Admin.post("/signin", (req, res) => {
    console.log(req.body);

    let { username, password } = req.body;

    connection.query(
        "SELECT * FROM user WHERE Username = ? AND U_Password = ?",
        [username, password],
        (error, results) => {
            if (error)
                return res.status(500).json({ error: "Database error" });
            if (results.length === 0) {
                return res.status(401).json({ error: "Invalid username or password" });
            }
            let jwtToken = jwt.sign(
                { user: username },
                process.env.SECRET,
                { expiresIn: "1h" } // 1 ชม. หมดอายุ
            );
            res.status(200).json({
                message: "Login successful",
                token: jwtToken
            });
        }
    );
});
// Admin.get("/test"), (req, res) => {
//     connection.query(SELECT * FROM productcategory WHERE CategoryID = 'CategoryValue';
// }



/* --------------------------*/
// Run Server 
app.listen(process.env.PORT, function () {
    console.log(`Server-back is running on port: ${process.env.PORT}`);
});
