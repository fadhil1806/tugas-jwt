const jwt = require('jsonwebtoken');
const { errorResponse } = require('../config/responseJson');

require('dotenv').config();
const {JWT_SECRET_KEY} = process.env;

async function authentication(req, res, next) {
    const authHeader = req.headers.authorization;
    jwt.verify(authHeader, JWT_SECRET_KEY, (err, decoded) => {
        console.log(err)
        if(err) return errorResponse(res, { error: "Invalid Token, Unauthorized" }, 401);
        req.user = decoded;
        return next();
    })
}
module.exports = authentication;