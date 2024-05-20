const jobs = require("./source/db/tables/jobs");
const users = require("./source/db/tables/users");
const generateRandomId = require("./source/helpers/generateRandomId");

async function select() {
    const data = await users.findAll();
    const data1 = await users.findOne({where: {username: 'fadhil_one_'}})
    console.log(data1.dataValues)
    // console.log(data)
    data.forEach(v => console.log(v.dataValues))
}
// select()

async function add(id, data) {
    const {title, description} = data
    const idJobs = await generateRandomId(7, String)

    const add = await jobs.create({
        id_user: id,
        id: idJobs,
        name: title,
        description: description
    })

    console.log(add)
}
add(123368220, {title: 'halo', description: 'coba'})
