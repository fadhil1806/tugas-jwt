var express = require('express');
const { register, login, me, logout } = require('../controllers/authController');
const authentication = require('../middleware/authentication');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', register)
router.post('/login', login)
router.get('/me', authentication, me)
router.post('/logout', logout);

module.exports = router;