function responseHelpers(res, status, data = null) {
    return res.status(status).json(data)
}
module.exports = responseHelpers