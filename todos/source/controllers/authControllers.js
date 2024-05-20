const { body, validationResult } = require('express-validator');
const responseHelpers = require('../helpers/response');
const { loginUser } = require('../models/users');
const runValidation = require('../helpers/runValidation');

async function login(req, res) {
    const validation = [
        body("username").notEmpty().withMessage("Username required"),
        body("password").notEmpty().withMessage("Password required")
    ]
    const {username, password} = req.body
    const validationErrors = await runValidation(validation, { username, password });
    if (validationErrors) return { status: false, message: 'Validation errors', error: validationErrors };

    try {
        const result = await loginUser(req.body)
        if(result.status) return responseHelpers(res, 200, {data: true, message: result.message, token: result.createToken})
        else responseHelpers(res, 409, {status: result.status, message: result.message})
    }
    catch(error) {
        console.log(error)
        return responseHelpers(res, 500, {status: false, message: 'error'})
    }
}

module.exports = {login}