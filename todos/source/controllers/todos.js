const jwt = require('jsonwebtoken')
const { createJobs, updateJob, destoryJob } = require('../models/todos');
const responseHelpers = require('../helpers/response');
const jobs = require('../db/tables/jobs');
const runValidation = require('../helpers/runValidation');
const { body, validationResult } = require("express-validator");
require('dotenv').config()

async function getJobs(req, res) {
    try {
        const data = await jobs.findAll({attributes: {exclude: ['createdAt', 'updatedAt']}})
        return responseHelpers(res, 200, data)
    }
    catch {
        return responseHelpers(res, 500, {message: 'internal server erorr'})
    }
}

async function getJobByID(req, res) {
    try {
        const  id  = req.params.id
        const data = await jobs.findOne({where: {id: id}, attributes: {exclude: ['createdAt', 'updatedAt']}})
        if(data == null) return responseHelpers(res, 404, {status: false, message: 'Data cannot be found'})
        responseHelpers(res, 200, data)
    }
    catch(error) {
        console.log(error)
        return responseHelpers(res, 500, {message: 'internal server erorr'})
    }
}
async function addJobs(req, res) {
    const {title, description} = req.body

    const validation = [
        body("title").notEmpty().withMessage("Title is required"),
        body("description").notEmpty().withMessage("Description is required"),
    ];

    const validationErrors = await runValidation(validation, { title, description });
    if (validationErrors) return { status: false, message: 'Validation errors', error: validationErrors };
    
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.API_KEY);
        await createJobs(decoded.id, req.body)
        
        return responseHelpers(res, 201, {message: 'created jobs'})
    }
    catch {
        return responseHelpers(res, 400, {message: 'bad request'})
    }
}

async function changeJobs(req, res) {
    try {
        const token = req.headers.authorization;
        const isValid = jwt.verify(token, process.env.API_KEY);

        const status = await updateJob(isValid.id, req.body, req.params.id)
        console.log(status)
        return responseHelpers(res, 201, status)
    }
    catch(error) {
        console.log(error)
        return responseHelpers(res, 400, {message: 'bad request'})
    }
}

async function deleteJob(req, res) {
    try {
        const token = req.headers.authorization;
        const isValid = jwt.verify(token, process.env.API_KEY);

        const status = await destoryJob(isValid.id, req.params.id)
        return responseHelpers(res, 200, status)
    }
    catch {
        console.log(error)
        return responseHelpers(res, 400, {message: 'bad request'})
    }
}

module.exports = {addJobs, changeJobs, deleteJob, getJobs, getJobByID}