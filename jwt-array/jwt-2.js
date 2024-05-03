const jwt = require('jsonwebtoken');
const API_KEY = 'smktibazma'
const data = [
    {
        "kegiatan": "Makan siang bersama keluarga",
        "mealTime": {
            "pagi": "08.00",
            "siang": "13.00",
            "malam": "20.00"
        },
        "prayerTime": {
            "subuh": "04.00",
            "dzuhur": "12.30",
            "ashar": "16.00",
            "maghrib": "18.30",
            "isya": "19.30"
        }
    },
    {
        "kegiatan": "Berkumpul dengan teman-teman",
        "mealTime": {
            "pagi": "09.00",
            "siang": "13.30",
            "malam": "20.30"
        },
        "prayerTime": {
            "subuh": "04.30",
            "dzuhur": "12.45",
            "ashar": "16.15",
            "maghrib": "18.45",
            "isya": "19.45"
        }
    },
    {
        "kegiatan": "Belajar di perpustakaan",
        "mealTime": {
            "pagi": "08.30",
            "siang": "14.00",
            "malam": "21.00"
        },
        "prayerTime": {
            "subuh": "04.15",
            "dzuhur": "12.15",
            "ashar": "15.45",
            "maghrib": "18.15",
            "isya": "19.15"
        }
    },
    {
        "kegiatan": "Nonton konser musik",
        "mealTime": {
            "pagi": "07.30",
            "siang": "12.45",
            "malam": "19.30"
        },
        "prayerTime": {
            "subuh": "04.45",
            "dzuhur": "12.00",
            "ashar": "15.15",
            "maghrib": "18.30",
            "isya": "19.45"
        }
    },
    {
        "kegiatan": "Jalan-jalan di taman",
        "mealTime": {
            "pagi": "09.30",
            "siang": "13.15",
            "malam": "20.15"
        },
        "prayerTime": {
            "subuh": "04.20",
            "dzuhur": "12.30",
            "ashar": "15.45",
            "maghrib": "18.45",
            "isya": "19.30"
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

data.forEach(data => {
    return array.push(createToken(data));
})

array.forEach(token => {
    console.log(verifyToken(token))
})
