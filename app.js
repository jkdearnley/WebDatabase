const express = require('express')
const app = express()
const router = express.router()
const data = require('./data')
const port = 8080

app.get('/api/employees', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/employees', (req, res) => {
    res.send('HTTP POST setup done!');
});

app.all('/api/employees', (req, res, next) => {
    res.send(`${req.method} setup done!`);
});

app.route('/api/employees')
    .get((req, res) => {
        res.send('GET');
    })
    .post((req, res) => {
        res.send('POST');
    })

router.get('/employees', (req, res) => res.send(data))

app.use('/api', router)

app.use('/images', express.static('images'))

router.get('/employees', (req, res) => {
    console.log(req.query)
    return res.send(data)
});

router.get('./employees/:id', (req, res) => {
    const id = +req.params.id
    const employee = data.filter(d => d.id == id)
    console.log(req.params)
    return res.send(employee)
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});