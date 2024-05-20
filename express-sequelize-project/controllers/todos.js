const jwt = require('jsonwebtoken')
const responseHelpers = require('../helpers/response');
const { body, validationResult } = require("express-validator");
const runValidation = require('../helpers/runValidation');
const jobs = require('../models/jobs');
const generateRandomId = require('../config/generateRandomID');
const { errorResponse } = require('../config/responseJson');
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
    console.log(validationErrors)
    if (validationErrors) return errorResponse(res, 429, validationErrors)
    
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        await createJobs(decoded.id, req.body)
        
        return responseHelpers(res, 201, {message: 'created jobs'})
    }
    catch(error) {
        console.log(error)
        return responseHelpers(res, 400, {message: 'bad request'})
    }
}

async function changeJobs(req, res) {
    try {
        const token = req.headers.authorization;
        const isValid = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const status = await updateJob(isValid.id, req.body, req.params.id)
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
        const isValid = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const status = await destoryJob(isValid.id, req.params.id)
        return responseHelpers(res, 200, status)
    }
    catch {
        console.log(error)
        return responseHelpers(res, 400, {message: 'bad request'})
    }
}


// const jobs = require("../db/tables/jobs");
// const generateRandomId = require("../helpers/generateRandomId");

async function listJobs(id) {
    try {
        const data = await jobs.findOne({
            where: {id_user: id}
        })
        return {status: true, data: data}
    }
    catch(error) {
        console.log(error);
        // return {status: false, message: "Error"}
    }
}

async function createJobs(id_user, data) {
    
    // const validation = [
    //     body("title").notEmpty().withMessage("Title is required"),
    //     body("description").notEmpty().withMessage("Description is required"),
    // ];

    // const validationErrors = await runValidation(validation, { title, description });
    // if (validationErrors) {
    //     return { status: false, message: 'Validation errors', error: validationErrors };
    // }

    try {
        const id = await generateRandomId(12);
        const {title, description} = data
        await jobs.create({
            id: id,
            id_user: id_user,
            name: title,
            description: description
        })

        return {status: true, message: 'success created'}
    }
    catch(error) {
        console.error(error);
    }
}
async function updateJob(id_user, data, jobs_id) {
    try {
        const {title, description} = data
        await jobs.update(
            { title, description },
            { where: { id_user: id_user, id: jobs_id } }
        );
       
        return {status: true, message: 'success updated'}
    }
    catch(error) {
        console.error(error);
    }
}

async function destoryJob(id_user, jobs_id) {
    try {
        await jobs.destroy({
            where: {id_user: id_user, id: jobs_id}
        })
        return {status: true, message: 'success deleted'}
    }
    catch(error) {
        console.log(error)
    }
}

module.exports = {addJobs, changeJobs, deleteJob, getJobs, getJobByID}