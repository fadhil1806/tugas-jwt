const bcrypt = require('bcrypt');
const users = require('../db/user');
const generateRandomId = require('../system');
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function registerUser(data) {
    try {
        const {name, username, email, password} = data;

        //check data of database;
        const isValidUsername = await getDataUsername(username)
        
        const isValidEmail = await users.findOne({ 
            where: {email: email}
        });

        //validation of database
        if(isValidUsername != null & isValidEmail != null) return {status: false, message: 'Username and email already exits'};
        if(isValidUsername != null) return {status: false, message: 'Username already exits'}
        if(isValidEmail != null) return {status: false, message: 'Email already exits'}

        //generate id and hashed password
        const id = await generateRandomId(7, Number);
        const hashedPassword = bcrypt.hashSync(password, 12);

        //create user
        if(!isValidUsername && !isValidEmail) {
            await users.create({
                id: id,
                name: name,
                username: username,
                email: email,                                                    
                password: hashedPassword
            })
            return {status: true, message: 'Succes created'}
        }
        
    }
    catch(error) {                         
        throw new Error
    }
}

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
            attributes: ['username', 'password', 'email']
        })
        const isValidPassword = bcrypt.compareSync(password, getDataUser.dataValues.password)
        
        if(isValidPassword) {
            const createToken = jwt.sign(getDataUser.dataValues, process.env.API_KEY)
            return {status: true, message: 'Password true', createToken}
        }else {
            return {status: false, message: 'Password wrong'}
        }
    }
    catch {

    }
}
async function getMe(token) {
    try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.API_KEY);
      const userData = {
        username: decoded.username,
        password: decoded.password,
        email: decoded.email
      }
      return { success: true, message: 'User data retrieved successfully', data: userData };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  }
module.exports = {registerUser, loginUser, getMe}


