const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log('Token received from cookie:', token);
        
        if (!token) {
            return res.status(401).json({ error: true, message: "Authentication failed! No token provided." });
        }
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log(decoded);

        req.user = decoded;
        next();

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: true, message: "Token has expired!" });
        }
        console.error(error);  
        res.status(401).json({ error: true, message: "Authentication failed!" });
    }
};
