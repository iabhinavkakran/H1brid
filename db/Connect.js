const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectDB = (dbURL)=>{
return mongoose.connect(dbURL)  
}

module.exports = connectDB;
