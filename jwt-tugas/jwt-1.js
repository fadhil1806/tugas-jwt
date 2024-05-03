const jwt = require('jsonwebtoken')
const API_KEY = 'liburan';



function createToken(data) {
    try {
        return jwt.sign(data, API_KEY, {expiresIn: '24h'})
    }
    catch {
        return null
    }
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, API_KEY)
        delete decoded.iat
        return decoded
    }
    catch {
        return null
    }
}


