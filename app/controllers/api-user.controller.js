const userSong = require('./models/userSongs.model');
const user = require('./models/user.model');
const { v4: uuidv4 } = require('uuid');     
const bcrypt = require('bcrypt');
const saltRounds = 13;

class ApiUserController{
    getUser(req, res, next){
        user.find({userid : res.locals.id})
        .then((user) => res.json(user))
    }

    async postUser(req, res, next){
        const addnewUser = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        Object.assign(addnewUser, {userid : uuidv4(), password: hashedPassword});
        const newUser = new user(addnewUser);
        newUser.save()
        .then(() => res.status(200).send(addnewUser))
        .catch(() => res.status(400).send("Err add user"));
    }

    validateUser(req, res, next){
        user.find({ username : req.cookies.username})
        .then((user) => {res.locals.id = user[0].userid ;next()})
        .catch(() =>{res.status(404).send(`user ${req.cookies.username} doesn't exist`)});
    }

    validateLogin(req, res, next){
        user.find({username : req.body.username})
        .then(async (user) => {
            const valid = await bcrypt.compare(req.body.password, user[0].password); 
            if (valid) 
            res.cookie("username", user[0].username, {sameSite: 'strict', path: '/', expires: new Date(new Date().getTime() + 10*1000), httpOnly: true})
            .status(200)
            .send({
                status: true, message: `Login Successful`,
                username: user[0].username, userid: user[0].userid
            });
            res.status(403).send({status: false, message: `Wrong Password`});
        })
        .catch(() => {res.status(400).send({status : false,message : `Wrong Username`})});
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
        userSong.deleteOne({_id: req.params.id, userid: res.locals.id})
        .then(() => res.send(`delete song id : ${req.params.id} successfully`))
        .catch(() => res.send(`cannot delete song id : ${req.params.id}`));
    }

    deleteUserSongsBySongID(req,res,next){
        userSong.deleteOne({songid: req.params.id, userid: res.locals.id})
        .then(() => res.send(`delete song id : ${req.params.id} successfully`))
        .catch(() => res.send(`cannot delete song id : ${req.params.id}`));
    }
}

module.exports = new ApiUserController;