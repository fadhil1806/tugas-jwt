const jwt = require('jsonwebtoken')
const { createJobs, updateJob, destoryJob } = require('../../models/todos');
const responseHelpers = require('../../helpers/response');
const jobs = require('../tables/jobs');
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
async function addJobs(req, res) {
    try {
        const token = req.headers.authorization;
        const isValid = jwt.verify(token, process.env.API_KEY);
        console.log(isValid)
        const status = await createJobs(isValid.id, req.body)
        console.log(status)

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

module.exports = {addJobs, changeJobs, deleteJob, getJobs}