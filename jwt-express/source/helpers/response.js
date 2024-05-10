function response(res, status, data) {
    res.status(status).json(data)
}

module.exports = response