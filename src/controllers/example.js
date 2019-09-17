import {
    sequelize
} from '../models'

let helloWorld = (ctx) =>
{
    ctx.status = 200;
    ctx.body = "Hello anh Tín môi thâm"
}

module.exports = {
    helloWorld
}