const userSong = require('./models/userSongs.model');
const user = require('./models/user.model');


class ApiUserController{
    getUser(req, res, next){
        user.find({userid : res.locals.id})
        .then((user) => res.json(user))
    }

    validateUser(req, res, next){
        user.find({ username : req.params.username})
        .then((user) => {res.locals.id = user[0].id ;next()})
        .catch(() =>{res.status(404).send(`user ${req.params.username} doesn't exist`)});
    }

    getUserSongs(req,res,next){
        userSong.find({ userid : res.locals.id})
        .then((songs) => {res.json(songs)})
        .catch(() => {res.json("error user songs")});
    }

    postUserSongs(req,res,next){
        const song = new userSong(req.body);
        song.save()
        .then(() => res.json("Song added!"))
        .catch(() => res.json("CANNOT POST SONG"));
    }

    deleteUserSongs(req,res,next){
        if (!req.params.id) {next();}
        userSong.deleteOne({_id: req.params.id, userid: res.locals.id})
        .then(() => res.send(`delete song id : ${req.params.id} successfully`))
        .catch(() => res.send(`cannot delete song id : ${req.params.id}`));
    }

    deleteUserSongsBySongID(req, res, next){
        userSong.deleteOne({userid: res.locals.id, songid: req.body.id})
        .then(() => res.send(`delete song id : ${req.body.id} successfully`))
        .catch(() => res.send(`error delete song id : ${req.body.id}`));
    }
}

module.exports = new ApiUserController;