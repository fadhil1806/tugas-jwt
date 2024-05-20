const express = require('express')
const { getJobByID, getJobs, addJobs, changeJobs, deleteJob } = require('../controllers/todos')
const authentication = require('../middleware/authentication')
const router = express.Router()

router.get('/jobs/:id', getJobByID)
router.get('/jobs', getJobs)
router.post('/add/job', authentication, addJobs)
router.post('/update/job/:id', authentication, changeJobs)
router.post('/delete/job/:id',  authentication ,deleteJob)

module.exports = router;