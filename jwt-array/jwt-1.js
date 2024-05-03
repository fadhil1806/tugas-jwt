const jwt = require('jsonwebtoken')
const API_KEY = 'smktibazma'
const data = [
    {
        nama: "Fadhil Rabbani", 
        alamat: "Tangerang", 
        contact: {
            address: "surabaya",
            telephone: "08692212124"
        },
    },
    {
        nama: "Andi Setiawan",
        alamat: "Jakarta",
        contact: {
            address: "Bandung",
            telephone: "08771234567"
        }
    },
    {
        nama: "Siti Aisyah",
        alamat: "Yogyakarta",
        contact: {
            address: "Semarang",
            telephone: "08561234567"
        }
    },
    {
        nama: "Rizky Pratama",
        alamat: "Malang",
        contact: {
            address: "Surabaya",
            telephone: "08121234567"
        }
    },
    {
        nama: "Budi Santoso",
        alamat: "Bandung",
        contact: {
            address: "Jakarta",
            telephone: "08781234567"
        }
    },
    {
        nama: "Dewi Lestari",
        alamat: "Surabaya",
        contact: {
            address: "Denpasar",
            telephone: "08131234567"
        }
    }                    
]

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
        const isValid = jwt.sign(token, API_KEY)
        if(isValid) return "Token is valid"
    }
    catch {
        return 'Token invalid'
    }
}
const array = [];

data.forEach(value => {
    return array.push(createToken(value));
})

for(const data of array) {
    console.log(verifyToken(data))
}