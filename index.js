
const express = require('express');
const app = express();
const downloadRoute = require('./download')
const cors = require('cors')
const bodyParser = require('body-parser');

app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(cors())

app.use('/', downloadRoute);

app.listen(8000, () => console.log('App listening on 8000'));