const jwt = require("jsonwebtoken");

const secret = "SECRET";

function generateAccessToken(data, options) {
   return jwt.sign(data[0], secret, options);
}

module.exports = generateAccessToken;