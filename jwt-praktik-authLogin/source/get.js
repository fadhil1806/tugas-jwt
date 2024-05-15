const users = require("./db/tables/users");

async function getDataUsers() {
    const data = await users.findAll();
    data.forEach(v => {
        console.log(v.dataValues)
    })
}
getDataUsers()