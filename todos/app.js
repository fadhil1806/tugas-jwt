const express = require('express')
const app = express()
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const bp = require('body-parser')

const generateRandomId = require('./source/helpers/generateRandomId')
const users = require('./source/db/tables/users');
const { login } = require('./source/controllers/authControllers');
const { addJobs, changeJobs, deleteJob, getJobs, getJobByID } = require('./source/controllers/todos');
const verifyToken = require('./source/middleware/verifyToken');

app.use(bp.json())
app.use(bp.urlencoded({extended: true}))

//end-point auth
app.post('/login', login)
app.post('/register', async(req, res) => {
    const validation = [
        body("name").notEmpty().withMessage("name is required"),
        body("username").notEmpty().withMessage("username is required"),
        body("password").notEmpty().withMessage("username is required"),
        body("email").notEmpty().withMessage("username is required")
    ];

    const validationErrors = await runValidation(validation, { name, username, password, email });
    if (validationErrors) {
        return { status: false, message: 'Validation errors', error: validationErrors };
    }
    try {
        const id = await generateRandomId(9, Number)
        const {name, username, password, email} = req.body

        const isValidUsername = await users.findOne({
            where: {username: username}
        })
        const isValidEmail = await users.findOne({
            where: {email: email}
        })
        
        if(isValidUsername !== null && isValidEmail !== null) return res.status(409).json({status: false, message: 'username and email already exits.'});
        if(isValidUsername !== null) return res.status(409).json({status: false, message: 'username already exits.'});
        if(isValidEmail !== null) return res.status(409).json({status: false, message: 'email already exits.'});
        
        const hashedPassword = bcrypt.hashSync(password, 12)
        await users.create({
            id: id,
            name: name,
            username: username,
            password: hashedPassword,
            email: email
        })

        res.status(201).json({status: true, message: 'success created user'})
    }
    catch(error) {
        console.log(error)
        return res.status(400).json({message: 'Bad request'})
    }
})

//end-point jobs
app.get('/data/jobs/:id', getJobByID)
app.get('/data/jobs', getJobs)
app.post('/add/job', verifyToken, addJobs)
app.post('/update/job/:id', changeJobs)
app.post('/delete/job/:id', deleteJob)

app.listen(4000, () => {
    console.log('Server is running on port 4000')
})