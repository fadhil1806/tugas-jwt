const { hashPassword, comparePassword } = require("../config/bcrypt");
const generateRandomId = require("../config/generateRandomID");
const generateToken = require("../config/generateToken");
const { errorResponse, successResponse, internalErrorResponse, validationErrorResponse } = require("../config/responseJson");
const users = require("../models/users");
async function register(req, res) {
    const {name, username, password, email} = req.body
    try {
        const existingUsername = await users.findOne({
            where: {username: username}
        })

        const existingEmail = await users.findOne({
            where: {email: email}
        })
        console.log(existingEmail.dataValues)
        if(!existingUsername && !existingEmail) return errorResponse(res, 'Username and Email already exits')
        if(!existingUsername) return errorResponse(res, 'Username already exits')
        if(!existingEmail) return errorResponse(res, 'Email already exits')

        const idUser = await generateRandomId(5, Number);
        const hashedPassword = await hashPassword(password);

        await users.create({
            id: idUser,
            name,
            username,
            password: hashedPassword,
            email
        })
        return successResponse(res, 'Register successfully')
    
    }
    catch(error) {
        return internalErrorResponse(res, error)
    }
}

async function login(req, res) {
    const {username, password} = req.body
    const usernameCheck = await users.findOne({
        where: {username},
        attributes: { exclude: ['createdAt', 'updatedAt']}
    })

    const emailCheck = await users.findOne({
        where: {email: username},
        attributes: { exclude: ['createdAt', 'updatedAt']}
    })

    if(!usernameCheck) if(!emailCheck) return errorResponse(res, 'Username not found', 404);
    
    let data;
    if(usernameCheck != null) data = usernameCheck.dataValues
    if(emailCheck != null) data = emailCheck.dataValues
    const isValidPassword = await comparePassword(password, data.password)
    if(!isValidPassword) return errorResponse(res, {error: 'Invalid password'}, 401)
    delete data.password
    const token = await generateToken(data, process.env.JWT_SECRET_KEY)

    return successResponse(res, token)
}

async function me(req, res) {
    try {
        const user = await users.findByPk(req.user.id, {
            attributes: ['id' ,'username', 'email']
        })
        if (!user) {
            errorResponse(res, 'User not found', 404);
          }
          successResponse(res, 'User fetched successfully', user, 200);
    }
    catch(error) {
        console.log(error)
        internalErrorResponse(res, error)
    }
}
async function logout(req, res) {
    try {
      successResponse(res, 'Logged out successfully', null, 200);
    } catch (error) {
      console.error('Error logging out user:', error);
      internalErrorResponse(res, error);
    }
  };
module.exports = {register, login, me, logout}