const jwt = require('jsonwebtoken');
const API_KEY = 'liburan';

const data = {
    kegiatan: 'Liburan akhir pekan',
    mealTime: {
        pagi: "08.00",
        siang: "12.20",
        malam: "19.55"
    },
    prayerTime: {
        subuh: "04.00",
        dzuhur: "12.00",
        ashar: "15.30",
        maghrib: "18.00",
        isya: "19.00"
    }
}

function createToken(data) {
    try {
        return jwt.sign(data, API_KEY)
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

console.log(verifyToken(createToken(data)))