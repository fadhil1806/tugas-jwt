const bcrypt = require('bcrypt');
const users = require('../db/tables/users');
require('dotenv').config()
const jwt = require('jsonwebtoken')
async function loginUser(data) {
    
    const {username, password} = data
    //check username of database
    const isValidUsername =  await users.findOne({
        where: {username: username}
    });

    //validation username of database
    if(!isValidUsername) return {status: false, message: 'username does not exist'};

    try {
        const getDataUser = await users.findOne({
            where: {username: username},
            attributes: ['id', 'username', 'password', 'email']
        })
        console.log(getDataUser.dataValues)
        console.log(password)
        const isValidPassword = bcrypt.compareSync(password, getDataUser.dataValues.password)
        
        if(isValidPassword) {
            const createToken = jwt.sign(getDataUser.dataValues, process.env.API_KEY)
            return {status: true, message: 'Password true', createToken}
        }else {
            return {status: false, message: 'Password wrong'}
        }
    }
    catch(error) {
        console.log(error)
    }
}

module.exports = {loginUser}