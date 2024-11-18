const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log('Token received from cookie:', token);
        
        if (!token) { //ไม่มีtoken ไปหน้าlogin
            return res.redirect('/login');
        }

        // ตรวจสอบ token
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log(decoded);

        req.user = decoded;
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // token หมดอายุ ไปหน้า login 
            return res.redirect('/login');
        }

        console.error(error);  
        // เกิดข้อผิดพลาดอื่น ๆ ไปหน้า login 
        return res.redirect('/login');
    }
};
