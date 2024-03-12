const jwt = require("jsonwebtoken");
require("dotenv").config();

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

const Protect = async (req, res, next) => {
    try {
        let { authorization } = req.headers;
        let Bearer = authorization.split(" ");
        let decode = jwt.decode(Bearer[1], process.env.JWT_SECRET);
        req.payload = decode;
        next();
    } catch (err) {
        return res.status(404).json({ status: 404, message: "token wrong" });
    }
};

module.exports = { authentification, Protect };
