const bcrypt = require('bcryptjs')

const hashPassword = async(password) => {
    return bcrypt.hashSync(password, 12);
}
const comparePassword = async(password, hashPassword) => {
    return bcrypt.compare(password, hashPassword);
}
module.exports = {hashPassword, comparePassword}