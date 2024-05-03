const jwt = require('jsonwebtoken');
const API_KEY = 'smktibazma';

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

const data = [
    {
        id: 1,
        name: 'fadhil',
        classes: "XI",
        address: "Jakarta Pusat",
        hobby: "Reading book"
    },
    {
        id: 2,
        name: 'Attar',
        classes: "X",
        address: "Jakarta timur",
        hobby: "Sleping"
    },
    {
        id: 3,
        name: 'Mufiz',
        classes: "XII",
        address: "Depok",
        hobby: "Surfing"
    }
]

const array = []

data.forEach(data => {
    return array.push(createToken(data))
})

array.forEach(token => {
    console.log(verifyToken(token))
})