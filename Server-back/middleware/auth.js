const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        var decoded = jwt.verify(token, process.env.SECRET);
        console.log(decoded);

        req.decoded = decoded;
        next();
    } catch (error) {
         res.redirect('/login');
    }
};