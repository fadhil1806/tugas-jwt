const jwt = require('jsonwebtoken');
require('dotenv').config();

//generate token jwt
const payload = {id: 182, username: "Fadhil R", class: "XI"}; //data
const token = jwt.sign(payload, process.env.API_KEY);

//verify token jwt
jwt.verify(token, process.env.API_KEY, (err, decoded) => {
    try {
        if(err) return console.error({
            name: 'TokenExpiredError',
            message: 'jwt expired',
            expiredAt: 1408621000
          })

        else console.log('token is valid'); console.log(decoded)
    }
    catch {
        return console.log('server eror')
    }
})