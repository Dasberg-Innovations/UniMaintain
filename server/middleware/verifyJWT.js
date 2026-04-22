const jwt = require("jsonwebtoken");

// middleware to verify JWT token and protect routes
const verifyJWT = (req, res, next) => {
    
    // get auth header from reques
    const authHeader = req.headers.authorization;

    // check if Bearer token exists
    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // extract token from header
    const token = authHeader.split(" ")[1];

    // verify token validity
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        
        // invalid or expired token
        if (err) {
            console.log("JWT Error:", err);
            return res.status(403).json({ message: "Forbidden" });            
        }

        // attach decoded user info to request object
        req.user = decoded.UserInfo;

        // continue to next middleware / controller
        next();
    });
};

module.exports = verifyJWT;