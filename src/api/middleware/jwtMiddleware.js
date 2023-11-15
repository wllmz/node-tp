const jwt = require("jsonwebtoken");
require('dotenv').config()


const jwtkey = process.env.JWT_KEY;


exports.verifyToken = async (req, res, next) => {
    try {
      const token = req.headers["authorization"];
      if (token !== undefined) {
        const payload = await new Promise((resolve, reject) => {
          jwt.verify(token, jwtkey, (error, decoded) => {
            if (error) return reject(error);
            resolve(decoded);
          });
        });
        req.user = payload;
        next();
      } else {
        res.status(403).json({
          status: "fail",
          message: "token manquant",
        });
      }
    } catch (error) {
      res.status(403).json({
        status: "fail",
        message: "token invalid",
      });
    }
  };

