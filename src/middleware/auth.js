const jwt = require("jsonwebtoken");

function authentification(req, res, next) {
    const { access_token } = req.headers;
    if (access_token) {
        const decode = jwt.verify(access_token, process.env.JWT_SECRET);
        console.log(decode, "decode");
        req.userData = decode;
        next();
    } else {
        res.status(401).json({ message: `Unauthenticated` });
    }
}
module.exports = { authentification };
