const jobs = require("../db/tables/jobs");
const generateRandomId = require("../helpers/generateRandomId");

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
module.exports = {createJobs, updateJob, destoryJob}