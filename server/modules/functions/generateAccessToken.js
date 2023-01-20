const jwt = require("jsonwebtoken");

const secret = "SECRET";

function generateAccessToken(data, options) {
   return jwt.sign(data, secret, options);
}

module.exports = generateAccessToken;