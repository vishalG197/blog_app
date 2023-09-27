const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); 

async function auth(req, res, next) { // Fixed the order of parameters
  try {
    const token = req.cookies.token;
   //  console.log(token);
    if (!token) {
      return res.status(403).json({ message: "Invalid token, please login to get the token" });
    }

    const decoded = jwt.verify(token, "blog");

    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // You can use decoded information in your routes, for example:
    req.body.username = decoded.username;
    req.body.date = new Date().toISOString().split('T')[0]
    req.body.likes = 0;
    req.body.comments=[];

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = auth;
