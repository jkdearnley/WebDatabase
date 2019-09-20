const http = require('http')
const url = require('url')

const data = require('./data.json')

function employeeList(req, res) {
    res.statusCode = 200
    res.end(JSON.stringify(data))
}

function errorRequest(req, res) {
    res.statusCode = 404
    res.end(`This api request call is not supported`)
}

function addEmployee(req, res) {
    let body = '';
    
    req.on('data', chunk => body += chunk.toString())
    req.on('end', () => {
        data.push(JSON.parse(body))
        res.statusCode = 201;
        return res.end(`Added ${JSON.parse(body).name}`)
    })
    req.on('error', error => {
        res.statusCode = 400;
        return res.end(error)
    })
}

const server = http.createServer((req, res) => {
    const urlEmployee = url.parse(req.url)
    //console.log(urlEmployee)
    if(urlEmployee.pathname == '/api/employees') {
        switch(req.method) {
            case 'GET':
                employeeList(req, res)    
                break;
            case 'POST':
                addEmployee(req, res)
                break;
            default:
                errorRequest(req, res)

                break;
        }
    } else {
        errorRequest(req, res)
    }
})

server.listen(8080, () => console.info(`Server is up on port 8080`))