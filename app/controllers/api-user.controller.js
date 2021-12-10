const userSong = require('./models/userSongs.model');
const user = require('./models/user.model');


class ApiUserController{
    getUserSongs(req,res,next){
    userSong.find({ username : req.params.slug}) 
    .then((songs) => res.json(songs))
    }

    getUser(req, res, next){
    user.find({id : req.params.slug})
    .then((user) => res.json(user))
    }
}

module.exports = new ApiUserController;