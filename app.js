const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('./db/connect');


let app = express();

require('dotenv').config();
//Connecting to db
dbConnection();
app.use(bodyParser.json());
//initialise routes
app.use('/api', require('./routes/api'));
//error handling middleware

app.use((err, req, res, next)=>{
    res.status(422).send({Error: err._message});
});

app.listen(process.env.PORT, ()=>{
    console.log(`The Server listening at ${process.env.PORT}`);
});