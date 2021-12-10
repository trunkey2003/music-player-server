const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSong = new Schema({
    id: {type: String},
    username: {type: String},
    name: {type:String},
    singer: {type:String},
    path: {type:String},
    image: {type:String},
});

module.exports = mongoose.model('userSong', userSong);