const jwt = require('jsonwebtoken');
require('dotenv').config();

function createToken(id, name, classes, address, hobby) {
    const data = {id, name, classes, address, hobby}
    return jwt.sign(data, process.env.API_KEY)
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, process.env.API_KEY)
        delete decoded.iat
        return decoded
    }
    catch {
        return null
    }
}

const siswa = {
    id: 1,
    name: "Jamaludin",
    classes: "XI",
    address: "Banten",
    hobby: ["Sleep", "reading book"]
}

const token = createToken(siswa.id, siswa.name, siswa.classes, siswa.address, siswa.hobby);
const verify = verifyToken(token)

console.log(verify)