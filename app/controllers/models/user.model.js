const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    fullName : {type:String, default:"full name"},
    dateOfBirth: {type:String, default:"01/01/2022"},
    Phone:{type:String, default:"0123456789"},
    Email:{type:String, required: true},
    userid:{type:String, unique: true},
    username:{type:String, unique: true, required: true},
    avatar:{type: String, default:"https://trunkey2003.github.io/general-img/default-profile-pic.jpg"},
    password:{type:String},
});

module.exports = mongoose.model('user', user);