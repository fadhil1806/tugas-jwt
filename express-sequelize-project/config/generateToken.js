const jwt = require('jsonwebtoken')
require('dotenv').config();

const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = process.env;

async function generateToken(data) {
    return jwt.sign(data, JWT_SECRET_KEY, {expiresIn: JWT_EXPIRES_IN})
}
module.exports = generateToken