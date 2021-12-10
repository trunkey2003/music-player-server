const userSong = require('./models/userSongs.model');
const user = require('./models/user.model');


class ApiUserController{
    getUserSongs(req,res,next){
        userSong.find({ id : res.locals.id})
        .then((songs) => {res.json(songs)})
        .catch(() => {res.json("error user songs")});
    }

    validateUser(req, res, next){
        user.find({ username : req.params.slug})
        .then((user) => {res.locals.id = user[0].id ;next()})
        .catch(() =>{res.status(404).send(`user ${req.params.slug} doesn't exist`)});
    }

    PostUserSongs(req,res,next){
        let newSong = req.body;
        Object(newSong, {id : res.locals.id})
        const song = new userSong(newSong);
        song.save()
        .then(() => res.json("Song added!"))
        .catch(() => res.json("CANNOT POST SONG"));
    }

    getUser(req, res, next){
        user.find({id : res.locals.id})
        .then((user) => res.json(user))
    }
}

module.exports = new ApiUserController;