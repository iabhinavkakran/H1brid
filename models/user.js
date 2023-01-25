const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'must provide username']
    },
    password: {
        type: String,
        required: [true, 'must provide password'] 
    },
    role: {
        type: String,
        required: [true, 'must provide role which is either Buyers or Sellers'] 
    }
})


module.exports = mongoose.model('User', UserSchema);