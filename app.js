const express = require('express');
const dbConnection = require('./db/connect');


let app = express();

require('dotenv').config();
//Connecting to db
dbConnection();
app.use(express.json());
//initialise routes
app.use('/api', require('./routes/api'));
//error handling middleware

// app.use((err, req, res, next)=>{
//     res.status(422).send({Error: err._message});
// });


app.listen(process.env.PORT || 4000, ()=>{
    console.log(`The Server listening at ${process.env.PORT}`);
});

module.exports = app;