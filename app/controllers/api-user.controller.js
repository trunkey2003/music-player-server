const userSong = require('./models/userSongs.model');


class ApiUserController{
    getUserSongs(req,res,next){
    userSong.find({ id : req.params.slug}) 
    .then((songs) => res.json(songs))
    }
}

module.exports = new ApiUserController;