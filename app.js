const express = require('express');
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const connectDB = require('./db/Connect');
const User = require('./models/user')


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routes

// Part 1 - Auth APIs
app.use('/api/auth/register',require('./routes/register'));
app.use('/api/auth/login',require('./routes/login'));

// Part 2 - APIs for Buyers
app.use('/api/buyer/list-of-sellers', require('./routes/list-of-sellers'))
app.use('/api/buyer/seller-catalog', require('./routes/seller-by-id'))
app.use('/api/buyer/create-order', require('./routes/create-order'));

// Part 3 - APIs for Sellers
app.use('/api/seller/create-catalog', require('./routes/create-catalog'))
app.use('/api/seller/orders', require('./routes/order-received'))

// start server
const port = process.env.PORT || 3000;

const startServer = async ()=>{
    try {
        await connectDB(process.env.MONGO_URL);
        console.log('Connected to DB...');
        app.listen(port, console.log(`Server is Listening on Port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}
startServer();
