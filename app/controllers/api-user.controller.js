const userSong = require('./models/userSongs.model');
const user = require('./models/user.model');


class ApiUserController{
    getUser(req, res, next){
        user.find({userid : res.locals.id})
        .then((user) => res.json(user))
    }

    validateUser(req, res, next){
        user.find({ username : req.params.username})
        .then((user) => {res.locals.id = user[0].userid ;next()})
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
        res.status(200).send(req.params.id);
        if (!req.params.id) {res.locals.songid = req.body.songid; next();}
        userSong.deleteOne({_id: req.params.id, userid: res.locals.id})
        .then(() => res.send(`delete song id : ${req.params.id} successfully`))
        .catch(() => res.send(`cannot delete song id : ${req.params.id}`));
    }

    deleteUserSongsBySongID(req, res, next){
        res.json(res.locals.songid);
        userSong.deleteOne({userid: res.locals.id, songid: res.locals.songid})
        .then(() => res.send(`delete song id : ${req.body.id} successfully`))
        .catch(() => res.send(`error delete song id : ${req.body.id}`));
    }
}

module.exports = new ApiUserController;