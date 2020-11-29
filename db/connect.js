const mongoose = require('mongoose');
// const config = require('../config/index');
require('dotenv').config();

// mongoose.promise = global.promise;

// const connectTodb = async () => {
//     try{
//         await mongoose.connect(process.env.dbURL, { useMongoClient: true });
        
//     }catch(err){
//         console.log(err);
//     }
// }


const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.dbURL,{
            // useMongoClient:true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log('connected')
    } catch (error) {
        
    }
   
}

module.exports = connectDb;
