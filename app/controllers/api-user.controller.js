const userSong = require('./models/userSongs.model');
const user = require('./models/user.model');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const saltRounds = 13;
var jwt = require('jsonwebtoken');

class ApiUserController {
    getUser(req, res, next) {
        user.find({ userid: res.locals.id })
            .then((user) => res.json(user[0]))
    }

    async postUser(req, res, next) {
        const addnewUser = req.body;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        Object.assign(addnewUser, { userid: uuidv4(), password: hashedPassword });
        const newUser = new user(addnewUser);
        newUser.save()
            .then(() => res.status(200).send(addnewUser))
            .catch(() => res.status(400).send("Err add user"));
    }

    checkUserName(req, res, next){
        user.findOne({username: req.body.username})
        .then((user) => {if (user) res.send("false"); else res.send("true")})
        .catch(() => {res.send("Vào catch")})
    }

    validateUser(req, res, next) {
        user.find({ username: res.locals.username })
            .then((user) => { res.locals.id = user[0].userid; next() })
            .catch(() => { res.status(404).send(`user ${res.locals.username} doesn't exist`) });
    }

    validateLogin(req, res, next) {
        user.find({ username: req.body.username })
            .then(async (user) => {
                const valid = await bcrypt.compare(req.body.password, user[0].password);
                if (valid) { res.locals.username = req.body.username; next(); } else {res.status(403).send("Wrong Password")}
            })
            .catch(() => { res.status(409).send({ status: false, message: `Wrong Username` }) });
    }

    setToken(req,res,next){
        const user = {username : res.locals.username};
        jwt.sign(user, "musicplayer", (err, token) => {
            if (err) res.status(403).send("Cannot Set Token");
            res.locals.token = token;
            next();
        });
    }

    validateTokenCookie(req, res, next){
        jwt.verify(req.cookies.token, "musicplayer", (err, user) => {
            if (err) res.status(403).send("Invalid Token");
            res.locals.username = user.username;
            next();
        })
    }

    setTokenCookie(req, res, next) {
        res.cookie('token', res.locals.token, {
            sameSite: 'none',
            secure: true,
            httpOnly: true,
            maxAge: 3600000,
        }).status(200).send({ username: res.locals.username })
    }

    getUserSongs(req, res, next) {
        userSong.find({ userid: res.locals.id })
            .then((songs) => { res.json(songs) })
            .catch(() => { res.json("error user songs") });
    }

    postUserSongs(req, res, next) {
        const song = new userSong(req.body);
        song.save()
            .then(() => res.json("Song added!"))
            .catch(() => res.json("CANNOT POST SONG"));
    }

    deleteUserSongs(req, res, next) {
        userSong.deleteOne({ _id: req.params.id, userid: res.locals.id })
            .then(() => res.send(`delete song id : ${req.params.id} successfully`))
            .catch(() => res.send(`cannot delete song id : ${req.params.id}`));
    }

    deleteUserSongsBySongID(req, res, next) {
        userSong.deleteOne({ songid: req.params.id, userid: res.locals.id })
            .then(() => res.send(`delete song id : ${req.params.id} successfully`))
            .catch(() => res.send(`cannot delete song id : ${req.params.id}`));
    }

    // getCookie(req, res, next){
    //     res.cookie("username", "trunkey", {sameSite: 'strict', path: '/', expires: new Date(new Date().getTime() + 60*1000), httpOnly: true}).status(200).send("cookie installed");
    // }

    // postCookie(req, res, next){
    //     res.cookie("username", req.body.username, {sameSite: 'strict', path: '/', expires: new Date(new Date().getTime() + 5*1000), httpOnly: true}).status(200).send("cookie installed");
    // }

    clearCookie(req, res, next) {
        res.status(202).clearCookie('token').send("cookies clears");
    }

}

module.exports = new ApiUserController;