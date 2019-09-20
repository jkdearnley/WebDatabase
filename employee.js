const data = require('./data.json')

function listAllEmployees(re, res) {
    return res.status(200).json(data);
    //const connection = req.app.locals.connection
}

module.exports = {
    listAllEmployees
}