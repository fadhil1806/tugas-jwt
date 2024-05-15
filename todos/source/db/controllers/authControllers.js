const { body, validationResult } = require('express-validator');
const responseHelpers = require('../../helpers/response');
const { loginUser } = require('../../models/users');

async function login(req, res) {
    const validation = [
        body("username").notEmpty().withMessage("Username required"),
        body("password").notEmpty().withMessage("Password required")
    ]

    await Promise.all(validation.map(v => v.run(req)))
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const errMsg = errors.array().map(e => ({ [e.path]: e.msg}))
        return responseHelpers(res, 422, {status: false, message: 'Error validation fields', error: errMsg})
    }

    try {
        const result = await loginUser(req.body)
        if(result.status) return responseHelpers(res, 200, {data: true, message: result.message, token: result.createToken})
        else responseHelpers(res, 409, {status: result.status, message: result.message})
    }
    catch {
        return responseHelpers(res, 500, {status: false, message: 'error'})
    }
}

module.exports = {login}