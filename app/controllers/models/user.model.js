const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    fullName : {type:String},
    dateOfBirth: {type:String},
    Phone:{type:String},
    Email:{type:String},
    userid:{type:String},
    username:{type:String},
    password:{type:String},
});

module.exports = mongoose.model('user', user);