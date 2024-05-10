const express = require('express');
const bp = require('body-parser')
const app = express();
const cors = require('cors');

const { register, login } = require('./source/controllers/authController');

require('dotenv').config();


//middeware
app.use(cors);
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))

app.use(bp.json());
app.use(bp.urlencoded({extended: true}))


//routes
app.post('/register', register)
app.post('/login', login)


const port = 5000
app.listen(port, (err) => {
    console.log('server running' + ` is ${port}`)
})