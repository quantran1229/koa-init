import paralidate from 'paralidate';
import moment from 'moment'

let validate = paralidate({
    //page validate
    page: {
        type: 'string',
        format: /^[0-9]+$/,
        required: false
    },
    perPage: {
        type: 'string',
        format: /^[0-9]+$/,
        required: false
    },
}, {
    box: (ctx) => ctx.request.query,
    outputType: 'json'
});

module.exports = {
    validate
}