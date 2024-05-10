const response = require("../helpers/response");
const {registerUser, loginUser, getMe} = require("../models/authModels");
const { body, validationResult } = require('express-validator');

async function register(req, res) {
    
        const validation = [
            body("name").notEmpty().withMessage("Name is required"),
            body("email").notEmpty().isEmail().withMessage("Email is required"),
            body("username").notEmpty().withMessage("Username is required"),
            body("password").notEmpty().withMessage("Password is required")
        ];

        //validation of request
        await Promise.all(validation.map(v => v.run(req)));
        const errors = validationResult(req);

        //return error if field not valid
        if(!errors.isEmpty()) {
            const errMsg = errors.array().map(e => ({ [e.path]: e.msg }) )
            return response(res, 422, {status: false, message: 'Error validation fields', error: errMsg});
        }
    
        try {
            const {body} = req
            const result = await registerUser(body)

            if(result.status)  return response(res, 201, {status: result.status, message: result.message})
            else response(res, 409, {status: result.status, message: result.message})
        }

        catch(error) {
            return response(res, 500, {status: false, message: error})
        }
    
}

async function login(req, res) {
    const validation = [
        body("username").notEmpty().withMessage("Username required"),
        body("password").notEmpty().withMessage("Password required")
    ]

    await Promise.all(validation.map(v => v.run(req)))
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        const errMsg = errors.array().map(e => ({ [e.path]: e.msg}))
        return response(res, 422, {status: false, message: 'Error validation fields', error: errMsg})
    }

    try {
        const result = await loginUser(req.body)
        if(result.status) return response(res, 200, {data: true, message: result.message, token: result.createToken})
        else response(res, 409, {status: result.status, message: result.message})
    }
    catch {
        return response(res, 500, {status: false, message: 'error'})
    }
}

async function me(req, res) {
    try {
      const token = req.header('Authorization');
      if (!token) return res.status(401).json({
        status: '401 Unauthorized',
      });
  
      const user = await getMe(token);
      if (user.success) {
        res.status(200).json({ success: true, message: user.message, data: user.data });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

module.exports = {register, login, me}