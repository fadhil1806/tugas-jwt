const jwt = require('jsonwebtoken')
require('dotenv').config()
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    // console.log(authHeader)

    if(!authHeader) {
        return res.status(401).json({
            message: 'Token not provided'
        })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(token, process.env.API_KEY, (error, decoded) => {
        if(error) return res.status(403).json({
            message: "Invalid Token, Permission"
        })
        next()
    })
}
module.exports = verifyToken